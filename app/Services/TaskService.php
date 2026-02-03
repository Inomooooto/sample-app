<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Ramsey\Collection\Collection;

/**
 * タスクの一覧取得、作成、更新、削除を行います。
 */

class TaskService
{


    /** ユーザーのタスク一覧取得-------------------------------------
     * @param User $user タスクを所持しているユーザー
     */

    public function getUserTasks(User $user): Collection
    {
        return $user->tasks()->orderBy('due_date', 'asc')->get();
    }


    /**タスクの作成-------------------------------------------------
     * @param User $user タスクを作成するユーザー
     * @param array $data タスクのデータ
     * @return Task 作成されたタスク
     */
    public function createTasks(User $user, array $data)
    {
        return $user->tasks()->create($data);
    }

    /**タスクの更新------------------------------------------------
     * @param Task $task 更新対象のタスク
     * @param array $data 更新対象のデータ
     * return Task 更新後のタスク
     */
    public function updateTask(Task $task, array $data): Task
    {
        $task->update($data);
        return $task->fresh(); //freshしたタスクを戻り値にする
    }

    /**タスクの削除--------------------------------------------------
     * @param Task $task 削除対象のタスク
     * @@aram User $user 実行するユーザー
     * @return void
     */

    public function deleteTasks(Task $task, User $user): void
    {

        //ポリシーで権限確認
        if ($user->cannot('delete', $task)) {
            abort(403);
        }


        $task->delete();
    }
}
