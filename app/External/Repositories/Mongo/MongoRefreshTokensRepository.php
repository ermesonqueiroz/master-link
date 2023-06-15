<?php

namespace App\External\Repositories\Mongo;

use App\External\Repositories\Mongo\Helpers\MongoHelper;
use App\External\Repositories\RefreshTokensRepository;

class MongoRefreshTokensRepository implements RefreshTokensRepository
{
    private $connection;

    function __construct()
    {
        $this->connection = MongoHelper::getConnection();
    }

    function add(array $user)
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        $collection->insertOne($user);
    }

    function findById(string $id)
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        return $collection->findOne([
            "id" => $id
        ]);
    }

    function findByUserId(string $userId)
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        return $collection->findOne([
            "userId" => $userId
        ]);
    }

    function delete(string $id)
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        return $collection->deleteOne([
            "id" => $id
        ]);
    }
}
