<?php

namespace App\Factories;

use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\CreateUser;
use App\Adapters\Presentation\Controllers\CreateUserController;

class CreateUserFactory
{
    static function execute()
    {
        $usersRepository = new MongoUsersRepository();
        $createUser = new CreateUser($usersRepository);
        $createUserController = new CreateUserController($createUser);
        return $createUserController;    
    }
}
