<?php
declare(strict_types=1);
/**
 * Affichage d'un document avec comptabilisation de la demande
 */

// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// vérification du paramètre attendu :
if (!isset($_GET['id']) || empty($_GET['id'])) {
    Erreur::envoyerReponse("Le document n'est pas précisé", 'global');
}

// récupération du paramètre attendu
$id = $_GET['id'];

// contrôle de la validité du paramètre
if (!preg_match('/^[0-9]+$/', $id)) {
    Erreur::envoyerReponse("votre demande n'est pas conforme", 'global');
}

// récupération du document correspondant



// le document doit être présent dans la table document


// récupération des données du document


// Si le document demandé est réservé aux membres, il faut être connecté


// Le document doit être présent dans le répertoire /data/document (fort probable)





// afficher le document à l'écran

