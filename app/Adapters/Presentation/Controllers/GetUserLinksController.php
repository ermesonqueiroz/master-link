<?php

namespace App\Adapters\Presentation\Controllers;

use App\Main\Config\HttpRequest;
use App\Usecases\GetUserLinks\GetUserLinks;
use App\Usecases\GetUserLinks\GetUserLinksInputData;
use App\Utils\HttpUtils;

class GetUserLinksController
{
    private $getUserLinks;

    function __construct(GetUserLinks $getUserLinks)
    {
        $this->getUserLinks = $getUserLinks;
    }
    
    function handle(HttpRequest $request)
    {   
        try {
            $inputData = new GetUserLinksInputData($request->params[0]);

            $getUserLinksResponse = $this->getUserLinks->execute($inputData);
            
            HttpUtils::ok($getUserLinksResponse->links);
        } catch (\UnexpectedValueException $exception) {
            HttpUtils::forbidden("Forbidden");
        } catch (\Exception $exception) {
            var_dump($exception);
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
