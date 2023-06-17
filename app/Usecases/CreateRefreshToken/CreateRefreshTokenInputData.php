<?php

namespace App\Usecases\CreateRefreshToken;

class CreateRefreshTokenInputData
{
    public readonly string $userId;
    
    function __construct(string $userId)
    {
        $this->userId = $userId;
    }
}
