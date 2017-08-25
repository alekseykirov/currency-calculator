jQuery(document).ready(function () {

    function getCalkItemTeplate() {
        return '<div class="calc__item">' +
            '<label>' +
            '<span class="calc__value"></span>' +
            '<input type="text" class="calc__input active">' +
            '<button class="button js-button_save">Сохранить</button>' +
            '</label>' +
            '<a href="#" class="js-calc__delete">Удалить</a>' +
            '</div>';
    }

    var buttonAdd = $('.js-button_add');
    buttonAdd.on('click', function() {

        var check = jQuery('.active');

        if(check.val()) {
            check.siblings('.calc__value').append(check.val());

            var twt =  jQuery('.calc__amount').text();
            var sum = +twt + +(check.val());
            
            jQuery('.calc__amount').empty().append(sum);
        } else {
            check.siblings('.calc__value').append(0)
        }

        check.hide();
        check.siblings('.button').hide();
        
        jQuery('.calc__input.active').removeClass('active');

        jQuery('.calc__list').append(getCalkItemTeplate())
        
    });

//save value

    jQuery('.calc__list').on('click','.js-button_save', function () {
        var valIntup = jQuery(this).siblings('.calc__input').val();

        jQuery(this).siblings('.calc__value').append(valIntup);
        jQuery(this).siblings('.calc__input').removeClass('active').hide();
        jQuery(this).hide();

        var twt =  jQuery('.calc__amount').text();
        var sum = +twt + +valIntup;
        
        jQuery('.calc__amount').empty().append(sum);
    });

//edit value

    jQuery('.calc__list').on('click','.calc__value', function () {
        var beforeVal = jQuery(this).text();
        jQuery(this).empty();
        jQuery(this).siblings('.calc__input').addClass('active').show();
        jQuery(this).siblings('.js-button_save').show();
        
        var titgi = jQuery('.calc__amount').text();
        var totp = +titgi - +beforeVal;

        jQuery('.calc__amount').empty().append(totp);

    });
    
//delete value

    jQuery('.calc__list').on('click', '.js-calc__delete', function() {
        var parentItem = jQuery(this).parent();
        parentItem.remove();

        var delVal = parentItem.find('.calc__value').text();
        var titSum = jQuery('.calc__amount').text();
        var toot = +titSum - +delVal;
        
        jQuery('.calc__amount').empty().append(toot);
    })
});