<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AuditTrail extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ip_address',
        'action',
        'description',
    ];

    public function user() {

        return $this->belongsTo(User::class);
    }
}
