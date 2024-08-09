<?php
declare(strict_types=1);
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès : il faut être connecté et être un administrateur
if (!isset($_SESSION['membre']) || !Administrateur::estUnAdministrateur($_SESSION['membre']['id'])) {
    Erreur::envoyerReponse("Vous devez être administrateur pour accéder à cette page", 'global');
}

// chargement des données
$data = json_encode(Administrateur::getLesFonctionsAutorisees($_SESSION['membre']['id']));

// transmission des données à l'interface
$head = <<<EOD
    <script>
        let data = $data;
    </script>
EOD;


// chargement de l'interface
require RACINE . "/include/interface.php";