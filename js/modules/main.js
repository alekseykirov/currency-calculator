CalcForm = function (options) {
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
        var parentItem = jQuery(this).parent();
        parentItem.parent().remove();
        var delVal = parentItem.find('.calc__value').text();
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

CalcForm.prototype.improveValue = function (value) {
    var self = this;
    return +self.sum + +value
};

CalcForm.prototype.lowerValue = function (value) {
    var self = this;
    return +self.sum - +value
};

CalcForm.prototype.writeValue = function () {
    var self = this;
    jQuery('.js-calc__amount').empty().append(self.sum);
};