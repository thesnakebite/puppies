<?php

namespace App\Http\Controllers;

use App\Actions\OptimizeWebpImageAction;
use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PuppyController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('puppies/index', [
            'puppies' => PuppyResource::collection(
                // Puppy::all()->load(['user', 'likedBy'])
                Puppy::query()
                    ->search($request->search)
                    ->with(['user', 'likedBy'])
                    ->latest()
                    ->paginate(9)
                    ->withQueryString()
            ),
            'likedPuppies' => $request->user()
                ? PuppyResource::collection($request->user()->likedPuppies)
                : [],
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function like(Request $request, Puppy $puppy)
    {
        // Check if the puppy is liked
        // If yes, unlike it
        // If no, like it
        usleep(2000000);

        $puppy->likedBy()->toggle($request->user()->id);

        return back();
    }

    public function store(Request $request)
    {
        // Validate the data
        $request->validate([
            'name' => 'required|string|max:30',
            'trait' => 'required|string|max:100',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        // Store the uploaded image
        $image_url = null;

        if ($request->hasFile('image')) {
            $optimized = (new OptimizeWebpImageAction)->handle($request->file('image'));

            $path = 'puppies/'.$optimized['fileName'];

            $stored = Storage::disk('public')->put($path, $optimized['webpString']);

            if (! $stored) {
                return back()->withErrors(['image' => 'No se pudo cargar la imagen.']);
            }

            $image_url = Storage::url($path);
        }
        // Create a new Puppy instance attached th the authenticated user
        $request->user()->puppies()->create([
            'name' => $request->name,
            'trait' => $request->trait,
            'image_url' => $image_url,
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Cachorro creado con éxito.',
        ]);

        return redirect()->route('home', ['page' => 1]);
    }

    public function update(Request $request, Puppy $puppy)
    {
        if ($request->user()->cannot('update', $puppy)) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'No tienes permiso para actualizar a este cachorro.',
            ]);

            return back();
        }

        // Validate the data
        $request->validate([
            'name' => 'required|string|max:30',
            'trait' => 'required|string|max:100',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ]);
        // If there is a new image
        if ($request->hasFile('image')) {
            $oldImagePath = str_replace('/storage/', '', $puppy->image_url);
            // Optimize and store the new image
            $optimized = (new OptimizeWebpImageAction())->handle($request->file('image'));
            $path = 'puppies/' . $optimized['fileName'];

            $stored = Storage::disk('public')->put($path, $optimized['webpString']);

            if (!$stored) {
                return back()->withErrors(['image' => 'No se pudo cargar la imagen.']);
            }
            $puppy->image_url = Storage::url($path);

            // Delete the old image
            if ($oldImagePath && Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        // Update the puppy values
        $puppy->name = $request->name;
        $puppy->trait = $request->trait;
        // Save the updated puppy
        $puppy->save();

        // Redirect back with success message
        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Cachorro actualizado con éxito.',
        ]);

        return back();
    }

    public function destroy(Request $request, Puppy $puppy)
    {
        if ($request->user()->cannot('delete', $puppy)) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'No tienes permiso para eliminar a este cachorro.',
            ]);

            return back();
        }

        $imagePath = str_replace('/storage/', '', $puppy->image_url);

        $puppy->delete();

        if ($imagePath && Storage::disk('public') ->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Cachorro eliminado con éxito.',
        ]);

        return redirect()->route('home', ['page' => 1]);
    }
}
