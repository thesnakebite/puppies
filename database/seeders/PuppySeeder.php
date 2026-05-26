<?php

namespace Database\Seeders;

use App\Actions\OptimizeWebpImageAction;
use App\Models\Puppy;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PuppySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $puppies = [
            [
                'name' => 'Frisket',
                'trait' => 'Madre de todos los cachorros',
                'image' => '1.jpg',
            ],
            [
                'name' => 'Chase',
                'trait' => 'Muy buen chico 🐶',
                'image' => '2.jpg',
            ],
            [
                'name' => 'Leia',
                'trait' => 'Le gustan las siestas 💤',
                'image' => '3.jpg',
            ],
            [
                'name' => 'Pupi',
                'trait' => 'Le encanta el queso 🧀',
                'image' => '4.jpg',
            ],
            [
                'name' => 'Russ',
                'trait' => 'Listo para salvar el mundo 🌎',
                'image' => '5.jpg',
            ],
            [
                'name' => 'Yoko',
                'trait' => 'Listo para cualquier cosa',
                'image' => '6.jpg',
            ],
            [
                'name' => 'Mochi',
                'trait' => 'Adicto a los achuchones.',
                'image' => '7.jpg',
            ],
            [
                'name' => 'Goku',
                'trait' => 'Salta más alto que tú.',
                'image' => '8.jpg',
            ],
            [
                'name' => 'Nala',
                'trait' => 'Reina de la casa 🏡',
                'image' => '9.jpg',
            ],
            [
                'name' => 'Toby',
                'trait' => 'Persigue su propia cola.',
                'image' => '10.jpg',
            ],
            [
                'name' => 'Lola',
                'trait' => 'Experta en derretir ❤️',
                'image' => '11.jpg',
            ],
            [
                'name' => 'Bruno',
                'trait' => 'Buscador profesional de calcetines 🧦',
                'image' => '12.jpg',
            ],
            [
                'name' => 'Kira',
                'trait' => 'Le encantan los charcos',
                'image' => '13.jpg',
            ],
            [
                'name' => 'Simba',
                'trait' => 'Pequeño pero con mucha actitud.',
                'image' => '14.jpg',
            ],

            [
                'name' => 'Zazu',
                'trait' => 'Rey de los mimos.',
                'image' => '15.jpg',
            ],
            [
                'name' => 'Plomo',
                'trait' => 'Experta en travesuras.',
                'image' => '16.jpg',
            ],
            [
                'name' => 'Oreo',
                'trait' => 'Campeón de siestas.',
                'image' => '17.jpg',
            ],
            [
                'name' => 'Lucky',
                'trait' => 'Detective de olores.',
                'image' => '18.jpg',
            ],
            [
                'name' => 'Buddy',
                'trait' => 'Salvavidas del hogar.',
                'image' => '19.jpg',
            ],
            [
                'name' => 'Charlie',
                'trait' => 'Le encanta la ducha 🚿',
                'image' => '20.jpg',
            ],
        ];

        $optimizer = new OptimizeWebpImageAction;

        $users = User::all();
        $alvaro = $users->first();
        $otherUsers = $users->skip(1)->values();

        $this->seedPuppies(array_slice($puppies, 0, 4), $alvaro, $optimizer);

        $chunks = array_chunk(array_slice($puppies, 4), 2);
        foreach ($chunks as $index => $chunk) {
            $this->seedPuppies($chunk, $otherUsers[$index % $otherUsers->count()], $optimizer);
        }
    }

    /**
     * @param  array<array{name: string, trait: string, image: string}>  $puppies
     */
    private function seedPuppies(array $puppies, User $user, OptimizeWebpImageAction $optimizer): void
    {
        foreach ($puppies as $puppy) {
            $input = base_path('seed-images/'.$puppy['image']);
            $optimized = $optimizer->handle($input);
            $path = 'puppies/'.$optimized['fileName'];

            Storage::disk('public')->put($path, $optimized['webpString']);

            Puppy::create([
                'user_id' => $user->id,
                'name' => $puppy['name'],
                'trait' => $puppy['trait'],
                'image_url' => Storage::url($path),
            ]);
        }
    }
}
