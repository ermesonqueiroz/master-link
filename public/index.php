<?php
use App\External\Repositories\Mongo\Helpers\MongoHelper;

require "../vendor/autoload.php";
require "../routes/router.php";

\Dotenv\Dotenv::createUnsafeImmutable(__DIR__."/../")->load();

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");

MongoHelper::connect();

$router->run();
