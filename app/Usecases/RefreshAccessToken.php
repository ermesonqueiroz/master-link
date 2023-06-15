<?php

namespace App\Usecases;

use App\External\Repositories\RefreshTokensRepository;
use App\External\Repositories\UsersRepository;
use App\Utils\JWTUtils;

class RefreshAccessToken
{
    private $refreshTokensRepository;
    private $usersRepository;
    private $createRefreshToken;

    function __construct(
        RefreshTokensRepository $refreshTokensRepository,
        UsersRepository $usersRepository,
        CreateRefreshToken $createRefreshToken
    ) {
        $this->refreshTokensRepository = $refreshTokensRepository;
        $this->usersRepository = $usersRepository;
        $this->createRefreshToken = $createRefreshToken;
    }

    function execute(string $refreshTokenId)
    {
        $refreshToken = $this->refreshTokensRepository->findById($refreshTokenId);

        if (!$refreshToken) {
            throw new \Exception("Refresh token not found.");
        }

        if (time() > $refreshToken["expiresAt"]) {
            echo $refreshToken["expiresAt"].",".time();
            throw new \Exception("Invalid refresh token.");
        }

        $user = $this->usersRepository->findById($refreshToken["userId"]);

        $accessToken = JWTUtils::generateAccessToken([
            "id" => $user["id"]
        ]);
        $refreshToken = $this->createRefreshToken->execute(
            $user["id"]
        );

        return [
            "access_token" => $accessToken,
            "refresh_token" => $refreshToken->getId()
        ];
    }
}
