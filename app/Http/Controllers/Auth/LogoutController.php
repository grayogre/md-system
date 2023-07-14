<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $this->getGuard()->logout();

        // session refresh
        $request->session()->invalidate();

        // regenerate token
        $request->session()->regenerateToken();

        return response()->json(['logout' => true], Response::HTTP_OK);

    }
}
