<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('userId');
            $table->string('title');
            $table->string('url');
            $table->boolean('active');
            $table->integer('nidex');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
