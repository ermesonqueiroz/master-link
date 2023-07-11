<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppearanceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'text_color' => $this->textColor,
            'background_color' => $this->backgroundColor,
            'button_color' => $this->buttonColor,
            'button_text_color' => $this->buttonTextColor,
        ];
    }
}
