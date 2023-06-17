<?php

namespace App\Usecases\CreateRefreshToken;

use App\Domain\Entities\RefreshToken\RefreshToken;
use App\Domain\Entities\RefreshToken\RefreshTokenData;
use App\External\Repositories\RefreshTokensRepository;
use Ramsey\Uuid\Uuid;

class CreateRefreshToken
{
    private RefreshTokensRepository $refreshTokensRepository;

    function __construct(RefreshTokensRepository $refreshTokensRepository)
    {
        $this->refreshTokensRepository = $refreshTokensRepository;
    }

    function execute(CreateRefreshTokenInputData $inputData): CreateRefreshTokenOutputData
    {
        $duplicatedRefreshToken = $this->refreshTokensRepository->findByUserId($inputData->userId);

        if ($duplicatedRefreshToken) {
            $this->refreshTokensRepository->delete($duplicatedRefreshToken->id);
        }

        $refreshTokenData = new RefreshTokenData(
            Uuid::uuid4()->toString(),
            $inputData->userId,
            time() + (7 * 24 * 60 * 60) // 7 days
        );
        
        $refreshToken = RefreshToken::create($refreshTokenData);
        $this->refreshTokensRepository->add($refreshTokenData);

        return new CreateRefreshTokenOutputData(
            $refreshToken->getId(),
            $refreshToken->getUserId(),
            $refreshToken->getExpiresAt()
        );
    }
}
