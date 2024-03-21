<?php

namespace nono\auth\api\domain\exceptions;

class AuthServiceInvalidDataException extends \Exception
{
    public function __construct() {
        parent::__construct("Probleme au niveau des données de l'inscription");
    }
}