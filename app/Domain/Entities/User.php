<?php

namespace App\Domain\Entities;

use Exception;

class User
{
    private $username;
    private $displayName;
    private $email;
    private $password;

    private function __construct(string $username, string $displayName, string $email, string $password)
    {
        $this->username = $username;
        $this->displayName = $displayName;
        $this->email = $email;
        $this->password = $password;
    }

    static function create(array $userData)
    {
        $username = $userData["username"];
        $displayName = $userData["displayName"];
        $email = filter_var($userData["email"], FILTER_SANITIZE_EMAIL);
        $password = $userData["password"];

        if (!$email) {
            throw new Exception("Email '$email' is invalid.");
        }

        return new User(
            $username,
            $displayName,
            $email,
            $password
        );
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
