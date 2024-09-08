<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'cpf',
        'birth_date',
        'email',
        'phone',
        'zip_code',
        'state',
        'city',
        'district',
        'address'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'birth_date' => 'date:Y-m-d',
    ];

    /**
     * Scope a query to only include active users.
     *
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeActive($query): Builder
    {
        return $query->where('status', 'active');
    }
}
