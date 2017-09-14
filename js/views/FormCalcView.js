var FormCalcView = function (options) {
    this._model = options.model;
    this.form = options.form;
    this.init();
};

FormCalcView.prototype.init = function () {
    var self = this;
    self.render();
    self.event();
};


/* Events */

FormCalcView.prototype.event = function () {
    //TODO добавить event
};


/* Methods */

FormCalcView.prototype.render = function () {
    
};

FormCalcView.prototype.addTemplate = function () {
    var self = this;
    // this.form.append(self.getItemTemplate());
};

FormCalcView.prototype.getItemTemplate = function () {
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