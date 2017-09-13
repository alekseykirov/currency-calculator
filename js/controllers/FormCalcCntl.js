MainController = function() {
    this.init();
};

MainController.prototype.init = function() {
    var self = this;
    self.initCalcForm();
    self.events();
};

//EVENTS

MainController.prototype.events = function() {
    
};

//METHODS

MainController.prototype.initCalcForm = function() {
    this.calcForm = new CalcForm({
        form: jQuery('.js-calcForm')
    });
    this.calcForm.init();
};