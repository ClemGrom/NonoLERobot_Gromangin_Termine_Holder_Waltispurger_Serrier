<?php

use DI\ContainerBuilder;
use Illuminate\Database\Capsule\Manager as DB;
use nono\auth\api\domain\exceptions\JwtSecretWritingException;
use Slim\Factory\AppFactory;

session_start();

// initialise le chemin vers le .env et le nom du fichier
$envFileDir = __DIR__.'/../../../config';
$envFilePath = $envFileDir.'/.env';

// initialise dotenv pour accéder au .env partout dans l'app
$dotenv = Dotenv\Dotenv::createImmutable($envFileDir);
$dotenv->load();

//Container
$builder = new ContainerBuilder();

$builder->addDefinitions(
    include('dependencies/services_dependencies.php'),
    include('dependencies/action_dependencies.php')
);

$c = $builder->build();

$app = AppFactory::createFromContainer($c);
$container = $app->getContainer();

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, false, false);
$app->setBasePath('');

// initialise Eloquent avec les fichiers de config
$db = new DB();
$db->addConnection(parse_ini_file('auth.db.ini'), 'auth');
$db->setAsGlobal();
$db->bootEloquent();

if  (!$_ENV['JWT_SECRET']) {
    try {
        $secret = bin2hex(random_bytes(32));
    } catch (Exception $e) {
        throw new JwtSecretWritingException();
    }
    file_put_contents($envFilePath, 'JWT_SECRET=' . $secret . PHP_EOL, FILE_APPEND);
}

return $app;