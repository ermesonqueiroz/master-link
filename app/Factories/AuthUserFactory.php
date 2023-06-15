<?php

namespace App\Factories;

use App\Adapters\Presentation\Controllers\AuthUserController;
use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\AuthUser;

class AuthUserFactory
{
    static function execute()
    {
        $usersRepository = new MongoUsersRepository();
        $authUser = new AuthUser($usersRepository);
        $authUserController = new AuthUserController($authUser);
        return $authUserController;
    }
}
