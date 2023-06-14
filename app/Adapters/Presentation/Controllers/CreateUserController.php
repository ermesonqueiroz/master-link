<?php

namespace App\Adapters\Presentation\Controllers;

use App\Usecases\CreateUser;
use App\Utils\HttpUtils;

class CreateUserController
{
    private $createUser;

    function __construct(CreateUser $createUser)
    {
        $this->createUser = $createUser;
    }

    function handle(array $body)
    {
        try {
            $user = $this->createUser->execute($body);

            HttpUtils::ok([
                "username" => $user->getUsername(),
                "displayName" => $user->getDisplayName(),
                "email" => $user->getEmail(),
                "password" => $user->getPassword()
            ]);
        } catch (\Exception $exception) {
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
