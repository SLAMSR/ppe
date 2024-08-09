<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Vérification du jeton
Jeton::verifier();


// récupération des données
$id = $_SESSION['membre']['id'];
$photo = Membre::getPhoto($id);

// Récupération des paramètres du téléversement
$lesParametres = require RACINE . '/classemetier/configmembre.php';
$repertoire = $lesParametres['repertoire'];

// suppression de la photo dans la table membre
Membre::supprimerPhoto($id);

// suppression sur le serveur
if ($photo !== null) {
    unlink(RACINE .  '/'  . $photo);
}



// réponse du serveur : nom du fichier stocké
echo json_encode(['success' => "Votre photo a été supprimée avec succès"], JSON_UNESCAPED_UNICODE);