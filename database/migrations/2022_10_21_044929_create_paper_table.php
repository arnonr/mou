<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paper', function (Blueprint $table) {
            $table->increments('id')->comment('รหัสอ้างอิงงานวิจัย');
            $table->string('title',500)->charset('utf8mb4')->comment('ชื่องานวิจัย');
            $table->integer('project_id')->comment('โครงการ');
            $table->integer('paper_type_id')->comment('ประเภทงานวิจัย');
            $table->integer('paper_status_id')->comment('สถานะงานวิจัย');
            $table->integer('pi_id')->comment('ผู้รับผิดชอบโครงการ');
            $table->string('file',500)->charset('utf8mb4')->comment('ไฟล์');


            $table->tinyInteger('active')->default(1)->comment('สถานะ');
            $table->timestamps();

            //Foreign Key Constraints
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users');	
            //Foreign Key Constraints
            $table->unsignedBigInteger('updated_by');
            $table->foreign('updated_by')->references('id')->on('users');	
            //Foreign Key Constraints
            $table->unsignedBigInteger('owner_id');
            $table->foreign('owner_id')->references('id')->on('users');	
            //สำหรับเวลาลบข้อมูล ให้อัพเดทวันที่ลบ แทนที่จะลบออกจากฐานข้อมูลจริง
            $table->softDeletes('deleted_at', 0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paper');
    }
};
