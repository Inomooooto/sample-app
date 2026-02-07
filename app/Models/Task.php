<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    //マスアサインメント可能なカラム
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'due_date',
        'status',
        'completed_at',
        'deleted_at',
        'difficulty',
        'exp_reward',
    ];

    //キャストする属性 enumはキャストに含めるか要検討
    public $casts = [
        'due_date' => 'date',
        'completed_at' => 'date',
        'deleted_at' => 'date',
    ];

    //リレーション このタスクを持っているユーザー（拡張で入れるなら複数想定）
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**==============================================
     * 追加メソッド
     */

    //EXPの計算メソッド
    public function calculateExpReward()
    {
        $expMap = [
            'E'=> 10,
            'D' => 50,
            'C' => 100,
            'B' => 200,
            'A' => 500,
            'S' => 1000,
        ];
        return $expMap[$this->difficulty] ?? 50;
    }


}
