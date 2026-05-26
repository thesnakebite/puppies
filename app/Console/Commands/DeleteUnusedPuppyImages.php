<?php

namespace App\Console\Commands;

use App\Models\Puppy;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

#[Signature('delete-unused-puppy-images')]
#[Description('Clean up uploaded images that are no longer referenced in the database.')]
class DeleteUnusedPuppyImages extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        // -----------------------------------------
        // Find unused images
        // -----------------------------------------

        // Get all stored images in `puppies` directory
        $storedImages = Storage::disk('public')->files('puppies');
        // Get all images referenced by puppies
        $usedImages = Puppy::pluck('image_url')
            // adjust the path to match stored images
            ->map(fn($url) => str_replace('/storage/' , '', $url))
            ->toArray();

        // Compare both arrays
        $unusedImages = array_diff($storedImages, $usedImages);

        // -----------------------------------------
        // Report
        // -----------------------------------------

        $totalCount = count($unusedImages);

        if ($totalCount === 0) {
            $this->info('No se encontraron imágenes sin usar.');
            return;
        }

        $this->info('Encontrado ' . $totalCount . ' imágenes no utilizadas.');
        // Show name for first 3 images, and then "+ X more..." if any.
        $firstThree = array_slice($unusedImages, 0, 3);

        foreach ($firstThree as $image) {
            $this->line('- ' . $image);
        }

        if ($totalCount > 3) {
            $remaining = $totalCount - 3;
            $this->line("+ {$remaining} más...");
        }

        // -----------------------------------------
        // Delete (upon confirmation)
        // -----------------------------------------

        if ($this->confirm('¿Desea eliminar estas imágenes no utilizadas?')) {
            foreach ($unusedImages as $image) {
                Storage::disk('public')->delete($image);
                $this->info('Deleted: ' . $image);
            }

            $this->info('Las imágenes no utilizadas se eliminaron correctamente.');
        } else {
            $this->info('Operación cancelada.');
        }
    }
}
