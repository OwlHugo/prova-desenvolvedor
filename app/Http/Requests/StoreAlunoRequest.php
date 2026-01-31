<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlunoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'matricula' => ['required', 'string', 'max:20', 'unique:alunos,matricula'],
            'nome' => ['required', 'string', 'max:255'],
            'curso_id' => ['required', 'exists:cursos,id'],
            'endereco' => ['nullable', 'string', 'max:500'],
        ];
    }
}
