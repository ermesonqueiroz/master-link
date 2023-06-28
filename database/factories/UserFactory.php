<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'username' => fake()->unique()->name(),
            'displayName' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => password_hash(fake()->password(), PASSWORD_DEFAULT)
        ];
    }
}
