"use strict";

import {
    configurerFormulaire,
    donneesValides,
    afficherErreurSaisie,
    afficherErreur,
    retournerVersApresConfirmation,
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

/*global token */

// récupération des éléments du DOM
const password = document.getElementById('password');
const passwordActuel = document.getElementById('passwordActuel');
const confirmation = document.getElementById('confirmation');
const btnValider = document.getElementById('btnValider');
const msg = document.getElementById('msg');

// configuration du formulaire
configurerFormulaire();

// interdire le 'coller' sur le champ confirmation
confirmation.onpaste = () => false;

btnValider.onclick = () => {
    if (donneesValides()) {
        if (password.value !== confirmation.value) {
            afficherErreurSaisie('confirmation', "Les mots de passe ne correpondent pas");
        } else if (password.value === passwordActuel.value) {
            afficherErreurSaisie('password', "Le nouveau mot de passe est identique à l'actuel mot de passe");
        } else {
            modifier();
        }
    }
}

password.addEventListener('input', () => {
    const pass = password.value;

    // Vérification des conditions requises
    const majusculeRegex = /[A-Z]/;
    const minusculeRegex = /[a-z]/;
    const chiffreRegex = /[0-9]/;
    const specialRegex = /[_\W]/; // Caractère spécial (non alphanumérique)
    const lengthRegex = /.{8,}/; // Au moins 8 caractères

    // Vérifier chaque condition et ajouter ou supprimer la classe correspondante
    document.getElementById('majusc').classList.toggle('validated', majusculeRegex.test(pass));
    document.getElementById('minusc').classList.toggle('validated', minusculeRegex.test(pass));
    document.getElementById('digit').classList.toggle('validated', chiffreRegex.test(pass));
    document.getElementById('special').classList.toggle('validated', specialRegex.test(pass));
    document.getElementById('length').classList.toggle('validated', lengthRegex.test(pass));
});


function modifier() {
    $.ajax({
        url: "ajax/modifier.php",
        data: {
            password: password.value,
            passwordActuel: passwordActuel.value,
            token: token
        },
        method: 'post',
        dataType: "json",
        success: (data) => {
            if (data.error) {
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
            } else {
                let message = "Votre mot de passe a bien été modifié.";
                retournerVersApresConfirmation(message, '/');
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}
