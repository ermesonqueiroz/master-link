<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'users';
    protected $appends = ['id'];

    protected $fillable = [
        'username',
        'displayName',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        '_id'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
