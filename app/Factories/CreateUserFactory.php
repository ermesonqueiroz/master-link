<?php

namespace App\Factories;

use App\Adapters\Presentation\Controllers\CreateUserController;
use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\CreateUser\CreateUser;

class CreateUserFactory
{
    static function execute($body): void
    {
        $usersRepository = new MongoUsersRepository();
        $createUser = new CreateUser($usersRepository);
        $createUserController = new CreateUserController($createUser);
        $createUserController->handle($body);
    }
}
