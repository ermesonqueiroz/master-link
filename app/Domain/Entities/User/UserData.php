<?php

namespace App\Domain\Entities\User;

class UserData
{
    public readonly string $id;
    public readonly string $username;
    public readonly string $displayName;
    public readonly string $email;
    public readonly string $password;
    
    function __construct(string $id, string $username, string $displayName, string $email, string $password)
    {
        $this->id = $id;
        $this->username = $username;
        $this->displayName = $displayName;
        $this->email = $email;
        $this->password = $password;
    }
}
