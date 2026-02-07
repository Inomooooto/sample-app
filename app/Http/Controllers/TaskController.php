<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Illuminate\Support\Facades\Auth;


/**タスクのCRUD処理のためのコントローラーです。
 * タスクの一覧取得、作成、更新、削除を行います。
 */

class TaskController extends Controller
{
    //TaskServiceのインスタンス化
    public function __construct(
        private TaskService $taskService
    ) {}

    /**
     * タスク一覧画面を取得----------------------------------------------
     * @return Response inertiaのレスポンス
     */

    public function index(): Response
    {
        //TaskServiceからタスクの取得
        $user = Auth::user();

        $tasks = $this->taskService->getUserTasks($user);

        // dd($tasks);


        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    /**
     * タスク作成画面を表示
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Tasks/Create');
    }

    /**
     * タスク編集画面を表示
     * @param Task $task
     * @return Response
     */
    public function edit(Task $task): Response
    {
        //ポリシーで認可チェック
        $this->authorize('update', $task);

        return Inertia::render('Tasks/Edit', [
            'task' => $task
        ]);
    }

    /** タスクの新規作成
     * @param StoreTaskRequest $request 保存バリデーション
     * @return RedirectResponse
     */

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        //バリデーション済みデータを取得
        $validated = $request->validated();

        //認証済みユーザーの取得
        $user = Auth::user();

        //serviceクラスのメソッドで新規作成
        $this->taskService->createTasks($user, $validated);

        //リダイレクト

        return redirect()->route('tasks.index')
            ->with('success', 'タスクを作成しました。');
    }

    /**タスクを更新
     * @param UpdateTaskRequest タスクの更新バリデーション
     * @param Task $task 更新対象のタスク
     * @return RedirectResponse
     */

    public function update(UpdateTaskRequest $request, Task $task)
    {
        //バリデーション済みデータを取得
        $validated = $request->validate();

        //認証済みユーザーの取得
        $user = Auth::user();

        //taskServiceのメソッドで更新
        $this->taskService->updateTask($task, $validated);

        //リダイレクト
        return redirect()->route('tasks.index')
            ->with('success', 'タスクを更新しました。');
    }

    /**タスクを削除
     * @param Task $task
     * @return RedirectResponse
     */

    public function destroy(Task $task): RedirectResponse
    {
        //ポリシーで認可チェック
        $this->authorize('delete', $task);

        //taskServiceのメソッドで削除
        $this->taskService->deleteTasks($task);

        return redirect()->route('tasks.index')
            ->with('success', 'タスクを削除しました');
    }

    //追加メソッド
    /**タスク完了時のEXPを追加
     * @param Task $task 完了したタスク
     * @return RedirectResponse
     */
    public function complete(Task $task):RedirectResponse
    {
        //ポリシーで認可チェック
        $this->authorize('update', $task);

        //タスクのステータスを更新
        $task->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        //経験値の計算（exp_rewardが設定されていない場合は難易度から計算）
        $expReward = $task->exp_reward > 0
            ? $task->exp_reward
            : $task->calculateExpReward();

        //ユーザの取得
        $user = Auth::user();

        //レベルアップ前のレベルを記録
        $oldLevel = $user->level;

        //経験値付与（レベルアップ処理も含む）
        $user->addExp($expReward);

        //レベルアップしたかどうかを判定
        $leveledUp = $user->level > $oldLevel;

        //リダイレクト
        return redirect()->route('tasks.index')
        ->with([
            'success' => 'クエストを達成しました！',
            'exp_gained' => $expReward,
            'leveled_up' => $leveledUp,
            'new_level' => $leveledUp ? $user->level : null,
        ]);

    }
}
