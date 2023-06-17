<?php

namespace App\Usecases\AuthUser;

class AuthUserInputData
{
    public readonly string $email;
    public readonly string $password;
    
    function __construct(string $email, string $password)
    {
        $this->email = $email;
        $this->password = $password;
    }
}
