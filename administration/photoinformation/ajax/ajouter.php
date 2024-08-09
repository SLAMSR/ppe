<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . '/include/autoload.php';

// Vérification du jeton
Jeton::verifier();

// Récupération des paramètres du téléversement
$lesParametres = require $_SERVER['DOCUMENT_ROOT']  . "/.config/photo.php";

// instanciation et paramétrage d'un objet InputFile
$file = new InputFileImg($lesParametres);
$file->Directory = RACINE . $lesParametres['repertoire'];

// contrôle de l'objet
if ($file->checkValidity()) {
    // copie du fichier
    $file->copy();
    // réponse du serveur : nom du fichier stocké
    echo json_encode(['success' => $file->Value]);
} else {
    echo json_encode(['error' => ['fichier' => $file->getValidationMessage()]]);
}


