<?php

namespace App\Usecases;
use App\Domain\Entities\RefreshToken;
use App\External\Repositories\RefreshTokensRepository;
use Ramsey\Uuid\Uuid;

class CreateRefreshToken
{
    private $refreshTokensRepository;

    function __construct(RefreshTokensRepository $refreshTokensRepository)
    {
        $this->refreshTokensRepository = $refreshTokensRepository;
    }

    function execute(string $userId)
    {
        $duplicatedRefreshToken = $this->refreshTokensRepository->findByUserId($userId);

        if ($duplicatedRefreshToken) {
            $this->refreshTokensRepository->delete(
                $duplicatedRefreshToken["id"]
            );
        }

        $refreshToken = RefreshToken::create([
            "id" => Uuid::uuid4()->toString(),
            "userId" => $userId,
            "expiresAt" => time() + (7 * 24 * 60 * 60) // 7 days
        ]);

        $this->refreshTokensRepository->add([
            "id" => $refreshToken->getId(),
            "userId" => $refreshToken->getUserId(),
            "expiresAt" => $refreshToken->getExpiresAt()
        ]);

        return $refreshToken;
    }
}
