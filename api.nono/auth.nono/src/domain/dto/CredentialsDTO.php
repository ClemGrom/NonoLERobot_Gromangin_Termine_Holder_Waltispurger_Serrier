<?php

namespace nono\auth\api\domain\dto;

class CredentialsDTO extends DTO
{
    public string $email;
    public string $password;
    public string $username;

    public function __construct(string $email = '', string $password = '', string $username = '')
    {
        $this->email = $email;
        $this->password = $password;
        $this->username = $username;
    }
}