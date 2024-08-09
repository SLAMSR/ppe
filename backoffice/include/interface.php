<!DOCTYPE HTML>
<html lang="fr">
<head>
    <title>Amicale du Val de Somme</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
    // chargement des composants bootstrap et jquery
    echo file_get_contents('https://cdn.jsdelivr.net/gh/verghote/composant/bootstrap.html');
    echo file_get_contents('https://cdn.jsdelivr.net/gh/verghote/composant/jquery.html');
    ?>
    <link rel="stylesheet" href="/css/style.css">
    <?php
    // chargement du fichier js de la page

    // récupération du nom du fichier php appelant cela va permettre de charger l'interface correspondante : fichier html portant le même nom ou le fichier de même nom dans le dossier interface
    $file = pathinfo($_SERVER['PHP_SELF'], PATHINFO_FILENAME);
    if (file_exists("$file.js")) {
        echo "<script type='module' src='$file.js' ></script>";
    }
    if (isset($head)) {
        echo $head;
    }
    ?>
</head>
<body>
<div class="container-fluid d-flex flex-column p-0 h-100">
    <?php require __DIR__ . '/header.html' ?>
    <main>
        <?php
        if (file_exists("$file.html")) {
            require "$file.html";
        }
        ?>
    </main>
</div>
</body>
</html>
