$(function(){
  // a태그 기본동작 방지
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });

  // nav btn
  $('.btn-nav').click(function(e){
    e.preventDefault();
    $('#gnb').toggleClass('open');
    $(this).toggleClass('close');
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
  const studySwiper = new Swiper('.sc-study .study-list-wrap.swiper', {
    direction: 'vertical',
    effect: 'fade',
    pagination: {
      el: '.sc-study .study-list-wrap .swiper-pagination',
      clickable: true
    },
  });

  // insight
  const insightSwiper = new Swiper('.sc-insight .swiper', {
    // autoplay: true,
    // loop: true,
    slidesPerView: true,
    slidesPerGroupAuto: true,
    grabCursor: true,
  });
  
  // footer copyright 
  const year = new Date().getFullYear();
  $('.copyright .year').text(year);
});
