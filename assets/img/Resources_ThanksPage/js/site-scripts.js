var tamHeight = 0;
var tamWidth = 0;

$(document).ready(function () {
    Inicio();

    $(window).bind('resize', function () {
        Inicio();
    });
});

function Inicio() {

    tamWidth = $(window).width();
    tamHeight = $(window).height();

    $("body").css('min-height', tamHeight);

    if (tamWidth <= 760) {
        $("body").addClass("rps");
        $(".cleft").css('min-height', 304);

        $('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            adaptiveHeight: true,
            arrows: true,
            dots: false,
            focusOnSelect: true
        });
    } else {
        $("body").removeClass("rps");
        $(".cleft").css('min-height', tamHeight);

        $('.slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            adaptiveHeight: true,
            arrows: true,
            dots: false,
            focusOnSelect: true
        });
    }

    $('.sliderhd').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: true,
        arrows: false,
        dots: false,
        focusOnSelect: true
    });

    var row = $('.reveal');
    var $window = $(window);

    $window.on('scroll', function () {
        var pad = Math.max(0, $window.height() - 100);
        var scrollTop = $window.scrollTop();

        if (!row.hasClass('visible') &&
            $window.scrollTop() + pad > row.offset().top) {
            row.addClass('visible');
            return;
        }
    });

};
