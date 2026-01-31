<?php

namespace Tests\Feature;

use App\Models\Curso;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CursoTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_cursos(): void
    {
        Curso::factory()->count(3)->create();

        $response = $this->get('/cursos');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('cursos/index')
            ->has('cursos.data', 3)
        );
    }

    public function test_can_create_curso(): void
    {
        $response = $this->get('/cursos/create');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('cursos/create'));
    }

    public function test_can_store_curso(): void
    {
        $cursoData = [
            'codigo' => 'TST001',
            'nome' => 'Curso de Teste',
        ];

        $response = $this->post('/cursos', $cursoData);

        $response->assertRedirect('/cursos');
        $this->assertDatabaseHas('cursos', $cursoData);
    }

    public function test_can_edit_curso(): void
    {
        $curso = Curso::factory()->create();

        $response = $this->get("/cursos/{$curso->id}/edit");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('cursos/edit')
            ->has('curso')
        );
    }

    public function test_can_update_curso(): void
    {
        $curso = Curso::factory()->create();

        $response = $this->put("/cursos/{$curso->id}", [
            'codigo' => 'UPD001',
            'nome' => 'Curso Atualizado',
        ]);

        $response->assertRedirect('/cursos');
        $this->assertDatabaseHas('cursos', [
            'id' => $curso->id,
            'codigo' => 'UPD001',
            'nome' => 'Curso Atualizado',
        ]);
    }

    public function test_can_delete_curso(): void
    {
        $curso = Curso::factory()->create();

        $response = $this->delete("/cursos/{$curso->id}");

        $response->assertRedirect('/cursos');
        $this->assertSoftDeleted('cursos', ['id' => $curso->id]);
    }

    public function test_cannot_store_curso_with_duplicate_codigo(): void
    {
        Curso::factory()->create(['codigo' => 'DUP001']);

        $response = $this->post('/cursos', [
            'codigo' => 'DUP001',
            'nome' => 'Outro Curso',
        ]);

        $response->assertSessionHasErrors('codigo');
    }

    public function test_validates_required_fields_on_store(): void
    {
        $response = $this->post('/cursos', []);

        $response->assertSessionHasErrors(['codigo', 'nome']);
    }
}
