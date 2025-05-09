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
        Schema::connection('mongodb')->create('jobs', function ( $collection) {
            $collection->id();
            $collection->string('queue')->index();
            $collection->longText('payload');
            $collection->unsignedTinyInteger('attempts');
            $collection->unsignedInteger('reserved_at')->nullable();
            $collection->unsignedInteger('available_at');
            $collection->unsignedInteger('created_at');
        });

        Schema::connection('mongodb')->create('job_batches', function (Blueprint $collection) {
            $collection->string('id')->primary();
            $collection->string('name');
            $collection->integer('total_jobs');
            $collection->integer('pending_jobs');
            $collection->integer('failed_jobs');
            $collection->longText('failed_job_ids');
            $collection->mediumText('options')->nullable();
            $collection->integer('cancelled_at')->nullable();
            $collection->integer('created_at');
            $collection->integer('finished_at')->nullable();
        });

        Schema::connection('mongodb')->create('failed_jobs', function (Blueprint $collection) {
            $collection->id();
            $collection->string('uuid')->unique();
            $collection->text('connection');
            $collection->text('queue');
            $collection->longText('payload');
            $collection->longText('exception');
            $collection->timestamp('failed_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->drop('jobs');
        Schema::connection('mongodb')->drop('job_batches');
        Schema::connection('mongodb')->drop('failed_jobs');
    }
};
