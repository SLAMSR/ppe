"use strict";

import {
    afficherErreur,
    afficherErreurSaisie, afficherSucces,
    configurerFormulaire,
    fichierValide,
    effacerLesErreurs,
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

/*global token, present, lesParametres, photo */

// variable globale

// récupération des éléments du DOM
const cible = document.getElementById('cible');
const fichier = document.getElementById('fichier');
const btnSupprimer = document.getElementById('btnSupprimer');
fichier.accept = lesParametres.accept;


// contrôle des données
configurerFormulaire(true);

// Déclencher le clic sur le champ de type file lors d'un clic dans la zone cible
cible.onclick = () => fichier.click();

// sur la sélection d'un fichier
fichier.onchange = () => {
    if (fichier.files.length > 0) {
        let file = fichier.files[0];
        if (controlerFichier(file)) {
            ajouter(file);
        }
    }
};

// définition des gestionnaires d'événements pour déposer un fichier dans la cible
cible.ondragover = (e) => e.preventDefault();
cible.ondrop = (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (controlerFichier(file)) {
        ajouter(file);
    }
};

// suppression de la photo
btnSupprimer.onclick = () => {
    supprimer();
};

// chargement des données

if (present) {
    let img = document.createElement('img');
    img.src =  photo;
    img.alt = 'photo';
    cible.appendChild(img);
    btnSupprimer.style.display = 'block';
}

function controlerFichier(file) {
    effacerLesErreurs();
    // définition des contraintes sur le fichier téléversé
    const controle = {
        taille: lesParametres.maxSize,
        lesExtensions: lesParametres.extensions,
    };
    if (!fichierValide(file, controle)) {
        afficherErreurSaisie('fichier', controle.reponse);
        return false;
    }
    // vérification des dimensions
    // création d'un objet image
    let img = new Image();
    // chargement de l'image
    img.src = window.URL.createObjectURL(file);
    // il faut attendre que l'image soit chargée pour effectuer les contrôles
    img.onload = function () {
        if (!lesParametres.redimensionner &&  (img.width > lesParametres.width || img.height > lesParametres.height)) {
            let msg = "Les dimensions de l'image (" + img.width + " * " + img.height + ") dépassent les dimensions autorisées (" + lesParametres.width + " * " + lesParametres.height + ")";
            afficherErreurSaisie('fichier', msg);
            return false;
        } else {
            cible.innerHTML = '';
            cible.appendChild(img);
            ajouter(file);
        }
    };
    // si l'image n'est pas chargée (cas d'un fichier non image)
    img.onerror = function () {
        afficherErreur("Il ne s'agit pas d'un fichier image");
    };
}

function ajouter(file) {
    let monFormulaire = new FormData();
    monFormulaire.append('fichier', file);
    monFormulaire.append('token', token);
    $.ajax({
        url: 'ajax/ajouter.php',
        method: 'post',
        async : false,
        data: monFormulaire,
        processData: false,
        contentType: false,
        dataType: "json",
        success: (data) => {
            if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        
                        afficherErreur('une erreur inattendue est survenue');
                    } else if (key === 'global') {
                        afficherErreur(message);
                    } else  {
                        afficherErreurSaisie(key, message );
                    }
                }
            } else  {
                // il faut afficher le bouton pour supprimer la photo
                btnSupprimer.style.display = 'block';
                afficherSucces('La photo a été modifiée');
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}


function supprimer() {
    $.ajax({
        url: 'ajax/supprimer.php',
        method: 'post',
        data: {token: token},
        dataType: "json",
        success: (data) => {
            if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        
                        afficherErreur('une erreur inattendue est survenue');
                    } else if (key === 'global') {
                        afficherErreur(message);
                    } else  {
                        afficherErreurSaisie(key, message );
                    }
                }
            } else  {
                cible.innerHTML = '';
                btnSupprimer.style.display = 'none';
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}
