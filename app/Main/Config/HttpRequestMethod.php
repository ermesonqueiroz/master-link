<?php

namespace App\Main\Config;

enum HttpRequestMethod: string
{
    case GET = "get";
    case POST = "post";
    case PUT = "put";
    case DELETE = "delete";
}

