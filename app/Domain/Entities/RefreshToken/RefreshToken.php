<?php

namespace App\Domain\Entities\RefreshToken;

class RefreshToken
{
    private string $id;
    private string $userId;
    private int $expiresAt;

    private function __construct(string $id, string $userId, int $expiresAt)
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->expiresAt = $expiresAt;
    }

    static function create(RefreshTokenData $refreshTokenData): RefreshToken
    {
        return new RefreshToken(
            $refreshTokenData->id,
            $refreshTokenData->userId,
            $refreshTokenData->expiresAt
        );
    }

    function getId(): string
    {
        return $this->id;
    }

    function getUserId(): string
    {
        return $this->userId;
    }

    function getExpiresAt(): string
    {
        return $this->expiresAt;
    }
}
