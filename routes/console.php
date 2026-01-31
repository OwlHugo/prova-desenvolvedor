<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:limpar-registros-excluidos --dias=30')
    ->daily()
    ->at('02:00')
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/scheduler.log'));
