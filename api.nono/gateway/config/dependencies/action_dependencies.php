<?php

use nono\gate\app\actions\authentification\MethodAuthentificationAction;
use Psr\Container\ContainerInterface;

return[

    MethodAuthentificationAction::class => function (ContainerInterface $c){
        return new MethodAuthentificationAction($c->get('auth.client'));
    },
];