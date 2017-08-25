$(document).ready(function () {


    $('.js-button_save')

    $('.js-button_save').on('click', function () {
        var valIntup = $('.calc__input').val();
        $('.calc__value').append(valIntup);
        $('.calc__input').hide();
    })

    $('.calc__value').on('click', function () {
        $('.calc__value').empty();
        $('.calc__input').show();
    })


})