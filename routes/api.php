<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;
use App\Http\Middleware\Auth;

Route::prefix('auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'register']);
    Route::post('/signin', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

Route::prefix('link')->group(function () {
    Route::get('/{id}', [LinkController::class, 'index']);
    Route::post('/', [LinkController::class, 'create'])->middleware(Auth::class);
});
