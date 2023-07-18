<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Weapon;

class WeaponController extends Controller
{
    public function list(Request $request) {
        return Weapon::SummaryList(
            $request->input('namePart'),
            ($request->input('myWeapon') ? $request->user->id : null),
            $request->input('headMountable'),
            $request->input('handMountable'),
            $request->input('armMountable'),
            $request->input('shoulderMountable'),
            $request->input('torsoMountable'),
            $request->input('legMountable')
        );
    }
}
