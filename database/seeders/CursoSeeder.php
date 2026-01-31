<?php

namespace Database\Seeders;

use App\Models\Curso;
use Illuminate\Database\Seeder;

class CursoSeeder extends Seeder
{
    public function run(): void
    {
        $cursos = [
            ['codigo' => 'CC001', 'nome' => 'Ciência da Computação'],
            ['codigo' => 'SI001', 'nome' => 'Sistemas de Informação'],
            ['codigo' => 'ES001', 'nome' => 'Engenharia de Software'],
            ['codigo' => 'ADS01', 'nome' => 'Análise e Desenvolvimento de Sistemas'],
            ['codigo' => 'RC001', 'nome' => 'Redes de Computadores'],
            ['codigo' => 'BD001', 'nome' => 'Banco de Dados'],
            ['codigo' => 'DS001', 'nome' => 'Design Digital'],
            ['codigo' => 'JI001', 'nome' => 'Jogos Digitais'],
            ['codigo' => 'IA001', 'nome' => 'Inteligência Artificial'],
            ['codigo' => 'CD001', 'nome' => 'Ciência de Dados'],
        ];

        foreach ($cursos as $curso) {
            Curso::create($curso);
        }
    }
}
