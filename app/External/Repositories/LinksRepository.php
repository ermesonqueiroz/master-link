<?php

namespace App\External\Repositories;

use App\Domain\Entities\Link\LinkData;

interface LinksRepository
{
    function add(LinkData $linkDataData): void;

    /**
     * @param string $userId
     * @return LinkData[]
     */
    function findAllByUserId(string $userId): array;
}
