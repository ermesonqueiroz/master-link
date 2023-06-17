<?php

namespace App\Usecases\AuthUser;

use App\External\Repositories\UsersRepository;
use App\Usecases\CreateRefreshToken\CreateRefreshToken;
use App\Usecases\CreateRefreshToken\CreateRefreshTokenInputData;
use App\Utils\JWTUtils;

class AuthUser
{
    private $usersRepository;
    private $createRefreshToken;

    function __construct(UsersRepository $usersRepository, CreateRefreshToken $createRefreshToken)
    {
        $this->usersRepository = $usersRepository;
        $this->createRefreshToken = $createRefreshToken;
    }

    function execute(AuthUserInputData $inputData): AuthUserOutputData
    {
        $user = $this->usersRepository->findByEmail($inputData->email);

        if (!$user) {
            throw new \Exception("User not found.");
        }

        $passwordIsCorrect = password_verify($inputData->password, $user["password"]);

        if (!$passwordIsCorrect) {
            throw new \Exception("Password is incorrect.");
        }

        $accessToken = JWTUtils::generateAccessToken([
            "id" => $user["id"]
        ]);
        
        $createRefreshTokenInputData = new CreateRefreshTokenInputData($user["id"]);
        $refreshToken = $this->createRefreshToken->execute($createRefreshTokenInputData);
        
        return new AuthUserOutputData(
            $accessToken,
            $refreshToken->tokenId
        );
    }
}
