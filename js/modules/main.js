CalcForm = function (options) {
    this.form = options.form;
};

CalcForm.prototype.init = function () {
    var self = this;

    self.events();
};

//EVENTS
CalcForm.prototype.events = function () {
    this.bindClickAddBtn();
    this.bindClickSaveBtn();
    this.bindClickDeleteBtn();


};

CalcForm.prototype.bindClickAddBtn = function () {
    this.form
};

CalcForm.prototype.bindClickSaveBtn = function () {

};

CalcForm.prototype.bindClickDeleteBtn = function () {

};






// var check = jQuery('.active');
// if (check.val()) {
//     check.siblings('.calc__value').append(check.val());
//     var checkValue = check.val();
//     var result = self.improveValue(checkValue);
//     jQuery('.js-calc__amount').empty().append(+result.toFixed(10));
// } else {
//     check.siblings('.calc__value').append(0)
// };


// check.hide();
// check.siblings('.button').hide();
// check.parent().parent().addClass('done');
// check.removeClass('active');
//

CalcForm.prototype.saveValue = function () {
    this.form.find('.calc__list').on('click', '.js-button_save', function () {
        var inputValue = jQuery(this).siblings('.calc__input').val();
        jQuery(this).siblings('.calc__value').append(inputValue);
        jQuery(this).siblings('.calc__input').removeClass('active').hide();
        jQuery(this).hide();
        if (inputValue) {

            var result = improveValue(inputValue);

            jQuery(this).parent().parent().addClass('done');
            jQuery('.js-calc__amount').empty().append(+result.toFixed(10));
        } else {
            jQuery(this).siblings('.calc__value').append(0);
        }
    });
};

CalcForm.prototype.editValue = function () {
    this.form.find('.calc__list').on('click', '.calc__value', function () {
        var beforeValue = jQuery(this).text();
        jQuery(this).parent().parent().removeClass('done');
        jQuery(this).empty();
        jQuery(this).siblings('.calc__input').addClass('active').show();
        jQuery(this).siblings('.js-button_save').show();

        var result = lowerValue(beforeValue);

        jQuery('.calc__amount').empty().append(+result.toFixed(10));
    });
};

CalcForm.prototype.deleteValue = function () {
    this.form.find('.calc__list').on('click', '.js-calc__delete', function () {
        var parentItem = jQuery(this).parent();
        parentItem.parent().remove();
        var delVal = parentItem.find('.calc__value').text();

        var result = lowerValue(delVal);

        jQuery('.calc__amount').empty().append(+result.toFixed(10));
    });
};

//METHODS
CalcForm.prototype.addHtmlItem = function () {
    function getItemTemplate() {
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
    }

    jQuery('.calc__list').append(getItemTemplate());
};

CalcForm.prototype.improveValue = function (value) {
    var totalValue = jQuery('.js-calc__amount').text();
    return +totalValue + +value;
};

CalcForm.prototype.lowerValue = function (value) {
    var totalValue = jQuery('.js-calc__amount').text();
    return +totalValue - +value;
};