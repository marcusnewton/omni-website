// Init Semantic UI behaviour
$(function() {

  // Sticky
  // fix main menu to page on passing
  $('.main.menu').visibility({
    type: 'fixed'
  });
  $('.overlay').visibility({
    type: 'fixed',
    offset: 80
  });

  // show dropdown on hover
  $('.main.menu  .ui.dropdown').dropdown({
    on: 'hover'
  });
  
});
