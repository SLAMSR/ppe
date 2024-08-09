<?php
declare(strict_types=1);
// paramètres pour la photo d'unmembre
return [
    'repertoire' => '/data/photomembre',
    'extensions' => ["jpg", "png"],
    'types' => ["image/pjpeg", "image/jpeg", "x-png", "image/png"],
    'maxSize' => 200 * 1024,
    'require' => false,
    'rename' => true,
    'sansAccent' => true,
    'redimensionner' => true,
    'height' => 200,
    'width' => 200,
    'accept' => '.jpg, .png',
];
