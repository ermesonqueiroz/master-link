<?php

namespace App\External\Repositories\Mongo;
use App\External\Repositories\LinksRepository;
use App\External\Repositories\Mongo\Helpers\MongoHelper;

class MongoLinksRepository implements LinksRepository
{
    function add(array $user)
    {
        $collection = MongoHelper::getCollection("links");
        $collection->insertOne($user);
    }
}
