<?php

namespace nono\auth\api\domain\exceptions;

class ActivationTokenExpiredException extends \Exception
{
    public function __construct() {
        parent::__construct('Erreur de date d\'expiration du token d\'activation');
    }
}