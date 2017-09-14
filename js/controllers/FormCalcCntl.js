var FormCalcCntl = function () {
    this.init();
};

FormCalcCntl.prototype.init = function () {
    var self = this;
    window.formCalcModel = new FormCalcModel();
    window.formCalcView = new FormCalcView({
        model: window.formCalcModel,
        form: jQuery('.js-calcForm')
    });
    self.events();
};


/* Events */

FormCalcCntl.prototype.events = function () {
    var self = this;
    self.bindClickAddBtn();
    self.bindClickSaveBtn();
    self.bindClickDeleteBtn();
    self.bindClickValue();
};

FormCalcCntl.prototype.bindClickAddBtn = function () {
    jQuery('.js-button_add').on('click', function () {
        window.formCalcView.addTemplate();
    })
};

FormCalcCntl.prototype.bindClickSaveBtn = function () {
    
};

FormCalcCntl.prototype.bindClickDeleteBtn = function () {

};


FormCalcCntl.prototype.bindClickValue = function () {
    this.form.on('click', '.calc__value', function () {
        console.log('press event')
    });
};



