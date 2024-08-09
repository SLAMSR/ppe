<?php

// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès
Administrateur::controlerAcces();

// générer le jeton
$token = Jeton::creer();

// récupération des séances

// récupération des séances
$data =  json_encode(Epreuve::getAll());

// chargement de l'interface
$titreFonction = "Planification des 4 saisons";
// transmission des données à l'interface
$head = <<<EOD
    <script>
        let lesEpreuves = $data;
        let token = '$token';
    </script>
EOD;


// chargement des composants
$head .= "<script src='https://cdn.jsdelivr.net/gh/verghote/composant/ckeditor/ckeditor.js'></script>";
// chargement de l'interface
require RACINE . "/include/interface.php";