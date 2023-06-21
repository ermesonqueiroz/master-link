<?php

namespace App\Factories;

use App\Adapters\Presentation\Controllers\GetUserProfileController;
use App\External\Repositories\Mongo\MongoLinksRepository;
use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\GetUserLinks\GetUserLinks;
use App\Usecases\GetUserProfile\GetUserProfile;

class GetUserProfileFactory
{
    static function execute($body): void
    {
        $usersRepository = new MongoUsersRepository();
        $linksRepository = new MongoLinksRepository();
        
        $getUserLinks = new GetUserLinks($usersRepository, $linksRepository);
        $getUserProfile = new GetUserProfile($usersRepository, $getUserLinks);
        
        $getUserProfileController = new GetUserProfileController($getUserProfile);
        $getUserProfileController->handle($body);
    }
}
