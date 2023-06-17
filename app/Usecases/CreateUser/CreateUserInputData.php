<?php

namespace App\Usecases\CreateUser;

class CreateUserInputData
{
    public readonly string $username;
    public readonly string $displayName;
    public readonly string $email;
    public readonly string $password;
    
    function __construct(string $username, string $displayName, string $email, string $password)
    {
        $this->username = $username;
        $this->displayName = $displayName;
        $this->email = $email;
        $this->password = $password;
    }
}
