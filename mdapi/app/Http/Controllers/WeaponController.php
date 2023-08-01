<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Weapon;
use App\Http\Requests\WeaponCommitRequest;

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

    public function commit(WeaponCommitRequest $request) {
        $wId = $request->id;
        $weapon = is_null($wId) ? new Weapon : Weapon::where('id', $wId)->firstOrFail();
        $weapon->setData($request);
        $weapon->save();
        $newId = $weapon->id;
        return ['newId' => $weapon['id']];
    }

    public function copy($id) {
        $src = Weapon::where('id',$id)->firstOrFail();
        $dst = $src->replicate();
        $dst['user_id'] = Auth::id();
        $dst->save();

        return ['newId' => $dst['id']];
    }

    public function delete($id) {
        Weapon::where('id', $id)->delete();

        return ['deleteId' => $id];
    }

    public function basewaight(Request $request) {
        $minRange = intval($request->input('min_range'));
        $maxRange = intval($request->input('max_range'));
        $attackType = intval($request->input('attack_type'));
        $ammoType = intval($request->input('ammo_type'));
        $ammoCount = intval($request->input('ammo_count'));
        $parryRate = intval($request->input('parry_rate'));

        $value = Weapon::baseWaight(
            $minRange,
            $maxRange,
            $attackType,
            $ammoType,
            $ammoCount,
            $parryRate
        );

        return ['value' => $value];
    }

    public function failurerate(Request $request) {
        $powerTotal = intval($request->input('power_total'));
        $minRange = intval($request->input('min_range'));
        $maxRange = intval($request->input('max_range'));
        $totalWaight = intval($request->input('total_waight'));
        $hitRate = intval($request->input('hit_rate'));
        $parryRate = intval($request->input('parry_rate'));
    
        $value = Weapon::failureRate(
            $powerTotal,
            $minRange,
            $maxRange,
            $totalWaight,
            $hitRate,
            $parryRate
        );

        return ['value' => $value];
    }
}
