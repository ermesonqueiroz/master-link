<?php

namespace App\External\Repositories;

interface UsersRepository
{
    function add(array $user);
    function findByEmail(string $email);
} 
