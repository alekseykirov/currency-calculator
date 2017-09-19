var FormCalcView = function (options) {
    this.model = options.model;
    this.init();
};

FormCalcView.prototype.init = function () {
    var self = this;
    self.render();
    self.event();
};

/* Events */

FormCalcView.prototype.event = function () {
    var self = this;
    jQuery(window).on('updateForm', function () {
        self.render();
    });
    jQuery(window).on('editField', function () {
        self.makeActiveItemEditable();
    });
};

/* Methods */

FormCalcView.prototype.getItemTemplate = function (value) {
    return '<li class="calc__item inactive">' +
        '<div class="calc__container">' +
        '<label>' +
        '<span class="calc__value">' +
        value +
        '</span>' +
        '<input type="number" class="calc__input js-fieldValue">' +
        '<button class="button button_save js-buttonSave">Сохранить</button>' +
        '<a href="#" class="delete js-buttonDelete">Удалить</a>' +
        '</label>' +
        '</div>' +
        '</li>';
};

FormCalcView.prototype.getItemTemplateActive = function () {
    return '<li class="calc__item active">' +
        '<div class="calc__container">' +
        '<label>' +
        '<span class="calc__value"></span>' +
        '<input type="number" class="calc__input js-fieldValue">' +
        '<button class="button button_save js-buttonSave">Сохранить</button>' +
        '<a href="#" class="delete js-buttonDelete">Удалить</a>' +
        '</label>' +
        '</div>' +
        '</li>';
};

FormCalcView.prototype.addNewTemplateActive = function () {
    var self = this;
    jQuery('.js-calcForm').append(self.getItemTemplateActive());
    jQuery(window).trigger('newFieldAdded');
};

FormCalcView.prototype.render = function () {
    var self = this;
    var arr = this.model.sum;
    var form = jQuery('.js-calcForm');

    form.empty();
    for (var i = 0; arr.length > i; i++) {
        form.append(self.getItemTemplate(arr[i]));
    }
    self.printValueTotal();
};

FormCalcView.prototype.printValueTotal = function () {
    jQuery('.js-calc__amount').empty().append(this.model.calcTotal())
};

FormCalcView.prototype.makeActiveItemEditable = function () {
    jQuery('.calc__item').addClass('active').removeClass('inactive');
};

// FormCalcView.prototype.printValueField = function () {
//     var arr = this.model.sum;
//     for (var i = 0; arr.length > i; i++) {
//         var parent = jQuery('.calc__value').closest('.calc__item').eq(i);
//         parent.find('.calc__value').empty().append(arr[i]);
//     }
// };


//
// FormCalcView.prototype.saveField = function (btn) {
//     var self = this;
//     var input = self.findActiveField();
//     var index = self.getIndex(input);
//     var value = input.val();
//     btn.closest('.calc__item').addClass('un-active');
//
//     self.checkValue(value, index);
//     if (input.val()) {
//         btn.parent().parent().addClass('done');
//         btn.siblings('.calc__value').append(input.val());
//     } else {
//         btn.parent().parent().addClass('done');
//         btn.siblings('.calc__value').append(0);
//     }
// };
//
// FormCalcView.prototype.editActiveField = function () {
//     var self = this;
//     var input = self.findActiveField();
//     var index = self.getIndex(input);
//     var value = input.val();
//
//     self.checkValue(value, index);
// };
//
// FormCalcView.prototype.checkValue = function (value, index) {
//     if (value) {
//         this.model.addValue(index, +value);
//     } else {
//         this.model.addValue(index, 0);
//     }
// };
//
// FormCalcView.prototype.findActiveField = function () {
//     return jQuery('.js-calcForm').find('input.active');
// };
//
// FormCalcView.prototype.editField = function (val) {
//     var self = this;
//     var index = self.getIndex(val);
//
//     var content = val.val();
//     val.parent().parent().removeClass('done');
//     val.empty();
//     // val.siblings('.calc__input').addClass('active').show();
//     val.siblings('.js-button_save').show();
//
//     this.model.editValue(index, +content);
// };
//
// FormCalcView.prototype.deleteField = function (btn) {
//     var self = this;
//     var index = self.getIndex(btn);
//     jQuery('.calc__container').eq(index).remove();
//     this.model.removeValue(index);
// };
//
// FormCalcView.prototype.updateTotal = function () {
//     jQuery('.js-calc__amount').empty().append(this.model.calcValue());
// };
//
// FormCalcView.prototype.getIndex = function (element) {
//     return element.closest('.calc__container').index();
// };
//

//
// FormCalcView.prototype.makeActiveItemUnEditable = function () {
//     var input = jQuery('.js-calcForm').find('input.active');
//
//     input.hide().siblings('.button').hide();
//     input.parent().parent().addClass('done');
//     // input.removeClass('active');
// };