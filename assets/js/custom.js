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
