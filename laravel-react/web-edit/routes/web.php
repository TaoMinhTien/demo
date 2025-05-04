<?php

use App\Http\Controllers\auth\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/login', [AuthController::class, 'indexLogin']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'indexRegister']);
Route::post('/register', [AuthController::class, 'Register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/user/dashboard', function () {
        return Inertia::render('User/UserDashboard');
    })->name('user.userdashboard');
    
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard'); 
    })->middleware('role:admin')->name('admin.dashboard');
});