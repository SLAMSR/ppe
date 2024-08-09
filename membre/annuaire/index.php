<?php
declare(strict_types=1);
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// controle d'accès
Membre::controlerAcces();

// chargement des données
$titreFonction = "Annuaire des membres";

$lesMembres = json_encode(Membre::getLesMembres());
// transmission des données à l'interface
$head = <<<EOD
    <script>
        let lesMembres = $lesMembres;
    </script>
EOD;

// chargement de l'interface
require RACINE . "/include/interface.php";


