<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Weapon;

class WeaponController extends Controller
{
    public function list(Request $request) {
        $namePart = $request->input('namePart');
        if (is_null($namePart)) {
            $namePart = '';
        }
        $attackType = intval($request->input('attackType'));
        $userId = $request->input('myWeapon') ? Auth::id() : null;
        $headMountable = $request->input('headMountable');
        $handMountable = $request->input('handMountable');
        $armMountable = $request->input('armMountable');
        $shoulderMountable = $request->input('shoulderMountable');
        $torsoMountable = $request->input('torsoMountable');
        $legMountable = $request->input('legMountable');
        return Weapon::SummaryList(
            $namePart,
            $attackType,
            $userId,
            $headMountable,
            $handMountable,
            $armMountable,
            $shoulderMountable,
            $torsoMountable,
            $legMountable
        );
    }
}
