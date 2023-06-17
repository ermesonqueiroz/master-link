<?php

namespace App\External\Repositories\Mongo;

use App\Domain\Entities\RefreshToken\RefreshTokenData;
use App\External\Repositories\Mongo\Helpers\MongoHelper;
use App\External\Repositories\RefreshTokensRepository;
use MongoDB\Client;

class MongoRefreshTokensRepository implements RefreshTokensRepository
{
    function add(RefreshTokenData $refreshToken): void
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        $collection->insertOne([
            "id" => $refreshToken->id,
            "userId" => $refreshToken->userId,
            "expiresAt" => $refreshToken->expiresAt
        ]);
    }

    function findById(string $id): RefreshTokenData | null
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        $refreshTokenDocument = $collection->findOne([
            "id" => $id
        ]);
        
        if ($refreshTokenDocument) {
            return new RefreshTokenData(
                $refreshTokenDocument["id"],
                $refreshTokenDocument["userId"],
                $refreshTokenDocument["expiresAt"],
            );
        }
        
        return null;    
    }

    function findByUserId(string $userId): RefreshTokenData | null
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        $refreshTokenDocument = $collection->findOne([
            "userId" => $userId
        ]);

        if ($refreshTokenDocument) {
            return new RefreshTokenData(
                $refreshTokenDocument["id"],
                $refreshTokenDocument["userId"],
                $refreshTokenDocument["expiresAt"],
            );
        }

        return null;
    }

    function delete(string $id): void
    {
        $collection = MongoHelper::getCollection("refresh_tokens");
        $collection->deleteOne([
            "id" => $id
        ]);
    }
}
