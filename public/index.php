<?php

require "../vendor/autoload.php";

use App\External\Repositories\Mongo\Helpers\MongoHelper;
use App\Main\Routes;
use Dotenv\Dotenv;

Dotenv::createUnsafeImmutable(__DIR__."/../")->load();

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

MongoHelper::connect();

Routes::dispatch();
