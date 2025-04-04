<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Afficher la liste des blogs.
     */
    public function index()
    {
        $blogs = Blog::all(); // Récupérer tous les blogs
        return Inertia::render('Blogs/Index', ['blogs' => $blogs]);
    }

    /**
     * Afficher le formulaire de création d'un blog.
     */
    public function create()
    {
        return Inertia::render('Blogs/Create');
    }

    /**
     * Enregistrer un nouveau blog dans la base de données.
     */
    public function store(Request $request)
    {
        // Validation des données du formulaire
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Valider les fichiers image
            'video_url' => 'nullable|url', // Valider l'URL YouTube
        ]);

        // Gérer l'image uploadée (si présente)
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('blog_images', 'public'); // Stocker dans le disque public
        }

        // Vérifier et formater l'URL YouTube (si présente)
        if (!empty($validated['video_url'])) {
            $validated['video_url'] = $this->formatYouTubeUrl($validated['video_url']);
        }

        // Créer le blog avec les données validées
        Blog::create($validated);

        return redirect()->route('blogs.index')->with('message', 'Blog créé avec succès.');
    }

    /**
     * Afficher le formulaire d'édition d'un blog existant.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('Blogs/Edit', ['blog' => $blog]);
    }

    /**
     * Mettre à jour un blog existant.
     */
    public function update(Request $request, Blog $blog)
    {
        // Validation des données du formulaire
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'published_at' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Valider les fichiers image
            'video_url' => 'nullable|url', // Valider l'URL YouTube
        ]);

        // Gérer l'image uploadée (si présente)
        if ($request->hasFile('image')) {
            // Supprimer l'image précédente si elle existe
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $validated['image'] = $request->file('image')->store('blog_images', 'public');
        }

        // Vérifier et formater l'URL YouTube (si présente)
        if (!empty($validated['video_url'])) {
            $validated['video_url'] = $this->formatYouTubeUrl($validated['video_url']);
        }

        // Mettre à jour le blog avec les données validées
        $blog->update($validated);

        return redirect()->route('blogs.index')->with('message', 'Blog modifié avec succès.');
    }

    /**
     * Supprimer un blog existant.
     */
    public function destroy(Blog $blog)
    {
        // Supprimer l'image associée au blog (si présente)
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }

        // Supprimer le blog de la base de données
        $blog->delete();

        return redirect()->route('blogs.index')->with('message', 'Blog supprimé avec succès.');
    }

    /**
     * Formater une URL YouTube pour s'assurer qu'elle est intégrable.
     */
    private function formatYouTubeUrl(string $url): string
    {
        preg_match('/(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|\.be\/)([a-zA-Z0-9_-]{11})/', $url, $matches);
    
        if (!empty($matches[1])) {
            return "https://www.youtube.com/embed/" . $matches[1];
        }
    
        return '';
    }       
}
