<?php

namespace App\Usecases;

use App\External\Repositories\UsersRepository;
use App\Utils\JWTUtils;

class AuthUser
{
    private $usersRepository;

    function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    function execute(string $email, string $password)
    {
        $user = $this->usersRepository->findByEmail($email);

        if (!$user) {
            throw new \Exception("User not found.");
        }

        $passwordIsCorrect = password_verify($password, $user["password"]);

        if (!$passwordIsCorrect) {
            throw new \Exception("Password is incorrect.");
        }

        $accessToken = JWTUtils::generateAccessToken([
            "id" => $user["id"]
        ]);

        return [
            "access_token" => $accessToken
        ];
    }
}
