$('.btn-nav').click(function(e){
  e.preventDefault();
  $('#gnb').toggleClass('open');
  $(this).toggleClass('close');
});