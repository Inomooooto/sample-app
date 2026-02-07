import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ExpBar() {
    const { auth } = usePage().props;
    const user = auth.user;

    const [animatedExp, setAnimatedExp] = useState(user.current_exp);

    // EXPが変更されたらアニメーション
    useEffect(() => {
        setAnimatedExp(user.current_exp);
    }, [user.current_exp]);

    // パーセンテージを計算
    const percentage = Math.min((animatedExp / user.required_exp) * 100, 100);

    return (
        <div className="flex items-center space-x-3 mr-4">
            {/* レベル表示 */}
            <div className="flex items-center space-x-1">
                <span className="text-xs font-bold text-indigo-300">Lv</span>
                <span className="text-lg font-bold text-indigo-200">{user.level}</span>
            </div>

            {/* EXPプログレスバー */}
            <div className="flex flex-col">
                <div className="relative w-48 h-5 bg-indigo-950/50 rounded-full overflow-hidden border border-indigo-700/50 backdrop-blur-sm">
                    {/* プログレスバーの塗りつぶし部分 */}
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                    >
                        {/* 光沢効果 */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
                    </div>

                    {/* EXP数値表示 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-indigo-100 z-10">
                            {user.current_exp} / {user.required_exp}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}