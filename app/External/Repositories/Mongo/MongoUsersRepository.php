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
        $collection = MongoHelper::getCollection("users");
        $collection->insertOne($user);
    }

    function findByEmail(string $email)
    {
        $collection = MongoHelper::getCollection("users");
        return $collection->findOne([
            "email" => $email
        ]);
    }
}
