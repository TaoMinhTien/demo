<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    public function indexLogin()
    {
        return Inertia::render('auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->remember ?? false;

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Email không tồn tại'])->withInput();
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            return back()->withErrors(['email' => 'Thông tin đăng nhập không hợp lệ'])->withInput();
        }

        Auth::login($user, $remember);

        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        

        return redirect()->route('user.userdashboard');
    }

    public function indexRegister()
    {
        return Inertia::render('auth/Register');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'gender' => $request->gender,
                'address' => $request->address,
                'phone' => $request->phone,
                'role' => 'user',
            ]);

            return redirect()->intended('/login');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Đăng ký thất bại. Vui lòng thử lại sau.');
        }
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
        } catch (\Exception $e) {
        }
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
