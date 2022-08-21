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

  // btn nav
  $('.btn-nav').click(function(e){
    e.preventDefault();
    $('#gnb').toggleClass('open');
    $(this).toggleClass('close');

    if($('#gnb').hasClass('open')) {
      $('#gnb .gnb-item').each(function(index, element) {
        const anim = gsap.fromTo(element, {
          opacity:0,
          x: '1rem',
          visibility: 'hidden',
        }, {
          x: 0,
          opacity:1,
          visibility: 'inherit',
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
    }
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
  
  $('.sc-visual .title .row span').each(function(index, element) {
    const anim = gsap.fromTo(element, {
      opacity:0,
      y: 70,
      visibility: 'hidden',
    }, {
      y: 0,
      opacity:1,
      visibility: 'inherit',
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
      .fromTo('.sc-whatwedo .sc-title',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1')
      .fromTo('.sc-whatwedo .sc-sub-title .txt1',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.2')
      .fromTo('.sc-whatwedo .sc-sub-title .txt2',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.4')
      .fromTo('.sc-whatwedo .sc-sub-title .txt3',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.6')
      .fromTo('.sc-whatwedo .title-area .desc',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.8')
    
      $('.sc-whatwedo .whatwedo-item').each(function(index, element) {
        const anim = gsap.fromTo(element, {
          opacity:0,
          y: 70,
          visibility: 'hidden',
        }, {
          y: 0,
          opacity:1,
          visibility: 'inherit',
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
      .fromTo('.sc-whatwedo .sc-title',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1')
      .fromTo('.sc-whatwedo .sc-sub-title .txt1',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.2')
      .fromTo('.sc-whatwedo .sc-sub-title .txt2',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.4')
      .fromTo('.sc-whatwedo .sc-sub-title .txt3',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.6')
      .fromTo('.sc-whatwedo .title-area .desc',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.8')
    
      $('.sc-whatwedo .whatwedo-item').each(function(index, element) {
        const anim = gsap.fromTo(element, {
          opacity:0,
          y: 70,
          visibility: 'hidden',
        }, {
          y: 0,
          opacity:1,
          visibility: 'inherit',
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
  .fromTo('.sc-client .sc-title',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1')
  .fromTo('.sc-client .sc-sub-title',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.2')

  $('.sc-client .client-item').each(function(index, element) {
    const anim = gsap.fromTo(element, {
      opacity:0,
      y: 70,
      visibility: 'hidden',
    }, {
      y: 0,
      opacity:1,
      visibility: 'inherit',
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
    
      op.addLabel('m1')
      // .fromTo('.sc-study .bg2',{opacity:0},{opacity:1},'m1+=1')
      // .fromTo('.sc-study .bg3',{opacity:0},{opacity:1},'m1+=2')
      .fromTo('.sc-study .bg2',{display: 'none', opacity: 0},{display: 'block', opacity: 1},'m1+=1')
      .fromTo('.sc-study .bg3',{display: 'none', opacity: 0},{display: 'block', opacity: 1},'m1+=2')
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
          visibility: 'hidden',
        }, {
          opacity:1,
          x: 0,
          visibility: 'inherit',
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
        visibility: 'hidden',
      }, {
        opacity:1,
        x: 0,
        visibility: 'inherit',
      });
      ScrollTrigger.create({
        trigger: '.sc-study',
        start:'top 60%',
        animation: animStudy,
        toggleActions: 'play none none none',
        // play pause resume reset
        once: true,
        // markers: true
      });
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
  .fromTo('.sc-insight .sc-sub-title .txt1',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1')
  .fromTo('.sc-insight .sc-sub-title .txt2',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.2')
  .fromTo('.sc-insight .insight-list-wrap',{opacity:0, y:70, visibility: 'hidden'},{opacity:1, y:0, visibility: 'inherit'},'t1+=.4')

  const insightSwiper = new Swiper('.sc-insight .insight-list-wrap.swiper', {
    slidesPerView: 1.4,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
      el: '.sc-insight .insight-list-wrap .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 'auto'
      },
      1024: {
        slidesPerView: 1.6,
        centeredSlides: false
      },
      1280: {
        slidesPerView: 2.2,
        centeredSlides: false,
      },
      1540: {
        slidesPerView: 2.8,
        centeredSlides: false,
      }
    }
  });

  // footer
  const animFoot = gsap.fromTo('.footer-title', {
    opacity:0,
    yPercent: 100,
    visibility: 'hidden',
  }, {
    yPercent: 0,
    opacity:1,
    visibility: 'inherit',
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