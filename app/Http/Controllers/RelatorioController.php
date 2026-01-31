<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Curso;
use Inertia\Inertia;
use Inertia\Response;

class RelatorioController extends Controller
{
    public function alunosPorCurso(): Response
    {
        $cursos = Curso::withCount('alunos')
            ->orderBy('nome')
            ->get()
            ->map(function ($curso) {
                return [
                    'id' => $curso->id,
                    'codigo' => $curso->codigo,
                    'nome' => $curso->nome,
                    'quantidade_alunos' => $curso->alunos_count,
                ];
            });

        $totalAlunos = $cursos->sum('quantidade_alunos');

        return Inertia::render('relatorios/alunos-por-curso', [
            'cursos' => $cursos,
            'totalAlunos' => $totalAlunos,
        ]);
    }

    public function alunosAgrupados(): Response
    {
        $cursosComAlunos = Curso::with(['alunos' => function ($query) {
            $query->orderBy('nome', 'asc');
        }])
            ->orderBy('nome')
            ->get()
            ->map(function ($curso) {
                return [
                    'id' => $curso->id,
                    'codigo' => $curso->codigo,
                    'nome' => $curso->nome,
                    'alunos' => $curso->alunos->map(function ($aluno) {
                        return [
                            'id' => $aluno->id,
                            'matricula' => $aluno->matricula,
                            'nome' => $aluno->nome,
                            'endereco' => $aluno->endereco,
                        ];
                    }),
                ];
            });

        return Inertia::render('relatorios/alunos-agrupados', [
            'cursosComAlunos' => $cursosComAlunos,
        ]);
    }
}
