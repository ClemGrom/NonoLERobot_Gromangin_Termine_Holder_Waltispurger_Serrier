<?php

namespace nono\auth\api\domain\exceptions;

class InvalidActivationTokenException extends \Exception
{
    public function __construct() {
        parent::__construct('Erreur lors du traitement du token d\'activation');
    }
}