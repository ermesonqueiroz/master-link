<?php

namespace Database\Factories;

use App\Models\Link;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Link>
 */
class LinkFactory extends Factory
{
    public function definition(): array
    {
        return [
            'userId' => fake()->uuid(),
            'title' => fake()->title(),
            'url' => fake()->url()
        ];
    }
}
