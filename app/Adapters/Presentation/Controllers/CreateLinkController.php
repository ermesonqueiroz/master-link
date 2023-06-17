<?php

namespace App\Adapters\Presentation\Controllers;

use App\Main\Config\HttpRequest;
use App\Usecases\CreateLink\CreateLink;
use App\Usecases\CreateLink\CreateLinkInputData;
use App\Utils\HttpUtils;
use App\Utils\JWTUtils;

class CreateLinkController
{
    private $createLink;

    function __construct(CreateLink $createLink)
    {
        $this->createLink = $createLink;
    }

    function handle(HttpRequest $request)
    {
        try {
            $accessToken = str_replace("Bearer ", "", $_SERVER["HTTP_AUTHORIZATION"]);
            
            $decodedToken = JWTUtils::decode(str_replace("Bearer ", "", $accessToken));
            $userId = $decodedToken->id;

            $inputData = new CreateLinkInputData(
                $userId,
                $request->body["title"],
                $request->body["url"]
            );
            
            $createLinkResponse = $this->createLink->execute($inputData);

            HttpUtils::ok([
                "title" => $createLinkResponse->title,
                "url" => $createLinkResponse->url
            ]);
        } catch (\UnexpectedValueException $exception) {
            HttpUtils::forbidden("Forbidden");
        } catch (\Exception $exception) {
            var_dump($exception);
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
