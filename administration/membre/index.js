"use strict";

/* global data */

let lesLignes = document.getElementById('lesLignes');

for (const membre of data) {
    let tr = lesLignes.insertRow();
    tr.insertCell().innerText = membre.login;
    tr.insertCell().innerText = membre.actif;
    tr.insertCell().innerText = membre.nom + ' ' + membre.prenom;
    tr.insertCell().innerText = membre.email;
    tr.insertCell().innerText = membre.afficherMail;
    tr.insertCell().innerText = membre.photo;
    tr.insertCell().innerText = membre.telephone ;

}


