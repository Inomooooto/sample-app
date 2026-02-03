<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    //マスアサインメント可能なカラム
    protected $fillable = [
        //ユーザーを実装したらコメントアウトはずす
        //'user_id',
        'title',
        'description',
        'due_date',
        'status',
        'completed_at',
        'deleted_at',
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
}
