<?php

namespace App\Usecases\CreateUser;

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

    function execute(CreateUserInputData $inputData)
    {
        $duplicatedUser = $this->usersRepository->findByEmail(
            $inputData->email
        );

        if ($duplicatedUser) {
            throw new \Exception("Another user was found with this email.");
        }

        $passwordHash = password_hash($inputData->password, PASSWORD_DEFAULT);

        $user = User::create([
            "id" => Uuid::uuid4()->toString(),
            "username" => $inputData->username,
            "email" => $inputData->email,
            "password" => $passwordHash
        ]);

        $this->usersRepository->add([
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "displayName" => $user->getDisplayName(),
            "email" => $user->getEmail(),
            "password" => $user->getPassword()
        ]);

        return new CreateUserOutputData(
            $user->getUsername(),
            $user->getDisplayName()
        );
    }
}
