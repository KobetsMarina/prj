const BtnOpen = document.querySelector('.burger-open');
const BtnClose = document.querySelector('.burger-close');
const burger = document.querySelector('.burger');
const mainPage = document.querySelector('#main-page');
const burgerBack = document.querySelector('.burger-back');

BtnOpen.addEventListener('click', function() {
    burger.classList.add('open');
    mainPage.style.overflow = 'hidden';
    burgerBack.classList.add('show');
})
BtnClose.addEventListener('click', function() {
    burger.classList.remove('open');
    burgerBack.classList.remove('show');
})



$('.properties__slider').slick({
    arrows: false,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});