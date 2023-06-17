<?php

namespace App\Adapters\Presentation\Controllers;

use App\Main\Config\HttpRequest;
use App\Usecases\CreateUser\CreateUser;
use App\Usecases\CreateUser\CreateUserInputData;
use App\Utils\HttpUtils;
use Exception;

class CreateUserController
{
    private CreateUser $createUser;

    function __construct(CreateUser $createUser)
    {
        $this->createUser = $createUser;
    }

    function handle(HttpRequest $request): void
    {
        try {
            $inputData = new CreateUserInputData(
                $request->body["username"],
                $request->body["displayName"],
                $request->body["email"],
                $request->body["password"]
            );
            
            $createUserResponse = $this->createUser->execute($inputData);

            HttpUtils::ok([
                "username" => $createUserResponse->username,
                "displayName" => $createUserResponse->displayName
            ]);
        } catch (Exception $exception) {
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
