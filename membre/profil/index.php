<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Il faut être connecté pour accéder à cette page
Membre::controlerAcces();

// Génération du jeton
$token = Jeton::creer();

// chargement des données
$titreFonction = "Votre profil";

$data = json_encode((Membre::getById($_SESSION['membre']['id'])));

// transmission des données à l'interface
$head = <<<EOD
    <script>
        let data = $data;
        let token = '$token';
    </script>
EOD;

// chargement des ressources spécifiques de l'interface


// chargement de l'interface
require RACINE . "/include/interface.php";