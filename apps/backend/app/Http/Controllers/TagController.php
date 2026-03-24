<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tag = Tag::all();
        return response()->json($tag);
    }

    public function show(Tag $tag)
    {
        $prompts = $tag->prompts()->with('user:id,name')->get()->map(function ($prompt) {
            return [
                'id' => $prompt->id,
                'name' => $prompt->name,
                'content' => $prompt->content,
                'tag_id' => $prompt->tag_id,
                'creator' => $prompt->user->name,
                'user_id' => $prompt->user_id,
                'created_at' => $prompt->created_at,
                'updated_at' => $prompt->updated_at,
            ];
        });

        return response()->json([
            'tag' => $tag,
            'prompts' => $prompts
        ]);
    }
}
