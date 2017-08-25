jQuery(document).ready(function () {

    function getCalkItemTeplate() {
        return '<div class="calc__item">' +
            '<label>' +
                '<span class="calc__value"></span>' +
                '<input type="number" class="calc__input active">' +
                '<button class="button button_save js-button_save">Сохранить</button>' +
            '</label>' +
                '<a href="#" class="delete js-calc__delete">Удалить</a>' +
            '</div>';
    }

// add item

    var buttonAdd = $('.js-button_add');
    buttonAdd.on('click', function() {
        var check = jQuery('.active');

        if(check.val()) {
            check.siblings('.calc__value').append(check.val());
            var total = jQuery('.js-calc__amount');
            var totalValue =  total.text();
            var result = +totalValue + +(check.val());
            total.empty().append(result);
        } else {
            check.siblings('.calc__value').append(0)
        }

        check.hide();
        check.siblings('.button').hide();

        check.removeClass('active');
        jQuery('.calc__list').append(getCalkItemTeplate())
    });

//save value

    jQuery('.calc__list').on('click','.js-button_save', function () {
        var inputValue = jQuery(this).siblings('.calc__input').val();

        jQuery(this).siblings('.calc__value').append(inputValue);
        jQuery(this).siblings('.calc__input').removeClass('active').hide();
        jQuery(this).hide();

        var total = jQuery('.js-calc__amount');
        var totalValue =  total.text();
        var result = +totalValue + +inputValue;
        
        total.empty().append(result);
    });

//edit value

    jQuery('.calc__list').on('click','.calc__value', function () {
        var beforeValue = jQuery(this).text();
        jQuery(this).empty();
        jQuery(this).siblings('.calc__input').addClass('active').show();
        jQuery(this).siblings('.js-button_save').show();

        var total = jQuery('.js-calc__amount');
        var totalValue =  total.text();
        var result = +totalValue + +beforeValue;

        jQuery('.calc__amount').empty().append(result);

    });
    
//delete value

    jQuery('.calc__list').on('click', '.js-calc__delete', function() {
        var parentItem = jQuery(this).parent();
        parentItem.remove();

        var delVal = parentItem.find('.calc__value').text();
        var total = jQuery('.js-calc__amount');
        var totalValue =  total.text();
        var result = +totalValue + +delVal;
        
        jQuery('.calc__amount').empty().append(result);
    })
});