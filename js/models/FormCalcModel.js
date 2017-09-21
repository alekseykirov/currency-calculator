var FormCalcModel = function () {
    this.sum = [];
    // this.errors = [];
};

FormCalcModel.prototype.addValue = function (index, value) {
    var self = this;
    self.sum.splice(index, 1, self.verificationValue(value));
    jQuery(window).trigger('updateForm');
};

FormCalcModel.prototype.removeValue = function (index) {
    var self = this;
    self.sum.splice(index, 1);
    jQuery(window).trigger('updateForm');
};

FormCalcModel.prototype.editValue = function (index) {
    var self = this;
    self.sum.splice(index, 1, 0);
    jQuery(window).trigger('editField');
};

FormCalcModel.prototype.verificationValue = function (value) {
    if (value) {
        return +value
    } else {
        return 0
    }
};

FormCalcModel.prototype.calcTotal = function () {
    var self = this;
    var arr = self.sum;
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
};