function ChangeBg(){
    const images = [
        'url("/static/media/Accueil0.gif")',
        'url("/static/media/Accueil1.gif")',
        'url("/static/media/Accueil2.gif")',
        'url("/static/media/Accueil3.gif")',
        'url("/static/media/Accueil4.gif")',
    ]

    const body = document.querySelector('body')
    const bg = images[Math.floor(Math.random()*images.length)];
    body.style.backgroundImage = bg
}

const fermerMenu = () => {
    // Récupérer le menu
    const input = document.getElementById('menu-cb')
    input.checked = false
  
    const fenetreNode = document.getElementById('menu-cote')
    fenetreNode.remove()
  }
  
  const changerEtatMenu = () => {
    // Récupérer le menu
    const input = document.getElementById('menu-cb')
    const actif = input.checked
  
    if (actif) {
      const fenetreNode = document.createElement('div')
      fenetreNode.id = 'menu-cote'
      fenetreNode.className = 'menu-cote'
      fenetreNode.addEventListener('click', fermerMenu)
      document.body.appendChild(fenetreNode)
    } else {
      const fenetreNode = document.getElementById('menu-cote')
      fenetreNode.remove()
    }
  }
  
  const input = document.getElementById('menu-cb')
  input.addEventListener('click', changerEtatMenu)