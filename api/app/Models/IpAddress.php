<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IpAddress extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ip_address',
        'label',
    ];

    public function trails()
    {

        return $this->hasMany(AuditTrail::class);
    }
}
