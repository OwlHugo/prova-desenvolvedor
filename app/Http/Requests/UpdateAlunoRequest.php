<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAlunoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'matricula' => ['required', 'string', 'max:20', Rule::unique('alunos', 'matricula')->ignore($this->aluno)],
            'nome' => ['required', 'string', 'max:255'],
            'curso_id' => ['required', 'exists:cursos,id'],
            'endereco' => ['nullable', 'string', 'max:500'],
        ];
    }
}
