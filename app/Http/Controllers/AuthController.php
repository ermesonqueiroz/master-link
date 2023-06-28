<?php

namespace App\Http\Controllers;

use App\Http\Requests\RefreshTokenRequest;
use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\RefreshToken;
use App\Models\User;
use App\Utils\JsonWebToken;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthController extends Controller
{
    public static function register(SignUpRequest $request)
    {
        $userFound = User::where('email', $request['email'])
            ->orWhere('username', $request['username'])
            ->get();

        if (count($userFound) > 0) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'duplicated user'
                ])
            );
        }

        $user = new User([
            'username' => $request['username'],
            'displayName' => $request['display_name'],
            'email' => $request['email'],
            'password' => $request['password']
        ]);

        $user->save();

        $refreshToken = new RefreshToken([
            'userId' => $user['id']
        ]);
        $accessToken = JsonWebToken::encode([
            'id' => $user['id']
        ]);

        $refreshToken->save();

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken['id']
        ];
    }

    public static function login(SignInRequest $request)
    {
        $userFound = User::where('email', $request['email'])
            ->get()
            ->makeVisible(['password'])
            ->first();

        if (!$userFound) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'user not found'
                ])
            );
        }

        $passwordIsCorrect = password_verify($request['password'], $userFound['password']);

        if (!$passwordIsCorrect) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'incorrect password'
                ])
            );
        }

        RefreshToken::where('userId', $userFound['id'])->delete();

        $refreshToken = new RefreshToken([
            'userId' => $userFound['id']
        ]);
        $accessToken = JsonWebToken::encode([
            'id' => $userFound['id']
        ]);

        $refreshToken->save();

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken['id']
        ];
    }

    public static function refresh(RefreshTokenRequest $request)
    {
        $refreshToken = RefreshToken::find($request['refresh_token']);

        if (!$refreshToken) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'invalid refresh token'
                ])
            );
        }

        RefreshToken::where('userId', $refreshToken['userId'])->delete();

        $refreshToken = new RefreshToken([
            'userId' => $refreshToken['userId']
        ]);
        $accessToken = JsonWebToken::encode([
            'id' => $refreshToken['userId']
        ]);

        $refreshToken->save();

        return [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken['id']
        ];
    }
}
