<?php

namespace App\Usecases\RefreshAccessToken;

class RefreshAccessTokenInputData
{
    public readonly string $refreshTokenId;
    
    function __construct(string $refreshTokenId)
    {
        $this->refreshTokenId = $refreshTokenId;
    }
}
