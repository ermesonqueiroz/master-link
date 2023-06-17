<?php

namespace App\Domain\Entities\Link;

use Exception;

class Link
{
    private string $id;
    private string $userId;
    private string $title;
    private string $url;

    private function __construct(string $id, string $userId, string $title, string $url)
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->title = $title;
        $this->url = $url;
    }

    static function create(LinkData $linkData): Link
    {
        $id = $linkData->id;
        $userId = $linkData->userId;
        $title = $linkData->title;
        $url = filter_var($linkData->url, FILTER_VALIDATE_URL);

        if (!$url) {
            throw new Exception("Invalid URL.");
        }

        return new Link(
            $id,
            $userId,
            $title,
            $url
        );
    }

    function getId(): string
    {
        return $this->id;
    }

    function getUserId(): string
    {
        return $this->userId;
    }

    function getTitle(): string
    {
        return $this->title;
    }

    function getURL(): string
    {
        return $this->url;
    }
}
