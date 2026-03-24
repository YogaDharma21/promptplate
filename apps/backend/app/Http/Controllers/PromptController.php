<?php

namespace App\Http\Controllers;

use App\Models\Prompt;
use Illuminate\Http\Request;

class PromptController extends Controller
{
    public function index()
    {
        try {
            $prompts = Prompt::with('user:id,name')->get();
            $formattedPrompts = $prompts->map(function ($prompt) {
                return [
                    'id' => $prompt->id,
                    'name' => $prompt->name,
                    'content' => $prompt->content,
                    'tag_id' => $prompt->tag_id,
                    'tag_name' => $prompt->tag->name,
                    'creator' => $prompt->user->name,
                    'user_id' => $prompt->user_id,
                    'created_at' => $prompt->created_at,
                    'updated_at' => $prompt->updated_at,
                ];
            });
            return response()->json($formattedPrompts);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'tag_id' => 'required|exists:tags,id',
        ]);

        try {
            $request->user()->prompts()->create($validatedData);
            return response()->json(['message' => 'Prompt created successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function show(Prompt $prompt)
    {
        return $prompt->load('tag');
    }
    public function update(Request $request, Prompt $prompt)
    {
        if ($request->user()->id !== $prompt->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'tag_id' => 'required|exists:tags,id',
        ]);

        try {
            $prompt->update($validatedData);
            return response()->json(['message' => 'Prompt updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
