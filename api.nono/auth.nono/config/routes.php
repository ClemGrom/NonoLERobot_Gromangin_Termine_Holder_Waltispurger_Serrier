<?php
declare(strict_types=1);

use nono\auth\api\app\actions\SignInAction;
use nono\auth\api\app\actions\SignUpAction;
use nono\auth\api\app\actions\UserRefreshAction;
use nono\auth\api\app\actions\ValidateTokenJWTAction;

return function( \Slim\App $app):void {
    $app->post("/signin",SignInAction::class)->setName("signIn");
    $app->post("/signup",SignUpAction::class)->setName("signup");
    $app->post('/users/refresh', UserRefreshAction::class)->setName('refreshUser');
    $app->get('/users/validate', ValidateTokenJWTAction::class)
        ->setName('validateTokenJWT');
};