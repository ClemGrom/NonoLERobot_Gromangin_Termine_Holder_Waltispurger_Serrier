<?php

use nono\auth\api\domain\service\classes\AuthService;
use nono\auth\api\domain\service\classes\JWTManager;
use Psr\Container\ContainerInterface;


return [
    'auth.provider' => function (ContainerInterface $c) {
        return new AuthService();
    },

    'jwt.manager' => function (ContainerInterface $c) {
        return new JWTManager($c->get('jwt.secret'), $c->get('jwt.ttl'));
    },

];
