<?php


use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;

return [

    'auth.client' => function (ContainerInterface $c) {
        return new Client(['base_uri' => 'http://api.auth.nono']);
    },

    'services.client' => function (ContainerInterface $c) {
        $nono = gethostbyname('api.services.nono');
        return new Client(['base_uri' => 'http://'.$nono]);
    },
];