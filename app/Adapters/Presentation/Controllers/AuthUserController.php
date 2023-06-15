<?php

namespace App\Adapters\Presentation\Controllers;

use App\Usecases\AuthUser;
use App\Utils\HttpUtils;

class AuthUserController
{
    private $authUser;

    function __construct(AuthUser $authUser)
    {
        $this->authUser = $authUser;
    }

    function handle(array $body)
    {
        try {
            $authUserResponse = $this->authUser->execute(
                $body["email"],
                $body["password"]
            );

            HttpUtils::ok($authUserResponse);
        } catch (\Exception $exception) {
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
