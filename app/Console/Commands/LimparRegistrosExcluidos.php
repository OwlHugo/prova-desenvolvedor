<?php

namespace App\Console\Commands;

use App\Models\Aluno;
use App\Models\Curso;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class LimparRegistrosExcluidos extends Command
{
    protected $signature = 'app:limpar-registros-excluidos {--dias=30 : Dias para considerar registrs antigos}';

    protected $description = 'Remove permanentemente registros soft-deleted com mis de X dias';

    public function handle(): int
    {
        $dias = (int) $this->option('dias');
        $dataLimite = now()->subDays($dias);

        $alunosRemovidos = Aluno::onlyTrashed()
            ->where('deleted_at', '<', $dataLimite)
            ->forceDelete();

        $cursosRemovidos = Curso::onlyTrashed()
            ->where('deleted_at', '<', $dataLimite)
            ->forceDelete();

        $mensagem = "Limpeza concluída: {$alunosRemovidos} alunos e {$cursosRemovidos} cursos removidos permanentemente.";

        $this->info($mensagem);
        Log::info($mensagem);

        return Command::SUCCESS;
    }
}
