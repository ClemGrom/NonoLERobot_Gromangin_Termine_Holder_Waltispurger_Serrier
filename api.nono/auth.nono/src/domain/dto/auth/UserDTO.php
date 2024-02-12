<?php

namespace nono\auth\api\domain\dto\auth;

class UserDTO
{
    public string $email;
    public string $password;
    public bool $active;
    public string $activation_token;
    public string $activation_token_expiration_date;
    public string $refresh_token;
    public string $refresh_token_expiration_date;
    public string $reset_passwd_token;
    public string $reset_passwd_token_expiration_date;
    public string $username;

    public function __construct(string $email, string $password, bool $active, string $activation_token, string $activation_token_expiration_date, string $refresh_token, string $refresh_token_expiration_date, string $reset_passwd_token, string $reset_passwd_token_expiration_date, string $username)
    {
        $this->email = $email;
        $this->password = $password;
        $this->active = $active;
        $this->activation_token = $activation_token;
        $this->activation_token_expiration_date = $activation_token_expiration_date;
        $this->refresh_token = $refresh_token;
        $this->refresh_token_expiration_date = $refresh_token_expiration_date;
        $this->reset_passwd_token = $reset_passwd_token;
        $this->reset_passwd_token_expiration_date = $reset_passwd_token_expiration_date;
        $this->username = $username;
    }

    public function toArray() {
    return [
            'email' => $this->email,
            'password' => $this->password,
            'active' => $this->active,
            'activation_token' => $this->activation_token,
            'activation_token_expiration_date' => $this->activation_token_expiration_date,
            'refresh_token' => $this->refresh_token,
            'refresh_token_expiration_date' => $this->refresh_token_expiration_date,
            'reset_passwd_token' => $this->reset_passwd_token,
            'reset_passwd_token_expiration_date' => $this->reset_passwd_token_expiration_date,
            'username' => $this->username
        ];
    }
}