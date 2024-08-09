"use strict";

/* global lesPages, CKEDITOR, token */

// récupération des données passées par le contrôleur
    import {afficherErreur, afficherSucces} from "https://cdn.jsdelivr.net/gh/verghote/composant/fonction.js";

let page = document.getElementById('page');
let nom = document.getElementById('nom');
let contenu = document.getElementById('contenu');
let btnModifier = document.getElementById('btnModifier');
CKEDITOR.replace('contenu', {height: '700px'});

// Alimentation de la zone de liste
for (const element of lesPages) {
    page.add(new Option(element.nom, element.id));
}


CKEDITOR.instances.contenu.setData(lesPages[page.selectedIndex].contenu);
nom.innerText = lesPages[page.selectedIndex].nom;

// procédure événementielle

page.onchange = () => {
    CKEDITOR.instances.contenu.setData(lesPages[page.selectedIndex].contenu);
    nom.innerText = lesPages[page.selectedIndex].nom;
};

btnModifier.onclick = () => {
    contenu.value = CKEDITOR.instances.contenu.getData();
    $.ajax({
        url: '/ajax/modifiercolonne.php',
        method: 'POST',
        data: {
            table: 'page',
            colonne: 'contenu',
            valeur: contenu.value,
            id: lesPages[page.selectedIndex].id,
            token: token
        },
        dataType: 'json',
        success: (data) => {
            if (data.success) {
                afficherSucces("Opération réalisée avec succès");
                // mise à jour du tableau
                lesPages[page.selectedIndex].contenu = contenu.value;
            } else {
                for (const id in data.error) {
                    const message = data.error[id];
                    if (id === 'system') {
                        afficherErreur('une erreur inattendue est survenue');
                    } else if (id === 'global') {
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
};

