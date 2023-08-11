<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", fn() => Inertia::render('LandingPage'));
Route::get("/login", fn() => Inertia::render('Login'));
Route::get("/signup", fn() => Inertia::render('SignUp'));
