<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterRequest;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Http\Controllers\AuthController;

class RegisterController extends AuthController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request)
    {

        $this->alreadyLogin($request);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $this->passwordHash($request->password),
        ]);

        return response()->json(['created' => true], Response::HTTP_OK);
    }
}
