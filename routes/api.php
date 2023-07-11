<?php

use App\Http\Controllers\AppearanceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserAvatarController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Auth;

Route::prefix('auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'register']);
    Route::post('/signin', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

Route::prefix('link')->group(function () {
    Route::get('/{id}', [LinkController::class, 'index']);
    Route::delete('/{id}', [LinkController::class, 'delete'])->middleware(Auth::class);
    Route::put('/{id}', [LinkController::class, 'update'])->middleware(Auth::class);
    Route::post('/', [LinkController::class, 'create'])->middleware(Auth::class);
});

Route::prefix('profile')->group(function () {
    Route::get('/{username}', [ProfileController::class, 'index']);
});

Route::prefix('user')->group(function () {
    Route::post('/avatar', [UserAvatarController::class, 'store'])->middleware(Auth::class);
    Route::delete('/avatar', [UserAvatarController::class, 'delete'])->middleware(Auth::class);
    Route::get('/', [UserController::class, 'index'])->middleware(Auth::class);
    Route::put('/', [UserController::class, 'update'])->middleware(Auth::class);
});

Route::prefix('appearance')->group(function () {
    Route::get('/{userId}', [AppearanceController::class, 'index']);
    Route::put('/', [AppearanceController::class, 'update'])->middleware(Auth::class);
});
