<?php

namespace App\External\Repositories\Mongo\Helpers;

use MongoDB\Client;
use MongoDB\Collection;

class MongoHelper
{
    private static Client $connection;

    static function connect(): void
    {
        MongoHelper::$connection = new Client(getenv("DATABASE_URI"));
    }

    static function getConnection(): Client
    {
        return MongoHelper::$connection;
    }

    static function getCollection(string $collection): Collection
    {
        return MongoHelper::getConnection()->selectCollection(
            getenv("DATABASE_NAME"),
            $collection
        );
    }
}
