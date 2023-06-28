<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RefreshTokenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
   public function rules(): array
    {
        return [
            'refresh_token' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'refresh_token.required' => 'refresh_token is required.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'error' => $validator->errors()->first()
            ])
        );
    }
}
