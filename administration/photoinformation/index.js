"use strict";

import {
    afficherErreur,
    configurerFormulaire,
    afficherSucces,
    fichierValide,
    confirmer, afficherErreurSaisie
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

/* global lesFichiers, lesParametres, token */

// récupération des élements sur l'interface
const cible = document.getElementById('cible');
const fichier = document.getElementById('fichier');
const listePhoto = document.getElementById('listePhoto');


// Mise en place des balises div de class 'messageErreur' sur chaque champ de saisie
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

afficher();


/**
 * Affichage des fichiers du répertoire
 */
function afficher() {
    listePhoto.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add("row");
    for (const nomFichier of lesFichiers) {
        let col = document.createElement('div');
        col.classList.add("col-xl-4", "col-lg-6");

        let carte = document.createElement('div');
        carte.classList.add("card", "mb-3");
        carte.id = nomFichier;

        let entete = document.createElement('div');
        entete.classList.add("card-header");

        // génération de l'icône de suppression avec un alignement à droite
        let i = document.createElement('i');
        i.classList.add("bi", "bi-x", "fs-2", "text-danger", "float-end");
        i.title = 'Supprimer le fichier';
        i.onclick = () => confirmer(() => supprimer(nomFichier));
        entete.appendChild(i);

        // intégration du nom du fichier dans l'entête
        let nom = document.createElement('div');
        nom.innerText = nomFichier;
        entete.appendChild(nom);

        // intégration de l'entête dans la carte
        carte.appendChild(entete);

        // génération du corps de la carte
        let corps = document.createElement('div');
        corps.classList.add("card-body");
        corps.style.height = '250px';

        // génération d'une balise img pour afficher la photo dans le corps de la carte
        let img = document.createElement('img');
        img.src = lesParametres.repertoire + '/' + nomFichier;
        img.alt = "";
        img.style.maxWidth = '250px';
        img.style.maxHeight = '250px';

        // intégration de l'image dans le corps
        corps.appendChild(img);

        // intégration du corps dans la carte
        carte.appendChild(corps);

        col.appendChild(carte);
        row.appendChild(col);
    }
    listePhoto.appendChild(row);
}

/**
 * Lance la suppression côté serveur
 * @param {string} nomFichier  nom du fichier à supprimer
 */
function supprimer(nomFichier) {
    $.ajax({
        url: 'ajax/supprimer.php',
        method: 'POST',
        data: {
            nomFichier: nomFichier,
            token: token
        },
        dataType: "json",
        success: (data) => {
            if (data.success) {
                afficherSucces(data.success);
                // si la suppression est réussie, on supprime le fichier de la liste des photos
                lesFichiers.splice(lesFichiers.indexOf(nomFichier), 1);
                // Mise à jour de l'interface
                afficher();
            } else if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur('une erreur inattendue est survenue');
                    } else if (key === 'global') {
                        afficherErreur(message);
                    } else {
                        afficherErreurSaisie(key, message);
                    }
                }
            }
        },
        error: (reponse) => {
            afficherErreur("Une erreur inattendu s'est produite");
            console.error(reponse.responseText);
        }
    });
}

function controlerFichier(file) {
    afficherErreurSaisie('fichier', '');
    // définition des contraintes sur le fichier téléversé
    const controle = {
        taille: lesParametres.maxSize,
        lesExtensions: lesParametres.extensions,
    };
    if (fichierValide(file, controle)) {
        return true;
    } else {
        afficherErreurSaisie('fichier', controle.reponse);
        return false;
    }
}

function ajouter(file) {
    let monFormulaire = new FormData();
    monFormulaire.append('fichier', file);
    monFormulaire.append('token', token);

    $.ajax({
        url: 'ajax/ajouter.php',
        method: 'post',
        async: false,
        data: monFormulaire,
        processData: false,
        contentType: false,
        dataType: "json",
        success: (data) => {
            if (data.success) {
                afficherSucces("Le fichier " + data.success + "a été ajouté");
                // ajouter le nom du fichier dans le tableau
                lesFichiers.push(data.success);
                // trier le tableau
                lesFichiers.sort();
                // Mise à jour de l'interface
                afficher();
            } else if (data.error) {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur('une erreur inattendue est survenue');
                    } else {
                        afficherErreur(message);
                    }
                }
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}



