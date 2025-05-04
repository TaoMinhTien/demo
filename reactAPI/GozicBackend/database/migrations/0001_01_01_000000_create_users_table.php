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
        Schema::connection('mongodb')->create('users', function ($collection) {
            $collection->id();
            $collection->string('name');
            $collection->string('email')->unique();
            $collection->timestamp('email_verified_at')->nullable();
            $collection->string('password');
            $collection->string('address');
            $collection->string('phone')->unique();
            $collection->string('role')->default('user');
            $collection->rememberToken();
            $collection->timestamps();
        });

        Schema::connection('mongodb')->create('password_reset_tokens', function ($collection) {
            $collection->string('email')->primary();
            $collection->string('token');
            $collection->timestamp('created_at')->nullable();
        });

        Schema::connection('mongodb')->create('sessions', function ($collection) {
            $collection->string('id')->primary();
            $collection->foreignId('user_id')->nullable()->index();
            $collection->string('ip_address', 45)->nullable();
            $collection->text('user_agent')->nullable();
            $collection->longText('payload');
            $collection->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->drop('users');
        Schema::connection('mongodb')->drop('password_reset_tokens');
        Schema::connection('mongodb')->drop('sessions');
    }
};
