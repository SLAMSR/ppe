<?php
return [
    'repertoire' => '/data/photoinformation',
    'extensions' => ["jpg", "png", "webp", "avif"] ,
    'types' => ["image/pjpeg", "image/jpeg", "x-png", "image/png", "image/webp",  "image/avif", "image/heif"],
    'maxSize' => 350 * 1024,
    'require' => true,
    'rename' => false,
    'sansAccent' => true,
    'redimensionner' => false,
    'height' => 550,
    'width' => 350
];


