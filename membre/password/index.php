<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Il faut être connecté pour accéder à cette page
Membre::controlerAcces();

// générer le jeton
$token = Jeton::creer();

// chargement des données
$titreFonction = "Changer votre mot de passe";

// transmission des données à l'interface
$head = <<<EOD
 <script>
    let token = '$token';
 </script>
EOD;


// chargement de l'interface
require RACINE . "/include/interface.php";


