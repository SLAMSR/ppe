<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès
Membre::controlerAcces();

// générer le jeton
$token = Jeton::creer();

// chargement des données
$lesPages = json_encode(Page::getAll());

// transmission des données à l'interface
$head = <<<EOD
    <script>
        let lesPages = $lesPages;
        let token = '$token';
    </script>
EOD;

// chargement des composants
    $head .= "<script src='https://cdn.jsdelivr.net/gh/verghote/composant/ckeditor/ckeditor.js'></script>";

// chargement de l'interface
require RACINE . "/include/interface.php";