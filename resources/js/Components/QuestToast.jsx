import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';

export default function QuestToast() {
    const { flash } = usePage().props;

    useEffect(() => {
        // EXP獲得通知
        if (flash.exp_gained) {
            toast.custom((t) => (
                <div
                    className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-2xl shadow-amber-500/50 rounded-lg pointer-events-auto flex ring-2 ring-amber-300 ring-opacity-50`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <span className="text-2xl">⚔️</span>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-bold text-white">
                                    クエスト達成！
                                </p>
                                <p className="mt-1 text-sm text-amber-100">
                                    +{flash.exp_gained} EXP 獲得
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-amber-400">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-amber-200 focus:outline-none"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ), { duration: 3000 });
        }

        // レベルアップ通知
        if (flash.leveled_up) {
            toast.custom((t) => (
                <div
                    className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 shadow-2xl shadow-yellow-500/70 rounded-lg pointer-events-auto flex ring-2 ring-yellow-300 ring-opacity-75 animate-glow`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <span className="text-3xl">🎉</span>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-lg font-bold text-white">
                                    レベルアップ！
                                </p>
                                <p className="mt-1 text-sm text-yellow-100">
                                    レベル {flash.new_level} に到達しました！
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-yellow-300">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-yellow-200 focus:outline-none"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ), { duration: 5000 });
        }

        // 一般的な成功メッセージ
        if (flash.success && !flash.exp_gained) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                className: '',
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            }}
        />
    );
}
