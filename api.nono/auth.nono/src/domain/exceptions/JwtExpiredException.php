<?php

namespace nono\auth\api\domain\exceptions;

class JwtExpiredException extends \Exception {
    public function __construct() {
        parent::__construct('le token fourni est expiré');
    }

}