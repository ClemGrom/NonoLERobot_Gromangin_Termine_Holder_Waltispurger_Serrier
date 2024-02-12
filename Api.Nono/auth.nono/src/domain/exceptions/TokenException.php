<?php

namespace nono\auth\api\domain\exceptions;

use Exception;

class TokenException extends Exception
{
    public function __construct($message = "Invalid token", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}