<?php
declare(strict_types=1);
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// chargement des données
$ligne = Page::getById(1);
$titreFonction = $ligne['nom'];

$data = json_encode($ligne);

// transmission des données à l'interface
$head = <<<EOD
    <script>
        let data = $data
    </script>
EOD;

// chargement de l'interface
require RACINE . "/include/interface.php";


