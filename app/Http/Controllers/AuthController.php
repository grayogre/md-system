<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

abstract class AuthController extends Controller
{
   
    protected function getGuard(): Guard | StatefulGuard
    {
        return Auth::guard(config('auth.defaults.guard'));
    }

    protected function credentials(Request $request)
    {
        return $request->only('email', 'password');
    }

    protected function attemptLogin(Request $request, bool $remember = false)
    {
        return $this->getGuard()->attempt(
            $this->credentials($request),
            $remember
        );
    }

    protected function passwordHash($password)
    {
        return Hash::make($password);
    }

    protected function createToken()
    {
        return hash_hmac('sha256', Str::random(40), config('app.key'));
    }

    protected function tokenExpired($expires, $createdAt)
    {
        return Carbon::parse($createdAt)
            ->addSeconds($expires)
            ->isPast();
    }

    protected function alreadyLogin(Request $request, string $message = null)
    {
        // set message
        $message = is_null($message) ? 'すでにログイン中です。' : $message;

        // already logged in
        if (auth()->check()) {
            throw new HttpException(302, $message);
        }
    }

}
