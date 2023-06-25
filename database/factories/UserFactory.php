<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => fake()->uuid(),
            'username' => fake()->unique()->userName(),
            'display_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => password_hash(fake()->password(), PASSWORD_DEFAULT)
        ];
    }
}
