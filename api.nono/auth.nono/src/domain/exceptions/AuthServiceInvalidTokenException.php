<?php

namespace nono\auth\api\domain\exceptions;

class AuthServiceInvalidTokenException extends \Exception
{
    public function __construct()
    {
        parent::__construct('Token invalide');
    }

}