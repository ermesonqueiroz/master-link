<?php

namespace App\Adapters\Presentation\Controllers;

use App\Main\Config\HttpRequest;
use App\Usecases\GetUserProfile\GetUserProfile;
use App\Usecases\GetUserProfile\GetUserProfileInputData;
use App\Utils\HttpUtils;
use Exception;
use UnexpectedValueException;

class GetUserProfileController
{
    private GetUserProfile $getUserProfile;
    
    function __construct(GetUserProfile $getUserProfile)
    {
        $this->getUserProfile = $getUserProfile;
    }
    
    function handle(HttpRequest $request): void
    {
        try {
            $inputData = new GetUserProfileInputData($request->params[0]);

            $getUserProfileResponse = $this->getUserProfile->execute($inputData);

            HttpUtils::ok([
                "username" => $getUserProfileResponse->username,
                "displayName"=> $getUserProfileResponse->displayName,
                "links" => $getUserProfileResponse->links
            ]);
        } catch (UnexpectedValueException) {
            HttpUtils::forbidden("Forbidden");
        } catch (Exception $exception) {
            var_dump($exception);
            HttpUtils::badRequest($exception->getMessage());
        }
    }
}
