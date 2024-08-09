<?php

/**
 *  supprimer un administrateur
 */
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

if (!isset($_POST['id']) || !filter_var($_POST['id'], FILTER_VALIDATE_INT)) {
    Erreur::envoyerReponse("Requête mal formulée");
}

// récupération des données transmises
$id = intval($_POST["id"]);


Administrateur::supprimerAdministrateur($id);
echo json_encode(['success' => "Opération réalisée avec succès"], JSON_UNESCAPED_UNICODE);
