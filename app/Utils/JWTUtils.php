<?php

namespace App\Utils;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

class JWTUtils
{
    static function generateAccessToken($payload): string
    {
        $expiresAt = time() + (24 * 60 * 60); // 1 day
        $payload["expires_at"] = $expiresAt;

        return JWTUtils::encode($payload);
    }

    static function encode($payload): string
    {
        return JWT::encode($payload, getenv("SECRET_KEY"), "HS256");
    }

    static function decode($jwt): stdClass
    {
        return JWT::decode($jwt, JWTUtils::getKey());
    }

    static function getKey(): Key
    {
        return new Key(getenv("SECRET_KEY"), "HS256");
    }
}
