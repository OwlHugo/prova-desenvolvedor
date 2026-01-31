<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCursoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'codigo' => ['required', 'string', 'max:20', 'unique:cursos,codigo'],
            'nome' => ['required', 'string', 'max:255'],
        ];
    }
}
