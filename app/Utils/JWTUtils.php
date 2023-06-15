<?php

namespace App\Utils;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTUtils
{
    static function generateAccessToken($payload)
    {
        $expiresAt = time() + (24 * 60 * 60); // 1 day
        $payload["expires_at"] = $expiresAt;

        return JWTUtils::encode($payload);
    }

    static function encode($payload)
    {
        return JWT::encode($payload, getenv("SECRET_KEY"), "HS256");
    }

    static function decode($jwt)
    {
        return JWT::decode($jwt, JWTUtils::getKey());
    }

    static function getKey()
    {
        return new Key(getenv("SECRET_KEY"), "HS256");
    }
}
