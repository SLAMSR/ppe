<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Vérification du jeton
Jeton::verifier();

// vérification de la transmission des données attendues
if (!isset($_FILES['fichier'])) {
    Erreur::envoyerReponse("Paramètre manquant", 'global');
}

// récupération des données ; ne pas encoder avec htmlspecialchar sinon pb avec checkvalidity (' par exemple)
$id = $_SESSION['membre']['id'];
$photo = Membre::getPhoto($id);

// Récupération des paramètres du téléversement
$lesParametres = require RACINE . '/classemetier/configmembre.php';
$repertoire = $lesParametres['repertoire'];

// instanciation et paramétrage d'un objet InputFile
$file = new InputFileImg($lesParametres);
$file->Directory = RACINE . $lesParametres['repertoire'];

// contrôle de l'objet $file
if (!$file->checkValidity()) {
    Erreur::envoyerReponse($file->getValidationMessage(), 'fichier');
}

// Si une ancienne photo existe, il faut la supprimer sauf s'il s'agit de la photo par défault
if ($photo !== null) {
    unlink(RACINE . $photo);
}

// copie du fichier
$file->copy();

// mise à jour de la photo dans la table membre
Membre::modifierPhoto($id, $file->Value);

// réponse du serveur : nom du fichier stocké
echo json_encode(['success' => $file->Value], JSON_UNESCAPED_UNICODE);