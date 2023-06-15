<?php

namespace App\External\Repositories;

interface RefreshTokensRepository
{
    function add(array $user);
    function findByUserId(string $userId);
    function delete(string $id);
}
