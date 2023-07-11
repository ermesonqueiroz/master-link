<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Appearance extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'appearances';
    protected $appends = ['id'];

    protected $fillable = [
        'userId',
        'textColor',
        'backgroundColor',
        'buttonColor',
        'buttonTextColor',
    ];

    protected $hidden = [
        '_id'
    ];
}
