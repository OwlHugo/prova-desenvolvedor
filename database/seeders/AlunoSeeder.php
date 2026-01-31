<?php

namespace Database\Seeders;

use App\Models\Aluno;
use App\Models\Curso;
use Illuminate\Database\Seeder;

class AlunoSeeder extends Seeder
{
    public function run(): void
    {
        $cursos = Curso::all();

        $nomes = [
            'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa',
            'Lucas Pereira', 'Julia Souza', 'Gabriel Ferreira', 'Beatriz Lima',
            'Matheus Rodrigues', 'Larissa Almeida', 'Rafael Carvalho', 'Camila Gomes',
            'Bruno Martins', 'Isabela Ribeiro', 'Diego Nascimento', 'Fernanda Barbosa',
            'Thiago Araújo', 'Amanda Rocha', 'Felipe Dias', 'Carolina Cardoso',
            'Rodrigo Mendes', 'Letícia Castro', 'André Correia', 'Patricia Moreira',
            'Gustavo Alves', 'Mariana Vieira', 'Leonardo Santos', 'Vanessa Teixeira',
            'Eduardo Lima', 'Natalia Fernandes', 'Victor Hugo', 'Daniela Campos',
            'Alexandre Nunes', 'Juliana Pinto', 'Marcelo Costa', 'Bianca Melo',
            'Ricardo Andrade', 'Stefany Lopes', 'Carlos Eduardo', 'Priscila Freitas',
        ];

        $enderecos = [
            'Rua das Flores, 123', 'Av. Brasil, 456', 'Rua São Paulo, 789',
            'Av. Paulista, 1000', 'Rua do Comércio, 50', 'Av. Rio Branco, 200',
            'Rua XV de Novembro, 300', 'Av. Presidente Vargas, 400',
            'Rua da Liberdade, 150', 'Av. Santos Dumont, 600',
        ];

        $contador = 1;
        foreach ($nomes as $nome) {
            Aluno::create([
                'matricula' => sprintf('MAT%05d', $contador),
                'nome' => $nome,
                'curso_id' => $cursos->random()->id,
                'endereco' => $enderecos[array_rand($enderecos)] . ', ' . fake('pt_BR')->city(),
            ]);
            $contador++;
        }
    }
}
