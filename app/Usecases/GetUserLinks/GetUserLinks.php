<?php

namespace App\Usecases\GetUserLinks;

use App\External\Repositories\LinksRepository\LinksRepository;
use App\External\Repositories\UsersRepository;

class GetUserLinks
{
    private $usersRepository;
    private $linksRepository;

    function __construct(UsersRepository $usersRepository, LinksRepository $linksRepository)
    {
        $this->usersRepository = $usersRepository;
        $this->linksRepository = $linksRepository;
    }

    function execute(GetUserLinksInputData $inputData): GetUserLinksOutputData
    {
        $userFound = $this->usersRepository->findById($inputData->userId);

        if (!$userFound) {
            throw new \Exception("User not found.");
        }

        $links = $this->linksRepository->findAllByUserId($inputData->userId);
        
        return new GetUserLinksOutputData(
            ...array_map(function ($link) {
                return new LinkDTO(
                    $link->getId(),
                    $link->getTitle(),
                    $link->getURL()
                );
            }, $links)
        );
    }
}
