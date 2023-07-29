<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;
use \Illuminate\Validation\Rule;

class WeaponCommitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $attack_type = [0, 1, 2];
        $ammo_type = [0, 1];
        $mount_type =[0, 1];

        return [
            'weapon_name' => ['required'],
            'power_impact' => ['between:0,99'],
            'power_penetrate' => ['between:0,99'],
            'power_heat' => ['between:0,99'],
            'ammo_type' => [Rule::in($ammo_type)],
            'ammo_count' => ['between:0,999'],
            'hit_rate' => ['between:0,99'],
            'attack_type' => [Rule::in($attack_type)],
            'min_range' => ['between:1,200'],
            'max_range' => ['between:1,200','gte:min_range'],
            'stabilizer_weight' => ['integer'],
            'parry_rate' => ['between:0,99'],
            'can_mount_head' => [Rule::in($mount_type)], 
            'can_mount_hand' => [Rule::in($mount_type)], 
            'can_mount_arm' => [Rule::in($mount_type)],
            'can_mount_shoulder' => [Rule::in($mount_type)],
            'can_mount_torso' => [Rule::in($mount_type)],
            'can_mount_leg' => [Rule::in($mount_type)],
            'description' => ['max:200'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $res = response()->json([
            'errors' => $validator->errors(),
        ], Response::HTTP_BAD_REQUEST);
        throw new HttpResponseException($res);
    }

}