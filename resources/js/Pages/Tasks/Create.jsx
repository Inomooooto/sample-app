import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        due_date: '',
        difficulty: 'D',
        status: 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-amber-400" style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>新規クエスト受注</h2>
                    <Link
                        href={route('tasks.index')}
                        className="btn btn-outline btn-sm border-amber-600 text-amber-200 hover:bg-amber-700 hover:text-white hover:border-amber-500"
                    >
                        ← クエストボードへ戻る
                    </Link>
                </div>
            }
        >
            <Head title="新規クエスト受注" />

            <div className="py-12 min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="shadow-xl rounded-lg overflow-hidden backdrop-blur-md"
                        style={{
                            background: 'rgba(30, 27, 75, 0.6)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                        }}
                    >
                        <div className="p-8">
                            <form onSubmit={handleSubmit}>
                                {/* クエスト名 */}
                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-indigo-100 font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        クエスト名 <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="input input-bordered w-full bg-indigo-950/50 border border-indigo-700/50 focus:border-indigo-500 text-indigo-100 placeholder-indigo-400"
                                        placeholder="例: ドラゴンを倒す"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>

                                {/* クエストの詳細 */}
                                <div className="mb-6">
                                    <label htmlFor="description" className="block text-indigo-100 font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        クエストの詳細
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="textarea textarea-bordered w-full h-32 bg-indigo-950/50 border border-indigo-700/50 focus:border-indigo-500 text-indigo-100 placeholder-indigo-400"
                                        placeholder="クエストの詳細を記入してください..."
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                    )}
                                </div>

                                {/* 難易度選択 */}
                                <div className="mb-6">
                                    <label htmlFor="difficulty" className="block text-indigo-100 font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        難易度ランク <span className="text-red-400">*</span>
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {[
                                            { value: 'E', label: 'E (10 EXP)', color: 'bg-gray-400' },
                                            { value: 'D', label: 'D (50 EXP)', color: 'bg-green-500' },
                                            { value: 'C', label: 'C (100 EXP)', color: 'bg-blue-500' },
                                            { value: 'B', label: 'B (200 EXP)', color: 'bg-purple-500' },
                                            { value: 'A', label: 'A (500 EXP)', color: 'bg-orange-500' },
                                            { value: 'S', label: 'S (1000 EXP)', color: 'bg-red-500' },
                                        ].map((difficulty) => (
                                            <button
                                                key={difficulty.value}
                                                type="button"
                                                onClick={() => setData('difficulty', difficulty.value)}
                                                className={`btn btn-sm ${data.difficulty === difficulty.value
                                                    ? `${difficulty.color} text-white border-2 border-amber-700`
                                                    : 'btn-outline border-stone-300 text-stone-700'
                                                    }`}
                                            >
                                                {difficulty.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.difficulty && (
                                        <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>
                                    )}
                                </div>

                                {/* 納期 */}
                                <div className="mb-6">
                                    <label htmlFor="due_date" className="block text-indigo-100 font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        納期
                                    </label>
                                    <input
                                        type="date"
                                        id="due_date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        className="input input-bordered w-full bg-indigo-950/50 border border-indigo-700/50 focus:border-indigo-500 text-indigo-100"
                                    />
                                    {errors.due_date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
                                    )}
                                </div>

                                {/* ボタン群 */}
                                <div className="flex justify-end gap-4 mt-8">
                                    <Link
                                        href={route('tasks.index')}
                                        className="btn btn-outline border-amber-600 text-amber-200 hover:bg-amber-700 hover:text-white"
                                    >
                                        キャンセル
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn bg-gradient-to-r from-red-800 to-red-700 hover:from-red-900 hover:to-red-800 text-amber-100 border border-amber-600"
                                    >
                                        クエスト受注
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
