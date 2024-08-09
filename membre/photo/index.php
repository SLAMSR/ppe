<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Il faut être connecté pour accéder à cette page
Membre::controlerAcces();

// générer le jeton
$token = Jeton::creer();

// chargement des données
$titreFonction = "Votre photo";

$present = 1;
$photo = Membre::getPhoto($_SESSION['membre']['id']);
if ($photo === null) {
    $photo = '';
    $present = 0;
}
$lesParametres = require RACINE . '/classemetier/configmembre.php';
$lesParametres = json_encode($lesParametres);

// transmission des données à l'interface
$head = <<<EOD
 <script>
    const token = '$token';
    const photo = '$photo';
    let present = $present;
    let lesParametres = $lesParametres;
 </script>
EOD;


// chargement de l'interface
require RACINE . "/include/interface.php";


