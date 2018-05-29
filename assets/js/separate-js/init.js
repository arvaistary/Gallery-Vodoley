$(document).ready(function(){
    tooltip_description()
    tooltip_logo();
    backButtonShowHide();
    backToTop();
    mobileMenuSlide();
    scheme_filter();
    popupSlider();
    dinamicPlace();
    swithScheme();
    targettingPlace();
    getCookie();
    initMap();

    $('.main-levels').on('click', '.main-level.active path', function () {
        console.log($(this).attr('class'));
    });

    

    if ($(document).width()<600){
        let swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    } else {
        let swiper = new Swiper('.swiper-container', {
            slidesPerView: 5,
            spaceBetween: 70,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

    }

    $('.arenda-body').on('click', 'a.h2', function(){
        $('.arenda-body .item').slideToggle();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')){
            $(this).parents('.arenda-body').siblings('.button').css('display', 'flex');
        } else {
            $(this).parents('.arenda-body').siblings('.button').css('display', 'none');
        }

    });
    $('[data-swith]').click(function(){
        let d_swith = $(this).attr('data-swith');
        if ($('.' + d_swith).is(':visible')){
        } else {            
            $('[data-swith]').removeClass('active')
            $(this).addClass('active');
            $('[data-swith]').each(function(indx){
                let hide = $(this).not('.active').attr('data-swith');
                $('.' + hide).fadeOut('slow');
            });
            $('.' + d_swith).fadeIn('slow');
        }
    });

    $('.shems-mobile-swither').on('click', function(){
        $(this).toggleClass('active');
        $('.thumbl-level').toggleClass('active');

    });
    $('.thumbl-level').on('click', function(){
        if ($('.shems-mobile-swither').hasClass('active')){
            $('.shems-mobile-swither').removeClass('active');
            $('.thumbl-level').removeClass('active');
        }

    })


    




});

// google.maps.event.addDomListener(window, "load", initMap);


function backButtonShowHide() {
    "use strict";
    $(window).scroll(function () {
        if ($(document).scrollTop() > 800) {
            $("#back_to_top").removeClass('off')
            $("#back_to_top").addClass('on')
        } else {
            $("#back_to_top").removeClass('on')
            $("#back_to_top").addClass('off')
        }
    });
};

function backToTop() {
    "use strict";
    $(document).on("click", "#back_to_top", function (e) {
        e.preventDefault(), $("body,html").animate({
            scrollTop: 0
        }, 1000);
    });
};

function mobileMenuSlide(){
    $(".hamburger").click(function () {
        $(this).toggleClass("is-active");
        $("nav>ul").slideToggle();
    })
};


// фильтр для схемы, проверяем на соответствие класса у кнопки и области магазина, если совпало, то вешаем класс active на область магазина

function scheme_filter() {
    $('.filter-category a').on('click', function () {
        let $area = $(this).attr('class');
        if ($(this).hasClass('active')) {
            $arr = $area.split(' ');
            $area = $arr[0];
        }
        
        let $area_color = $area + '-color';
        let $main_color = $area + '-color-main';
        $area = '.' + $area + '-area';  
        let $cur_color = $($area).css('fill');

        if ($(this).hasClass('active')) {

            let $btn_color = $(this).css('background-color');
            let $color = $($area).css('fill');

            $(this).removeClass('active').css('background-color', '#fff');
            $('.' + $area_color).removeClass($area_color).removeClass('active');

            
            $('.filter-category a').each(function (indx) {
                let $a = $(this).attr('class');
                $b = $a.split(' ');
                $a = $b[0];
                $a = '.' + $a + '-area';
                let $c = $a + '-color';
                if ($(this).hasClass('active')) {
                    $($a).addClass('active');
                } 
            });
            
        } else {

            if ($($area).length > 0 && $($area).is(':visible')) {
                // $(this).addClass('active');
                $($area).addClass('active').addClass($area_color);
                // console.log($('.' + $area_color).attr('class'));
                // let $color = $('.' + $area_color).css('fill');
                let $obj = $(this);
                setTimeout(function () {
                    let $color = $('.' + $area_color).css('fill');
                    $obj.css('background-color', $color).addClass('active');
                }, 200)
                // $(this).css('background-color', $color);
                if ($($area).hasClass('super')) {
                } else {
                    $($area).addClass('super');
                }
            }
        }
        
    });

    $('.js-check-all').on('click', function () {
        $('.filter-category a').each(function(indx){
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                let $area = $(this).attr('class');
                $area = '.' + $area + '-area';
                $($area).removeClass('active');
            } else {
                let $area = $(this).attr('class');
                $area = '.' + $area + '-area';
                if ($($area).length > 0 && $($area).is(':visible')) {
                    $(this).addClass('active');
                    $($area).addClass('active');
                    $('.filter-category a').each(function (indx) {
                        let $a = $(this).attr('class');
                        $b = $a.split(' ');
                        $a = $b[0];
                        let $c = $a + '-color';
                        $a = '.' + $a + '-area'; 

                        if ($(this).hasClass('active')) {
                            $($a).addClass($c);
                            let $obj = $(this);
                            setTimeout(function () {
                                let $color = $('.' + $c).css('fill');
                                $obj.css('background-color', $color);
                            }, 200);
                            
                        }
                    });
                }
            }
        });        
    });

    $('.js-reset-all').on('click', function () {
        $('.main-level path').removeClass('active');
        $('.filter-category a').each(function (indx) {
            if ($(this).hasClass('active')){
                $(this).removeClass('active').css('background-color', '#fff');
            }
        });
    });

    $('.nav-bar').on('click', 'a', function(e){
        e.preventDefault();
        let $parent = $(this).parents('li');
        if ($parent.hasClass('active')) {
            $parent.removeClass('active');
            let $ballun = $parent.attr('class');
            $ballun = '.' + $ballun + '-ballun';
            $($ballun).removeClass('active');
        } else {
            let $ballun = $parent.attr('class');
            $ballun = '.' + $ballun + '-ballun';
            if ($($ballun).length > 0 && $($ballun).is(':visible')) {
                $parent.addClass('active');
                $($ballun).addClass('active');
            };
        };
    });


};

function popupSlider(){
    $('body').on('click', '[data-fancybox]', function () {
        if ($('.popup_img').length && !$('.popup_img').hasClass('slick-slider')) {
            $('.popup_img').slick({
                arrows: false,
                dots: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        };
    });
};

// подстановка значения в форму заказа аренды площадки значений из элемента списка площадок

function dinamicPlace(){
    $(".arenda-body").on('click', '.item', function () {
        let $floor = $(this).find(".description_level_floor span").text();
        $floor = 'Этаж: ' + $floor;
        let $size = $(this).find(".description_level_size span").text();
        $size = 'Площадь: ' + $size;
        console.log($size.length + ' && ' + $floor.length);
        if ($size.length && $floor.length) {
            $('#arenda-place [name="floor_place"]').val($floor);
            $('#arenda-place [name="size_place"]').val($size);
        }
    });
};

// переключение картинки схемы при клике на миниатюру

function swithScheme() {
    $('.thumbl-level .floor path').on('click', function (event) {
        $('.floor').removeClass('active');
        $(this).parents('.floor').addClass('active');
        let $target = $(event.target);
        if ($target.hasClass('floor-3_path')) {
            $('.main-level').removeClass('active');
            $('.main-level-3').addClass('active');
        }
        if ($target.hasClass('floor-2_path')) {
            $('.main-level').removeClass('active');
            $('.main-level-2').addClass('active');
        }
        if ($target.hasClass('floor-1_path')) {
            $('.main-level').removeClass('active');
            $('.main-level-1').addClass('active');
        }
        if ($target.hasClass('floor-0_path')) {
            $('.main-level').removeClass('active');
            $('.main-level-0').addClass('active');
        }
    });
};

function getCookie() {
    let dataTarget = Cookies.get('data-area-target');
    if (dataTarget) {
        $('[data-area-target]').each(function (indx) {
            console.log('кука: ' + dataTarget);
            console.log('цель: ' + $(this).attr('data-area-target'));
            if ($(this).attr('data-area-target') == dataTarget) {
                $('[data-area-target]').removeClass('active');
                $(this).addClass('active');
                $('.main-level').removeClass('active');
                $('.floor').removeClass('active');
                let $parent = $(this).parents('.main-level');
                $parent.addClass('active');
                if ($parent.hasClass('main-level-1')) {
                    $('.floor.level-1').addClass('active');
                }
                if ($parent.hasClass('main-level-2')) {
                    $('.floor.level-2').addClass('active');
                }
                if ($parent.hasClass('main-level-3')) {
                    $('.floor.level-3').addClass('active');
                }
                if ($parent.hasClass('main-level-0')) {
                    $('.floor.level-0').addClass('active');
                }
                if ($('[data-fancybox-close]').is(':visible')){
                    $('[data-fancybox-close]').click();
                }
                // console.log('слой: ' + $parent.attr('class'));
            }
        });
    }
};

function targettingPlace() {
    $('body').on('click', '[data-area]', function () {
        let $target = $(this).attr('data-area');
        let date = new Date(),
            seconds = 10;
        date.setTime(date.getTime() + (seconds * 1000));

        Cookies.set('data-area-target', $target, {
            expires: date,
            path: '/',
        });
        // console.log('click  ' + $(this).attr('data-area'));
        getCookie();
        $("body,html").animate({
            scrollTop: 0
        }, 1000);
    });
}

function initMap() {
    let centerLatLng = new google.maps.LatLng(55.6127417853623, 37.72061617063902);
    let mapOptions = {
        center: centerLatLng,
        zoom: 17
    };

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
// Ждем полной загрузки страницы, после этого запускаем initMap()

// всплывающие подсказки

function tooltip_logo() {

    let tooltip = d3.select("div.tooltip");

    d3.selectAll("div.main-level")
        .selectAll("svg")
        .selectAll("path")
        .on("mouseover", function () {
            let logo = d3.select(this);
            let $logo = logo.attr('data-logo-src');
            if ($logo == null) {
                return tooltip.style("visibility", "hidden");
            } else {
                tooltip.html(function () {
                    // console.log($logo);
                    return '<div class="logo-area"><img src="' + $logo + '"/></div>'
                });
                return tooltip.style("visibility", "visible");
            }
        })
        .on("mousemove", function () {
            let logo = d3.select(this);
            let $logo = logo.attr('data-logo-src');
            if ($logo == null) {
                return tooltip.style("visibility", "hidden");
            } else {
                return tooltip
                    .style("top", (d3.event.pageY + 16) + "px")
                    .style("left", (d3.event.pageX + 16) + "px");
            }
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });
};

function tooltip_description() {

    let tooltip = d3.select("div.tooltip");

    d3.selectAll("div.nav-bar")
        .selectAll("li")
        .selectAll("a")
        .on("mouseover", function () {
            let desc = d3.select(this);
            let $desc = desc.attr('data-description');
            if ($desc == null) {
                return tooltip.style("visibility", "hidden");
            } else {
                tooltip.html(function () {
                    // console.log($desc);
                    return '<div class="description-ballon"><p>' + $desc + '<p/></div>'
                });
                return tooltip.style("visibility", "visible");
            }
        })
        .on("mousemove", function () {
            let desc = d3.select(this);
            let $desc = desc.attr('data-description');
            if ($desc == null) {
                return tooltip.style("visibility", "hidden");
            } else {
                return tooltip
                    .style("top", (d3.event.pageY + 16) + "px")
                    .style("left", (d3.event.pageX + 16) + "px");
            }
        })
        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        });

};

