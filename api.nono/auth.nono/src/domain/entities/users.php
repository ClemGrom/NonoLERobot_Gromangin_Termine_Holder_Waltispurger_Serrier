<?php

namespace nono\auth\api\domain\entities;

use Illuminate\Database\Eloquent\Model;
use nono\auth\api\domain\dto\userDTO;

class users extends Model
{
    protected $connection = 'auth';
    protected $table = 'users';
    protected $primaryKey = 'email';
    protected $keyType = 'string';
    public $timestamps = false;
    public function toDTO():UserDTO
    {
        return new UserDTO(
            $this->email,
            $this->username
        );
    }
}