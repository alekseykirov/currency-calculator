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
        '<span class="calc__value js-titleValue">' +
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
        '<span class="calc__value js-titleValue"></span>' +
        '<input type="number" class="calc__input js-fieldValue">' +
        '<button class="button button_save js-buttonSave">Сохранить</button>' +
        '<a href="#" class="delete js-buttonDelete">Удалить</a>' +
        '</label>' +
        '</div>' +
        '</li>';
};

FormCalcView.prototype.addNewTemplateActive = function () {
    var self = this;
    var form = jQuery('.js-calcForm');

    if (form.children().hasClass('active')) {
        alert('Введите число в активное поле!')
    } else {
        form.append(self.getItemTemplateActive());
    }
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

FormCalcView.prototype.makeActiveItemEditable = function (index) {
    jQuery('.calc__item').eq(index).addClass('active').removeClass('inactive').find('.calc__value').empty();
};