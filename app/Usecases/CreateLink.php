<?php

namespace App\Usecases;
use App\Domain\Entities\Link;
use App\External\Repositories\LinksRepository;
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

    function execute(array $linkData)
    {
        $userFound = $this->usersRepository->findById($linkData["userId"]);

        if (!$userFound) {
            throw new \Exception("User not found.");
        }

        $link = Link::create([
            ...$linkData,
            "id" => Uuid::uuid4()->toString()
        ]);

        $this->linksRepository->add([
            "id" => $link->getId(),
            "userId" => $link->getUserId(),
            "title" => $link->getTitle(),
            "url" => $link->getURL()
        ]);

        return $link;
    }
}
