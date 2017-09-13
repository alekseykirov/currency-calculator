var FormCalcModel = function() {
    this.init();
    this.sum = [];
};

FormCalcModel.prototype.init = function() {
    var self = this;
};

FormCalcModel.prototype.improveValue = function (value) {
    var self = this;
    return +self.sum + +value
};

FormCalcModel.prototype.lowerValue = function (value) {
    var self = this;
    return +self.sum - +value
};

FormCalcModel.prototype.uploadImages = function( fileInput ) {
    var self = this;
    jQuery(window).trigger('imageUploadIsStarted');
    jQuery.each( files, function( key, file ) {
        var data = new FormData();
        data.append( 'photo', file );
        window.apiSpa.uploadImage( data, function( data, callback, errorCallback ) {
            if ( data.success ) {
                self.addImage( data.photos[0] );
            } else {
                for ( var key in data.errors ) {
                    data.errors[key].map(function( item ) {
                        self.addError( item );
                    });
                }
            }
            jQuery(window).trigger('imageUploadIsFinished');
        }, function( jqXHR, textStatus, errorThrown ) {
            if ( errorThrown == 'Request Entity Too Large' ) {
                self.addError( 'Файл слишком большой' );
            } else {
                self.addError( errorThrown );
            }
            jQuery(window).trigger('imageUploadIsFinished');
        }, function( percentComplete ) {
            jQuery(window).trigger('onTicketImageUploadProgressChange', percentComplete);
        } );
    });
};

FormCalcModel.prototype.addImage = function( image ) {
    var self = this;
    self.images.push( image );
    jQuery(window).trigger('ticketImagesModelUpdated');
};

FormCalcModel.prototype.addImagesFromNative = function( data ) {
    //метод вызывается нативным кодом мобильного приложения
    var self = this;
    data = JSON.parse( data );
    if ( data.success ) {
        self.addImage( data.photos[0] );
    } else {
        for ( var key in data.errors ) {
            self.addError( data.errors[key] );
        }
    }
};

FormCalcModel.prototype.removeImage = function( imageId ) {
    var self = this;
    window.apiSpa.deleteImage( imageId, function( data ) {
        if ( data.success ) {
            var removedImageIndex = _.findIndex( self.images, function( o ) { return o.id == imageId; } );
            self.images.splice( removedImageIndex, 1);
            jQuery(window).trigger('ticketImagesModelUpdated');
        }
    } );
};

FormCalcModel.prototype.rotateImage = function( imageId, direction ) {
    var self = this;
    window.apiSpa.rotateImage( imageId, direction, function( data ) {
        if ( data.success ) {
            var rotatedImageIndex = _.findIndex( self.images, function( o ) { return o.id == imageId; } );
            self.images[rotatedImageIndex].file = data.image.image;
            jQuery(window).trigger('ticketImagesModelUpdated');
        }
    } );
};

FormCalcModel.prototype.changeImagePriority = function( imageId, isMain ) {
    var self = this;
    self.makeImagesSecondary();
    var changedImageIndex = _.findIndex( self.images, function( o ) { return o.id == imageId; } );
    self.images[changedImageIndex].is_main = isMain;
    jQuery(window).trigger('ticketImagesModelUpdated');
};

FormCalcModel.prototype.makeImagesSecondary = function() {
    var self = this;
    self.images.forEach(function( item ) {
        item.is_main = 0;
    });
};

FormCalcModel.prototype.addError = function( error ) {
    var self = this;
    self.errors.push( error );
    jQuery(window).trigger('imageErrorsModelUpdated');
};

FormCalcModel.prototype.clearErrors = function() {
    var self = this;
    self.errors = [];
    jQuery(window).trigger('imageErrorsModelUpdated');
};




========================================================================================================================
CalcForm = function (options)  {
    this.form = options.form;
    this.sum = 0;
};

CalcForm.prototype.init = function () {
    var self = this;

    self.events();
};

//EVENTS
CalcForm.prototype.events = function () {
    this.bindClickAddBtn();
    this.bindClickSaveBtn();
    this.bindClickDeleteBtn();
    this.bindClickValue();
};

CalcForm.prototype.bindClickAddBtn = function () {
    var self = this;
    jQuery('.js-button_add').on('click', function () {
        self.checkValue();
        self.makeItemUnEditable();
        jQuery('.js-calcForm').append(self.getItemTemplate());
    })
};

CalcForm.prototype.bindClickSaveBtn = function () {
    var self = this;
    this.form.on('click', '.js-button_save', function () {
        var inputValue = jQuery(this).siblings('.calc__input').val();
        jQuery(this).siblings('.calc__value').append(inputValue);
        jQuery(this).siblings('.calc__input').removeClass('active').hide();
        jQuery(this).hide();
        if (inputValue) {
            var result = self.improveValue(inputValue);
            jQuery(this).parent().parent().addClass('done');

            self.sum = result;
            self.writeValue();
        } else {
            jQuery(this).parent().parent().addClass('done');
            jQuery(this).siblings('.calc__value').append(0);
        }
    });
};

CalcForm.prototype.bindClickDeleteBtn = function () {
    var self = this;
    this.form.on('click', '.js-calc__delete', function () {
        var parentItem = jQuery(this);

        var delVal = parentItem.siblings('.calc__value').text();
        parentItem.closest('.calc__container').remove();
        var result = self.lowerValue(delVal);

        self.sum = result;
        self.writeValue();
    });
};

CalcForm.prototype.bindClickValue = function () {
    var self = this;
    this.form.on('click', '.calc__value', function () {
        var beforeValue = jQuery(this).text();
        jQuery(this).parent().parent().removeClass('done');
        jQuery(this).empty();
        jQuery(this).siblings('.calc__input').addClass('active').show();
        jQuery(this).siblings('.js-button_save').show();
        var result = self.lowerValue(beforeValue);

        self.sum = result;
        self.writeValue();
    });
};

//METHODS

CalcForm.prototype.getItemTemplate = function () {
    return '<div class="calc__container">' +
        '<div class="calc__item">' +
        '<label>' +
        '<span class="calc__value"></span>' +
        '<input type="number" class="calc__input active">' +
        '<button class="button button_save js-button_save">Сохранить</button>' +
        '<a href="#" class="delete js-calc__delete">Удалить</a>' +
        '</label>' +
        '</div>' +
        '</div>';
};

CalcForm.prototype.checkValue = function () {
    var check = this.form.find('.active');
    var checkValue = check.val();
    if (checkValue) {
        check.siblings('.calc__value').append(checkValue);

        var result = self.improveValue(checkValue);
        jQuery('.js-calc__amount').empty().append(+result.toFixed(10));
    } else {
        check.siblings('.calc__value').append(0)
    }
};

CalcForm.prototype.makeItemUnEditable = function () {
    var check = this.form.find('.active');

    check.hide().siblings('.button').hide();
    check.parent().parent().addClass('done');
    check.removeClass('active');
};

// CalcForm.prototype.improveValue = function (value) {
//     var self = this;
//     return +self.sum + +value
// };
//
// CalcForm.prototype.lowerValue = function (value) {
//     var self = this;
//     return +self.sum - +value
// };

CalcForm.prototype.writeValue = function () {
    var self = this;
    jQuery('.js-calc__amount').empty().append(self.sum);
};