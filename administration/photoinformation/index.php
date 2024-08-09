<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès
Administrateur::controlerAcces();

// génération d'un token pour garantir l'origine des appels vers les autres scripts du module
$token = Jeton::creer();

// Récupération des paramètres du téléversement
$lesParametres = require $_SERVER['DOCUMENT_ROOT']  . "/.config/photo.php";

// chargement des données utilisées par l'interface
$lesFichiers = json_encode(Std::getLesFichiers(RACINE . $lesParametres['repertoire'], $lesParametres['extensions']));
$lesParametres = json_encode($lesParametres);

$head =<<<EOD
<script>
     let lesFichiers = $lesFichiers;
     let lesParametres = $lesParametres;
     const token = '$token';
</script>
EOD;

// chargement de l'interface
require RACINE . "/include/interface.php";
