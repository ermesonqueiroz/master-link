<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public static function index(Request $request)
    {
        $user = User::find($request->userId);

        return response()->json($user, 200);
    }

    public static function update(UpdateUserRequest $request)
    {
        $user = User::find($request->userId)->update([
            'username' => $request['username'],
            'displayName' => $request['display_name']
        ]);

        if (!$user) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'user not found'
                ], 400)
            );
        }

        return response()->json([], 200);
    }
}
