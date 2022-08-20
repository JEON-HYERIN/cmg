$(function(){
  // a태그 기본동작 방지
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });

  // header logo
  $('section.white').each(function(index, el){
    ScrollTrigger.create({
      trigger: el,
      start: 'top top', 
      end: 'bottom top',
      // markers: true,
      scrub: 1,
      toggleClass: {
        targets: '#header .logo',
        className: 'switch'
      }
    })
  });

  // nav btn
  $('.btn-nav').click(function(e){
    e.preventDefault();
    $('#gnb').toggleClass('open');
    $(this).toggleClass('close');
  });

  // visual
  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function(){
      gsap.fromTo('.sc-visual .bg-area', {
        backgroundPosition: '50% 0'
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          start: '0% 0%', 
          end: '+=100%',
          scrub: true,
          // markers: true,
        },
        backgroundPosition: '50% 396.5px',
      });
    },
    "(min-width: 768px)": function(){
      // tablet-small
      gsap.fromTo('.sc-visual .bg-area', {
        backgroundPosition: '50% 0'
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          start: '0% 0%', 
          end: '+=100%',
          scrub: true,
          // markers: true,
        },
        backgroundPosition: '50% 468.5px',
      });
    }
  });

  ScrollTrigger.saveStyles('.sc-visual .title-area');
  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function(){
      // tablet-large
      gsap.fromTo('.sc-visual .title-area', {
        y: '50%'
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          start: '0% 0%', 
          end: '+=150%',
          scrub: true,
          // markers: true,
        },
        y: '150%'
      });
    }
  });

  // intro
  toggleClass();

  $(window).resize(function(){
    toggleClass();
  });

  function toggleClass() {
    let windowWidth = $(window).width();
    if (windowWidth >= 1024) {
      $('.sc-intro .floating-txt').addClass('opacity');
    } else {
      $('.sc-intro .floating-txt').removeClass('opacity');
    }
  }

  ScrollTrigger.saveStyles('.sc-intro .floating-txt');
  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function(){
      // tablet-large
      gsap.fromTo('.sc-intro .floating-txt.opacity', {
        yPercent: -50,
      }, {
          scrollTrigger: {
          trigger: '.sc-intro',
          start: '0% 60%', 
          end: '100% -20%',
          scrub: true,
          // markers: true,
          toggleClass: {
            targets: '.sc-intro .floating-txt.opacity',
            className: 'fadein'
          }
        },
        yPercent: 100,
        duration: 3,
      });
    }
  });

  // client
  const clientSwiper = new Swiper('.sc-client .client-list-wrap.swiper', {
    // autoplay: true,
    // loop: true,
    pagination: {
      el: '.sc-client .client-list-wrap .swiper-pagination',
      clickable: true
    },
  });

  // study
  gsap.to('.sc-study .content.pc .bg-area',{
    scrollTrigger: {
      trigger: '.sc-study .content.pc .bg-area',
      start: '0% 0%',
      end: '100% 50%',
      scrub: 7,
      pin: true,
      // markers: true,
    },
    duration: 4
  });

  const op = gsap.timeline({
    scrollTrigger:{
      trigger:'.sc-study .content.pc .bg-area',
      start:"top top",
      end: '+=50%',
      // markers:true,
      scrub:1,
    },
  })

  op.addLabel('m1')
  .fromTo('.sc-study .bg2',{opacity:0},{opacity:1},'m1+=1')
  .fromTo('.sc-study .bg3',{opacity:0},{opacity:1},'m1+=2')

  const studySwiper = new Swiper('.sc-study .study-list-wrap.swiper', {
    direction: 'vertical',
    effect: 'fade',
    pagination: {
      el: '.sc-study .study-list-wrap .swiper-pagination',
      clickable: true
    },
  });

  // insight
  gsap.fromTo('.sc-insight .insight-list', {
    opacity: 0,
    y: 100,
  }, {
    scrollTrigger: {
      trigger: '.sc-insight',
      start: 'top top', 
      end: 'bottom top',
      // markers: true,
    },
    opacity: 1,
    y: 0
  });

  const insightSwiper = new Swiper('.sc-insight .insight-list-wrap.swiper', {
    slidesPerView: 1.4,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
      el: '.sc-insight .insight-list-wrap .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 'auto',
        centeredSlides: false,
      }
    }
  });
  
  // footer copyright 
  const year = new Date().getFullYear();
  $('.copyright .year').text(year);

  // obj-circle
  ScrollTrigger.saveStyles('#obj-circle');
  ScrollTrigger.matchMedia({
    "(min-width: 1280px)": function(){
      // desktop-xsmall
      gsap.fromTo('#obj-circle', {
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          endTrigger: '.sc-whatwedo',
          start: 'top top', 
          end: 'bottom top',
          scrub: true,
        },
        scale: 4,
      })
    }
  })
});

ScrollTrigger.saveStyles('#obj-circle .circle2');
ScrollTrigger.matchMedia({
  "(min-width: 1280px)": function(){
    // desktop-xsmall
    gsap.fromTo('#obj-circle .circle2', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    }, {
      scrollTrigger: {
        trigger: '.sc-visual',
        endTrigger: '.sc-whatwedo',
        start: 'top top', 
        end: 'bottom top',
        scrub: true,
      },
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    })
  }
});

$(window).scroll(function(){
  const currentScroll = $(this).scrollTop();

  const scIntro = $('.sc-intro').offset().top;

  if(currentScroll >= scIntro + $(window).height()) {
    $('#obj-circle').addClass('fadeout');
  } else {
    $('#obj-circle').removeClass('fadeout');
  }
})