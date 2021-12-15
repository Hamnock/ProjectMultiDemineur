function ChangeBg(){
    const images = [
        'url("img/Accueil0.gif")',
        'url("img/Accueil1.gif")',
        'url("img/Accueil2.gif")',
        'url("img/Accueil3.gif")',
        'url("img/Accueil4.gif")',
    ]

    const body = document.querySelector('body')
    const bg = images[Math.floor(Math.random()*images.length)];
    body.style.backgroundImage = bg 
}

function table_settings(){
    const table = document.querySelector("table#test tbody"); //Sélection de la table 

    for(let i = 0; i < 10; i++) { //Boucle créant les lignes (pour 10 lignes)
        const tr = document.createElement("tr");
        for(let j = 0; j<4; j++) { //Boucle créant les cases (pour 4 colonnes)
            const td = document.createElement("td");
            td.innerHTML = i; //Contenu de la case 
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
}

