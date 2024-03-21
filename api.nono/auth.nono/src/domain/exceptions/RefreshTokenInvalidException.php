<?php

namespace nono\auth\api\domain\exceptions;

class RefreshTokenInvalidException extends \Exception {
    public function __construct() {
        parent::__construct('Erreur refresh : le refresh token renseigné est invalide');
    }
}