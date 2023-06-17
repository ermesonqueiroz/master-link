<?php

namespace App\Usecases\CreateUser;

class CreateUserOutputData
{
    public readonly string $username;
    public readonly string $displayName;
    
    function __construct(string $username, string $displayName)
    {
        $this->username = $username;
        $this->displayName = $displayName;
    }
}
