<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCursoRequest;
use App\Http\Requests\UpdateCursoRequest;
use App\Models\Curso;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CursoController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Curso::query()->withCount('alunos');

        if ($request->filled('codigo')) {
            $query->where('codigo', 'like', '%' . $request->codigo . '%');
        }
        if ($request->filled('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        $sortField = $request->get('sort', 'id');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $cursos = $query->paginate(5)->withQueryString();

        return Inertia::render('cursos/index', [
            'cursos' => $cursos,
            'filters' => $request->only(['codigo', 'nome']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('cursos/create');
    }

    public function store(StoreCursoRequest $request): RedirectResponse
    {
        Curso::create($request->validated());

        return redirect()
            ->route('cursos.index')
            ->with('success', 'Curso criado com sucesso!');
    }

    public function edit(Curso $curso): Response
    {
        return Inertia::render('cursos/edit', [
            'curso' => $curso,
        ]);
    }

    public function update(UpdateCursoRequest $request, Curso $curso): RedirectResponse
    {
        $curso->update($request->validated());

        return redirect()
            ->route('cursos.index')
            ->with('success', 'Curso atualizado com sucesso!');
    }

    public function destroy(Curso $curso): RedirectResponse
    {
        if ($curso->alunos()->exists()) {
            return redirect()
                ->route('cursos.index')
                ->with('error', 'Não é possível excluir o curso pois há alunos vinculados.');
        }

        $curso->delete();

        return redirect()
            ->route('cursos.index')
            ->with('success', 'Curso excluído com sucesso!');
    }
}
