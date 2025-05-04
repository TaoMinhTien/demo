<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        if ($user->role === 'admin') {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
