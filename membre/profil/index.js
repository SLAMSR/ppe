"use strict";

/**
 * Consultation des informations
 * Possibilité de renseigner son téléphone et l'autorisation d'affichage de son email dans l'annuaire du club
 * Possibilité d'ajouter sa photo dans les dimensions demandées : 200 * 200
 */

/*global data, token */

// récupération des éléments de l'interface
import {
    afficherErreur, afficherErreurSaisie,
    afficherSucces,
    configurerFormulaire,
    donneesValides,
    filtrerLaSaisie
} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

const nom = document.getElementById('nom');
const email = document.getElementById('email');
const telephone = document.getElementById('telephone');
const autMail = document.getElementById('autMail');
const btnModifier = document.getElementById('btnModifier');


// afficher les informations
nom.value = data.nom + ' ' + data.prenom;
email.value = data.email;

telephone.value = data.telephone;

// le téléphone n'est pas forcément renseigné
if (data.telephone !== null) {
    telephone.value = data.telephone;
} else {
    telephone.value = '';
}

// Case pour l'autorisation de l'affichage du mail dans l'annuaire du club
autMail.checked = data.autMail === 1;

configurerFormulaire();

btnModifier.onclick = () => {
    if (donneesValides()) {
        $.ajax({
            url: 'ajax/modifier.php',
            method: 'POST',
            data: {
                telephone: telephone.value,
                autMail: autMail.checked ? 1 : 0,
                token: token
            },
            dataType: 'json',
            success: (data) => {
                if (data.success) {
                    // Mise à jour de l'interface
                    afficherSucces("Opération réalisée avec succès");
                } else {
                    for (const id in data.error) {
                        const message = data.error[id];
                        if (id === 'system') {
                            
                            afficherErreur('une erreur inattendue est survenue');
                        } else if (id === 'global') {
                            afficherErreur(message);
                        } else  {
                            afficherErreurSaisie(id, message );
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
};


// Traitement sur le champ téléphone
filtrerLaSaisie('telephone', /[0-9]/);


