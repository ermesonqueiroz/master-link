<?php

namespace App\Domain\Entities;

use Exception;

class User
{
    private $id;
    private $username;
    private $displayName;
    private $email;
    private $password;

    private function __construct(string $id, string $username, string $displayName, string $email, string $password)
    {
        $this->id = $id;
        $this->username = $username;
        $this->displayName = $displayName;
        $this->email = $email;
        $this->password = $password;
    }

    static function create(array $userData)
    {
        $id = $userData["id"];
        $username = $userData["username"];
        $displayName = $userData["displayName"];
        $email = filter_var($userData["email"], FILTER_SANITIZE_EMAIL);
        $password = $userData["password"];

        if (!$email) {
            throw new Exception("Email '$email' is invalid.");
        }

        return new User(
            $id,
            $username,
            $displayName,
            $email,
            $password
        );
    }

    function getId()
    {
        return $this->id;
    }

    function getUsername()
    {
        return $this->username;
    }

    function getDisplayName()
    {
        return $this->displayName;
    }

    function getEmail()
    {
        return $this->email;
    }

    function getPassword()
    {
        return $this->password;
    }
}
