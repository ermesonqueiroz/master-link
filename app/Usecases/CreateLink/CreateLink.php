<?php

namespace App\Usecases\CreateLink;

use App\Domain\Entities\Link;
use App\External\Repositories\LinksRepository\LinksRepository;
use App\External\Repositories\UsersRepository;
use Ramsey\Uuid\Uuid;

class CreateLink
{
    private $linksRepository;
    private $usersRepository;

    function __construct(LinksRepository $linksRepository, UsersRepository $usersRepository)
    {
        $this->linksRepository = $linksRepository;
        $this->usersRepository = $usersRepository;
    }

    function execute(CreateLinkInputData $inputData)
    {
        $userFound = $this->usersRepository->findById($inputData->userId);

        if (!$userFound) {
            throw new \Exception("User not found.");
        }

        $link = Link::create([
            "id" => Uuid::uuid4()->toString(),
            "userId" => $inputData->userId,
            "title" => $inputData->title,
            "url" => $inputData->url
        ]);

        $this->linksRepository->add([
            "id" => $link->getId(),
            "userId" => $link->getUserId(),
            "title" => $link->getTitle(),
            "url" => $link->getURL()
        ]);

        return new CreateLinkOutputData(
            $link->getId(),
            $link->getUserId(),
            $link->getTitle(),
            $link->getURL()
        );
    }
}
