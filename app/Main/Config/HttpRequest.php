<?php

namespace App\Main\Config;

class HttpRequest
{
    public readonly array $body;
    public readonly array $params;

    function __construct($body, $params)
    {
        $this->body = $body;
        $this->params = $params;
    }
}
