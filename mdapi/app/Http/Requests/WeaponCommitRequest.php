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
            'power_impact' => ['integer', 'between:0,99'],
            'power_penetrate' => ['integer', 'between:0,99'],
            'power_heat' => ['integer', 'between:0,99'],
            'ammo_type' => [Rule::in($ammo_type)],
            'ammo_count' => ['integer', 'between:0,999'],
            'hit_rate' => ['integer', 'between:0,99'],
            'attack_type' => [Rule::in($attack_type)],
            'min_range' => ['integer', 'between:1,200'],
            'max_range' => ['integer', 'between:1,200','gte:min_range'],
            'stabilizer_weight' => ['integer', 'min:0'],
            'parry_rate' => ['integer', 'between:0,99'],
            'mount_positions' => ['required', 'array', 'min:1'],
            'mount_positions.*' => ['string'],
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
