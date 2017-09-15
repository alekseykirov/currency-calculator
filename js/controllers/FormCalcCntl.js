var FormCalcCntl = function () {
    this.init();
};

FormCalcCntl.prototype.init = function () {
    var self = this;
    window.formCalcModel = new FormCalcModel();
    window.formCalcView = new FormCalcView({
        model: window.formCalcModel
    });
    self.events();
};

/* Events */

FormCalcCntl.prototype.events = function () {
    var self = this;
    self.bindClickAddBtn();
    self.bindClickSaveBtn();
    self.bindClickDeleteBtn();
    self.bindClickField();
};

FormCalcCntl.prototype.bindClickAddBtn = function () {
    jQuery('.js-button_add').on('click', function () {
        window.formCalcView.addTemplate();
    })
};

FormCalcCntl.prototype.bindClickSaveBtn = function () {
    jQuery('.js-calcForm').on('click', '.js-button_save', function () {
        window.formCalcView.saveField( jQuery(this) );
    });
};

FormCalcCntl.prototype.bindClickDeleteBtn = function () {
    jQuery('.js-calcForm').on('click', '.js-calc__delete', function () {
        window.formCalcView.deleteField( jQuery(this) );
    });
};

FormCalcCntl.prototype.bindClickField = function () {
    jQuery('.js-calcForm').on('click', '.calc__value', function () {
        window.formCalcView.editField( jQuery(this) );
    });
};