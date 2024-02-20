<?php

namespace nono\auth\api\domain\dto;

class UserDTO extends DTO
{
    public string $email;
    public string $username;

    public function __construct(string $email, string $username) {
        $this->email = $email;
        $this->username = $username;
    }
}