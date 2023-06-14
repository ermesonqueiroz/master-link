<?php

namespace Database\Seeds;

class UserSeeder
{
    private $connection;
    private $databaseName;

    function __construct(\MongoDB\Client $connection, string $databaseName)
    {
        $this->connection = $connection;
        $this->databaseName = $databaseName;
    }

    public function run()
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
