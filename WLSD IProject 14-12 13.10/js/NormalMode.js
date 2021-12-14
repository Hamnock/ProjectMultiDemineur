

var time = 0;
setInterval(timer, 1000)
function timer() {
    time += 1
    document.getElementById("timer").innerHTML = time
}

var Pscore = 000;
function score() {
    Pscore += 100
    document.getElementById("score").innerHTML = Pscore

}

function ChangeBg() {
    const images = [
        'url("img/Accueil0.gif")',
        'url("img/Accueil1.gif")',
        'url("img/Accueil2.gif")',
        'url("img/Accueil3.gif")',
        'url("img/Accueil4.gif")',
    ]

    const body = document.querySelector('body')
    const bg = images[Math.floor(Math.random() * images.length)];
    body.style.backgroundImage = bg
}

document.getElementById("Score").innerHTML = varTime






//"Constantes"    
var TAILLE_CASE = 17;
var TAILLE_IMG = 10;


//Couleur de fond du plateau
var COULEUR_PLATEAU = "#8f8f8f";

//Couleur des chiffre représentant le nombre de mine
var COULEUR_CHIFFRE = new Array("",
    "#0000FF",
    "#00FF00",
    "#FF0000",
    "#000066",
    "#660033",
    "#009999",
    "#000000",
    "#969696");

//Notre tableau de case
var cases = new Array();

//Notre plateau (la 'div')
var tableau = null;

//Taille de notre jeux
var hauteur = 10;
var largeur = 10;
var nb_mine = 10;

//fin de partie?
var game_over = false;
//Permier clique de la partie
var first_click = true;

//Mode triche
var mode_cheat = false;

//Gestio de l'affichage du temps.
var time = 1;
var timer = null;


//Fonction de chargement d'une nouvelle partie appelé lors du chargement de la page
function direct_new_game() {

    hauteur = document.all['hauteur'].value;
    largeur = document.all['largeur'].value;
    nb_reste = nb_mine = document.all['nb_mine'].value;

    //On initialise le plateau de jeux.
    init_plateau();

    //On place les mines
    place_mine();

    //On réinit les paramètres divers...
    document.all['mine_reste'].value = nb_reste;
    game_over = false;
    first_click = true;
    time = 1;
}

//Demande de nouvelle partie direct en expert.
function new_game_expert() {
    document.all['hauteur'].value = 20;
    document.all['largeur'].value = 30;
    nb_mine = document.all['nb_mine'].value = 100;
    new_game();
}

//Demande de nouvelle partie direct en intermédiair
function new_game_intermediaire() {
    document.all['hauteur'].value = 20;
    document.all['largeur'].value = 20;
    nb_mine = document.all['nb_mine'].value = 40;
    new_game();
}

//Demande de nouvelle partie direct en Débutant
function new_game_debutant() {
    document.all['hauteur'].value = 10;
    document.all['largeur'].value = 10;
    nb_mine = document.all['nb_mine'].value = 10;
    new_game();
}

//Demande de nouvelle partie, on vérifie la saisie et on appel la fonction qui s'occupe de créer une nouvelle partie.
function new_game() {

    //On demande confirmation avant de démarrer une nouvelle partie si la précédente n'est pas terminée
    if (!game_over && confirm('Etes vous sur de vouloir démarrer une nouvelle partie?\nLa partie en cours va être perdu.')) {

        //On vérifit si la saisie est correcte.
        hauteur = document.all['hauteur'].value;
        largeur = document.all['largeur'].value;
        nb_reste = nb_mine = document.all['nb_mine'].value;

        //Dimension minimal 10x10
        if (largeur < 10 || hauteur < 10) {
            alert("La hauteur et la largeur de la grille ne peut pas être inférieur à 10 cases.");
            return;
        }

        //Minimum 1 mine
        if (nb_mine < 1) {
            alert("Le nombre minimal de mine est 1. Veuillez augmenter le nombre de mine SVP.");
            return;
        }

        //Moins de 10 cases libres
        if (nb_mine > ((largeur * hauteur) - 10)) {
            alert("Le nombre minimal de case non minées est de 10. Veuillez réduire le nombre de mine.");
            return;
        }

        //On initialise le plateau de jeux.
        init_plateau();

        //On place les mines
        place_mine();

        //On rinit les paramètres divers...
        document.all['mine_reste'].value = nb_reste;
        game_over = false;
        first_click = true;
        document.all['time'].value = 0;
        time = 1;

        if (timer != null)
            clearTimeout(timer);
    }

    return;
}

//Initialisation du plateau de jeux (tableau)
function init_plateau() {

    //Notre "espace" de jeux
    div_plateau = document.getElementById("tableau");

    //Initialisation des cases du plateau
    init_case();

    //On prépare notre "plateau"
    div_plateau.style.width = largeur * TAILLE_CASE;
    div_plateau.style.height = hauteur * TAILLE_CASE;
    div_plateau.style.backgroundColor = COULEUR_PLATEAU;

    if (tableau)
        div_plateau.removeChild(tableau);

    //Le tableau que l'on va utiliser pour le "plateau"
    tableau = document.createElement("table");

    var tab_bod = document.createElement("tbody");
    tableau.appendChild(tab_bod);

    tableau.cellSpacing = "0";
    tableau.cellPadding = "0";
    tableau.width = largeur * TAILLE_CASE;
    tableau.height = hauteur * TAILLE_CASE;

    var i, j;

    //Ajout des cases dans notre tableau
    for (i = 0; i < hauteur; i++) {

        var tr = document.createElement("TR");

        for (j = 0; j < largeur; j++) {

            var td = document.createElement("td");
            td.className = "caseVide";
            td.innerHTML = " ";
            td.id = "vide";

            td.onclick = click_on_case;
            td.oncontextmenu = context_on_case;

            td.onmouseover = over_on_case;
            td.onmouseout = out_on_case;

            td.is_mine = false;
            td.is_drapeau = false; //Drapeau sur la case
            td.is_intero = false; //Point d'introgation sur la case


            tr.appendChild(td);

            //On garde la trace de notre case.
            cases[i][j] = td;
        }
        tableau.lastChild.appendChild(tr);
    }


    //On ajoute notre tableau  la 'div' reprsentant notre plateau
    div_plateau.appendChild(tableau);
}

//Initialisation du tableau des cases
function init_case() {
    var i, j;

    //Pour chaque case
    for (i = 0; i < hauteur; i++) {
        //Si la ligne n'existe pas, on la créer
        if (!cases[i])
            cases[i] = new Array();

        for (j = 0; j < largeur; j++)
            cases[i][j] = null;
    }
}

//Place les mines aléatoirement sur le plateau
function place_mine() {

    var i;

    for (i = 0; i < nb_mine; i++) {

        do {
            x = Math.floor(Math.random() * hauteur);
            y = Math.floor(Math.random() * largeur);

        } while (cases[x][y].is_mine);

        cases[x][y].is_mine = true;
    }
}

var old_color;

//OnMouseOver sur une case
function over_on_case() {
    this.style.border = "1px #FFFFFF inset";

    //Mode triche 
    if (mode_cheat) {

        old_color = this.style.backgroundColor;

        if (this.is_mine)
            this.style.backgroundColor = "#FF0000";
        else
            this.style.backgroundColor = "#00FF00";
    }
}
//OnMouseOut sur une case
function out_on_case() {
    this.style.border = "1px #000000 inset";

    //Mode triche
    if (mode_cheat)
        this.style.backgroundColor = old_color;

}

//Click sur une case du jeux
function click_on_case() {

    if (game_over) {
        alert("Désolé, fin de la partie. Veuillez lancer une nouvelle partie.");
        return;
    }

    //On déclanche le chrono.
    if (first_click)
        timer = setTimeout("on_time()", 1000);

    //La case sur laquelle on à cliqué.
    ma_case = this;

    //Case déjà cliquée ou avec un drapeau.
    if (ma_case.className == "caseClique" || ma_case.is_drapeau) {
        return;
    }
    //La case  était une mine... Domage.
    else if (ma_case.is_mine) {

        //Permier clique sur une mine, on esquive.
        if (first_click) {

            //On doit replacer une nouvelle mine ailleurs
            for (i = 0; i < hauteur && ma_case.is_mine; i++) {
                for (j = 0; j < largeur && ma_case.is_mine; j++) {

                    //Case non miné
                    if (!cases[i][j].is_mine) {

                        //On active la mine sur la case
                        cases[i][j].is_mine = true;

                        //Pas de mine sur la case cliquée.
                        ma_case.is_mine = false;
                    }
                }
            }
        }
        else {

            ma_case.innerHTML = "<img src=\"mine.gif\" width=\"" + TAILLE_IMG + "\" height=\"" + TAILLE_IMG + "\">";
            ma_case.style.background = "#FF0000";

            alert("Désolé vous avez perdu. Merci d'avoir joué.");

            game_over = true;

            return;
        }
    }

    //Case normale    
    var i, j;

    //On cherche la position case
    for (i = 0; i < hauteur; i++) {
        for (j = 0; j < largeur; j++) {

            if (cases[i][j] == this) {
                degage_case(i, j);
            }
        }
    }

    if (check_victoire()) {

        alert("Félicitation vous avez trouvé toutes les mines ! (temps écoulé :" + time + " secondes).");
        game_over = true;

        //High Score...?                
        if (hauteur == 10 && largeur == 10 && nb_mine == 10 && time < score_temps[0]) {
            nom = prompt("Nouveau record ! Vous avez battu le record du mode débutant!\nVeuillez entrez votre nom SVP.");

            score_temps[0] = time;
            score_noms[0] = nom;

            EcrireCookie("PdcDemineurDebutant", nom + ";" + time.toString());

            maj_high_score();

        }
        else if (hauteur == 20 && largeur == 20 && nb_mine == 40 && time < score_temps[1]) {
            nom = prompt("Nouveau record ! Vous avez battu le record du mode intermédiaire!\nVeuillez entrez votre nom SVP.");

            score_temps[1] = time;
            score_noms[1] = nom;

            EcrireCookie("PdcDemineurIntermediaire", nom + ";" + time.toString());

            maj_high_score();
        }
        else if (hauteur == 30 && largeur == 20 && nb_mine == 100 && time < score_temps[2]) {
            nom = prompt("Nouveau record ! Vous avez battu le record du mode expert!\nVeuillez entrez votre nom SVP.");

            score_temps[2] = time;
            score_noms[2] = nom;

            EcrireCookie("PdcDemineurExpert", nom + ";" + time.toString());

            maj_high_score();
        }

    }



    first_click = false;
}

//Clique droit sur une case
function context_on_case() {

    if (game_over) {
        alert("Désolé, fin de la partie. Veuillez lancer une nouvelle partie.");
        return false;
    }

    //Case dj traite.
    if (this.className == "caseClique")
        return false;

    if (this.is_drapeau) {

        this.innerHTML = "<img src=\"intero.gif\" width=\"" + TAILLE_IMG + "\" height=\"" + TAILLE_IMG + "\">";

        this.is_drapeau = false;
        this.is_intero = true;


        //Compteur de mines restantes
        nb_reste++;
        document.all['mine_reste'].value = nb_reste;
    }
    else if (this.is_intero) {
        this.innerHTML = " ";

        this.is_drapeau = false;
        this.is_intero = false;
    }
    else {

        this.innerHTML = "<img src=\"drapeau.gif\" width=\"" + TAILLE_IMG + "\" height=\"" + TAILLE_IMG + "\">";

        this.is_drapeau = true;
        this.is_intero = false;

        //Compteur de mines restantes
        nb_reste--;
        document.all['mine_reste'].value = nb_reste;
    }

    return false;
}

//Fonction qui s'occupe de révéler une case et toutes les autres autour en rcursif.
function degage_case(x, y) {


    //Case dj traite
    if (cases[x][y].className == "caseClique" || cases[x][y].is_drapeau)
        return;

    var nb_mine = 0;
    var i, j;

    //On parcours chaque cause autour de celle-ci
    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {

            if (i != 0 || j != 0) {

                if (((x + i) >= 0 && (x + i) < hauteur) && ((y + j) >= 0 && (y + j) < largeur)) {

                    if (cases[x + i][y + j].is_mine)
                        nb_mine++;
                }
            }
        }
    }

    //Style "cliqué"
    cases[x][y].className = "caseClique";

    //On vire le point d'introgation
    if (cases[x][y].is_intero) {
        cases[x][y].innerHTML = " ";
        cases[x][y].is_intero = false;
    }

    //Si case avec mine  cot, on met en forme et on d'arrte l.
    if (nb_mine > 0) {
        cases[x][y].innerHTML = nb_mine.toString();
        cases[x][y].style.color = COULEUR_CHIFFRE[nb_mine];
        return;
    }

    //Case sans mine autour ==> on dcouvre les voisins...
    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {

            if (i != 0 || j != 0) {

                if (((x + i) >= 0 && (x + i) < hauteur) && ((y + j) >= 0 && (y + j) < largeur)) {
                    degage_case(x + i, y + j);
                }
            }
        }
    }

}

//incrémentation de la minuterie
function on_time() {

    if (game_over)
        return;

    time++;

    document.all['time'].value = time;


    timer = setTimeout("on_time()", 1000);
}

//Le joueur a-t-il gagné?
function check_victoire() {

    //Pour a il faut que les seul case qui ne soit pas dcouverte soit des mines...
    for (i = 0; i < hauteur; i++) {
        for (j = 0; j < largeur; j++) {

            //Case non cliqu et pas une mine !
            if (cases[i][j].className != "caseClique" && !cases[i][j].is_mine) {
                return false;
            }
        }
    }

    return true;
}

//Lecture et chargement des scores (dans les cookies)
function get_high_score() {

    var debutant = get_cookie("PdcDemineurDebutant");
    var intermediaire = get_cookie("PdcDemineurIntermediaire");
    var expert = get_cookie("PdcDemineurExpert");

    if (debutant != null) {

        tab = debutant.split(';');

        score_noms[0] = tab[0];
        score_temps[0] = parseInt(tab[1]);
    }

    if (intermediaire != null) {

        tab = intermediaire.split(';');

        score_noms[1] = tab[0];
        score_temps[1] = parseInt(tab[1]);
    }

    if (expert != null) {

        tab = expert.split(';');

        score_noms[2] = tab[0];
        score_temps[2] = parseInt(tab[1]);
    }
}

//Mise à jour de l'affichage des scores
function maj_high_score() {

    //Notre "espace" de jeux
    div_score = document.getElementById("scores");

    high_score = "<table border=\"1\"><tr><td><b>Difficulté</b></td><td><b>Nom</b></td><td><b>Temps</b></td></tr>";
    high_score += "<tr><td>Débutant</td><td>" + score_noms[0] + "</td><td>" + score_temps[0].toString() + "</td></tr>";
    high_score += "<tr><td>Intermédiaire</td><td>" + score_noms[1] + "</td><td>" + score_temps[1].toString() + "</td></tr>";
    high_score += "<tr><td>Expert</td><td>" + score_noms[2] + "</td><td>" + score_temps[1].toString() + "</td></tr>";
    high_score += "</table>";

    div_score.innerHTML = high_score;

}

//Mise à zéro des scores
function reset_high_score() {

    if (confirm('Etes vous sur de vouloir vider les scores?')) {
        score_noms[0] = "Anonyme";
        score_temps[0] = 60;
        score_noms[1] = "Anonyme";
        score_temps[1] = 120;
        score_noms[2] = "Anonyme";
        score_temps[2] = 360;

        EcrireCookie("PdcDemineurDebutant", "Anonyme;60");
        EcrireCookie("PdcDemineurIntermediaire", "Anonyme;120");
        EcrireCookie("PdcDemineurExpert", "Anonyme;360");

        maj_high_score();
    }
}


function active_cheat() {

    if (mode_cheat) {
        mode_cheat = false;
        alert("Mode triche désactivé.");
    }
    else {
        mdp = prompt("Veuillez entrer le cheat-code pour activer le Mode triche SVP.");
        if (mdp == "help my minesweeper") {
            mode_cheat = true;
            alert("Mode triche activé, Merci.");
        }
        else {
            alert("Désolé cheat-code incorrect.");
        }
    }

    return false;
}



function CookieBranding(name) {
    if ((typeof foldersTree != "undefined") && (typeof foldersTree.treeID != "undefined"))
        return name + foldersTree.treeID //needed for multi-tree sites. make sure treeId does not contain cookieCutter
    else
        return name
}

function get_cookie(name) {
    name = CookieBranding(name)

    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;

    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}


function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function Duree_Cookie() {
    date = new Date;
    date.setMonth(date.getMonth() + 6);
    return date;
}


function ExpireCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    name = CookieBranding(name)
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

function EcrireCookie(nom, valeur) {

    var argv = EcrireCookie.arguments;
    var argc = EcrireCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = nom + "=" + escape(valeur) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");

}