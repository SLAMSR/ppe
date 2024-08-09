<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Vérification du jeton
Jeton::verifier();

// Vérification de la transmission des données attendues
if (!Std::existe('login', 'password')) {
    Erreur::envoyerReponse("Tous les paramètres attendus n'ont pas été transmis", 'global');
}

// récupération des données
$login = $_POST["login"];
$password = $_POST["password"];


// vérification du login
if (!preg_match('/^[a-zA-Z]{2,}$/', $login)) {
    traiterErreur($login, $password);
} else {
    $membre = Membre::getByLogin($login);
    if (!$membre) {
        traiterErreur($login, $password);
    }
}

// vérification du mot de passe
if (!Membre::verifierPassword($membre['id'], $password)) {
    traiterErreur($login, $password);
}

// création de la variable de session
$_SESSION['membre'] = $membre;

// incrémentation du nombre de connexions


// traçabilité de la connexion


// Faut-il mémoriser cette connexion


// Vers quelle page faut-il être redirigé ?
if(isset($_SESSION['url'])) {
    $url = $_SESSION['url'];
    unset($_SESSION['url']);
} else {
    $url = '/';
}

$reponse = ['success' => $url];
echo json_encode($reponse, JSON_UNESCAPED_UNICODE);

function traiterErreur($login, $password)
{
    Erreur::envoyerReponse('Nom d’utilisateur et/ou mot de passe incorrect.', 'global');
}