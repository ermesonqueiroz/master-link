<?php

namespace App\External\Repositories\LinksRepository;

use App\Domain\Entities\Link;

interface LinksRepository
{
    function add(array $link);

    /**
     * @param string $userId
     * @return Link[]
     */
    function findAllByUserId(string $userId);
}
