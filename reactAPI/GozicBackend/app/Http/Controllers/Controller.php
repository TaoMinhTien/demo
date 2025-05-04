<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function __construct()
    {
        $this->middleware(AdminMiddleware::class)->only(['index', 'store', 'update', 'destroy']);
    }
}

