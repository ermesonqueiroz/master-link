<?php

namespace Database\Seeders;

use App\Models\Appearance;
use Illuminate\Database\Seeder;

class AppearanceSeeder extends Seeder
{
    public function run(): void
    {
        Appearance::factory(3)->create();
    }
}
