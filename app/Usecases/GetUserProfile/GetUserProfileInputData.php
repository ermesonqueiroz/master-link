<?php

namespace App\Usecases\GetUserProfile;

class GetUserProfileInputData
{
    public readonly string $username;
    
    function __construct(string $username)
    {
        $this->username = $username;
    }
}
