'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineChatAlt2,
    HiOutlineMail,
    HiOutlineChartBar,
    HiMenuAlt2,
    HiLogout
} from 'react-icons/hi';
import { STORAGE_KEYS, ROUTES } from '@/lib/constants';
import { FullPageLoader } from '@/components/admin';

const MENU_ITEMS = [
    { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: HiOutlineHome },
    { name: 'Users', path: ROUTES.ADMIN_USERS, icon: HiOutlineUsers },
    { name: 'Chats', path: ROUTES.ADMIN_CHATS, icon: HiOutlineChatAlt2 },
    { name: 'Contacts', path: '/appadmin/contacts', icon: HiOutlineMail },
];

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isLoginPage = pathname === ROUTES.ADMIN_LOGIN;

    useEffect(() => {
        if (isLoginPage) {
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
        const userStr = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);

        if (!token || !userStr) {
            router.push(ROUTES.ADMIN_LOGIN);
            return;
        }

        try {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                throw new Error('Not authorized');
            }
            setAdmin(user);
        } catch (e) {
            localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
            router.push(ROUTES.ADMIN_LOGIN);
        } finally {
            setIsLoading(false);
        }
    }, [router, isLoginPage]);

    const handleLogout = () => {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
        router.push(ROUTES.ADMIN_LOGIN);
    };

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isSidebarOpen ? 260 : 0, opacity: 1 }}
                className="bg-[#0f0f0f] border-r border-white/5 h-screen sticky top-0 overflow-hidden flex flex-col"
            >
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                            <HiOutlineChartBar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">DevGPT</h1>
                            <p className="text-xs text-gray-500">Admin Console</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {MENU_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-black text-sm">
                            {admin.name?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{admin.name}</p>
                            <p className="text-xs text-gray-500 truncate">{admin.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full mt-2 flex items-center justify-center gap-2 text-xs text-red-400 hover:text-red-300 py-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <HiLogout className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-20 flex items-center px-6 justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <HiMenuAlt2 className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-semibold text-white">
                            {MENU_ITEMS.find((i) => i.path === pathname)?.name || 'Overview'}
                        </h2>
                    </div>
                </header>

                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
