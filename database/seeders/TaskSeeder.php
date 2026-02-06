<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //未着手のタスク
        Task::create([
            'user_id' => '1',
            'title' => 'laravelのシーダー作成方法についてベストプラクティスを学ぶ',
            'description' => 'laravelの自由度が高いので、プロジェクトが進むにつれて多くの人が自由にコードを書いてしまうことがあります。
            公式（英語版）を読んで、laravelによって提供される機能のHow　toを学習します。
            これらを読んでこれから作成の際に参考にできるようにします。

            URL=https://laravel.com/docs/9.x
            ',
            'due_date' => now()->addDays(7), //７日後を期限にする
            'status' => 'pending',
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        Task::create([
            'user_id' => '1',
            'title' => 'JavaのJSPの書き方について学ぶ',
            'description' => 'JSPでのJavaコードの書き方を学ぶ。XSS対策としてすべてのコードをJSTLで作成することとする。',
            'due_date' => now()->addDays(5), //5日後
            'status' => 'pending',
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        Task::create([
            'user_id' => '1',
            'title' => '健康のためにPFCバランスについて学ぶ',
            'description' => '最近体力がなくなってきているので、健康を維持するためにPFCバランスについて学びたい。
            [エイヨーブック]を参考にして、献立を真似して作ってみる',
            'due_date' => now()->addDays(7), //7日後
            'status' => 'pending',
            'completed_at' => null,
            'deleted_at' => null,

        ]);

        //進行中のタスク
        Task::create([
            'user_id' => '1',
            'title' => '毎日スクワットを30回する',
            'description' => '筋トレは継続が大事',
            'due_date' => now()->addDays(7), //７日後を期限にする
            'status' => 'in_progress',
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        //期限切れのタスク
        Task::create([
            'user_id' => '1',
            'title' => '５キロダイエットする',
            'description' => '2026年は体型管理と体調管理に気を付けたいので、
            無理なくダイエットを頑張りたい。',
            'due_date' => now()->subDays(3), //3日前
            'status' => 'in_progress',
            'completed_at' => null,
            'deleted_at' => null,
        ]);
    }
}
