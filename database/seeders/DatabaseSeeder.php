<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
         User::factory(5)->create();

         User::factory()->create([
             'username' => 'admin',
             'display_name' => 'Admin',
             'email' => 'admin@admin.com',
             'password' => password_hash('admin123', PASSWORD_DEFAULT)
         ]);
    }
}
