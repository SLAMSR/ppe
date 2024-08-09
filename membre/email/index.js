"use strict";

import {
    configurerFormulaire,
    donneesValides,
    afficherErreurSaisie,
    afficherErreur,
    retournerVersApresConfirmation
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

/*global token, emailActuel */


// récupération des éléments du DOM
document.getElementById('emailActuel').value = emailActuel;
const email = document.getElementById('email');
const btnValider = document.getElementById('btnValider');

// configuration du formulaire
configurerFormulaire();

btnValider.onclick = () => {
    if (donneesValides()) {
            modifier();
    }
};

function modifier() {
    $.ajax({
        url: "ajax/modifier.php",
        data: {
            email : email.value,
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
                let message = "Votre nouvelle adresse mail a été prise en compte.";
                retournerVersApresConfirmation(message, '/');
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}
