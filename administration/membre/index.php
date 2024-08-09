<?php
// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// Contrôle de l'accès
Administrateur::controlerAcces();

// chargement des données utilisées par l'interface
$titreFonction = "Liste des membres";

$data = json_encode(Membre::getAll());

$head =<<<EOD
<script >
    let  data = $data;
</script>
EOD;


// chargement interface
require RACINE . '/include/interface.php';