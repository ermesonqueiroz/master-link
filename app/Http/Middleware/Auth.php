<?php

namespace App\Http\Middleware;

use App\Utils\JsonWebToken;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Auth
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $authorizationHeader = $request->header('Authorization');

            if (!$authorizationHeader) {
                return response()->json(['error' => 'Unauthorized'], 401);
                ;
            }

            $accessToken = str_replace('Bearer ', '', $authorizationHeader);
            $userId = JsonWebToken::decode($accessToken)->id;

            if (!$userId) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $request->merge([
                'userId' => $userId
            ]);

            return $next($request);
        } catch (Exception) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
