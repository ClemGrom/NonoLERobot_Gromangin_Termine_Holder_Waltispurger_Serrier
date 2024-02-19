<?php


use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;

return [

    'auth.client' => function (ContainerInterface $c) {
        return new Client(['base_uri' => 'http://api.auth.nono']);
    },

];