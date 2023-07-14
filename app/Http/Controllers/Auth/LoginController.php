<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;


class LoginController extends AuthController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        $this->alreadyLogin($request);

        if ($this->attemptLogin($request)) {
            $request->session()->regenerate();
            $userId = User::where('email','=', $request->email)->first()->id();
            return response()->json(['id' => $userId], Response::HTTP_OK);
        }
        $res = response()->json(
            ['meaage' => 'メールアドレスかパスワードが違います。'],
            Response::HTTP_UNAUTHORIZED
        );
        throw new HttpResponseException($res);  
    }
}
