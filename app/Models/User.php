<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'level',
        'current_exp',
        'total_exp',
        'streak_days',
        'last_login_date',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //タスクのリレーションを追加
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**============================================
     * 追加メソッド
     */

    /**レベルアップに必要なEXPを返すメソッド */
    public function getRequiredExpAttribute()
    {
        return $this->level * 100;
    }

    /** EXPのパーセンテージ */
    public function getExpPercentageAttribute()
    {
        return ($this->current_exp / $this->required_exp) * 100;
    }

    /**EXP付与とレベルアップ処理 
     * @param $amount　経験値の量
    */
    public function addExp($amount)
    {
        //今の経験値と合計の経験値に$amountを足す
        $this->current_exp += $amount;
        $this->total_exp += $amount;

        //レベルアップのチェック
        while($this->current_exp >= $this->required_exp){
            $this->current_exp -= $this->required_exp;

            $this->level += 1;
        }

        $this->save();
    }
}
