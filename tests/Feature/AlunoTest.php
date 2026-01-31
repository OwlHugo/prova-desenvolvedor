<?php

namespace Tests\Feature;

use App\Models\Aluno;
use App\Models\Curso;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AlunoTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_alunos(): void
    {
        Aluno::factory()->count(3)->create();

        $response = $this->get('/alunos');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('alunos/index')
            ->has('alunos.data', 3)
        );
    }

    public function test_can_store_aluno(): void
    {
        $curso = Curso::factory()->create();

        $alunoData = [
            'matricula' => 'MAT99999',
            'nome' => 'Aluno de Teste',
            'curso_id' => $curso->id,
            'endereco' => 'Rua de Teste, 123',
        ];

        $response = $this->post('/alunos', $alunoData);

        $response->assertRedirect('/alunos');
        $this->assertDatabaseHas('alunos', [
            'matricula' => 'MAT99999',
            'nome' => 'Aluno de Teste',
        ]);
    }

    public function test_can_update_aluno(): void
    {
        $aluno = Aluno::factory()->create();

        $response = $this->put("/alunos/{$aluno->id}", [
            'matricula' => 'UPD99999',
            'nome' => 'Aluno Atualizado',
            'curso_id' => $aluno->curso_id,
            'endereco' => 'Nova Rua, 456',
        ]);

        $response->assertRedirect('/alunos');
        $this->assertDatabaseHas('alunos', [
            'id' => $aluno->id,
            'matricula' => 'UPD99999',
        ]);
    }

    public function test_can_delete_aluno(): void
    {
        $aluno = Aluno::factory()->create();

        $response = $this->delete("/alunos/{$aluno->id}");

        $response->assertRedirect('/alunos');
        $this->assertSoftDeleted('alunos', ['id' => $aluno->id]);
    }

    public function test_validates_required_fields(): void
    {
        $response = $this->post('/alunos', []);

        $response->assertSessionHasErrors(['matricula', 'nome', 'curso_id']);
    }

    public function test_validates_curso_exists(): void
    {
        $response = $this->post('/alunos', [
            'matricula' => 'MAT12345',
            'nome' => 'Aluno',
            'curso_id' => 99999,
        ]);

        $response->assertSessionHasErrors('curso_id');
    }
}
