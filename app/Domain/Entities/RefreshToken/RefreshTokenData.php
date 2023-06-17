<?php

namespace App\Domain\Entities\RefreshToken;

class RefreshTokenData
{
    public readonly string $id;
    public readonly string $userId;
    public readonly int $expiresAt;
    
    function __construct(string $id, string $userId, int $expiresAt)
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->expiresAt = $expiresAt;
    }
}
