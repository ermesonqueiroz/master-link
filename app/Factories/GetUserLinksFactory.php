<?php

namespace App\Factories;

use App\Adapters\Presentation\Controllers\GetUserLinksController;
use App\External\Repositories\Mongo\MongoLinksRepository;
use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\GetUserLinks\GetUserLinks;

class GetUserLinksFactory
{
    static function execute($body): void
    {
        $usersRepository = new MongoUsersRepository();
        $linksRepository = new MongoLinksRepository();
        $getUserLinks = new GetUserLinks($usersRepository, $linksRepository);
        
        $getUserLinksController = new GetUserLinksController($getUserLinks);
        $getUserLinksController->handle($body);
    }
}
