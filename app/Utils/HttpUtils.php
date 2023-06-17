<?php

namespace App\Utils;

class HttpUtils
{
    static function ok($data): void
    {
        http_response_code(200);
        echo json_encode([
            "status" => 200,
            "data" => $data
        ]);
    }

    static function badRequest(string $message): void
    {
        http_response_code(400);
        echo json_encode([
            "status" => 400,
            "error" => $message
        ]);
    }

    static function forbidden(string $message): void
    {
        http_response_code(403);
        echo json_encode([
            "status" => 403,
            "error" => $message
        ]);
    }
    
    static function notFound(): void
    {
        http_response_code(404);
    }
}
