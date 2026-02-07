import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function ExpGainAnimation() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(false);
    const [expAmount, setExpAmount] = useState(0);

    useEffect(() => {
        if (flash.exp_gained) {
            setExpAmount(flash.exp_gained);
            setShow(true);

            // 1.5秒後に非表示
            const timer = setTimeout(() => {
                setShow(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [flash.exp_gained]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="exp-gain-animation relative">
                {/* グローエフェクト */}
                <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 opacity-50 animate-pulse"></div>

                {/* メインテキスト */}
                <span className="relative text-7xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl"
                    style={{
                        textShadow: '0 0 40px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4)',
                        WebkitTextStroke: '2px rgba(251, 146, 60, 0.5)'
                    }}>
                    +{expAmount} EXP
                </span>

                {/* キラキラエフェクト */}
                <div className="absolute top-0 left-0 w-full h-full sparkles">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-yellow-300 rounded-full sparkle"
                            style={{
                                left: `${20 + i * 10}%`,
                                top: `${30 + (i % 2) * 40}%`,
                                animationDelay: `${i * 0.1}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes expGain {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) scale(0.5);
                    }
                    20% {
                        opacity: 1;
                        transform: translateY(-10px) scale(1.3);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(-20px) scale(1.2);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-80px) scale(0.8);
                    }
                }

                @keyframes sparkleAnim {
                    0%, 100% {
                        opacity: 0;
                        transform: translate(0, 0) scale(0);
                    }
                    50% {
                        opacity: 1;
                        transform: translate(var(--tx), var(--ty)) scale(1);
                    }
                }

                .exp-gain-animation {
                    animation: expGain 1.5s ease-out;
                }

                .sparkle {
                    --tx: calc((var(--random) - 0.5) * 100px);
                    --ty: calc((var(--random2) - 0.5) * 100px);
                    animation: sparkleAnim 1s ease-out;
                }

                .sparkle:nth-child(1) { --random: 0.2; --random2: 0.8; }
                .sparkle:nth-child(2) { --random: 0.9; --random2: 0.3; }
                .sparkle:nth-child(3) { --random: 0.4; --random2: 0.6; }
                .sparkle:nth-child(4) { --random: 0.7; --random2: 0.2; }
                .sparkle:nth-child(5) { --random: 0.1; --random2: 0.9; }
                .sparkle:nth-child(6) { --random: 0.8; --random2: 0.4; }
                .sparkle:nth-child(7) { --random: 0.3; --random2: 0.7; }
                .sparkle:nth-child(8) { --random: 0.6; --random2: 0.1; }
            `}</style>
        </div>
    );
}
