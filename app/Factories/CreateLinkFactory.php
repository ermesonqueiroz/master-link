<?php

namespace App\Factories;

use App\Adapters\Presentation\Controllers\CreateLinkController;
use App\External\Repositories\Mongo\MongoLinksRepository;
use App\External\Repositories\Mongo\MongoUsersRepository;
use App\Usecases\CreateLink;

class CreateLinkFactory
{
    static function execute()
    {
        $linksRepository = new MongoLinksRepository();
        $usersRepository = new MongoUsersRepository();
        $createLink = new CreateLink($linksRepository, $usersRepository);
        $createLinkController = new CreateLinkController($createLink);
        return $createLinkController;
    }
}
