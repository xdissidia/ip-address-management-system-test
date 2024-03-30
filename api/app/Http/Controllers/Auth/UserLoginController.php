<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\AuditTrail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserLoginController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = Auth::user();

        AuditTrail::create([
            'ip_address' => $request->getClientIp(),
            'action' => 'LOGIN',
            'description' => "{$user->name} has logged in.",
        ])->user()->associate($user)->save();

        return response()->json([
            'user' => $user,
            'authorization' => [
                'token' => $user->createToken('ApiToken')->plainTextToken,
                'type' => 'bearer',
            ],
        ]);

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {

        $user = Auth::user();
        $user->tokens()->delete();

        AuditTrail::create([
            'ip_address' => $request->getClientIp(),
            'action' => 'LOGOUT',
            'description' => "{$user->name} has logged out.",
        ])->user()->associate($user)->save();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);

    }
}
