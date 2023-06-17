<?php

require "./vendor/autoload.php";

use Database\Seeds\UserSeeder;
use Dotenv\Dotenv;
use MongoDB\Client;

Dotenv::createUnsafeImmutable(__DIR__)->load();

$databaseName = getenv("DATABASE_NAME");
$connection = new Client(
    getenv("DATABASE_URI")
);

$seeds = [
    new UserSeeder($connection, $databaseName),
];

foreach ($seeds as $seed) {
    $seed->run();
}
