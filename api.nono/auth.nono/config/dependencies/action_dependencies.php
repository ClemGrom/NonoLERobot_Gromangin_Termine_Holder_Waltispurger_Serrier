<?php


use nono\auth\api\app\actions\SignInAction;
use nono\auth\api\app\actions\SignUpAction;
use nono\auth\api\app\actions\UserRefreshAction;
use nono\auth\api\app\actions\ValidateTokenJWTAction;
use Psr\Container\ContainerInterface;

return [
    SignInAction::class => function (ContainerInterface $c) {
        return new SignInAction($c->get('authenticate.service'));
    },

    SignUpAction::class => function (ContainerInterface $c) {
        return new SignUpAction($c->get('authenticate.service'));
    },

    ValidateTokenJWTAction::class => function (ContainerInterface $c) {
        return new ValidateTokenJWTAction($c->get('authenticate.service'));
    },

    UserRefreshAction::class => function (ContainerInterface $c){
        return new UserRefreshAction($c->get('authenticate.service'));
    },
];