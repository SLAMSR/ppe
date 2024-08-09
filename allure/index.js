"use strict";

let minute = document.getElementById('minute');
let seconde = document.getElementById('seconde');
let lesLignes = document.getElementById('lesLignes');

minute.onchange = afficher;
seconde.onchange = afficher;
// alimentation des zones de liste
for (let i = 2; i <= 7; i++) {
    minute.add(new Option(i, i));
}
minute.value = 4;
for (let i = 0; i <= 59; i++) {
    seconde.add(new Option(i, i));
}
seconde.value = 15;
afficher();

/**
 * conversion d'un nombre de secondes en heure minute et seconde
 * @param nbSeconde {int}
 * @returns {string}
 */
function getAllure(nbSeconde) {
    let seconde = nbSeconde % 60;
    let resteEnMn = (nbSeconde - seconde) / 60
    let minute = resteEnMn % 60;
    let heure = (resteEnMn - minute) / 60
    let minuteT = '0' + minute;
    let seT = '0' + seconde;
    let hT = '0' + heure;
    return hT.slice(-2) + ":" + minuteT.slice(-2) + ':' + seT.slice(-2);
}

function afficher() {
    lesLignes.innerHTML = '';
    let leSemi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21.1];

    let leMarathon = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42.2];
    let le100 = [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

    for (const i in leSemi) {
        let tr = lesLignes.insertRow();

        let nbSecondeAuKm = (Number(minute.value) * 60 + Number(seconde.value));

        tr.insertCell().innerHTML = leSemi[i] + " Km";

        let td = tr.insertCell();
        td.style.textAlign = 'center';
        let nbSeconde = Math.ceil(nbSecondeAuKm * leSemi[i]);
        td.innerText = getAllure(nbSeconde);

        tr.insertCell().innerHTML = leMarathon[i] + " Km";

        td = tr.insertCell();
        td.style.textAlign = 'center';
        nbSeconde = Math.ceil(nbSecondeAuKm * leMarathon[i]);
        td.innerText = getAllure(nbSeconde);

        tr.insertCell().innerHTML = le100[i] + " Km";

        td = tr.insertCell();
        td.style.textAlign = 'center';
        nbSeconde = Math.ceil(nbSecondeAuKm * le100[i]);
        td.innerText = getAllure(nbSeconde);
    }
}
