<?php

namespace App\Usecases\GetUserProfile;

use App\Usecases\GetUserLinks\LinkDTO;

class GetUserProfileOutputData
{
    public readonly string $username;
    public readonly string $displayName;
    /**
     * @var $links
     * @type LinkDTO[]
     */
    public readonly array $links;
    
    function __construct(string $username, string $displayName, array $links)
    {
        $this->username = $username;
        $this->displayName = $displayName;
        $this->links = $links;
    }
}
