$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      navText : ["<img src='img/arrow.png'>","<img src='img/arrow-right.png'>"],
      items: 3,
      dots: false,
      responsive:{
        320:{
            items:1,
            nav: false,
            dots: true,
        },
        480:{
            items:1,
            nav: false,
            dots: true,
        },
        600:{
            items:2,
            nav: false,
            dots: true,
        },
        1024:{
            items:2,
            nav: false,
            dots: true,
        },
        1330:{
            items:3,
            nav: false,
            dots: true,
        },
        1660:{
            items:3,
            dots: false,
            nav: true,
        },
        1920:{
            items:3,
            dots: false,
            nav: true,
        },
      }
  });
});