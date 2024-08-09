"use strict";

/* global prochaineEdition, connexion */


let contenuCadreInformation = document.getElementById('contenuCadreInformation');
let detailClassement = document.getElementById('detailClassement');
let detailProchaineEdition = document.getElementById('detailProchaineEdition');
let detailPartenaire = document.getElementById('detailPartenaire');
let dateEpreuve = document.getElementById('dateEpreuve');
let descriptionEpreuve = document.getElementById('descriptionEpreuve');
let documentPublic = document.getElementById('documentPublic');
let document4Saisons = document.getElementById('document4Saisons');
let documentClub = document.getElementById('documentClub');
let contenuCadreMembre = document.getElementById('contenuCadreMembre');


// les informations



// afficher les derniers classements pdf


// affichage de la prochaine épreuve
dateEpreuve.innerText = prochaineEdition.dateFr;
descriptionEpreuve.innerHTML = prochaineEdition.description;
// affichage de la période d'inscription
if (prochaineEdition.dateJour <= prochaineEdition.dateFermeture) {
    let a = document.createElement('a');
    a.href = prochaineEdition.urlInscription;
    a.innerText = "S'inscrire";
    a.classList.add('m-1', 'btn', 'btn-danger', 'text-center');
    detailProchaineEdition.appendChild(a);
    a = document.createElement('a');
    a.href = prochaineEdition.urlInscrit;
    a.innerText = "Voir les inscrits";
    a.classList.add('m-1', 'btn', 'btn-danger', 'text-center');
    detailProchaineEdition.appendChild(a);
} else {
    let a = document.createElement('a');
    a.href = prochaineEdition.urlInscrit;
    a.innerText = "Voir les inscrits";
    a.classList.add('m-1', 'btn', 'btn-danger', 'text-center');
    detailProchaineEdition.appendChild(a);
}


// affichage des documents consultable par tous


// afficher les documents réservés aux membres



// affichage des liens vers les partenaires





