<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserAvatarController extends Controller
{
    public static function store(Request $request) {
        $request->file('avatar')->move(public_path('storage/avatars'), $request->userId);
    }
}
