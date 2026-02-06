import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";


export default function Index({ tasks }) {
    console.log(tasks);

    //tasksがオブジェクトなので、map用に変換する
    const taskList = Array.isArray(tasks)
        ? tasks : Object.values(tasks);


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
     * 完了していないタスク→pending＋in_progress
    */
    const incomplete = (tasks) => [
        ...(tasks.pending || []),
        ...(tasks.in_progress || []),
    ].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));



    //ここからレンダリング
    return (
        <AuthenticatedLayout

            header={


                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">タスク一覧</h2>
                    {/* タスクの新規作成ボタン→tasks.createへ遷移 */}
                    < Link
                        href={route('tasks.create')}
                        className="btn btn-primary text-white">
                        <button>＋ 新規作成</button>
                    </Link>
                </div>
            }
        >
            <Head title="タスク一覧" />
            {/* 期限切れのタスク */}

            <div className="card bg-base-100 shadow-md border border-base-200">
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> */}
                <h2>期限切れのタスク</h2>
                {tasks.overdue.map((task) => (
                    <div key={task.id} >
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="">
                            <Link href={route('tasks.edit', task.id)}
                                className="btn btn-primary text-white">
                                <button>編集</button>
                            </Link>
                        </div>

                        {/* 完了ボタン→handleComplete */}
                        <div className="btn btn-primary">
                            <button onClick={() => handleComplete(task)}>
                                完了
                            </button>
                        </div>
                    </div>

                ))}
            </div>
            {/* </div> */}

            {/* 完了していないタスク */}
            <div className="card bg-base-100 shadow-md border border-base-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <h2>未着手のタスク</h2>
                    <div className="card-body">
                        {tasks.pending.map((task) => (
                            <div key={task.id} >
                                <div className="card-title">
                                    <h3>{task.title}</h3>
                                </div>
                                <p className="text-gray-600">{task.description}</p>

                                {/* 編集ボタン→tasks.editへ遷移 */}
                                <div className="">
                                    <Link href={route('tasks.edit', task.id)}>
                                        <button>編集</button>
                                    </Link>
                                </div>

                                {/* 完了ボタン→handleComplete */}
                                <button
                                    className=""
                                    onClick={() => onComplete(task)}
                                >
                                    完了
                                </button>

                                {/* 削除ボタン→handleDelete */}
                                <button
                                    className=""
                                    onClick={() => onDelete(task)}
                                >
                                    削除
                                </button>
                            </div>


                        ))}
                    </div>
                </div>
            </div>

            {/* 完了していないタスク */}
            <div className="card bg-base-100 shadow-md border border-base-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <h2>未着手のタスク</h2>
                    {tasks.in_progress.map((task) => (
                        <div key={task.id} >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>

                            {/* 編集ボタン→tasks.editへ遷移 */}
                            {/* tasksのtaskのidをパラメーターに入れる */}
                            <div style={{}}>
                                <Link href={route('tasks.edit', task.id)}>

                                    <button>編集</button>
                                </Link>
                            </div>

                            {/* 完了ボタン→handleComplete */}
                            <div style={{}}>
                                <button onClick={() => handleComplete(task)}>
                                    完了
                                </button>
                            </div>

                            {/* 削除ボタン→handleDelete */}
                            <div style={{}}>
                                <button onClick={() => handleDelete(task)}>
                                    削除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>





            <div className="p-6">
                {/* タスクがない場合 */}
                {taskList.length === 0 && (
                    <div className="text-center text-gray-500">
                        タスクがありません
                    </div>
                )}

            </div>
        </AuthenticatedLayout >
    );

}

