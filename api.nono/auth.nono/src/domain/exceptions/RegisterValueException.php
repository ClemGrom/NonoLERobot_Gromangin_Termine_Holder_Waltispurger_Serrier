<?php

namespace nono\auth\api\domain\exceptions;

class RegisterValueException extends \Exception{

    public function __construct() {
        parent::__construct('Erreur Register : erreur lors de l\'inscription une ou plusieurs données sont manquantes ou invalides');
    }
}