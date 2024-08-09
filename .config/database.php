<?php

$isLocal = ($_SERVER['SERVER_NAME'] === 'ppe' || $_SERVER['SERVER_NAME'] === 'localhost');

if ($isLocal) {
    return [
        'host' => 'localhost',
        'user' => 'root',
        'password' => '',
        'database' => 'correctionppe',
        'port' => 3306,
        'charset' => 'utf8',
        'errmode' => PDO::ERRMODE_EXCEPTION,
        'fetchmode' => PDO::FETCH_ASSOC
    ];
} else {
    return [
        'host' => 'adresse_serveur_production',
        'user' => 'utilisateur_production',
        'password' => 'mot_de_passe_production',
        'database' => 'nom_base_production',
        'port' => 3306,
        'charset' => 'utf8',
        'errmode' => PDO::ERRMODE_EXCEPTION,
        'fetchmode' => PDO::FETCH_ASSOC
    ];
}