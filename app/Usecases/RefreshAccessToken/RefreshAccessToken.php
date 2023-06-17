<?php

namespace App\Usecases\RefreshAccessToken;

use App\External\Repositories\RefreshTokensRepository;
use App\External\Repositories\UsersRepository;
use App\Usecases\CreateRefreshToken\CreateRefreshToken;
use App\Usecases\CreateRefreshToken\CreateRefreshTokenInputData;
use App\Utils\JWTUtils;
use Exception;

class RefreshAccessToken
{
    private RefreshTokensRepository $refreshTokensRepository;
    private UsersRepository $usersRepository;
    private CreateRefreshToken $createRefreshToken;

    function __construct(
        RefreshTokensRepository $refreshTokensRepository,
        UsersRepository $usersRepository,
        CreateRefreshToken $createRefreshToken
    ) {
        $this->refreshTokensRepository = $refreshTokensRepository;
        $this->usersRepository = $usersRepository;
        $this->createRefreshToken = $createRefreshToken;
    }

    function execute(RefreshAccessTokenInputData $inputData): RefreshAccessTokenOutputData
    {
        $refreshToken = $this->refreshTokensRepository->findById($inputData->refreshTokenId);

        if (!$refreshToken) {
            throw new Exception("Refresh token not found.");
        }

        if (time() > $refreshToken->expiresAt) {
            throw new Exception("Invalid refresh token.");
        }

        $user = $this->usersRepository->findById($refreshToken->userId);

        $accessToken = JWTUtils::generateAccessToken([
            "id" => $user->id
        ]);
        
        $createRefreshTokenInputData = new CreateRefreshTokenInputData($user->id);
        $refreshToken = $this->createRefreshToken->execute($createRefreshTokenInputData);

        return new RefreshAccessTokenOutputData(
            $accessToken,
            $refreshToken->tokenId
        );
    }
}
