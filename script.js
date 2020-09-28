function setFigureElementSticky() {
  let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  let figureElement = document.getElementById('figure')

  figureElement.style.setProperty('position', 'sticky')
  figureElement.style.setProperty('position', '-webkit-sticky')
  figureElement.style.setProperty('top', (vh/2 - figureElement.offsetHeight/2) + 'px', 'important')
}

window.addEventListener('resize', setFigureElementSticky)
window.addEventListener('load', setFigureElementSticky)

document.getElementById('username-ipa').addEventListener('click', () => {
  let sound = document.getElementById('username-ipa-audio')
  sound.play()
})