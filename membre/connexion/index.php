<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Si l'utilisateur est déja connecté, on le redirige vers son profil
if (isset($_SESSION['membre'])) {
    header("location:/");
    exit;
}

// générer le jeton
$token = Jeton::creer();

// chargement des données
$titreFonction = "Se connecter";

//  Comptabilisation de l'appel


// transmission des données à l'interface
$head = <<<EOD
 <script>
    let token = '$token';
 </script>
EOD;


// chargement de l'interface
require RACINE . "/include/interface.php";


