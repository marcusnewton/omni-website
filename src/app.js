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

// Event listeners
// Article
document.querySelector('#articles-menu').addEventListener('click', (event) => {
  event.preventDefault()

  document.querySelector('#scroll').scrollIntoView({behavior: "smooth", block: "center"})
})
