<?php
declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

/* application boostrap */
$app = require_once __DIR__ . '/../config/bootstrap.php';

/* routes loading */
(require_once __DIR__ . '/../config/routes.php')($app);

$app->run();
