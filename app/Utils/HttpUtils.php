<?php

namespace App\Utils;

class HttpUtils
{
    static function ok($data)
    {
        http_response_code(200);
        echo json_encode([
            "status" => 200,
            "data" => $data
        ]);
    }
}
