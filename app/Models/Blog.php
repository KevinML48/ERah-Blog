<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'published_at',
        'image',
        'video_url',
    ];

    // Relation avec les commentaires (si vous avez une table comments)
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
