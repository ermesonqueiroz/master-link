<?php

namespace App\Adapters\Presentation\Controllers;
use App\Usecases\CreateLink;
use App\Utils\HttpUtils;
use App\Utils\JWTUtils;
use Firebase\JWT\SignatureInvalidException;

class CreateLinkController
{
    private $createLink;

    function __construct(CreateLink $createLink)
    {
        $this->createLink = $createLink;
    }

    function handle(array $body)
    {
        try {
            $accessToken = str_replace("Bearer ", "", $_SERVER["HTTP_AUTHORIZATION"]);
            
            $decodedToken = JWTUtils::decode(str_replace("Bearer ", "", $accessToken));
            $userId = $decodedToken->id;

            $link = $this->createLink->execute([
                ...$body,
                "userId" => $userId
            ]);

            HttpUtils::ok([
                "title" => $link->getTitle(),
                "url" => $link->getURL()
            ]);
        } catch (\UnexpectedValueException $exception) {
            HttpUtils::forbidden("Forbidden");
        } catch (\Exception $exception) {
            var_dump($exception);
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
