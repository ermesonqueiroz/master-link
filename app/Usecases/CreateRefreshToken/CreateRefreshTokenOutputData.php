<?php

namespace App\Usecases\CreateRefreshToken;

class CreateRefreshTokenOutputData
{
    public readonly string $tokenId;
    public readonly string $userId;
    public readonly string $expiresAt;
    
    function __construct(string $tokenId, string $userId, string $expiresAt)
    {
        $this->tokenId = $tokenId;
        $this->userId = $userId;
        $this->expiresAt = $expiresAt;
    }
}
