<?php

namespace nono\auth\api\domain\exceptions;

use Exception;

class UserException extends Exception
{
    public function __construct($message = "Invalid user", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}