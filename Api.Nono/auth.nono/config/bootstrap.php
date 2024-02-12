<?php

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;
use Illuminate\Database\Capsule\Manager as Eloquent;

$settings = require_once __DIR__ . '/settings.php';
$actions = require_once __DIR__ . '/actions_dependencies.php';
$services = require_once __DIR__.'/services_dependencies.php';

try {
    $eloquent = new Eloquent();
    $eloquent->addConnection(parse_ini_file(__DIR__ . '/auth.db.ini'));
    $eloquent->setAsGlobal();
    $eloquent->bootEloquent();
} catch (Exception $e) {
    echo $e->getMessage();
}

$builder = new ContainerBuilder();
$builder->addDefinitions($settings);
$builder->addDefinitions($actions);

$builder->addDefinitions($services);
try {
    $c = $builder->build();
    $app = AppFactory::createFromContainer($c);
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });
    $app->addRoutingMiddleware();
    $app->addBodyParsingMiddleware();
    $app->addErrorMiddleware(true, false, false);
    return $app;
} catch (Exception $e) {
    echo $e->getMessage();
}
