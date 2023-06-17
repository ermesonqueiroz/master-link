<?php

namespace App\Usecases\CreateLink;

use App\Domain\Entities\Link\Link;
use App\Domain\Entities\Link\LinkData;
use App\External\Repositories\LinksRepository;
use App\External\Repositories\UsersRepository;
use Ramsey\Uuid\Uuid;
use Exception;

class CreateLink
{
    private LinksRepository $linksRepository;
    private UsersRepository $usersRepository;

    function __construct(LinksRepository $linksRepository, UsersRepository $usersRepository)
    {
        $this->linksRepository = $linksRepository;
        $this->usersRepository = $usersRepository;
    }

    function execute(CreateLinkInputData $inputData): CreateLinkOutputData
    {
        $userFound = $this->usersRepository->findById($inputData->userId);

        if (!$userFound) {
            throw new Exception("User not found.");
        }

        $linkData = new LinkData(
            Uuid::uuid4()->toString(),
            $inputData->userId,
            $inputData->title,
            $inputData->url
        );
        
        $link = Link::create($linkData);
        $this->linksRepository->add($linkData);

        return new CreateLinkOutputData(
            $link->getId(),
            $link->getUserId(),
            $link->getTitle(),
            $link->getURL()
        );
    }
}
