const DELAY_PER_PATH = .25 // in seconds
const SCROLLING_DELAY = .5 // in seconds

let isSmoothScrolling = false
let isOnSection = false

function removeLogo(logoFinishedDelay) {
  setTimeout(() => {
    if (document.readyState == 'complete') {
      let logo = $('.logo-container')
      logo.css({
        'opacity': '0',
        'fill': 'white',
        'animation': 'logo-remove 1s'
      })

      setTimeout(() => {
        $(document.body).css('overflow', '')
        logo.remove()
      }, 1000)
    } else {
      removeLogo(logoFinishedDelay)
    }
  }, logoFinishedDelay*1000 + 2000)
}

function animateLogo() {
  $(document.body).css('overflow', 'hidden')

  let logoPaths = $('#logo path')
  logoPaths.each((index, element) => {
    let path = $(element)
    let pathLength = path[0].getTotalLength()
    path.css({
      'stroke-dasharray': `${pathLength}px`,
      'stroke-dashoffset': `${pathLength}px`,
      'animation': `logo-stroke 2s ease forwards ${index*DELAY_PER_PATH}s`
    })
  })

  let logoFinishedDelay = (logoPaths.length + 1)*DELAY_PER_PATH
  $('#logo').css('animation', `logo-fill 0.5s ease forwards ${logoFinishedDelay}s`)
  removeLogo(logoFinishedDelay)
}

animateLogo()

$(window).on('resize load', () => {
  let background = $('.background')
  background.css('height', `${$(document.body).height()-$('header').height()}px`)
  $('.background-header').css('height', `${background.offset().top-$('.header-text').offset().top}px`)

  isOnSection = $(window).scrollTop() >= $('main section:first-child').offset().top
})

$(window).on('scroll', () => {
  if (isSmoothScrolling) return

  let viewTop = $(window).scrollTop()
  let viewBottom = viewTop + $(window).height()
  let firstSectionTop = $('main section:first-child').offset().top

  if (!isOnSection && viewBottom >= firstSectionTop) {
    isSmoothScrolling = true

    $('html, body').animate({ scrollTop: firstSectionTop }, SCROLLING_DELAY*1000, () => {
      isOnSection = true
      isSmoothScrolling = false
    })
  } else if (isOnSection && viewTop < firstSectionTop) {
    isSmoothScrolling = true

    $('html, body').animate({ scrollTop: 0 }, SCROLLING_DELAY*1000, () => {
      isOnSection = false
      isSmoothScrolling = false
    })
  }
})

$('#username-ipa').on('click', () => $('#username-ipa-audio')[0].play())