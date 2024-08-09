<?php

// personnalisation de l'entête de page : bouton Se connecter ou Se déconnecter
$barre = "<a class='btn btn-sm btn-danger m-2 shadow-sm' href='/membre/connexion'>Se connecter</a>";
if (isset($_SESSION['membre'])) {

    $id = $_SESSION['membre']['id'];
    $nom = $_SESSION['membre']['prenom'] . " " . $_SESSION['membre']['nom'];

    $barre = <<<EOD
            <div class="dropdown">
                   <button class="btn dropdown-toggle"  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <div style="border: 2px solid green; border-radius: 10px; padding: 3px; color:white"> 
                                 🏃‍ Mon compte
                    </div>
               </button>
               <ul class="dropdown-menu">
                        <li>
                            <button class="dropdown-item" type="button">
                              <a href='/membre/profil'><i class="bi bi-person-gear"></i></i>Mon profil</a>
                            </button>
                        </li>
EOD;

    if (Administrateur::estUnAdministrateur($id)) {
        $barre .= <<<EOD
                        <li>
                            <button class="dropdown-item" type="button">
                                <a href='/administration'><i class="bi bi-person"></i>Mes fonctions d'administration</a>
                            </button>
                        <li>
EOD;
    }
    $barre .= <<<EOD
                        <li>
                            <button class="dropdown-item" type="button">
                                <a href='/membre/deconnexion'><i class="bi bi-box-arrow-right"></i>Se déconnecter</a>
                            </button>
                        </li>
               </ul>
            </div>
EOD;

}



?>

<a href="/" title="Revenir sur la page d'accueil">
    <img class="img-fluid " src="/img/logo.gif" alt="Val de Somme">

</a>
<span class="text-white masquer ">Club de course à pied sur Amiens et ses environs</span>

<div class="text-white px-2">
    <?= $barre ?>
</div>