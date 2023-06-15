<?php

namespace App\External\Repositories;

interface RefreshTokensRepository
{
    function add(array $user);
    function findById(string $id);
    function findByUserId(string $userId);
    function delete(string $id);
}
