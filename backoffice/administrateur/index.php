<?php
/**
 *  Ajout ou suppression d'un administrateur : membre qui va recevoir des droits sur les fonctionnalités du menu gérer
 *  Attribution de ses droits
 *
 */

// activation du chargement dynamique des ressources
require $_SERVER['DOCUMENT_ROOT'] . "/include/autoload.php";

// récupération des administrateurs et des fonctions
$lesAdministrateurs = json_encode(Administrateur::getLesAdministrateurs());
$lesFonctions = json_encode(Administrateur::getLesFonctions());
$lesMembres = json_encode(Administrateur::getLesMembres());

// transmission des données à l'interface
$head = <<<EOD
    <script>
        let lesAdministrateurs = $lesAdministrateurs;
        let lesFonctions = $lesFonctions;
        let lesMembres = $lesMembres;
    </script>
EOD;

// chargement des ressources
$head .= file_get_contents('https://verghote.github.io/composant/autocomplete2.html');

// chargement de l'interface
require RACINE . "/backoffice/include/interface.php";
