<?php

require "./vendor/autoload.php";

use Database\Seeds\UserSeeder;

\Dotenv\Dotenv::createUnsafeImmutable(__DIR__)->load();

$databaseName = getenv("DATABASE_NAME");
$connection = new \MongoDB\Client(
    getenv("DATABASE_URI")
);

$seeds = [
    new UserSeeder($connection, $databaseName),
];

foreach ($seeds as $seed) {
    $seed->run();
}
