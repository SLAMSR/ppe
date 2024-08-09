"use strict";

import {
    afficherErreur, afficherErreurSaisie,
    configurerFormulaire,
    donneesValides, enleverAccent,
    filtrerLaSaisie, retournerVers, supprimerEspace
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

/* global token */

const msg = document.getElementById('msg');
let nom = document.getElementById('nom');
let prenom = document.getElementById('prenom');
let email = document.getElementById('email');
let btnAjouter = document.getElementById('btnAjouter');

// traitement associé au bouton 'Ajouter'
btnAjouter.onclick = () => {
    // mise en forme des données
    nom.value = enleverAccent(supprimerEspace(nom.value)).toUpperCase();
    prenom.value = enleverAccent(supprimerEspace(prenom.value)).toUpperCase();
    // contrôle des champs de saisie
    if (donneesValides()) {
        ajouter();
    }
};

// limiter les caractères autorisés lors de la frappe sur le champ nom
filtrerLaSaisie('nom', /^[A-Za-z ]$/);
nom.focus();

// limiter les caractères autorisés lors de la frappe sur le champ prenom
filtrerLaSaisie('prenom', /^[A-Za-z ]$/);

configurerFormulaire();


/**
 * Contrôle des informations saisies et demande d'ajout côté serveur
 */
function ajouter() {
    msg.innerText = '';
    $.ajax({
        url: '/ajax/ajouter.php',
        type: 'POST',
        data: {
            table : 'membre',
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            token: token
        },
        dataType: 'json',
        success: (data) => {
            if (data.success) {
                retournerVers("Le nouveau membre a été ajouté", '.');
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
