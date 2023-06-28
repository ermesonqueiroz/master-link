<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class RefreshToken extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'refresh_tokens';
    protected $appends = ['id'];

    protected $fillable = [
        'userId',
    ];

    protected $hidden = [
        '_id'
    ];
}
