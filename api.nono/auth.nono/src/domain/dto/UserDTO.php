<?php

namespace nono\auth\api\domain\dto\auth;

use nono\auth\api\domain\dto\DTO;

class UserDTO extends DTO
{
    public string $email;
    public string $username;

    public function __construct(string $email, string $username) {
        $this->email = $email;
        $this->username = $username;
    }
}