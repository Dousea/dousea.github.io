const delayPerPath = .25

function removeLogo(logoFinishedDelay) {
  setTimeout(() => {
    if (document.readyState == 'complete') {
      let logo = document.querySelector('.logo-container')
      logo.style.setProperty('opacity', '0')
      logo.style.setProperty('fill', 'white')
      logo.style.setProperty('animation', 'logo-remove 1s')

      setTimeout(() => {
        document.body.style.removeProperty('overflow');
        logo.parentNode.removeChild(logo)
      }, 1000)
    } else {
      removeLogo(logoFinishedDelay)
    }
  }, logoFinishedDelay*1000 + 2000)
}

function animateLogo() {
  document.body.style.setProperty('overflow', 'hidden');

  let logoPaths = document.querySelectorAll('#logo path')

  for (let i = 0; i < logoPaths.length; i++) {
    let pathLength = logoPaths[i].getTotalLength()
    logoPaths[i].style.setProperty('stroke-dasharray', `${pathLength}px`)
    logoPaths[i].style.setProperty('stroke-dashoffset', `${pathLength}px`)
    logoPaths[i].style.setProperty('animation', `logo-stroke 2s ease forwards ${i*delayPerPath}s`)
  }

  let logoFinishedDelay = (logoPaths.length + 1)*delayPerPath

  document.getElementById('logo').style
    .setProperty('animation', `logo-fill 0.5s ease forwards ${logoFinishedDelay}s`)

  removeLogo(logoFinishedDelay)
}

animateLogo()

function setBackground() {
  let background = document.querySelector('.background')
  background.style.setProperty('height', `${document.body.getBoundingClientRect().bottom-document.querySelector('main section:first-child').getBoundingClientRect().top}px`)
  document.querySelector('.background-header')
    .style.setProperty('height', `${background.getBoundingClientRect().top-document.querySelector('.header-text').getBoundingClientRect().top}px`)
}

window.addEventListener('resize', setBackground)
window.addEventListener('load', setBackground)

document.getElementById('username-ipa')
  .addEventListener('click', () => document.getElementById('username-ipa-audio').play())