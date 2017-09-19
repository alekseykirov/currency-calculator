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
    jQuery(window).on('newFieldAdded', function() {
        self.bindClickSaveBtn();
        self.bindClickDeleteBtn();
        self.bindClickField();
    });
};

FormCalcCntl.prototype.bindClickAddBtn = function () {
    jQuery('.js-buttonAdd').on('click', function () {
        window.formCalcView.addNewTemplateActive();
    })
};

FormCalcCntl.prototype.bindClickSaveBtn = function () {
    jQuery('.js-calcForm').on('click', '.js-buttonSave', function () {
        window.formCalcModel.addValue( jQuery(this).closest('.calc__item').index(), jQuery(this).siblings('.js-fieldValue').val() );
    });
};

FormCalcCntl.prototype.bindClickDeleteBtn = function () {
    jQuery('.js-calcForm').on('click', '.js-buttonDelete', function () {
        window.formCalcModel.removeValue( jQuery(this).closest('.calc__item').index() );
    });
};

FormCalcCntl.prototype.bindClickField = function () {
    jQuery('.js-calcForm').on('click', '.js-fieldValue', function () {
        window.formCalcModel.editValue( jQuery(this).closest('.calc__item').index() );
    });
};