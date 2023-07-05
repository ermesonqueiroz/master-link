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

        return [
            'id' => $this->id,
            'username' => $this->username,
            'display_name' => $this->displayName,
            'links' => $links
        ];
    }
}
