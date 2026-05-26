<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Álvaro dev',
            'email' => 'alvaro@thesnakebite.es',
        ]);

        User::factory(8)->create();

        $this->call(PuppySeeder::class);
    }
}
