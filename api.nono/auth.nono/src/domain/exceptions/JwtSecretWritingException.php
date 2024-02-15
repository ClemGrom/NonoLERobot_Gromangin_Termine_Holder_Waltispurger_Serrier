<?php

namespace nono\auth\api\domain\exceptions;

class JwtSecretWritingException extends \Exception {
    public function __construct() {
        parent::__construct('Erreur lors de l\'écriture de la variable d\'environnement pour le secret JWT');
    }
}