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
    var index = self.getIndex(btn);

    var inputValue = btn.siblings('.calc__input').val();
    btn.siblings('.calc__input').removeClass('active').hide();
    btn.hide();

    if (inputValue) {
        btn.parent().parent().addClass('done');
        btn.siblings('.calc__value').append(inputValue);
        this.model.addValue(index, inputValue);
    } else {
        btn.parent().parent().addClass('done');
        btn.siblings('.calc__value').append(0);
        this.model.addValue(index, 0);
    }
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