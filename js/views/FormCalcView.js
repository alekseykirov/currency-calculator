var FormCalcView = function (options) {
    this.model = options.model;
    this.init();
};

FormCalcView.prototype.init = function () {
    var self = this;
    self.event();
};

/* Events */

FormCalcView.prototype.event = function () {
    var self = this;
    jQuery(window).on('changeField', function () {
        self.updateTotal();
    });
};

/* Methods */

FormCalcView.prototype.addTemplate = function () {
    var self = this;
    jQuery('.js-calcForm').append(self.getItemTemplate());
};

FormCalcView.prototype.saveField = function (btn) {
    var self = this;
    var input = self.findActiveField();
    var index = self.getIndex(input);
    var value = input.val();
    btn.siblings('.calc__input').removeClass('active').hide();
    btn.hide();

    self.checkValue(value, index);
    if (input.val()) {
        btn.parent().parent().addClass('done');
        btn.siblings('.calc__value').append(input.val());
    } else {
        btn.parent().parent().addClass('done');
        btn.siblings('.calc__value').append(0);
    }
};

FormCalcView.prototype.editActiveField = function () {
    var self = this;
    var input = self.findActiveField();
    var index = self.getIndex(input);
    var value = input.val();

    self.checkValue(value, index);
};

FormCalcView.prototype.checkValue = function (value, index) {
    if (value) {
        this.model.addValue(index, +value);
    } else {
        this.model.addValue(index, 0);
    }
};

FormCalcView.prototype.findActiveField = function () {
    return jQuery('.js-calcForm').find('input.active');
};

FormCalcView.prototype.editField = function (val) {
    var self = this;
    var index = self.getIndex(val);

    var content = val.val();
    val.parent().parent().removeClass('done');
    val.empty();
    val.siblings('.calc__input').addClass('active').show();
    val.siblings('.js-button_save').show();

    this.model.editValue(index, +content);
};

FormCalcView.prototype.deleteField = function (btn) {
    var self = this;
    var index = self.getIndex(btn);
    jQuery('.calc__container').eq(index).remove();
    this.model.removeValue(index);
};

FormCalcView.prototype.updateTotal = function () {
    jQuery('.js-calc__amount').empty().append(this.model.calcValue());
};

FormCalcView.prototype.getIndex = function (element) {
    return element.closest('.calc__container').index();
};

FormCalcView.prototype.getItemTemplate = function () {
    return '<li class="calc__container">' +
        '<div class="calc__item">' +
        '<label>' +
        '<span class="calc__value"></span>' +
        '<input type="number" class="calc__input active">' +
        '<button class="button button_save js-button_save">Сохранить</button>' +
        '<a href="#" class="delete js-calc__delete">Удалить</a>' +
        '</label>' +
        '</div>' +
        '</li>';
};

FormCalcView.prototype.makeActiveItemUnEditable = function () {
    var input = jQuery('.js-calcForm').find('input.active');

    input.hide().siblings('.button').hide();
    input.parent().parent().addClass('done');
    input.removeClass('active');
};