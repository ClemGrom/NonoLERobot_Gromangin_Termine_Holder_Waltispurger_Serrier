<?php

namespace nono\auth\api\domain\entities\auth;

use Illuminate\Database\Eloquent\Model;
use nono\auth\api\domain\dto\auth\UserDTO;

class User extends Model
{

    public $incrementing = false;
    public $timestamps = false;

    protected $table = 'users';
    protected $primaryKey = 'email';
    protected $keyType = 'string';
    protected $fillable = ['email', 'password', 'active', 'activation_token', 'activation_token_expiration_date', 'refresh_token', 'refresh_token_expiration_date', 'reset_passwd_token', 'reset_passwd_token_expiration_date', 'username'];

    public function userToDTO()
    {
        return new UserDTO($this->email, $this->password, $this->active, $this->activation_token, $this->activation_token_expiration_date, $this->refresh_token, $this->refresh_token_expiration_date, $this->reset_passwd_token, $this->reset_passwd_token_expiration_date, $this->username);
    }
}