<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlunoRequest;
use App\Http\Requests\UpdateAlunoRequest;
use App\Models\Aluno;
use App\Models\Curso;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlunoController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Aluno::query()->with('curso');

        if ($request->filled('matricula')) {
            $query->where('matricula', 'like', '%' . $request->matricula . '%');
        }
        if ($request->filled('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }
        if ($request->filled('curso_id') && $request->curso_id !== 'all') {
            $query->where('curso_id', $request->curso_id);
        }
        if ($request->filled('endereco')) {
            $query->where('endereco', 'like', '%' . $request->endereco . '%');
        }

        $sortField = $request->get('sort', 'id');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $alunos = $query->paginate(5)->withQueryString();

        return Inertia::render('alunos/index', [
            'alunos' => $alunos,
            'cursos' => Curso::orderBy('nome')->get(['id', 'nome', 'codigo']),
            'filters' => $request->only(['matricula', 'nome', 'curso_id', 'endereco']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('alunos/create', [
            'cursos' => Curso::orderBy('nome')->get(['id', 'nome', 'codigo']),
        ]);
    }

    public function store(StoreAlunoRequest $request): RedirectResponse
    {
        Aluno::create($request->validated());

        return redirect()
            ->route('alunos.index')
            ->with('success', 'Aluno cadastrado com sucesso!');
    }

    public function edit(Aluno $aluno): Response
    {
        return Inertia::render('alunos/edit', [
            'aluno' => $aluno->load('curso'),
            'cursos' => Curso::orderBy('nome')->get(['id', 'nome', 'codigo']),
        ]);
    }

    public function update(UpdateAlunoRequest $request, Aluno $aluno): RedirectResponse
    {
        $aluno->update($request->validated());

        return redirect()
            ->route('alunos.index')
            ->with('success', 'Aluno atualizado com sucesso!');
    }

    public function destroy(Aluno $aluno): RedirectResponse
    {
        $aluno->delete();

        return redirect()
            ->route('alunos.index')
            ->with('success', 'Aluno excluído com sucesso!');
    }
}
