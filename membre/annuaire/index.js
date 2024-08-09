"use strict";

/* global lesMembres */


// récupération des éléments de l'interface
let listeMembres = document.getElementById('listeMembres');
listeMembres.innerHTML = "";
let row = document.createElement('div');
row.classList.add("row");
for (const membre of lesMembres) {
    let col = document.createElement('td');
    col.classList.add("col-xl-4", "col-lg-4", "col-md-6", "col-sm-6", "col-12");

    let cadre = document.createElement('div');
    cadre.classList.add('card', 'm-1', "d-flex", "flex-row", "justify-content-between");

    let coordonnees = document.createElement('div');
    let contenu = `<strong>${membre.nom} ${membre.prenom}</strong>`;
    if (membre.mail !== 'Non communiqué') {
        contenu += `<br>${membre.mail}`;
    } else {
        contenu += `<br><span style="font-style: italic">Adresse mail masquée</span>`;
    }
    if (membre.telephone !== 'Non renseigné') {
        contenu += ` <br>${membre.telephone}`;
    } else {
        contenu += `<br><span style="font-style: italic">Téléphone non renseigné</span>`;
    }
    coordonnees.innerHTML = contenu;
    cadre.appendChild(coordonnees);


    let photo = document.createElement('div');
    photo.style.height = '100px';
    photo.style.width = '110px';

    let img = document.createElement('img');
    img.src = membre.photo;
    img.alt = "";
    img.style.maxWidth = '100px';
    img.style.maxHeight = '100px';
    photo.appendChild(img);
    cadre.appendChild(photo);


    col.appendChild(cadre);
    row.appendChild(col);
}

listeMembres.appendChild(row);


