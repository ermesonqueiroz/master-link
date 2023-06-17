<?php

namespace App\Usecases\GetUserLinks;

class GetUserLinksOutputData
{
    public readonly array $links;
    
    function __construct(LinkDTO ...$links)
    {
        $this->links = $links;
    }
}
