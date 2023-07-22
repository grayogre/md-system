<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

const WEAPON_BASE_WEIGHT = 5;
const ATTACK_TYPE_SHOOT = 0;
const ATTACK_TYPE_MEREE = 1;
const ATTACK_TYPE_SHIELD = 2;
const AMMO_TYPE_FINITE = 0;
const WEIGHT_INFINITE_AMMO = 2;

class Weapon extends Model
{
    use HasFactory;

    const AttackTypeTable = ['射撃', '白兵', '盾'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function SummaryList(string $namePart, int $attackType, bool $myWeapon,
        int $userId, string $headMountable, string $handMountable, string $armMountable,
        string $shoulderMountable, string $torsoMountable, string $legMounbtable
    )
    {
        $summary = [];

        $query = Weapon::with('user')->join('users','users.id','=','weapons.user_id')
            ->select('weapons.*', 'users.name as register', 'users.id as uid');
        if ($namePart != '') {
            $query = $query->where('weapon_name','LIKE', '%'.addcslashes($namePart, '%_\\').'%');
        }
        if ($attackType >= 0 && $attackType <= 2) {
            $query = $query->where('attack_type', '=', $attackType);
        }
        if ($myWeapon) {
            $query = $query->where('user_id', '=', $userId);
        }   
        $query->where(function($q) use ($headMountable, $handMountable, $armMountable, $shoulderMountable, $torsoMountable, $legMounbtable) {
            $orFlag = false;
            if ($headMountable === '1') {
                $q = $q->where('can_mount_head', '=', 1);
                $orFlag = true;
            }
            if ($handMountable === '1') {
                if ($orFlag) {
                    $q = $q->orWhere('can_mount_hand', '=', 1);
                } else {
                    $q = $q->where('can_mount_hand', '=', 1);
                    $orFlag = true;
                }
            }
            if ($armMountable === '1') {
                if ($orFlag) {
                    $q = $q->orWhere('can_mount_arm', '=', 1);
                } else {
                    $q = $q->where('can_mount_arm', '=', 1);
                    $orFlag = true;
                }
            }
            if ($shoulderMountable === '1') {
                if ($orFlag) {
                    $q = $q->orWhere('can_mount_shoulder', '=', 1);
                } else {
                    $q = $q->where('can_mount_shoulder', '=', 1);
                    $orFlag = true;
                }
            }
            if ($torsoMountable === '1') {
                if ($orFlag) {
                    $q = $q->orWhere('can_mount_torso', '=', 1);
                } else {
                    $q = $q->where('can_mount_torso', '=', 1);
                    $orFlag = true;
                }
            }
            if ($legMounbtable === '1') {
                if ($orFlag) {
                    $q = $q->orWhere('can_mount_leg', '=', 1);
                } else {
                    $q = $q->where('can_mount_leg', '=', 1);
                    $orFlag = true;
                }
            }
            if (!$orFlag) {
                $q->where('weapons.id', '=', '-1');
            }
        });

        $weapons = $query->get(); 
        foreach ($weapons as $weapon)
        {
            $row = [];
            $row['id'] = $weapon['weapon.id'];
            $row['weapon_name'] = $weapon['weapon_name'];
            $row['register'] = $weapon['register'];
            $row['myWeapon'] = $weapon['user_id'] === $userId;
            $row['attack_type'] = Weapon::AttackTypeTable[$weapon['attack_type']];
            $power_total = $weapon['power_impact'] + $weapon['power_penetrate'] + $weapon['power_heat'];
            $row['power_total'] = $power_total;
            $row['ammo_type'] = ($weapon['ammo_type'] === 1) ? '無限' : ('有限：' . strval($weapon['ammo_count']));
            $row['atacck_range'] = strval($weapon['min_range']) . '～' . strval($weapon['max_range']);
            $total_waight = Weapon::baseWaight($weapon['min_range'], $weapon['max_range'], $weapon['attack_type'], $weapon['ammo_type'], $weapon['ammo_count'], $weapon['parry_rate']) + $weapon['stabilizer_weight'];
            $row['total_waight'] = $total_waight;
            $row['hit_rate'] = $weapon['hit_rate'];
            $row['parry_rate'] = $weapon['parry_rate'];
            $row['failure_rate'] = Weapon::failure_rate($power_total, $weapon['min_range'],$weapon['max_range'], $total_waight, $weapon['hit_rate'], $weapon['parry_rate']);
            $mount_pos = '';
            if ($weapon['can_mount_head'] === 1) {
                $mount_pos .= '頭';
            }
            if ($weapon['can_mount_hand'] === 1) {
                $mount_pos .= '手';
            }
            if ($weapon['can_mount_arm'] === 1) {
                $mount_pos .= '腕';
            }
            if ($weapon['can_mount_shoulder'] === 1) {
                $mount_pos .= '肩';
            }
            if ($weapon['can_mount_torso'] === 1) {
                $mount_pos .= '胴';
            }
            if ($weapon['can_mount_leg'] === 1) {
                $mount_pos .= '脚';
            }
            $row['mount_position'] = $mount_pos;
            $summary[] = $row;
        } 

        return $summary;
    }

    public static function baseWaight(int $min_range, int $max_range,
        int $attack_type, int $ammo_type, int $ammo_count, int $parry_rate): int
    {
        $weight = WEAPON_BASE_WEIGHT + ($ammo_type == AMMO_TYPE_FINITE ? intdiv($ammo_count, 10) : WEIGHT_INFINITE_AMMO);
        if ($attack_type == ATTACK_TYPE_MEREE) {
            $weight += $max_range * 5 - $min_range * 3;
        } else if ($attack_type == ATTACK_TYPE_SHIELD) {
            $weight += intdiv($parry_rate , 10);
        } else {
            $weight += intdiv($max_range, 10);
        }
        return $weight;
    }

    public static function failure_rate(int $power_total, int $min_range,
        int $max_range, int $total_weight, int $hit_rate, int $parry_rate) 
    {
        $rate = intval(((($power_total / 8.0 + 5.0) ** 2.0) / 2.0 + (($max_range / 10.0) ** 2.0) / 2.0
                + ((($max_range - $min_range) / 10.0) ** 2.0) / 2.0  - $total_weight) / 5.0
                + ((($hit_rate - 50.0) / 20.0) ** 3.0) / 2.0
                + (($parry_rate / 20.0) ** 2.0) / 2.0);
        if ($rate < 1) {
            $rate = 1;
        }
        return $rate; 
    }
}
