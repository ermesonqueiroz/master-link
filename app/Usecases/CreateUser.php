<?php

namespace App\Usecases;

use App\Domain\Entities\User;
use App\External\Repositories\UsersRepository;
use Ramsey\Uuid\Uuid;

class CreateUser
{
    private $usersRepository;

    function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    function execute(array $userData)
    {
        $duplicatedUser = $this->usersRepository->findByEmail(
            $userData["email"]
        );

        if ($duplicatedUser) {
            throw new \Exception("Another user was found with this email.");
        }

        $passwordHash = password_hash($userData["password"], PASSWORD_DEFAULT);

        $user = User::create([
            ...$userData,
            "password" => $passwordHash,
            "id" => Uuid::uuid4()->toString()
        ]);

        $this->usersRepository->add([
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "displayName" => $user->getDisplayName(),
            "email" => $user->getEmail(),
            "password" => $user->getPassword()
        ]);

        return $user;
    }
}
