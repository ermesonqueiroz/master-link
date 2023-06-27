<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory(2)->create();

        User::factory()->create([
            'username' => 'admin',
            'display_name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => password_hash('admin123', PASSWORD_DEFAULT)
        ]);
    }
}
