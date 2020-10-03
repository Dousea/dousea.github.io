(($) => {
  const DELAY_PER_PATH = .25 // in seconds
  
  function removeLogo(logoFinishedDelay) {
    setTimeout(() => {
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
    }, logoFinishedDelay*1000 + 2000)
  }
  
  function animateLogo() {
    let logoPaths = $('#logo path')
    logoPaths.each((index, element) => $(element).css('animation', `logo-stroke 2s ease forwards ${index*DELAY_PER_PATH}s`))
  
    let logoFinishedDelay = (logoPaths.length + 1)*DELAY_PER_PATH
    $('#logo').css('animation', `logo-fill 0.5s ease forwards ${logoFinishedDelay}s`)
    removeLogo(logoFinishedDelay)
  }

  function createLogo() {
    $(document.body).css('overflow', 'hidden')
  
    $('#logo path').each((_, element) => {
      let path = $(element)
      let pathLength = path[0].getTotalLength()
      path.css({
        'stroke-dasharray': `${pathLength}px`,
        'stroke-dashoffset': `${pathLength}px`
      })
    })
  }

  $(window).on('resize load', () => {
    let background = $('.background')
    background.css('height', `${$(document.body).height()-$('header').height()}px`)
    $('.background-header').css('height', `${background.offset().top-$('.header-text').offset().top}px`)
  })
  
  $(window).on('load', animateLogo)

  $('#username-ipa').on('click', () => $('#username-ipa-audio')[0].play())

  createLogo()
})(jQuery)