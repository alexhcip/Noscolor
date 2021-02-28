$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 80) {
        $('.Title-Popup').slideDown();
        /*$('.Title-Popup').css('display','inline-block');*/
    } else {
        $('.Title-Popup').slideUp();
    }

});