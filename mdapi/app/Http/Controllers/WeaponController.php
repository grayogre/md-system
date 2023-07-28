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
        $myWeapon = boolval($request->input('myWeapon'));
        $userId = Auth::id();
        $headMountable = $request->input('headMountable');
        $handMountable = $request->input('handMountable');
        $armMountable = $request->input('armMountable');
        $shoulderMountable = $request->input('shoulderMountable');
        $torsoMountable = $request->input('torsoMountable');
        $legMountable = $request->input('legMountable');
        return Weapon::SummaryList(
            $namePart,
            $attackType,
            $myWeapon,
            $userId,
            $headMountable,
            $handMountable,
            $armMountable,
            $shoulderMountable,
            $torsoMountable,
            $legMountable
        );
    }

    public function index($id) {
        return Weapon::getDetail($id);
    }

    public function copy($id) {
        $src = Weapon::where('id',$id)->firstOrFail();
        $dst = $src->replicate();
        $dst['user_id'] = Auth::id();
        $dst->save();

        return ['newId' => $dst['id']];
    }
}
