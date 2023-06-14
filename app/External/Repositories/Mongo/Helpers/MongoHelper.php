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
}
