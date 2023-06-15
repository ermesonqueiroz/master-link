<?php

namespace App\Adapters\Presentation\Controllers;

use App\Usecases\RefreshAccessToken;
use App\Utils\HttpUtils;

class RefreshAccessTokenController
{
    private $refreshAccessToken;

    function __construct(RefreshAccessToken $refreshAccessToken)
    {
        $this->refreshAccessToken = $refreshAccessToken;
    }

    function handle(array $body)
    {
        try {
            $refreshAccessTokenResponse = $this->refreshAccessToken->execute($body["refresh_token"]);

            HttpUtils::ok($refreshAccessTokenResponse);
        } catch (\Exception $exception) {
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
