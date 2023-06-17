<?php

namespace Database\Seeds;

use MongoDB\Client;

class UserSeeder
{
    private Client $connection;
    private string $databaseName;

    function __construct(Client $connection, string $databaseName)
    {
        $this->connection = $connection;
        $this->databaseName = $databaseName;
    }

    public function run(): void
    {
        $collection = $this->connection->selectCollection(
            $this->databaseName,
            "users"
        );

        $collection->insertOne([
            "username" => "admin",
            "displayName" => "Admin",
            "email" => "admin@admin.com",
            "password" => password_hash("admin", PASSWORD_DEFAULT)
        ]);
    }
}
