<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Vérification du jeton
Jeton::verifier();

// controle d'accès
Membre::controlerAcces();

// vérification des paramètres
if (!isset($_POST['telephone'], $_POST['autMail'])) {
    Erreur::envoyerReponse("Paramètre manquant", 'global');
}

// récupération des données transmises
$telephone = $_POST['telephone'];
$autMail = $_POST['autMail'];
$id = $_SESSION['membre']['id'];

// contrôle des données
if ($telephone != '' &&  (!Std::fixeValide($telephone) && !StdfixeValide($telephone))) {
    Erreur::envoyerReponse("Le numéro de téléphone n'est pas valide", 'telephone');
}

if ($autMail != 1 && $autMail != 0) {
    Erreur::envoyerReponse("La valeur de l'autorisation d'affichage de l'email n'est pas valide", 'autMail');
}

// modification
Membre::modifierProfil($id, $telephone, $autMail);

echo json_encode(['success' => 'Profil modifié avec succès']);


