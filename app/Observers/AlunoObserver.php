<?php

namespace App\Observers;

use App\Models\Aluno;
use Illuminate\Support\Facades\Log;

class AlunoObserver
{
    public function created(Aluno $aluno): void
    {
        Log::info('Novo aluno cadastrado', [
            'aluno_id' => $aluno->id,
            'matricula' => $aluno->matricula,
            'nome' => $aluno->nome,
            'curso_id' => $aluno->curso_id,
        ]);
    }

    public function updated(Aluno $aluno): void
    {
        Log::info('Aluno atualizado', [
            'aluno_id' => $aluno->id,
            'matricula' => $aluno->matricula,
            'changes' => $aluno->getChanges(),
        ]);
    }

    public function deleted(Aluno $aluno): void
    {
        Log::info('Aluno excluído (soft delete)', [
            'aluno_id' => $aluno->id,
            'matricula' => $aluno->matricula,
            'nome' => $aluno->nome,
        ]);
    }

    public function restored(Aluno $aluno): void
    {
        Log::info('Aluno restaurado', [
            'aluno_id' => $aluno->id,
            'matricula' => $aluno->matricula,
        ]);
    }

    public function forceDeleted(Aluno $aluno): void
    {
        Log::warning('Aluno excluído permanentemente', [
            'aluno_id' => $aluno->id,
            'matricula' => $aluno->matricula,
        ]);
    }
}
