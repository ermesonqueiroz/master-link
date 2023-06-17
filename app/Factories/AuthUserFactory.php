<?php

namespace App\Factories;

use App\Adapters\Presentation\Controllers\AuthUserController;
use App\External\Repositories\Mongo\MongoRefreshTokensRepository;
use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\AuthUser;
use App\Usecases\CreateRefreshToken;

class AuthUserFactory
{
    static function execute($body): void
    {
        $usersRepository = new MongoUsersRepository();
        $refreshTokensRepository = new MongoRefreshTokensRepository();

        $createRefreshToken = new CreateRefreshToken($refreshTokensRepository);
        $authUser = new AuthUser($usersRepository, $createRefreshToken);

        $authUserController = new AuthUserController($authUser);
        $authUserController->handle($body);
    }
}
