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

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
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
}
