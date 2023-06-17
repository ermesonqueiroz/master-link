<?php

namespace App\External\Repositories;

use App\Domain\Entities\RefreshToken\RefreshTokenData;

interface RefreshTokensRepository
{
    function add(RefreshTokenData $refreshToken): void;
    function findById(string $id): RefreshTokenData | null;
    function findByUserId(string $userId): RefreshTokenData | null;
    function delete(string $id): void;
}
