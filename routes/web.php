<?php

use App\Http\Controllers\AlunoController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\RelatorioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::resource('cursos', CursoController::class)->except(['show']);

Route::resource('alunos', AlunoController::class)->except(['show']);

Route::prefix('relatorios')->name('relatorios.')->group(function () {
    Route::get('/alunos-por-curso', [RelatorioController::class, 'alunosPorCurso'])->name('alunos-por-curso');
    Route::get('/alunos-agrupados', [RelatorioController::class, 'alunosAgrupados'])->name('alunos-agrupados');
});
