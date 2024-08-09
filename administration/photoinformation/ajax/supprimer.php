<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . '/include/autoload.php';

// vérification de la transmission du paramètre
if (!isset($_POST['nomFichier'])) {
    Erreur::envoyerReponse("Le nom du fichier à supprimer n'est pas transmis", 'global');
}

// récupération du nom du fichier
$nomFichier = trim($_POST['nomFichier']);

// vérification de la valeur transmise
if (strlen($nomFichier) === 0) {
    Erreur::envoyerReponse("Le nom du fichier n'est pas renseigné", 'global');
}

// récupération des paramètres du téléversement
$lesParametres = require $_SERVER['DOCUMENT_ROOT'] . '/.config/photo.php';

//  chemin complet vers le fichier
$fichier = RACINE . $lesParametres['repertoire'] . '/' . $nomFichier;

// Vérification que le fichier est bien dans le répertoire autorisé
if (strpos(realpath($fichier), realpath(RACINE . $lesParametres['repertoire'])) !== 0) {
    Erreur::envoyerReponse("Tentative d'attaque par injection de chemin", 'global');
}

// suppression du fichier
if (unlink($fichier)) {
    echo json_encode(['success' => "La photo vient d'être supprimée"]);
} else {
    Erreur::envoyerReponse("Cette photo n'existe pas", 'global');
}
