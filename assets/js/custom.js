$(function(){
  // a태그 기본동작 방지
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });

  // header logo and obj-circle
  toggleClass();

  $(window).on('scroll resize', function() {
    toggleClass();
  });

  function toggleClass() {
    let lastScroll = 0;
    const currentScroll = $(this).scrollTop();
    const windowWidth = $(window).width();
    const scIntro = $('.sc-intro').offset().top;
  
    if ((currentScroll > lastScroll) && (windowWidth < 1440)) {
      $('#header .logo').addClass('fadeout');
    } else {
      $('#header .logo').removeClass('fadeout');
    }

    if((windowWidth >= 1280) && (currentScroll >= scIntro + $(window).height())) {
      $('#obj-circle').addClass('fadeout');
    } else {
      $('#obj-circle').removeClass('fadeout');
    }
    lastScroll = currentScroll;
  }

  ScrollTrigger.matchMedia({
    "(min-width: 1440px)": function(){
      // desktop-small
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
    }
  });

  // btn nav
  const body = document.querySelector('body');
  let scrollPosition = 0;
  $('.btn-nav').click(function(e){
    e.preventDefault();
    $('#gnb').toggleClass('open');
    $(this).toggleClass('close');

    if($('#gnb').hasClass('open')) {
      enable();
      $('#gnb .gnb-item').each(function(index, element) {
        const anim = gsap.fromTo(element, {
          opacity:0,
          x: '1rem',
        }, {
          x: 0,
          opacity:1,
          delay: (index + 1) * .2,
          duration: 0.25
        });
        ScrollTrigger.create({
          trigger: '#gnb.open',
          start:'top center',
          animation: anim,
          toggleActions: 'play none none none',
          // play pause resume reset
          once: true,
        });
      });
      const tlNav = gsap.timeline({
        defaults: {
          delay: 1.4
        },
        scrollTrigger:{
          trigger: '#gnb.open',
          start:'top center',
          // markers:true,
        },
      })
      tlNav.addLabel('t1')
      .fromTo('#gnb .signup-area',{opacity:0, x:'1rem'},{opacity:1, x:0, duration: 0.25},'t1')
      .fromTo('#gnb .connect-area',{opacity:0, x:'1rem'},{opacity:1, x:0, duration: 0.25},'t1+=.2')
    } else {
      disable();
    }
  });

  // nav open
  function enable() {
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
  }
  // nav close
  function disable() {
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
  }

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
  
  $('.sc-visual .title .row span').each(function(index, element) {
    const anim = gsap.fromTo(element, {
      opacity:0,
      y: 70,
    }, {
      y: 0,
      opacity:1,
      delay: (index + 1) * .2,
    });
    ScrollTrigger.create({
      trigger: element,
      animation: anim,
      toggleActions: 'play none none none',
      // play pause resume reset
      once: true,
    });
  });

  // intro
  ScrollTrigger.saveStyles('.sc-intro .floating-txt');
  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function(){
      // tablet-large
      gsap.fromTo('.sc-intro .floating-txt', {
        opacity: 0
      }, {
          scrollTrigger: {
          trigger: '.sc-intro',
          start: 'top 50%',
          end: 'top 25%',
          scrub: true,
          // markers: true,
        },
        opacity: 1
      });
      gsap.fromTo('.sc-intro .floating-txt', {
        yPercent: -50,
      }, {
          scrollTrigger: {
          trigger: '.sc-intro',
          start: 'top center', 
          scrub: true,
          // markers: true,
        },
        yPercent: 100,
        ease: 'none'
      });
    }
  });

  const tlIntro = gsap.timeline({
    scrollTrigger:{
      trigger:".sc-intro .group-title",
      start:'top center',
      // markers:true,
    },
  })
  tlIntro.addLabel('t1')
  .fromTo('.sc-intro .title-area .sc-title',{opacity:0, x:70},{opacity:1, x:0},'t1')
  .fromTo('.sc-intro .title-area .desc',{opacity:0, x:70},{opacity:1, x:0},'t1+=.2')

  // whatwedo
  var startCount = {var: 0};
  
  gsap.to(startCount, {
    var: 200, 
    ease:'none',
    // duration: 1,
    onUpdate: function(){
      changeNumber(number1);
    },
    scrollTrigger: {
      trigger: "#number1",
      start:'top 100%',
    },
  })
  gsap.to(startCount, {
    var: 250, 
    ease:'none',
    onUpdate: function(){
      changeNumber(number2);
    },
    scrollTrigger: {
      trigger: "#number2",
      start:'top 100%',
    },
  })
  gsap.to(startCount, {
    var: 50, 
    ease:'none',
    onUpdate: function(){
      changeNumber(number3);
    },
    scrollTrigger: {
      trigger: "#number3",
      start:'top 100%',
    },
  })
  gsap.to(startCount, {
    var: 78, 
    ease:'none',
    onUpdate: function(){
      changeNumber(number4);
    },
    scrollTrigger: {
      trigger: "#number4",
      start:'top 100%',
    },
  })
  function changeNumber(selector) {
    selector.innerHTML = (startCount.var).toFixed();
  }

  $('.sc-whatwedo .value-area .title').each(function(index, element) {
    const anim = gsap.fromTo(element, {
      opacity:0,
      x: 70,
    }, {
      x: 0,
      opacity:1,
      // delay: (index + 1) * .2,
    });
    ScrollTrigger.create({
      trigger: element,
      start:'top 100%',
      animation: anim,
      toggleActions: 'play none none none',
      // play pause resume reset
      once: true,
      // markers: true
    });
  });

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function(){
      const tlWhatwedo = gsap.timeline({
        scrollTrigger:{
          trigger:'.sc-whatwedo .group-title',
          start:'top center',
          // markers:true,
          toggleActions: 'play none none none',
          // play pause resume reset
          once: true,
        }
      })
      tlWhatwedo.addLabel('t1')
      .fromTo('.sc-whatwedo .sc-title',{opacity:0, y:70},{opacity:1, y:0},'t1')
      .fromTo('.sc-whatwedo .sc-sub-title .txt1',{opacity:0, y:70},{opacity:1, y:0},'t1+=.2')
      .fromTo('.sc-whatwedo .sc-sub-title .txt2',{opacity:0, y:70},{opacity:1, y:0},'t1+=.4')
      .fromTo('.sc-whatwedo .sc-sub-title .txt3',{opacity:0, y:70},{opacity:1, y:0},'t1+=.6')
      .fromTo('.sc-whatwedo .title-area .desc',{opacity:0, y:70},{opacity:1, y:0},'t1+=.8')
    
      $('.sc-whatwedo .whatwedo-item').each(function(index, element) {
        const anim = gsap.fromTo(element, {
          opacity:0,
          y: 70,
        }, {
          y: 0,
          opacity:1,
          delay: (index + 1) * .2,
        });
        ScrollTrigger.create({
          trigger: '.sc-whatwedo .group-title',
          start:'top center',
          animation: anim,
          toggleActions: 'play none none none',
          // play pause resume reset
          once: true,
        });
      });
    },
    "(max-width: 1023px)": function(){
      const tlWhatwedo = gsap.timeline({
        scrollTrigger:{
          trigger:'.sc-whatwedo .group-title',
          start:'top center',
          // markers:true,
          toggleActions: 'play none none none',
          // play pause resume reset
          once: true,
        }
      })
      tlWhatwedo.addLabel('t1')
      .fromTo('.sc-whatwedo .sc-title',{opacity:0, y:70},{opacity:1, y:0},'t1')
      .fromTo('.sc-whatwedo .sc-sub-title .txt1',{opacity:0, y:70},{opacity:1, y:0},'t1+=.2')
      .fromTo('.sc-whatwedo .sc-sub-title .txt2',{opacity:0, y:70},{opacity:1, y:0},'t1+=.4')
      .fromTo('.sc-whatwedo .sc-sub-title .txt3',{opacity:0, y:70},{opacity:1, y:0},'t1+=.6')
      .fromTo('.sc-whatwedo .title-area .desc',{opacity:0, y:70},{opacity:1, y:0},'t1+=.8')
    
      $('.sc-whatwedo .whatwedo-item').each(function(index, element) {
        const anim = gsap.fromTo(element, {
          opacity:0,
          y: 70,
        }, {
          y: 0,
          opacity:1,
          delay: (index + 1) * .2,
        });
        ScrollTrigger.create({
          trigger: '.whatwedo-list',
          start:'top 65%',
          animation: anim,
          toggleActions: 'play none none none',
          // play pause resume reset
          once: true,
        });
      });
    }
  });

  // client
  const tlClient = gsap.timeline({
    scrollTrigger:{
      trigger:'.sc-client',
      start:'top center',
      // markers:true,
      toggleActions: 'play none none none',
      // play pause resume reset
      once: true,
    }
  })
  tlClient.addLabel('t1')
  .fromTo('.sc-client .sc-title',{opacity:0, y:70},{opacity:1, y:0},'t1')
  .fromTo('.sc-client .sc-sub-title',{opacity:0, y:70},{opacity:1, y:0},'t1+=.2')

  $('.sc-client .client-item').each(function(index, element) {
    const anim = gsap.fromTo(element, {
      opacity:0,
      y: 70,
    }, {
      y: 0,
      opacity:1,
      // delay: (index + 1) * .2,
    });
    ScrollTrigger.create({
      trigger: element,
      start:'top center',
      animation: anim,
      toggleActions: 'play none none none',
      // play pause resume reset
      once: true,
    });
  });

  const clientSwiper = new Swiper('.sc-client .client-list-wrap.swiper', {
    // autoplay: true,
    // loop: true,
    pagination: {
      el: '.sc-client .client-list-wrap .swiper-pagination',
      clickable: true
    },
  });

  // study
  ScrollTrigger.saveStyles('.sc-study .content.pc .bg-area');
  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function(){
      // tablet-large
      gsap.to('.sc-study .content.pc .bg-area',{
        scrollTrigger: {
          trigger: '.sc-study .content.pc .bg-area',
          endTrigger: '.sc-study',
          start: '0% 0%',
          end: '100% 100%',
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
      // op.addLabel('m1')
      // .fromTo('.sc-study .bg2',{opacity:0},{opacity:1},'m1+=1')
      // .fromTo('.sc-study .bg3',{opacity:0},{opacity:1},'m1+=2')
    }
  });

  const studySwiper = new Swiper('.sc-study .study-list-wrap.swiper', {
    direction: 'vertical',
    effect: 'fade',
    pagination: {
      el: '.sc-study .study-list-wrap .swiper-pagination',
      clickable: true
    },
  });

  ScrollTrigger.saveStyles('.sc-study .sc-title');
  ScrollTrigger.saveStyles('.sc-study .badge');
  ScrollTrigger.matchMedia({
    "(max-width: 1023px)": function(){    
      $('.sc-study .badge').each(function(index, element) {
        const anim = gsap.fromTo(element, {
          opacity:0,
          x: '1rem',
        }, {
          opacity:1,
          x: 0,
          // delay: (index + 1) * .2,
        });
        ScrollTrigger.create({
          trigger: element,
          start:'top 75%',
          animation: anim,
          toggleActions: 'play none none none',
          // play pause resume reset
          once: true,
          // markers: true,
        });
      });
      const animStudy = gsap.fromTo('.sc-study .sc-title', {
        opacity:0,
        x: '1rem',
      }, {
        opacity:1,
        x: 0,
      });
      ScrollTrigger.create({
        trigger: '.sc-study',
        start:'top 50%',
        animation: animStudy,
        toggleActions: 'play none none none',
        // play pause resume reset
        once: true,
        // markers: true
      });
    }
  });

  $('.sc-study .pc .study-area').mouseenter(function(){
    const windowWidth = $(window).width();
    const index = $(this).parent().index();

    if(windowWidth >= 1024) {
      $(`.sc-study .bg:eq(${index})`).addClass('visible').siblings().removeClass('visible');
    } else {
      return;
    }
  });

  // insight
  const tlInsight = gsap.timeline({
    scrollTrigger:{
      trigger:'.sc-insight',
      start:'top center',
      // markers:true,
      toggleActions: 'play none none none',
      // play pause resume reset
      once: true,
    }
  })
  tlInsight.addLabel('t1')
  .fromTo('.sc-insight .sc-sub-title .txt1',{opacity:0, y:70},{opacity:1, y:0},'t1')
  .fromTo('.sc-insight .sc-sub-title .txt2',{opacity:0, y:70},{opacity:1, y:0},'t1+=.2')
  .fromTo('.sc-insight .insight-list-wrap',{opacity:0, y:70},{opacity:1, y:0},'t1+=.4')

  const insightSwiper = new Swiper('.sc-insight .insight-list-wrap.swiper', {
    slidesPerView: 1.4,
    centeredSlides: true,
    resistanceRatio: .3,
    // grabCursor: true,
    pagination: {
      el: '.sc-insight .insight-list-wrap .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 'auto'
      },
      1024: {
        freeMode: true,
        slidesPerView: 1.6,
        centeredSlides: false
      },
      1280: {
        freeMode: true,
        slidesPerView: 2.2,
        centeredSlides: false,
      },
      1540: {
        freeMode: true,
        slidesPerView: 2.8,
        centeredSlides: false,
      }
    }
  });

  // footer
  const animFoot = gsap.fromTo('.footer-title', {
    opacity:0,
    yPercent: 100,
  }, {
    yPercent: 0,
    opacity:1,
  });
  ScrollTrigger.create({
    trigger: '#footer',
    start:'top 60%',
    animation: animFoot,
    toggleActions: 'play none none none',
    // play pause resume reset
    once: true,
    // markers: true
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

  // cursor
  let mouseCursor = document.querySelector('#cursor');

  window.addEventListener('scroll', cursor);
  window.addEventListener('mousemove', cursor);

  function cursor(e) {
    mouseCursor.style.left = e.pageX + 'px';
    mouseCursor.style.top = e.pageY - scrollY + 'px';
    mouseCursor.style.opacity = '1';
  }

  $('.sc-study .study-area').mouseover(function(){
    $('#cursor .txt').text('view');
    $('#cursor').addClass('view');
  });
  $('.sc-study .study-area').mouseleave(function(){
    $('#cursor .txt').empty();
    $('#cursor').removeClass('view');
  });

  $('.sc-insight .insight-area').mouseover(function(){
    $('#cursor .txt').text('drag');
    $('#cursor').addClass('drag');
  });
  $('.sc-insight .insight-area').mouseleave(function(){
    $('#cursor .txt').empty();
    $('#cursor').removeClass('drag');
  });

  $('.footer-title a').mouseover(function(){
    $('#cursor .txt').text('contact us');
    $('#cursor').addClass('contact');
  });
  $('.footer-title a').mouseleave(function(){
    $('#cursor .txt').empty();
    $('#cursor').removeClass('contact');
  });
});

