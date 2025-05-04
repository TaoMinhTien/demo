<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('mongodb')->create('cache', function ($collection) {
            $collection->string('key')->primary();
            $collection->mediumText('value');
            $collection->integer('expiration');
        });

        Schema::connection('mongodb')->create('cache_locks', function ($collection) {
            $collection->string('key')->primary();
            $collection->string('owner');
            $collection->integer('expiration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->drop('cache');
        Schema::connection('mongodb')->drop('cache_locks');
    }
};
