<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as EloquentModel;
// use MongoDB\Mongodb\Eloquent\Model; // dùng Model của MongoDB

class Product extends EloquentModel
{
    protected $connection = 'mongodb';
    protected $collection = 'products'; 

    protected $fillable = [
        'name',
        'phone',
        'password',
        'address',
        'email',
    ];
}
