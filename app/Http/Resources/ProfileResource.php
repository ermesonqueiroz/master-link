<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray($request): array
    {   
        $links = array_map(function ($link) {
            return [
                'title' => $link['title'],
                'url' => $link['url']
            ];
        }, $this->links);

        return [
            'username' => $this->username,
            'display_name' => $this->displayName,
            'links' => $links
        ];
    }
}
