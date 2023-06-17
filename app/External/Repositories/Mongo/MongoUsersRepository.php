<?php

namespace App\External\Repositories\Mongo;

use App\Domain\Entities\User\UserData;
use App\External\Repositories\Mongo\Helpers\MongoHelper;
use App\External\Repositories\UsersRepository;

class MongoUsersRepository implements UsersRepository
{
    function add(UserData $userData): void
    {
        $collection = MongoHelper::getCollection("users");
        $collection->insertOne([
            "id" => $userData->id,
            "username" => $userData->username,
            "displayName" => $userData->displayName,
            "email" => $userData->email,
            "password" => $userData->password
        ]);
    }

    function findById(string $id): UserData | null
    {
        $collection = MongoHelper::getCollection("users");
        $userDocument = $collection->findOne([
            "id" => $id
        ]);
        
        if ($userDocument) {
            return new UserData(
                $userDocument["id"],
                $userDocument["username"],
                $userDocument["displayName"],
                $userDocument["email"],
                $userDocument["password"]
            );
        }
        
        return null;
    }

    function findByEmail(string $email): UserData | null
    {
        $collection = MongoHelper::getCollection("users");
        $userDocument = $collection->findOne([
            "email" => $email
        ]);

        if ($userDocument) {
            return new UserData(
                $userDocument["id"],
                $userDocument["username"],
                $userDocument["displayName"],
                $userDocument["email"],
                $userDocument["password"]
            );
        }

        return null;
    }
}
