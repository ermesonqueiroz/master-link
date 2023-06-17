<?php

namespace App\Usecases\GetUserLinks;

use App\External\Repositories\LinksRepository;
use App\External\Repositories\UsersRepository;
use Exception;

class GetUserLinks
{
    private UsersRepository $usersRepository;
    private LinksRepository $linksRepository;

    function __construct(UsersRepository $usersRepository, LinksRepository $linksRepository)
    {
        $this->usersRepository = $usersRepository;
        $this->linksRepository = $linksRepository;
    }

    function execute(GetUserLinksInputData $inputData): GetUserLinksOutputData
    {
        $userFound = $this->usersRepository->findById($inputData->userId);

        if (!$userFound) {
            throw new Exception("User not found.");
        }

        $links = $this->linksRepository->findAllByUserId($inputData->userId);
        
        return new GetUserLinksOutputData(
            ...array_map(function ($link) {
                return new LinkDTO(
                    $link->id,
                    $link->title,
                    $link->url
                );
            }, $links)
        );
    }
}
