Controllers = function() {
    this.init();
};

Controllers.prototype.init = function() {
    var self = this;
    self.initCalcForm();
    self.events();
};

Controllers.prototype.initCalcForm = function() {
    this.calcForm = new CalcForm({
        
    });
    this.calcForm.init();
};