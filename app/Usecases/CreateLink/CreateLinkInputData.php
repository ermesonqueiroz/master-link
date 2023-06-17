<?php

namespace App\Usecases\CreateLink;

class CreateLinkInputData
{
    public readonly string $userId;
    public readonly string $title;
    public readonly string $url;
    
    function __construct(string $userId, string $title, string $url)
    {
        $this->userId = $userId;
        $this->title = $title;
        $this->url = $url;
    }
}
