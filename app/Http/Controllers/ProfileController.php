<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\Link;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public static function index(string $username, Request $request)
    {
        $user = User::where('username', $username)
            ->get()
            ->first();

        $links = Link::where('userId', $user->id)
            ->where('active', true)
            ->get()
            ->toArray();

        if (!$user) {
            return response([], 404);
        }

        $resource = new ProfileResource((object) [
            'username' => $user->username,
            'displayName' => $user->displayName,
            'links' => $links
        ]);

        return $resource->toArray($request);
    }
}
