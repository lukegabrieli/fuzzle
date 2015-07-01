$('.icon-menu').on('click', function() {
  $('.main_nav').slideToggle(200);
  if ($(this).hasClass('icon-menu')) {
    $(this).removeClass('icon-menu');
    $(this).addClass('icon-cross');
  }
  else {
    $(this).removeClass('icon-cross');
    $(this).addClass('icon-menu');
  }
});
