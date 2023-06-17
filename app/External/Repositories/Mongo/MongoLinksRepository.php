<?php

namespace App\External\Repositories\Mongo;
use App\Domain\Entities\Link\LinkData;
use App\External\Repositories\LinksRepository;
use App\External\Repositories\Mongo\Helpers\MongoHelper;

class MongoLinksRepository implements LinksRepository
{
    function add(LinkData $linkData): void
    {
        $collection = MongoHelper::getCollection("links");
        $collection->insertOne([
            "id" => $linkData->id,
            "userId" => $linkData->userId,
            "title" => $linkData->title,
            "url" => $linkData->url
        ]);
    }

    function findAllByUserId(string $userId): array
    {
        $collection = MongoHelper::getCollection("links");
        $links = $collection->find([
            "userId" => $userId
        ])->toArray();

        return array_map(function ($item) {
            return new LinkData(
                $item["id"],
                $item["userId"],
                $item["title"],
                $item["url"]
            );
        }, $links);
    }
}
