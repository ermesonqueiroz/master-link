<?php

namespace App\External\Repositories\Mongo;

use App\External\Repositories\Mongo\Helpers\MongoHelper;
use App\External\Repositories\UsersRepository;

class MongoUsersRepository implements UsersRepository
{
    private $connection;

    function __construct()
    {
        $this->connection = MongoHelper::getConnection();
    }

    function add(array $user)
    {
        $collection = $this->connection->selectCollection(
            getenv("DATABASE_NAME"),
            "users"
        );

        $collection->insertOne($user);
    }
}
