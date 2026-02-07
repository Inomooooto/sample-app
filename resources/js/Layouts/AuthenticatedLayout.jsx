import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ExpBar from '@/Components/ExpBar';
import QuestToast from '@/Components/QuestToast';
import ExpGainAnimation from '@/Components/ExpGainAnimation';
import LightParticles from '@/Components/LightParticles';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen astrology-bg relative overflow-hidden">
            {/* 星座の線 */}
            <div className="absolute inset-0 constellation-lines opacity-20"></div>

            {/* 星のエフェクト */}
            <div className="absolute inset-0 bg-stars"></div>

            <QuestToast />
            <ExpGainAnimation />
            <nav className="border-b border-indigo-700/50 bg-indigo-950/50 shadow-xl backdrop-blur-md relative z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('tasks.index')}>
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-amber-400" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center gap-4">
                            <ExpBar/>
                            <span className="text-amber-200 font-medium">{user.name}</span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="btn btn-sm bg-red-800 hover:bg-red-900 text-white border-none"
                            >
                                Logout
                            </Link>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="border-t border-indigo-700/50 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-amber-200">
                                {user.name}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 px-4">
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-indigo-950/50 shadow-xl border-b border-indigo-700/50 backdrop-blur-md relative z-10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-10">{children}</main>
        </div>
    );
}
