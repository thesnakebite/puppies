<?php

use App\Http\Controllers\PuppyController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PuppyController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::patch('puppies/{puppy}/like', [PuppyController::class, 'like'])
        ->name('puppies.like');
    Route::post('puppies', [PuppyController::class, 'store'])
        ->name('puppies.store');
    Route::put('puppies/{puppy}', [PuppyController::class, 'update'])
        ->name('puppies.update');
    Route::delete('puppies/{puppy}', [PuppyController::class, 'destroy'])
        ->name('puppies.destroy');
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
