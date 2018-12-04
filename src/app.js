// Init Semantic UI modules
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

});

// Event listeners
// Article
const menuItems = [
  // {
  //   menu: "menu1",
  //   id: "header1"
  // },
  {
    menu: "menu2",
    id: "header2"
  },
  {
    menu: "menu3",
    id: "header3"
  },
  {
    menu: "menu4",
    id: "header4"
  },
  {
    menu: "menu5",
    id: "header5"
  }
]

// Logo scroll to top
document.getElementById('menu0').addEventListener('click', (event) => {
  event.preventDefault()

  document.body.scrollIntoView({behavior: "smooth", block: "center"})
})

// Scroll to header
menuItems.forEach(function(item) {
  if (item) {
    document.getElementById(item.menu).addEventListener('click', (event) => {
      event.preventDefault()

      document.getElementById(item.id).scrollIntoView({behavior: "smooth", block: "center"})
    })
  }
})

// Socials
document.querySelector('#email').addEventListener('click', (event) => {
  event.preventDefault()
  window.location.href='mailto:mail@example.org'
})

document.querySelector('.linkedin').addEventListener('click', (event) => {
  event.preventDefault()
  window.open('https://www.linkedin.com/company/omni-project','_blank')
})
