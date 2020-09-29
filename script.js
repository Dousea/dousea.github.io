const delayPerPath = .25

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
      'animation': `logo-stroke 2s ease forwards ${index*delayPerPath}s`
    })
  })

  let logoFinishedDelay = (logoPaths.length + 1)*delayPerPath
  $('#logo').css('animation', `logo-fill 0.5s ease forwards ${logoFinishedDelay}s`)
  removeLogo(logoFinishedDelay)
}

animateLogo()

function setBackground() {
  let background = $('.background')
  background.css('height', `${document.body.getBoundingClientRect().bottom-$('main section:first-child')[0].getBoundingClientRect().top}px`)
  $('.background-header').css('height', `${background[0].getBoundingClientRect().top-$('.header-text')[0].getBoundingClientRect().top}px`)
}

$(window).on('resize', setBackground)
$(window).on('load', setBackground)

$('#username-ipa').on('click', () => $('#username-ipa-audio')[0].play())