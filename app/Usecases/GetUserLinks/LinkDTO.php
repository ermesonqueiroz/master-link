<?php

namespace App\Usecases\GetUserLinks;

class LinkDTO
{
    public readonly string $id;
    public readonly string $title;
    public readonly string $url;
    
    function __construct(string $id, string $title, string $url)
    {
        $this->id = $id;
        $this->title = $title;
        $this->url = $url;
    }
}
