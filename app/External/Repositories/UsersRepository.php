<?php

namespace App\External\Repositories;

use App\Domain\Entities\User\UserData;

interface UsersRepository
{
    function add(UserData $user): void;
    function findById(string $id): UserData | null;
    function findByEmail(string $email): UserData | null;
} 
