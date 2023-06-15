<?php

namespace App\Domain\Entities;

class RefreshToken
{
    private $id;
    private $userId;
    private $expiresAt;

    private function __construct(string $id, string $userId, int $expiresAt)
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->expiresAt = $expiresAt;
    }

    static function create(array $refreshTokenData)
    {
        $id = $refreshTokenData["id"];
        $userId = $refreshTokenData["userId"];
        $expiresAt = $refreshTokenData["expiresAt"];

        return new RefreshToken(
            $id,
            $userId,
            $expiresAt
        );
    }

    function getId()
    {
        return $this->id;
    }

    function getUserId()
    {
        return $this->userId;
    }

    function getExpiresAt()
    {
        return $this->expiresAt;
    }
}
