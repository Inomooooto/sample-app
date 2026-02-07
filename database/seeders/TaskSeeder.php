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
        // 1. Sランク - 未着手
        Task::create([
            'user_id' => 1,
            'title' => '伝説の魔王を討伐せよ',
            'description' => '世界を脅かす魔王が復活した。勇者として、魔王城の最深部で待ち受ける魔王を倒し、世界に平和を取り戻せ。',
            'due_date' => now()->addDays(30),
            'status' => 'pending',
            'difficulty' => 'S',
            'exp_reward' => 1000,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 2. Aランク - 未着手
        Task::create([
            'user_id' => 1,
            'title' => '古代遺跡の謎を解明せよ',
            'description' => '封印された古代遺跡に眠る秘宝を探索し、古代文明の謎を解き明かせ。強力なトラップと守護者に注意が必要だ。',
            'due_date' => now()->addDays(21),
            'status' => 'pending',
            'difficulty' => 'A',
            'exp_reward' => 500,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 3. Bランク - 進行中
        Task::create([
            'user_id' => 1,
            'title' => 'ドラゴンの巣から宝を奪還せよ',
            'description' => '山脈の洞窟に巣食う炎龍が村の宝物を奪った。ドラゴンを倒すか、巧みに盗み出して宝を取り戻せ。',
            'due_date' => now()->addDays(14),
            'status' => 'in_progress',
            'difficulty' => 'B',
            'exp_reward' => 200,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 4. Bランク - 未着手
        Task::create([
            'user_id' => 1,
            'title' => '盗賊ギルドのアジトを壊滅せよ',
            'description' => '街を荒らす盗賊ギルドのアジトを発見した。リーダーを捕らえ、盗まれた財宝を奪還せよ。',
            'due_date' => now()->addDays(10),
            'status' => 'pending',
            'difficulty' => 'B',
            'exp_reward' => 200,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 5. Cランク - 進行中
        Task::create([
            'user_id' => 1,
            'title' => '森の奥地で薬草を採取せよ',
            'description' => '村に疫病が流行している。森の奥地に生える希少な薬草を採取し、治療薬を作る材料を集めよ。',
            'due_date' => now()->addDays(7),
            'status' => 'in_progress',
            'difficulty' => 'C',
            'exp_reward' => 100,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 6. Cランク - 未着手
        Task::create([
            'user_id' => 1,
            'title' => '迷子の商人を護衛せよ',
            'description' => '隣町に向かう商人が護衛を求めている。途中のモンスターから守りながら、無事に目的地まで届けよ。',
            'due_date' => now()->addDays(5),
            'status' => 'pending',
            'difficulty' => 'C',
            'exp_reward' => 100,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 7. Dランク - 未着手
        Task::create([
            'user_id' => 1,
            'title' => '畑を荒らすゴブリンを退治せよ',
            'description' => '農民が困っている。畑を荒らす3匹のゴブリンを退治して、平和な日常を取り戻せ。',
            'due_date' => now()->addDays(3),
            'status' => 'pending',
            'difficulty' => 'D',
            'exp_reward' => 50,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 8. Dランク - 完了済み
        Task::create([
            'user_id' => 1,
            'title' => '武器屋の配達を手伝え',
            'description' => '武器屋の主人が忙しい。注文された剣を冒険者ギルドまで届けよ。',
            'due_date' => now()->addDays(2),
            'status' => 'completed',
            'difficulty' => 'D',
            'exp_reward' => 50,
            'completed_at' => now()->subHours(2),
            'deleted_at' => null,
        ]);

        // 9. Eランク - 未着手
        Task::create([
            'user_id' => 1,
            'title' => '猫探しのお手伝い',
            'description' => '老婆の飼い猫が逃げ出した。街の中を探し回り、可愛い猫を見つけて連れ帰れ。',
            'due_date' => now()->addDays(1),
            'status' => 'pending',
            'difficulty' => 'E',
            'exp_reward' => 10,
            'completed_at' => null,
            'deleted_at' => null,
        ]);

        // 10. Eランク - 完了済み
        Task::create([
            'user_id' => 1,
            'title' => '酒場の掃除当番',
            'description' => '冒険者ギルドの酒場が汚れている。掃除を手伝って、清潔な空間を取り戻せ。',
            'due_date' => now()->addDays(1),
            'status' => 'completed',
            'difficulty' => 'E',
            'exp_reward' => 10,
            'completed_at' => now()->subDays(1),
            'deleted_at' => null,
        ]);
    }
}
