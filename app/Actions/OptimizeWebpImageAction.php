<?php

namespace App\Actions;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Laravel\Facades\Image;

class OptimizeWebpImageAction
{
    /**
     * Create a new class instance.
     */
    public function handle(UploadedFile | string $input): array
    {
        // Image optimization
        $image = Image::decode($input);

        // Scale down only
        if ($image->width() > 1000) {
            $image->scale(width: 1000);
        }

        $encoded = $image->encode(new WebpEncoder(quality: 95));
        $fileName = Str::random() . '.webp';

        return [
            'fileName' => $fileName,
            'webpString' => $encoded,
        ];
    }
}
