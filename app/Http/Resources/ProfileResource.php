<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray($request): array
    {
        $links = array_map(function ($link) {
            return [
                'id' => $link['id'],
                'title' => $link['title'],
                'url' => $link['url'],
                'index' => $link['index'] 
            ];
        }, $this->links);

        $appearance = [
            'text_color' => $this->appearance->textColor,
            'background_color' => $this->appearance->backgroundColor,
            'button_color' => $this->appearance->buttonColor,
            'button_text_color' => $this->appearance->buttonTextColor,
        ];

        return [
            'id' => $this->id,
            'username' => $this->username,
            'display_name' => $this->displayName,
            'links' => $links,
            'appearance' => $appearance
        ];
    }
}
