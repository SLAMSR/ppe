"use strict";


/*global data */


// récupération des éléments du DOM
let fonctions = document.getElementById('fonctions');

// chargement des données
for (let element of data) {
    let a = document.createElement('a');
    a.className = "my-3";
    a.style.display = "block";
    a.style.color = "#1d1d1d";
    a.href = '/administration/' + element.repertoire;

    // Création de l'élément <i> pour l'icône
    let i = document.createElement('i');
    i.setAttribute('class', 'p-2 bi bi-tools bg-light rounded-circle');

    // Ajout du texte à l'intérieur de l'élément <a>
    a.appendChild(i);
    a.appendChild(document.createTextNode(element.nom));

    // Ajout de l'élément <a> au document
    fonctions.appendChild(a);
}
