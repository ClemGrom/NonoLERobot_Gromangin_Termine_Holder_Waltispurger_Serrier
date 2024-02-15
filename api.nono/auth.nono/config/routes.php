<?php

declare(strict_types=1);

use nono\auth\api\app\actions\GetProfileAction;
use nono\auth\api\app\actions\ModifyProfileAction;
use nono\auth\api\app\actions\SigninAction;
use nono\auth\api\app\actions\SignupAction;
use nono\auth\api\app\actions\UserRefreshAction;
use nono\auth\api\app\actions\ValidateTokenJWTAction;
use Slim\App;

return function (App $app): void {

    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    $app->get('/', function ($request, $response, $args) {
        $response->getBody()->write("Welcome to the auth.nono API!");
        return $response;
    });

    $app->post('/api/users/signin', SigninAction::class)
        ->setName('sign_in');

    $app->post('/api/users/signup', SignupAction::class)
        ->setName('sign_up');

    $app->get('/api/users/validate', ValidateTokenJWTAction::class)
        ->setName('validateTokenJWT');

    $app->post('/users/refresh', UserRefreshAction::class)
        ->setName('refreshUser');

    $app->get('/api/users/profile', GetProfileAction::class)
        ->setName('get_profile');

    $app->patch('/api/users/edit', ModifyProfileAction::class)
        ->setName('modify_profile');
};