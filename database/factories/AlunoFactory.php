<?php

namespace Database\Factories;

use App\Models\Aluno;
use App\Models\Curso;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlunoFactory extends Factory
{
    protected $model = Aluno::class;

    public function definition(): array
    {
        return [
            'matricula' => strtoupper($this->faker->unique()->bothify('MAT#####')),
            'nome' => $this->faker->name(),
            'curso_id' => Curso::factory(),
            'endereco' => $this->faker->address(),
        ];
    }
}
