<?php

namespace nono\auth\api\domain\exceptions;

class RefreshUserException extends \Exception {
    public function __construct() {
        parent::__construct('Refresh Erreur : impossible de se reconnecter avec le refresh token');
    }
}