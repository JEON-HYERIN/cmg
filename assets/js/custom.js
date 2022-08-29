$(function(){
  // a태그 기본동작 방지
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });

  // loading
  const loading = gsap.timeline({
    paused: true
  })
  loading.fromTo('.loading .logo svg', {
    y: '150%',
  }, {
    y: 0,
    stagger: 0.1,
  })
  .addLabel('a')
  .to('.loading .logo', {opacity: 0}, 'a')
  .to('#loading-circle',1.25,{r:'150%'},'a+=0.1')
  .to('#loading-cover',1.5,{r:'100%'},'a+=0.2')
  .set('.loading',{display:'none'})

  loading.play();

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
    $(this).toggleClass('on');

    if($('#gnb').hasClass('open')) {
      enable();

      gsap.fromTo('#gnb .gnb-item', {
        opacity:0,
        x: '1rem',
      }, {
        scrollTrigger: {
          trigger: '#gnb.open',
        },
        x: 0,
        opacity:1,
        stagger: .15,
        duration: 0.25
      });

      const tlNav = gsap.timeline({
        defaults: {
          delay: 1
        },
        scrollTrigger:{
          trigger: '#gnb.open',
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
  const scrollBtn = document.querySelector('.sc-visual .btn-scroll');
  const introSection = document.querySelector('.sc-intro');
  scrollBtn.addEventListener('click', function(){
    introSection.scrollIntoView({behavior: 'smooth'});
  });

  const visualTl2 = gsap.to('.sc-visual .bg-area', 1.25, {
    scale: 1.075,
    delay: 1,
    onStart: function(){
      const visualTl1 = gsap.fromTo('.sc-visual .title .row span', {
        opacity:0,
        yPercent: 100,
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
        },
        yPercent: 0,
        opacity:1,
        stagger: .2,
        // delay: 1.25,
      });
    }
  });
  
  ScrollTrigger.saveStyles('#obj-circle');
  ScrollTrigger.saveStyles('.sc-visual .btn-scroll');
  ScrollTrigger.matchMedia({
    "(min-width: 1280px)": function(){
      // desktop-xsmall
      
      const tlVisual = gsap.timeline({
        defaults: {
          delay: 1
        },
        scrollTrigger: {
          trigger: '.sc-visual',
          // markers: true,
        }
      })
      tlVisual.addLabel('t1')
      .fromTo('#obj-circle', {scale: 0.875, opacity: 0}, {scale: 1, opacity: 1, duration: 1.25}, 't1')
      .fromTo('.sc-visual .btn-scroll', {opacity: 0}, {opacity: 1, duration: 1.75}, 't1+=0.8')
    }
  });

  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function(){
      const innerHeight = $(window).innerHeight();
      gsap.fromTo('.sc-visual .bg-area', {
        backgroundPosition: '50% 0'
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          scrub: 0,
          start: 'top top',
          end: 'bottom top',
          // markers: true,
        },
        backgroundPosition: '50% '.concat(innerHeight / 2, 'px'),
        ease:'none'
      });
    },
    "(min-width: 768px)": function(){
      const innerHeight = $('.sc-visual').innerHeight();
      // tablet-small
      gsap.fromTo('.sc-visual .bg-area', {
        backgroundPosition: '50% 0'
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          start: 'top top',
          end: 'bottom top',
          scrub: 0,
          // markers: true,
        },
        backgroundPosition: '50% '.concat(innerHeight / 2, 'px'),
        ease:'none'
      });
    }
  });

  ScrollTrigger.saveStyles('.sc-visual .title-area');
  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function(){
      // tablet-large
      gsap.fromTo('.sc-visual .title-area', {
        yPercent: -50
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          scrub: 0,
          // markers: true,
        },
        yPercent: 150,
        ease:'none'
      });
    },
    "(min-width: 1280px)": function(){
      // desktop-xsmall
      gsap.fromTo('.sc-visual .btn-scroll', {
        yPercent: -125
      }, {
        scrollTrigger: {
          trigger: '.sc-visual',
          scrub: 0,
          // markers: true,
        },
        yPercent: 125,
        ease:'none'
      });
    },
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
      trigger: '.sc-intro .group-title',
      start:'top center',
      // markers:true,
    },
  })
  tlIntro.addLabel('t1')
  .fromTo('.sc-intro .title-area .sc-title',{opacity:0, x:'1rem'},{opacity:1, x:0},'t1')
  .fromTo('.sc-intro .title-area .desc',{opacity:0, x:'1rem'},{opacity:1, x:0},'t1+=.25')

  // whatwedo
  // ScrollTrigger.saveStyles('.sc-whatwedo .number .wrap');
  // ScrollTrigger.matchMedia({
  //   "(max-width: 1023px)": function(){
  //       var startCount = {var: 0};
        
  //       gsap.to(startCount, {
  //         var: 200, 
  //         ease:'none',
  //         // duration: 1,
  //         onUpdate: function(){
  //           changeNumber(number1);
  //         },
  //         scrollTrigger: {
  //           trigger: "#number1",
  //           start:'top 100%',
  //         },
  //       })
  //       gsap.to(startCount, {
  //         var: 250, 
  //         ease:'none',
  //         onUpdate: function(){
  //           changeNumber(number2);
  //         },
  //         scrollTrigger: {
  //           trigger: "#number2",
  //           start:'top 100%',
  //         },
  //       })
  //       gsap.to(startCount, {
  //         var: 50, 
  //         ease:'none',
  //         onUpdate: function(){
  //           changeNumber(number3);
  //         },
  //         scrollTrigger: {
  //           trigger: "#number3",
  //           start:'top 100%',
  //         },
  //       })
  //       gsap.to(startCount, {
  //         var: 78, 
  //         ease:'none',
  //         onUpdate: function(){
  //           changeNumber(number4);
  //         },
  //         scrollTrigger: {
  //           trigger: "#number4",
  //           start:'top 100%',
  //         },
  //       })
  //       function changeNumber(selector) {
  //         selector.innerHTML = (startCount.var).toFixed();
  //       }
  //   },
  //   "(min-width: 1024px)": function(){
  //     // tablet-large
  //     let html = '';
  //     for(let index=0; index < 10; index++) {
  //       html += `<span>${Math.floor(Math.random() * 10)}</span>`;
  //     };
  //     $('.sc-whatwedo .number .wrap').prepend(html);
  //     $('.sc-whatwedo .number .wrap').each(function(index, element) {
  //       const anim = gsap.to(element, {
  //         delay: (index + 1) * .2,
  //       });
  //       ScrollTrigger.create({
  //         trigger: element,
  //         start:'top 70%',
  //         end: 'bottom top',
  //         // markers: true,
  //         onEnter: function(){
  //           $('.sc-whatwedo .number .wrap').addClass('active');
  //         },
  //         onComplete: function(){
  //           $('.sc-whatwedo .number .wrap').css('display', 'none');
  //         }
  //       });
  //     });
  //   }
  // });

  var startCount = {var: 0};
  
  gsap.to(startCount, {
    var: 200, 
    ease:'none',
    duration: 1.5,
    opacity: 1,
    onUpdate: function(){
      changeNumber(number1);
    },
    scrollTrigger: {
      trigger: "#number1",
      // start:'top 30%',
    },
  })
  gsap.to(startCount, {
    var: 250, 
    ease:'none',
    duration: 1.5,
    opacity: 1,
    onUpdate: function(){
      changeNumber(number2);
    },
    scrollTrigger: {
      trigger: "#number2",
      // start:'top 30%',
    },
  })
  gsap.to(startCount, {
    var: 50, 
    ease:'none',
    duration: 1.5,
    opacity: 1,
    onUpdate: function(){
      changeNumber(number3);
    },
    scrollTrigger: {
      trigger: "#number3",
      // start:'top 30%',
    },
  })
  gsap.to(startCount, {
    var: 78, 
    ease:'none',
    duration: 1.5,
    opacity: 1,
    onUpdate: function(){
      changeNumber(number4);
    },
    scrollTrigger: {
      trigger: "#number4",
      // start:'top 30%',
    },
  })
  function changeNumber(selector) {
    selector.innerHTML = (startCount.var).toFixed();
  }

  $('.sc-whatwedo .value-area .title').each(function(index, element) {
    const anim = gsap.fromTo(element, {
      opacity:0,
      x: '1rem',
    }, {
      x: 0,
      opacity:1,
      // delay: (index + 1) * .2,
    });
    ScrollTrigger.create({
      trigger: element,
      start:'top 70%',
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
          // start:'top 70%',
          // markers:true,
        }
      })
      tlWhatwedo.addLabel('t1')
      .fromTo('.sc-whatwedo .sc-title',{opacity:0, x:'1rem'},{opacity:1, x:0},'t1')
      .fromTo('.sc-whatwedo .sc-sub-title .row span',{opacity:0, yPercent: 100},{opacity:1, yPercent:0, stagger:.2})
      .fromTo('.sc-whatwedo .title-area .desc',{opacity:0, y:'1rem'},{opacity:1, y:0})

      gsap.fromTo('.sc-whatwedo .whatwedo-item', {
        opacity:0,
        y: '1rem',
        }, {
        scrollTrigger: {
        trigger:'.sc-whatwedo .whatwedo-list',
        start:'top center',
        // markers: true
        },
        y: 0,
        opacity:1,
        stagger: .2,
      });
    },
    "(max-width: 1023px)": function(){
      const tlWhatwedo = gsap.timeline({
        defaults: {
          duration: 0.35
        },
        scrollTrigger:{
          trigger:'.sc-whatwedo .group-title',
          // start:'top 70%',
          // markers:true,
        }
      })
      tlWhatwedo.addLabel('t1')
      .fromTo('.sc-whatwedo .sc-title',{opacity:0, x:'1rem'},{opacity:1, x:0},'t1')
      .fromTo('.sc-whatwedo .sc-sub-title .row span',{opacity:0, yPercent: 100},{opacity:1, yPercent:0, stagger:.15})
      .fromTo('.sc-whatwedo .title-area .desc',{opacity:0, y:'1rem'},{opacity:1, y:0})
      .fromTo('.sc-whatwedo .whatwedo-item',{opacity:0, y:'1rem'},{opacity:1, y:0, stagger: .15})
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
  .fromTo('.sc-client .sc-title',{opacity:0, x:'1rem'},{opacity:1, x:0},'t1')
  .fromTo('.sc-client .sc-sub-title',{opacity:0, y:'1rem'},{opacity:1, y:0},'t1+=.2')

  $('.sc-client .client-item').each(function(index, element) {
    const anim = gsap.fromTo(element, {
      opacity:0,
      y: '1rem',
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
  .fromTo('.sc-insight .sc-sub-title .txt1',{opacity:0, yPercent: 100},{opacity:1, yPercent: 0},'t1')
  .fromTo('.sc-insight .sc-sub-title .txt2',{opacity:0, yPercent: 100},{opacity:1, yPercent: 0},'t1+=.2')
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

  insightSwiper.on('touchStart', function(){
    $('.sc-insight').addClass('grab');
  });
  insightSwiper.on('touchEnd', function(){
    $('.sc-insight').removeClass('grab');
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
          // trigger: '.sc-visual',
          trigger: 'body',
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
          // trigger: '.sc-visual',
          trigger: 'body',
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
  const mouseCursor = document.querySelector('#cursor');

  window.addEventListener('mousemove', function(e){
    mouseCursor.style.left = e.clientX + 'px';
    mouseCursor.style.top = e.clientY + 'px';
    mouseCursor.style.opacity = '1';
    // gsap.to('#cursor', 0, {
    //   'left': e.clientX + 'px',
    //   'top': e.clientY + 'px',
    //   opacity: 1
    // });
  });



  $('.sc-visual .btn-scroll').mouseover(function(){
    $('#cursor .txt').text('scroll');
    $('#cursor').addClass('hover scroll');
  });
  $('.sc-visual .btn-scroll').mouseleave(function(){
    $('#cursor .txt').empty();
    $('#cursor').removeClass('hover scroll');
  });
  $('.sc-study .study-area').mouseover(function(){
    $('#cursor .txt').text('view');
    $('#cursor').addClass('hover view');
  });
  $('.sc-study .study-area').mouseleave(function(){
    $('#cursor .txt').empty();
    $('#cursor').removeClass('hover view');
  });

  $('.sc-insight .insight-area').mouseover(function(){
    $('#cursor .txt').text('drag');
    $('#cursor').addClass('hover drag');
  });
  $('.sc-insight .insight-area').mouseleave(function(){
    $('#cursor .txt').empty();
    $('#cursor').removeClass('hover drag');
  });

  $('.footer-title a').mouseover(function(){
    $('#cursor .txt').text('contact us');
    $('#cursor').addClass('hover contact');
  });
  $('.footer-title a').mouseleave(function(){
    $('#cursor .txt').empty();
    $('#cursor').removeClass('hover contact');
  });
});

