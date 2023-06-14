<?php

namespace App\External\Repositories\Mongo\Helpers;

class MongoHelper
{
    private static $connection;

    static function connect()
    {
        MongoHelper::$connection = new \MongoDB\Client(getenv("DATABASE_URI"));
    }

    static function getConnection(): \MongoDB\Client
    {
        return MongoHelper::$connection;
    }

    static function getCollection(string $collection): \MongoDB\Collection
    {
        return MongoHelper::getConnection()->selectCollection(
            getenv("DATABASE_NAME"),
            $collection
        );
    }
}
