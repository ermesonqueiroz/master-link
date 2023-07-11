<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AppearanceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'userId' => fake()->uuid(),
            'textColor' => '#27262a',
            'backgroundColor' => '#f4f4f5',
            'buttonColor' => '#fff',
            'buttonTextColor' => '#27262a'
        ];
    }
}
