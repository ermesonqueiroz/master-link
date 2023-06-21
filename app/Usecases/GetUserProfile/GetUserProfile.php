<?php

namespace App\Usecases\GetUserProfile;

use App\External\Repositories\UsersRepository;
use App\Usecases\GetUserLinks\GetUserLinks;
use App\Usecases\GetUserLinks\GetUserLinksInputData;
use Exception;

class GetUserProfile
{
    private UsersRepository $usersRepository;
    private GetUserLinks $getUserLinks;
    
    function __construct(UsersRepository $usersRepository, GetUserLinks $getUserLinks)
    {
        $this->usersRepository = $usersRepository;
        $this->getUserLinks = $getUserLinks;
    }

    function execute(GetUserProfileInputData $inputData): GetUserProfileOutputData
    {
        $userFound = $this->usersRepository->findByUsername($inputData->username);

        if (!$userFound) {
            throw new Exception("User not found.");
        }
        
        $getUserLinksInputData = new GetUserLinksInputData($userFound->id);
        $userLinks = $this->getUserLinks->execute($getUserLinksInputData);
        
        return new GetUserProfileOutputData(
            $userFound->username,
            $userFound->displayName,
            $userLinks->links,
        );
    }
}
