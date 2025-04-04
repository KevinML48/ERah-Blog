<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    public function store(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        Comment::create([
            'blog_id' => $blog->id,
            'user_id' => auth()->id(),
            'content' => $validated['content'],
        ]);

        return back()->with('message', 'Commentaire ajouté avec succès.');
    }

    public function update(Request $request, Comment $comment)
    {
        if ($comment->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update($validated);

        return back()->with('message', 'Commentaire modifié avec succès.');
    }

    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== auth()->id() && !Gate::allows('manage comments')) {
            abort(403);
        }

        $comment->delete();

        return back()->with('message', 'Commentaire supprimé avec succès.');
    }
}
