<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use MongoDB\Laravel\Eloquent\Model as EloquentModel;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends EloquentModel implements Authenticatable, JWTSubject
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'users';
    protected $fillable = ['name', 'email', 'password', 'phone', 'address', 'role'];

    public function isAdmin()
    {
        return strtolower($this->role) === 'admin';
    }

    public function isUser()
    {
        return $this->role === 'user';
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role,  
        ];
    }

    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    public function getAuthPasswordName()
    {
        return 'password';
    }
    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }
}
