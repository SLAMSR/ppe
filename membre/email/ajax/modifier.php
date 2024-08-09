<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Vérification du jeton
Jeton::verifier();

// vérification des données attendues
if (!Std::existe('email')) {
    Erreur::envoyerReponse("Paramètre manquant", 'global');
}

// récupérer les données transmises
$email = $_POST['email'];
$id = $_SESSION['membre']['id'];

// vérification de la validité du mot de passe actuel
if (!Std::emailValide($email)) {
    Erreur::envoyerReponse('Email non valide', 'email');
}

// Mise à jour du mot de passe
Membre::modifierEmail($id, $email);
$_SESSION['membre']['email'] = $email;

$reponse = ['success' => "Opération réalisée avec succès"];
echo json_encode($reponse, JSON_UNESCAPED_UNICODE);
