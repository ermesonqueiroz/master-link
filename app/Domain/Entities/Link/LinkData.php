<?php

namespace App\Domain\Entities\Link;

class LinkData
{
    public readonly string $id;
    public readonly string $userId;
    public readonly string $title;
    public readonly string $url;
    
    function __construct(string $id, string $userId, string $title, string $url)
    {
        $this->id = $id;
        $this->userId = $userId;
        $this->title = $title;
        $this->url = $url;
    }   
}
