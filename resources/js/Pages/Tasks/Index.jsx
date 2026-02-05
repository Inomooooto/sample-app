import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

//コンポーネント定義（'tasks'を受け取っている）
export default function Index({ tasks }) {
    console.log(tasks);

    //ここでイベントハンドラーを書く（処理）
    //画面遷移(新規作成と編集)はinertiaLinkを使用する


    /** タスクの削除 →クリックで削除処理をする（route->tasks.destroy/task.id）*/
    const handleDelete = (task) => {
        if (confirm('このタスクを削除しますか？')) {
            router.delete(route('tasks.destroy', task.id))
        };
    }
    /** タスクの完了→クリックで完了処理をする（route->tasks.complete/task.id） */
    const handleComplete = (task) => {
        router.patch(route('tasks.compete', task.id));
    };

    /**　タスクの並び替え
     * 完了していないタスク
     * →pending＋in_progress
    */
    const incomplete = (task) => [
        ...(tasks.pending || []),
        ...(tasks.in_progress || []),
    ].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));



    //ここからレンダリング
    return (
        <>
            <div>
                {/* 以下ページの内容 */}

                <AuthenticatedLayout
                    header={
                        <div style={{}}>
                            {/* タスクの新規作成ボタン→tasks.createへ遷移 */}
                            < Link
                                href={route('tasks.create')}>
                                <button>新規作成</button>
                            </Link>
                        </div>
                    }
                />
                <Head title="タスク一覧" />

                <div>
                    {/* 期限切れのタスク */}
                    <div style={{}}>
                        <h2>期限切れのタスク</h2>
                        {tasks.map((task) => (
                            <div key={task.id} >
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                console.log(task);

                                {/* 編集ボタン→tasks.editへ遷移 */}
                                <div style={{}}>
                                    <Link href={route('tasks.edit', task.id)}>
                                        <button>編集</button>
                                    </Link>
                                </div>

                                {/* 完了ボタン→handleComplete */}
                                <div style={{}}>
                                    <button onClick={() => handleClick(task)}>
                                        完了
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 完了していないタスク */}
                    <div style={{}}>
                        <h2>未完了のタスク</h2>
                        {tasks.map((task) => (
                            <div key={task.id} >
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>

                                console.log(task);

                                {/* 編集ボタン→tasks.editへ遷移 */}
                                {/* tasksのtaskのidをパラメーターに入れる */}
                                <div style={{}}>
                                    <Link href={route('tasks.edit', task.id)}>

                                        <button>編集</button>
                                    </Link>
                                </div>

                                {/* 完了ボタン→handleComplete */}
                                <div style={{}}>
                                    <button onClick={() => handleClick(task)}>
                                        完了
                                    </button>
                                </div>

                                {/* 削除ボタン→handleDelete */}
                                <div style={{}}>
                                    <button onClick={() => handleClick(task)}>
                                        削除
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>





                    {/* タスクがない場合 */}






                </div>
            </div>
        </>



    );

}

