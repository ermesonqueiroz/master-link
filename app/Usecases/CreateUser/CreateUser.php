<?php

namespace App\Usecases\CreateUser;

use App\Domain\Entities\User\User;
use App\Domain\Entities\User\UserData;
use App\External\Repositories\UsersRepository;
use Ramsey\Uuid\Uuid;
use Exception;

class CreateUser
{
    private UsersRepository $usersRepository;

    function __construct(UsersRepository $usersRepository)
    {
        $this->usersRepository = $usersRepository;
    }

    function execute(CreateUserInputData $inputData): CreateUserOutputData
    {
        $duplicatedUser = $this->usersRepository->findByEmail(
            $inputData->email
        );

        if ($duplicatedUser) {
            throw new Exception("Another user was found with this email.");
        }

        $passwordHash = password_hash($inputData->password, PASSWORD_DEFAULT);

        $userData = new UserData(
            Uuid::uuid4()->toString(),
            $inputData->username,
            $inputData->displayName,
            $inputData->email,
            $passwordHash
        );
        
        $user = User::create($userData);
        $this->usersRepository->add($userData);

        return new CreateUserOutputData(
            $user->getUsername(),
            $user->getDisplayName()
        );
    }
}
