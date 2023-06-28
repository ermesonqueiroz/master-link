<?php

namespace App\Utils;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JsonWebToken
{
    static function encode($payload)
    {
        return JWT::encode($payload, env('SECRET_KEY'), 'HS256');
    }

    static function decode($token)
    {
        return JWT::decode($token, new Key(env('SECRET_KEY'), 'HS256'));
    }
}
