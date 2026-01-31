<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Curso extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'codigo',
        'nome',
    ];

    public function alunos(): HasMany
    {
        return $this->hasMany(Aluno::class, 'curso_id');
    }

    public function getQuantidadeAlunosAttribute(): int
    {
        return $this->alunos()->count();
    }
}
