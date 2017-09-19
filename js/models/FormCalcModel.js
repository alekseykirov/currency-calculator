var FormCalcModel = function () {
    this.sum = [];
};

FormCalcModel.prototype.addValue = function (index, value) {
    var self = this;
    self.sum.splice(index, 1, +value);
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
    // jQuery(window).trigger('editField');
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