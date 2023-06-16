<?php

namespace App\Domain\Entities;

class Link
{
    private $id;
    private $userId;
    private $title;
    private $url;

    private function __construct(string $id, string $userId, string $title, string $url)
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->title = $title;
        $this->url = $url;
    }

    static function create(array $linkData)
    {
        $id = $linkData["id"];
        $userId = $linkData["userId"];
        $title = $linkData["title"];
        $url = filter_var($linkData["url"], FILTER_VALIDATE_URL);

        if (!$url) {
            throw new \Exception("Invalid URL.");
        }

        return new Link(
            $id,
            $userId,
            $title,
            $url
        );
    }

    function getId()
    {
        return $this->id;
    }

    function getUserId()
    {
        return $this->userId;
    }

    function getTitle()
    {
        return $this->title;
    }

    function getURL()
    {
        return $this->url;
    }
}
