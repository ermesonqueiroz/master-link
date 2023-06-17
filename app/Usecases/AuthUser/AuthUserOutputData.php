<?php

namespace App\Usecases\AuthUser;

class AuthUserOutputData
{
    public readonly string $accessToken;
    public readonly string $refreshToken;
    
    function __construct(string $accessToken, string $refreshToken)
    {
        $this->accessToken = $accessToken;
        $this->refreshToken = $refreshToken;
    }
}
