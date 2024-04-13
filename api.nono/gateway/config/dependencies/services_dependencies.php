<?php


use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;

return [

    'auth.client' => function (ContainerInterface $c) {
        $auth = gethostbyname('api.auth.nono');
        return new Client(['base_uri' => 'http://'.$auth]);
    },

    'services.client' => function (ContainerInterface $c) {
        $nono = gethostbyname('api.services.nono');
        return new Client(['base_uri' => 'http://'.$nono .':40508']);
    },
];