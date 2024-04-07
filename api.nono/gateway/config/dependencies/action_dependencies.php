<?php

use nono\gate\app\actions\authentification\MethodAuthentificationAction;
use nono\gate\app\actions\authentification\MethodPartiesAction;
use Psr\Container\ContainerInterface;

return[

    MethodAuthentificationAction::class => function (ContainerInterface $c){
        return new MethodAuthentificationAction($c->get('auth.client'));
    },

    MethodPartiesAction::class => function (ContainerInterface $c) {
        return new MethodPartiesAction($c->get('services.client'));
    }
];