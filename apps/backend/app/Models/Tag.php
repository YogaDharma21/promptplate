<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tag extends Model
{
    protected $fillable = ['name'];

    public function prompts(): HasMany
    {
        return $this->hasMany(Prompt::class);
    }
}
