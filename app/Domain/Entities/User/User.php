<?php

namespace App\Domain\Entities\User;

use Exception;

class User
{
    private string $id;
    private string $username;
    private string $displayName;
    private string $email;
    private string $password;

    private function __construct(string $id, string $username, string $displayName, string $email, string $password)
    {
        $this->id = $id;
        $this->username = $username;
        $this->displayName = $displayName;
        $this->email = $email;
        $this->password = $password;
    }

    static function create(UserData $userData): User
    {
        $id = $userData->id;
        $username = $userData->username;
        $displayName = $userData->displayName;
        $email = filter_var($userData->email, FILTER_SANITIZE_EMAIL);
        $password = $userData->password;

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

    function getId(): string
    {
        return $this->id;
    }

    function getUsername(): string
    {
        return $this->username;
    }

    function getDisplayName(): string
    {
        return $this->displayName;
    }

    function getEmail(): string
    {
        return $this->email;
    }

    function getPassword(): string
    {
        return $this->password;
    }
}
