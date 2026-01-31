<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCursoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'codigo' => ['required', 'string', 'max:20', Rule::unique('cursos', 'codigo')->ignore($this->curso)],
            'nome' => ['required', 'string', 'max:255'],
        ];
    }
}
