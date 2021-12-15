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

  var attempt = 5; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "Formget" && password == "formget#123") {
        alert("Login successfully");
        window.location = "index.html"; // Redirecting to other page.
        return false;
    }
    else {
        attempt--;// Decrementing by one.
        alert("Wrong password or username, please try again\n" + attempt + " attempts remaining");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
    document.getElementById("Pseudo").innerHTML = username
}