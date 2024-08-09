"use strict";

import {
    configurerFormulaire,
    donneesValides,
    afficherErreurSaisie,
    afficherErreur,
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";



/*global token */

// récupération des éléments du DOM
const login = document.getElementById('login');
const password = document.getElementById('password');

const btnValider = document.getElementById('btnValider');
const msg = document.getElementById('msg');
const passwordImg = document.getElementById('passwordImg');

// sur le clic de l'oeil, on affiche le mot de passe
passwordImg.addEventListener('click', function() {
    password.type = 'text';
    passwordImg.classList.add("bi-eye");
    passwordImg.classList.remove("bi-eye-slash");

});

// quand la souris n'est plus sur l'oeil, on cache le mot de passe
passwordImg.addEventListener('mouseout', function() {
    password.type = 'password';
    passwordImg.classList.remove("bi-eye");
    passwordImg.classList.add("bi-eye-slash");
});

// la touche entrée permet de valider le formulaire
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if(donneesValides()) {
            connecter();
        }
    }
});

btnValider.onclick = () => {
    if(donneesValides()) {
        connecter();
    }
};

login.focus();

configurerFormulaire(true);

/**
 * Vérifie que les champs de saisi sont bien renseignés
 * en absence d'erreur la demande de connexion est envoyée
 * En cas de succès l'utilisateur est redirigé vers la page monprofil.php
 */
function connecter() {
    // vider la zone de message msg
    msg.innerHTML = "";

    $.ajax({
        url: 'ajax/connecter.php',
        method: 'POST',
        data: {
            login: login.value,
            password: password.value,
            token : token
        },
        dataType: "json",
        success: data  => {
            // si la connexion est réussie, on redirige l'utilisateur
            if (data.success) {
                location.href = data.success;
            } else {
                for (const key in data.error) {
                    const message = data.error[key];
                    if (key === 'system') {
                        console.log(message);
                        afficherErreur('Une erreur inattendue est survenue');
                    } else if (key === 'global') {
                        msg.innerText =  message;
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
