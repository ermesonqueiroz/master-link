<?php

namespace App\Usecases\GetUserLinks;

class GetUserLinksInputData
{
    public readonly string $userId;
    
    function __construct(string $userId)
    {
        $this->userId = $userId;
    }
}
