import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useMemo } from "react";


export default function Index({ tasks = {} }) {
    console.log(tasks);

    // タブの状態管理
    const [activeTab, setActiveTab] = useState('active');

    // tasksがオブジェクトなので、map用に変換する
    const taskList = Array.isArray(tasks)
        ? tasks : Object.values(tasks);

    /** タスクの削除 →クリックで削除処理をする（route->tasks.destroy/task.id）*/
    const handleDelete = (task) => {
        if (confirm('このクエストを破棄しますか？')) {
            router.delete(route('tasks.destroy', task.id))
        };
    }

    /** タスクの完了→クリックで完了処理をする（route->tasks.complete/task.id） */
    const handleComplete = (task) => {
        router.patch(route('tasks.complete', task.id));
    };

    /** タスクの並び替え
     * 完了していないタスク→pending＋in_progress
    */
    const incompleteTasks = useMemo(() => [
        ...(tasks.pending || []),
        ...(tasks.in_progress || []),
    ].sort((a, b) => new Date(a.due_date) - new Date(b.due_date)), [tasks]);

    // 完了したタスク
    const completedTasks = useMemo(() => tasks.completed || [], [tasks]);

    // 期限切れのタスク
    const overdueTasks = useMemo(() => tasks.overdue || [], [tasks]);

    // 全てのタスク
    const allTasks = useMemo(() => [
        ...incompleteTasks,
        ...completedTasks,
        ...overdueTasks,
    ], [incompleteTasks, completedTasks, overdueTasks]);

    // タブに応じて表示するタスクを切り替え
    const displayedTasks = useMemo(() => {
        switch (activeTab) {
            case 'active':
                return incompleteTasks;
            case 'completed':
                return completedTasks;
            case 'all':
                return allTasks;
            default:
                return incompleteTasks;
        }
    }, [activeTab, incompleteTasks, completedTasks, allTasks]);

    // 難易度に応じたバッジの色（ハリーポッター風）
    const getDifficultyBadge = (difficulty) => {
        const badges = {
            'E': { color: 'bg-slate-500', label: 'E' },
            'D': { color: 'bg-emerald-600', label: 'D' }, // スリザリン
            'C': { color: 'bg-blue-600', label: 'C' }, // レイブンクロー
            'B': { color: 'bg-purple-700', label: 'B' },
            'A': { color: 'bg-amber-600', label: 'A' }, // ゴールド
            'S': { color: 'bg-gradient-to-r from-red-800 to-yellow-600', label: 'S' }, // グリフィンドール
        };
        return badges[difficulty] || badges['D'];
    };



    // ここからレンダリング
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-amber-400" style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
                        クエストボード
                    </h2>
                    {/* クエスト新規作成ボタン */}
                    <Link
                        href={route('tasks.create')}
                        className="btn bg-gradient-to-r from-red-800 to-red-700 hover:from-red-900 hover:to-red-800 text-amber-100 border border-amber-600">
                        新規クエスト受注
                    </Link>
                </div>
            }
        >
            <Head title="クエスト一覧" />

            <div className="py-12 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* タブ切り替え */}
                    <div className="tabs tabs-boxed bg-black/40 backdrop-blur-md shadow-xl mb-6 p-2 rounded-lg border border-amber-700/30">
                        <button
                            className={`tab tab-lg ${activeTab === 'active' ? 'tab-active bg-gradient-to-r from-amber-600 to-yellow-600 text-gray-900 font-bold' : 'text-amber-200 hover:text-amber-100'}`}
                            onClick={() => setActiveTab('active')}
                        >
                            進行中
                        </button>
                        <button
                            className={`tab tab-lg ${activeTab === 'completed' ? 'tab-active bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-bold' : 'text-amber-200 hover:text-amber-100'}`}
                            onClick={() => setActiveTab('completed')}
                        >
                            達成済み
                        </button>
                        <button
                            className={`tab tab-lg ${activeTab === 'all' ? 'tab-active bg-gradient-to-r from-blue-800 to-blue-700 text-white font-bold' : 'text-amber-200 hover:text-amber-100'}`}
                            onClick={() => setActiveTab('all')}
                        >
                            全て
                        </button>
                    </div>

                    {/* 期限切れタスクの警告 */}
                    {activeTab === 'active' && overdueTasks.length > 0 && (
                        <div className="alert bg-red-900/50 backdrop-blur-md mb-6 border border-red-700/50 text-white">
                            <div>
                                <span>
                                    <strong>期限切れのクエスト:</strong> {overdueTasks.length}件のクエストが期限を過ぎています！
                                </span>
                            </div>
                        </div>
                    )}

                    {/* タスクカード一覧 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedTasks.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-2xl text-indigo-200">クエストがありません</p>
                            </div>
                        ) : (
                            displayedTasks.map((task, index) => {
                                const badge = getDifficultyBadge(task.difficulty);
                                const isCompleted = task.status === 'completed';
                                const isOverdue = overdueTasks.some(t => t.id === task.id);

                                return (
                                    <div
                                        key={task.id}
                                        className={`card shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative backdrop-blur-md ${isCompleted ? 'opacity-60' : ''}`}
                                        style={{
                                            background: 'rgba(30, 27, 75, 0.4)',
                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                                        }}
                                    >
                                        <div className="card-body">
                                            {/* 難易度バッジ */}
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`badge ${badge.color} text-white font-bold px-3 py-2 shadow-lg`}>
                                                    {badge.label} ランク
                                                </span>
                                                {isOverdue && (
                                                    <span className="badge badge-error text-white shadow-lg">期限切れ</span>
                                                )}
                                                {isCompleted && (
                                                    <span className="badge badge-success text-white shadow-lg">達成済み</span>
                                                )}
                                            </div>

                                            {/* タイトル */}
                                            <h3 className="card-title text-indigo-100 text-lg font-bold">
                                                {task.title}
                                            </h3>

                                            {/* 説明 */}
                                            <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
                                                {task.description || 'クエストの詳細はありません'}
                                            </p>

                                            {/* 期限 */}
                                            {task.due_date && (
                                                <div className="text-xs text-indigo-300 mb-4">
                                                    <span>納期:</span> {new Date(task.due_date).toLocaleDateString('ja-JP')}
                                                </div>
                                            )}

                                            {/* ボタン群 */}
                                            <div className="card-actions justify-end mt-4">
                                                {!isCompleted && (
                                                    <>
                                                        <button
                                                            className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white border-none"
                                                            onClick={() => handleComplete(task)}
                                                        >
                                                            達成
                                                        </button>
                                                        <Link
                                                            href={route('tasks.edit', task.id)}
                                                            className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white border-none"
                                                        >
                                                            編集
                                                        </Link>
                                                    </>
                                                )}
                                                <button
                                                    className="btn btn-sm bg-red-800 hover:bg-red-900 text-white border-none"
                                                    onClick={() => handleDelete(task)}
                                                >
                                                    破棄
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

