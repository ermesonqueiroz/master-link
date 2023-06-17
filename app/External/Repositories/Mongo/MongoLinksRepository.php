<?php

namespace App\External\Repositories\Mongo;
use App\Domain\Entities\Link;
use App\External\Repositories\LinksRepository\LinksRepository;
use App\External\Repositories\Mongo\Helpers\MongoHelper;

class MongoLinksRepository implements LinksRepository
{
    function add(array $link)
    {
        $collection = MongoHelper::getCollection("links");
        $collection->insertOne($link);
    }
    
    function findAllByUserId(string $userId)
    {
        $collection = MongoHelper::getCollection("links");
        $links = $collection->find([
            "userId" => $userId
        ])->toArray();

        return array_map(function ($item) {
            return Link::create([
                "id" => $item["id"],
                "userId" => $item["userId"],
                "title" => $item["title"],
                "url" => $item["url"]
            ]);
        }, $links);
    }
}
