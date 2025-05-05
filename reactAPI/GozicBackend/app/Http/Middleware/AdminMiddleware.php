<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            if ($user->role !== 'admin') {
                return response()->json(['error' => 'Unauthorized - Admins only'], 403);
            }

            return $next($request);
        } catch (Exception $e) {
            return response()->json(['error' => 'Token is invalid or expired'], 401);
        }
    }
}
