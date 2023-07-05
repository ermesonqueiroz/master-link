<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UserAvatarController extends Controller
{
    public static function store(Request $request) {
        $request->file('avatar')->move(public_path('storage/avatars'), $request->userId);
    }

    public static function delete(Request $request) {
        File::delete(public_path("storage/avatars/$request->userId"));
    }
}
