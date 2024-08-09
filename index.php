<?php
declare(strict_types=1);


// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

//  comptabilisation de l'appel de la page


//  comptabilisation de la visite


// la connexion est-elle conservée dans un cookie 'membre' mais pas encore dans la session 'membre'


// chargement des données

// Chargement des classements présents dans le répertoire 'data/classement'
// parcours du répertoire afin de stoker dans le tableau $lesFichiers les noms des fichiers PDF



// Prochaine édition des 4 saisons
$prochaineEdition = json_encode(Epreuve::getProchaineEpreuve());

// récupération des informations : astuce si membre connecté % permet de voir toutes les informations (donc ajout des informations privées)


// les logos des partenaires


// récupération des documents consultables par tous


// transmission des données à l'interface
$head = <<<EOD
    <script>
        let prochaineEdition = $prochaineEdition;
    </script>
EOD;

// récupération des documents pour les membres


// chargement de l'interface
require RACINE . "/include/interface.php";


