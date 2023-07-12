<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

abstract class AuthController extends Controller
{
   
    protected function username()
    {
        return 'email';
    }

    protected function passwordHash($password)
    {
        return Hash::make($password);
    }

    protected function alreadyLogin(Request $request, string $message = null)
    {
        // set message
        $message = is_null($message) ? 'すでにログイン中です。' : $message;

        // already logged in
        if (auth()->check()) {
            throw new HttpException(403, $message);
        }
    }

}
