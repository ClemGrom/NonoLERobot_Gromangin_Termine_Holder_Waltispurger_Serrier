<?php

namespace nono\auth\api\domain\exceptions;

class SignInException extends \Exception {
    public function __construct() {
        parent::__construct('Erreur SignIn : erreur lors de la connexion');
    }
}