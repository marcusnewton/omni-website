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

  // Modal
  $('.ui.modal')
  .modal()
  ;
});

// Event listeners
const menuItems = [
  {
    menu: "menu1",
    id: "header1"
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

  document.body.scrollIntoView({behavior: "smooth", block: "start"})
})
document.getElementById('mobile-menu0').addEventListener('click', (event) => {
  event.preventDefault()

  document.body.scrollIntoView({behavior: "smooth", block: "start"})
})

let scrollTarget

// Scroll to header
menuItems.forEach(function(item) {
  if (item) {
    document.getElementById(item.menu).addEventListener('click', (event) => {
      event.preventDefault()

      // Taking menu height into account
      scrollTarget = document.getElementById(item.id).getBoundingClientRect()
      window.scrollBy({
        top: scrollTarget.top - 80,
        behavior: 'smooth'
      })
    })
  }
})

// Socials
document.querySelector('#email').addEventListener('click', (event) => {
  event.preventDefault()
  window.location.href='mailto:team@omniapp.org'
})

document.querySelector('.linkedin').addEventListener('click', (event) => {
  event.preventDefault()
  window.open('https://www.linkedin.com/company/omni-project','_blank')
})

// Register interest
document.getElementById('register').addEventListener('click',(event) => {
  event.preventDefault()

  $('.basic.modal')
    .modal('show')
  ;
})

// Reveal canvas on load
window.onload = () => {
  document.getElementById('header').style.backgroundColor = "rgba(27,28,29,0)"
}

// Parallax init
const rellax = new Rellax('.rellax')
