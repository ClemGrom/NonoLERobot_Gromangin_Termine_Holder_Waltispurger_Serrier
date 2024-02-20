<?php

namespace nono\auth\api\domain\exceptions;

class CredentialsException extends \Exception {
    public function __construct() {
        parent::__construct('Erreur SignIn : le mail ou le mot de passe est incorrect');
    }
}