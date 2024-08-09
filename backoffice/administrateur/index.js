"use strict";

import {afficherErreur, afficherSucces, confirmer, confirmerSucces} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

/**
 * Gestion des administrateurs et de leurs droits
 *    Ajout ou suppression d'un administrateur
 *    Mise en place d'une zone d'auto completion pour sélectionner le membre devant devenir administrateur
 *    Tables utilisées : membre, administrateur, fonction et droit
 */


/* global lesFonctions, lesAdministrateurs, lesMembres, autoComplete */

// récupération des éléments du DOM
let idAdministrateur = document.getElementById('idAdministrateur');
let listeFonction = document.getElementById('listeFonction');
let btnAjouter = document.getElementById('btnAjouter');
let btnSupprimerAdministrateur = document.getElementById('btnSupprimerAdministrateur');
let btnSupprimerTout = document.getElementById('btnSupprimerTout');
let btnAjouterTout = document.getElementById('btnAjouterTout');
let frmGestion = document.getElementById('frmGestion');
let msgNom = document.getElementById('msgNom');
let nomPrenom = document.getElementById('nomPrenom');

// déclaration des variables globales

let id = null; // identifiant du membre sélectionné

// gestionnaire d'événement

btnAjouter.onclick = ajouterAdministrateur;
btnSupprimerAdministrateur.onclick = () => confirmer(supprimerAdministrateur);

btnSupprimerTout.onclick = supprimerTousLesDroits;
btnAjouterTout.onclick = ajouterTousLesDroits;

idAdministrateur.onchange = chargerLesDroits;
new autoComplete({
    data: {
        src: lesMembres,
        keys: ["nom"]
    },
    placeHolder: "Nom du membre",
    selector: "#nomPrenom",
    threshold: 1,  // Nombre de caractères à saisir avant de déclencher l'autocomplétion
    debounce: 300,
    searchEngine: "strict",
    resultsList: {
        maxResults: 10  // Ajustez selon vos besoins
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                id = selection.id;
                nomPrenom.value = selection.nom;
            },
            open: () => {
                id = null;
            },
            results: (event) => {
                nomPrenom.classList.remove("erreur");
                const results = event.detail.results;
                const nb = results.length;
                if (nb === 1) {
                    nomPrenom.value = results[0].value.nom;
                    id = results[0].value.id;
                } else if (nb === 0) {
                    nomPrenom.classList.add("erreur");
                }
            }
        }
    },
});

// afficher les fonctions dans le formulaire de gestion
for (const fonction of lesFonctions) {
    let div = document.createElement('div');
    div.classList.add("d-flex", "m-3");
    let uneCase = document.createElement('input');
    uneCase.type = 'checkbox';
    uneCase.id = fonction.repertoire;
    uneCase.classList.add("form-check-input", "my-auto", "m-3");
    uneCase.style.width = '25px';
    uneCase.style.height = '25px';
    // pour permettre de récupérer toutes les cases
    uneCase.name = 'fonction';
    // le clic sur une case à cocher déclenche la mise à jour des droits de l'administrateur (ajout ou suppression)


    uneCase.onclick = function () {
        let url = uneCase.checked ? "ajax/ajouterdroit.php" : "ajax/supprimerdroit.php"
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                idAdministrateur: idAdministrateur.value,
                repertoire: fonction.repertoire
            },
            dataType: 'json',
            success: (data) => {
                if (data.success) {
                    afficherSucces("Opération réalisée avec succès");
                } else {
                    for (const key in data.error) {
                        const message = data.error[key];
                        if (key === 'global') {
                            afficherErreur(message);
                        } else {
                            afficherErreur('une erreur inattendue est survenue');
                        }
                    }
                }
            },
            error: reponse => {
                afficherErreur('Une erreur imprévue est survenue');
                console.log(reponse.responseText);
            }
        });
    };
    div.appendChild(uneCase);
    let label = document.createElement('label');
    label.innerText = fonction.nom;
    label.classList.add("my-auto");
    div.appendChild(label);
    listeFonction.appendChild(div);
}

// Selection de l'interface à afficher

if (lesAdministrateurs.length > 0) {
    frmGestion.style.display = 'block';
    // Remplir la zone de liste des administrateurs
    for (const admin of lesAdministrateurs) {
        idAdministrateur.add(new Option(admin.nom, admin.id));
    }
    chargerLesDroits();
} else {
    frmGestion.style.display = 'none';
}

// ------------------------------------------------------
// Traitement concernant l'ajout d'un administrateur
// ------------------------------------------------------

function ajouterAdministrateur() {
    msgNom.innerText = "";
    if (id == null) {
        msgNom.innerText = "Il faut sélectionner un membre dans la liste à partir de la saisie de son nom";
        return;
    }
    // demande d'ajout
    $.ajax({
        url: "ajax/ajouter.php",
        method: 'POST',
        data: {
            id: id
        },
        dataType: 'json',
        success: (data) => {
            if (data.error) {
                for (const id in data.error) {
                    const message = data.error[id];
                    if (id === 'system') {
                        
                        afficherErreur('une erreur inattendue est survenue');
                    } else  {
                        afficherErreur(message);
                    }
                }
            } else {
                // suppression dans le table lesMembres
                let index = lesMembres.findIndex(membre => membre.id === id);
                lesMembres.splice(index, 1);

                // ajout dans la zone de liste
                idAdministrateur.add(new Option(nomPrenom.value, id));
                // sélection automatique dans la zone de liste : c'est le dernier forcément
                idAdministrateur.selectedIndex = idAdministrateur.options.length - 1;

                // décocher toutes les cases (il est inutile de charger les droits en lançant chargerLesDroits() puisqu'il n'en a pas encore
                decocherCase();

                // mise à jour de l'interface

                let message = "<div class='m-3' style='text-align: justify'>" + nomPrenom.value + " fait maintenant partie des administrateurs. <br> il vous reste à sélectionner les modules qu'il peut gérer" + "</div>";
                confirmerSucces(message);
                $nomPrenom.val('');
                id = null;
                frmGestion.style.display = 'block';
            }
        },

        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}

/**
 * demande de Suppression de l'administrateur actuellement sélectionné sur l'interface
 */
function supprimerAdministrateur() {
    $.ajax({
        url: "ajax/supprimer.php",
        method: 'POST',
        data: {
            id: idAdministrateur.value
        },
        dataType: 'json',
        success: (data) => {
            if (data.error) {
                for (const id in data.error) {
                    const message = data.error[id];
                    if (id === 'system') {
                        
                        afficherErreur('une erreur inattendue est survenue');
                    } else {
                        afficherErreur(message);
                    }
                }
            } else {
                // supprimer le projet dans la liste
                idAdministrateur.removeChild(idAdministrateur[idAdministrateur.selectedIndex]);
                // s'il reste un seul élément dans la zone de liste on le retire et on affiche le formulaire d'ajout
                if (idAdministrateur.length === 0) {
                    frmGestion.style.display = 'none';
                } else {
                    chargerLesDroits();
                }
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}


//
/**
 * Récupération des droits de l'administrateur sélectionné afin de cocher les bonnes cases
 */
function chargerLesDroits() {
    $.ajax({
        url: "ajax/getlesdroits.php",
        method: 'POST',
        data: {
            idAdministrateur: idAdministrateur.value
        },
        dataType: 'json',

        success: (data) => {
                decocherCase();
                // mise à jour de l'interface en cochant les cases correspondant aux droits de l'administrateur
                if (data.length > 0) {
                    for (const fonction of data) {
                        document.getElementById(fonction.repertoire).checked = true;
                    }
                }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}

/**
 * Suppression de tous les droits de l'administrateur actuellement sélectionné sur l'interface
 * Toutes les cases sont décochées sur l'interface
 */
function supprimerTousLesDroits() {
    $.ajax({
        url: "ajax/supprimertouslesdroits.php",
        method: 'POST',
        data: {
            idAdministrateur: idAdministrateur.value
        },
        dataType: 'json',
        success: (data) => {
            if (data.error) {
                for (const id in data.error) {
                    const message = data.error[id];
                    if (id === 'system') {
                        
                        afficherErreur('une erreur inattendue est survenue');
                    } else {
                        afficherErreur(message);
                    }
                }
            } else {
                decocherCase();
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}

/**
 * Ajouter tous les droits
 * Toutes les cases sont cochées sur l'interface
 */
function ajouterTousLesDroits() {
    $.ajax({
        url: "ajax/ajoutertouslesdroits.php",
        method: 'POST',
        data: {
            idAdministrateur: idAdministrateur.value
        },
        dataType: 'json',
        success: (data) => {
            if (data.error) {
                for (const id in data.error) {
                    const message = data.error[id];
                    if (id === 'system') {
                        afficherErreur('une erreur inattendue est survenue');
                    } else {
                        afficherErreur(message);
                    }
                }
            } else {
                cocherCase();
            }
        },
        error: reponse => {
            afficherErreur('Une erreur imprévue est survenue');
            console.log(reponse.responseText);
        }
    });
}


function decocherCase() {
    for (const input of document.getElementsByName("fonction")) {
        input.checked = false;
    }
}

function cocherCase() {
    for (const input of document.getElementsByName("fonction")) {
        input.checked = true;
    }
}
