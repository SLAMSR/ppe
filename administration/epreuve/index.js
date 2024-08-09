"use strict";

import {
    configurerFormulaire,
    donneesValides,
    afficherErreur,
    afficherErreurSaisie,
    afficherSucces,
    donneesModifiees
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

/* global lesEpreuves, CKEDITOR, token */

// objet global contenant les informations ssur l'épreuve 
let element;


// récupération des éléments de l'interface
const id = document.getElementById('id');
const msg = document.getElementById('msg');
const date = document.getElementById('date');
const description = document.getElementById('description');
const dateOuverture = document.getElementById('dateOuverture');
const dateFermeture = document.getElementById('dateFermeture');
const urlInscription = document.getElementById('urlInscription');
const urlInscrit = document.getElementById('urlInscrit');

const btnModifier = document.getElementById('btnModifier');

CKEDITOR.replace('description', {height: '100px'});

configurerFormulaire(true);

// sur le changement de catégorie, il faut récupérer les informations de la catégorie
id.onchange = afficher;

// demande de modification d'une catégorie
btnModifier.onclick = () => {
    description.value = CKEDITOR.instances.description.getData();
    if ( donneesModifiees(element) && donneesValides()) {
        // des contrôles supplémentaires sont necessaires pour la chronoligie des dates
        if (dateOuverture.value >= dateFermeture.value || dateFermeture.value >= date.value) {
            afficherErreur("Les dates saisies sont incohérentes");
        } else {
            modifier();
        }
    }
};


// alimentation de la zone de liste des épreuves
for (const element of lesEpreuves) {
    id.add(new Option(element.saison, element.id));
}

// charger les informations de la catégorie actuellement sélectionnée
afficher();


function afficher() {
    element = lesEpreuves[id.selectedIndex];
    date.value = element.date;
    description.value = element.description;
    dateOuverture.value = element.dateOuverture;
    dateFermeture.value = element.dateFermeture;
    urlInscription.value = element.urlInscription;
    urlInscrit.value = element.urlInscrit;
    CKEDITOR.instances.description.setData(element.description);
}

function modifier() {
    msg.innerText = '';
    // transmission des paramètres
    const lesValeurs = {};
    if (date.value !== element.date) {
        lesValeurs.date = date.value;
        element.date = date.value;
    }
    if (description.value !== element.description) {
        lesValeurs.description = description.value;
        element.description = description.value;
    }
    if (dateFermeture.value !== element.dateFermeture) {
        lesValeurs.dateFermeture = dateFermeture.value;
        element.dateFermeture = dateFermeture.value;
    }
    if (dateOuverture.value !== element.dateOuverture) {
        lesValeurs.dateOuverture = dateOuverture.value;
        element.dateOuverture = dateOuverture.value;
    }
    if (urlInscription.value !== element.urlInscription) {
        lesValeurs.urlInscription = urlInscription.value;
        element.urlInscription = urlInscription.value;
    }

    if (urlInscrit.value !== element.urlInscrit) {
        lesValeurs.urlInscrit = urlInscrit.value;
        element.urlInscrit = urlInscrit.value;
    }

    $.ajax({
        url: '/ajax/modifier.php',
        method: 'POST',
        async: false,
        data: {
            table : 'epreuve',
            id: id.value,
            lesValeurs : JSON.stringify(lesValeurs),
            token: token
        },
        dataType: "json",
        success: data => {
            if (data.success) {
                afficherSucces("Modification enregistrée");
                // réaliser les modifications dans le tableau
                lesEpreuves[id.selectedIndex] = element;
            } else {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        afficherErreur('une erreur inattendue est survenue');
                    } else if (key === 'global') {
                        msg.innerText = message;
                    } else {
                        afficherErreurSaisie(key, message);
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

