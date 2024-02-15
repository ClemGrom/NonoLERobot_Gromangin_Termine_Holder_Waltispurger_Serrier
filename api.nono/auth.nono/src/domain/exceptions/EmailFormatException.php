<?php

namespace nono\auth\api\domain\exceptions;

class EmailFormatException extends \Exception{

    public function __construct() {
        parent::__construct("Le format de l'email est invalide");
    }
}