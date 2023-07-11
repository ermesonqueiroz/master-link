<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppearanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'text_color' => 'required',
            'background_color' => 'required',
            'button_color' => 'required',
            'button_text_color' => 'required',
        ];
    }
}
