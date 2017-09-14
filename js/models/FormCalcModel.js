var FormCalcModel = function () {
    this.init();
    this.sum = [4, 5, 34];
};

FormCalcModel.prototype.init = function () {
    var self = this;
};

FormCalcModel.prototype.addValue = function ( value ) {
    var self = this;
    self.sum.push(+value);
};

FormCalcModel.prototype.removeValue = function ( index ) {
    var self = this;
    self.sum.splice(index, 1);
};

FormCalcModel.prototype.calcValue = function () {
    var self = this;
    var arr = self.sum;
    var result = 0;

    for (var i = 0; i < arr.length; i++) {
       result += arr[i];
    }
    return result;
};
//
// FormCalcModel.prototype.printValue = function ( field ) {
//     var self = this;
//     field.empty().append(self.sum);
// };