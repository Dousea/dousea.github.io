const delayPerPath = .25

function setFigureElementSticky() {
  let viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  let figureElement = document.getElementById('figure')
  figureElement.style.setProperty('position', 'sticky')
  figureElement.style.setProperty('top', `${viewportHeight/2 - figureElement.offsetHeight/2}px`)
}

function removeLogo(logoFinishedDelay) {
  setTimeout(() => {
    if (document.readyState == 'complete') {
      let logo = document.querySelector('.logo-container')
      logo.style.setProperty('opacity', '0')
      logo.style.setProperty('fill', 'white')
      logo.style.setProperty('animation', 'logo-remove 1s')

      setTimeout(() => {
        logo.parentNode.removeChild(logo)
      }, 1000)
    } else {
      removeLogo(logoFinishedDelay)
    }
  }, logoFinishedDelay*1000 + 2000)
}

function animateLogo() {
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

window.addEventListener('resize', setFigureElementSticky)
window.addEventListener('load', setFigureElementSticky)
animateLogo()

document.getElementById('username-ipa')
  .addEventListener('click', () => document.getElementById('username-ipa-audio').play())