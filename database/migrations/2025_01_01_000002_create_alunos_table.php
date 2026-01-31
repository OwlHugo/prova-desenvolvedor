<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alunos', function (Blueprint $table) {
            $table->id();
            $table->string('matricula', 20)->unique();
            $table->string('nome', 255);
            $table->foreignId('curso_id')->constrained('cursos')->onDelete('cascade');
            $table->string('endereco', 500)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('curso_id');
            $table->index('nome');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alunos');
    }
};
