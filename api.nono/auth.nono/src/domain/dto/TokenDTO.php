<?php

namespace nono\auth\api\domain\dto;

class TokenDTO extends DTO
{
    public string $refreshToken;
    public string $activationToken;
    public string $jwt;

    public function __construct(string $refreshToken = '', string $jwt = '', string $activationToken = '') {
        $this->refreshToken = $refreshToken;
        $this->jwt = $jwt;
        $this->activationToken = $activationToken;
    }
}