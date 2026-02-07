import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen astrology-bg relative overflow-hidden">
            {/* 星座の線 */}
            <div className="absolute inset-0 constellation-lines opacity-20"></div>

            {/* 星のエフェクト */}
            <div className="absolute inset-0 bg-stars"></div>

            <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 relative z-10">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-amber-400 drop-shadow-lg" />
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden backdrop-blur-md px-6 py-4 shadow-xl sm:max-w-md sm:rounded-lg border border-amber-700/30"
                    style={{
                        background: 'rgba(30, 27, 75, 0.6)',
                    }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
