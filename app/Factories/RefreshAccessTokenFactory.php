<?php

namespace App\Factories;
use App\Adapters\Presentation\Controllers\RefreshAccessTokenController;
use App\External\Repositories\Mongo\MongoRefreshTokensRepository;
use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\CreateRefreshToken;
use App\Usecases\RefreshAccessToken;

class RefreshAccessTokenFactory
{
    static function execute()
    {
        $usersRepository = new MongoUsersRepository();
        $refreshTokensRepository = new MongoRefreshTokensRepository();
        $createRefreshToken = new CreateRefreshToken($refreshTokensRepository);

        $refreshAccessToken = new RefreshAccessToken(
            $refreshTokensRepository,
            $usersRepository,
            $createRefreshToken
        );

        $refreshAccessTokenController = new RefreshAccessTokenController($refreshAccessToken);
        return $refreshAccessTokenController;
    }
}
