<?php

namespace App\External\Repositories;

interface UsersRepository
{
    function add(array $user);
    function findById(string $id);
    function findByEmail(string $email);
} 
