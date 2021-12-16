
function validate(){

    if( !document.forms['myform'].username.value.replace(/\s+/, '') || !document.forms['myform'].password.value.replace(/\s+/, '' ).length ) {
         alert( "Password and username required" );
         return false;
    }

    else{
        window.location = "index.html";
    }
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