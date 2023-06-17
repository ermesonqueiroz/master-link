<?php

namespace App\Adapters\Presentation\Controllers;

use App\Main\Config\HttpRequest;
use App\Usecases\AuthUser\AuthUser;
use App\Usecases\AuthUser\AuthUserInputData;
use App\Utils\HttpUtils;

class AuthUserController
{
    private $authUser;

    function __construct(AuthUser $authUser)
    {
        $this->authUser = $authUser;
    }

    function handle(HttpRequest $request): void
    {
        try {
            $inputData = new AuthUserInputData(
                $request->body["email"],
                $request->body["password"]
            );
            
            $authUserResponse = $this->authUser->execute($inputData);

            HttpUtils::ok([
                "access_token" => $authUserResponse->accessToken,
                "refresh_token" => $authUserResponse->refreshToken
            ]);
        } catch (\Exception $exception) {
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
