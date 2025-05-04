<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->get('user', [AuthController::class, 'userProfile']);
Route::middleware('auth:api')->get('logout', [AuthController::class, 'logout']);
Route::middleware([AdminMiddleware::class])->group(function () {
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/update/{id}', [UserController::class, 'update']);
    Route::delete('users/delete/{id}', [UserController::class, 'delete']);
});
