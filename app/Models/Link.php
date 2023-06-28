<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'links';
    protected $appends = ['id'];

    protected $fillable = [
        'userId',
        'title',
        'url'
    ];

    protected $hidden = [
        '_id'
    ];
}
