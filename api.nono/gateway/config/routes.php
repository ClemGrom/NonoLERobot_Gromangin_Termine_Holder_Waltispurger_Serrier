<?php
declare(strict_types=1);

use nono\gate\app\actions\authentification\MethodAuthentificationAction;

return function(\Slim\App $app):void {

    $app->post("/signin", MethodAuthentificationAction::class)
        ->setName("signIn");

    $app->post("/signup", MethodAuthentificationAction::class)
        ->setName("signUp");

    $app->post('/users/refresh', MethodAuthentificationAction::class)
        ->setName('refreshUser');

    $app->get('/users/validate', MethodAuthentificationAction::class)
        ->setName('validateTokenJWT');

    //CORS
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response; // Renvoie une réponse HTTP vide
    });

    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        if (!$request->hasHeader('Origin')) {
            $origin = '*';
        } else {
            $origin = $request->getHeader('Origin');
        }
        return $response
            ->withHeader('Access-Control-Allow-Origin', $origin)
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    });
};