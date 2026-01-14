'use client';

import Link from 'next/link';
import { HiChat, HiUser, HiClock } from 'react-icons/hi';
import { adminApi } from '@/lib/api';
import { useApi } from '@/hooks';
import { LoadingOverlay } from '@/components/admin';

export default function ChatsPage() {
    const { data: chats, loading, error } = useApi(() => adminApi.getChats(), []);

    if (loading) return <LoadingOverlay message="Loading chats..." />;
    if (error) return <div className="text-red-400 text-center mt-20">Error: {error}</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Global Chat Monitor</h1>
                <p className="text-gray-500 text-sm mt-1">View recent conversations across the platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chats?.map((chat) => (
                    <div key={chat._id} className="glass-card p-5 hover:bg-white/5 transition-colors group">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                                    <HiUser className="w-4 h-4 text-cyan-400" />
                                </div>
                                <span className="text-sm text-gray-400">{chat.user?.name || 'Unknown'}</span>
                            </div>
                            <span className="text-xs text-gray-600">
                                {new Date(chat.updatedAt).toLocaleDateString()}
                            </span>
                        </div>

                        <h3 className="text-white font-medium mb-2 line-clamp-2 min-h-[3rem]">
                            {chat.title || 'Untitled Chat'}
                        </h3>

                        <div className="flex items-center justify-between mt-4">
                            <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500">
                                {chat.model}
                            </span>
                            <div className="flex items-center gap-1 text-cyan-400 text-xs">
                                <HiChat className="w-3 h-3" />
                                {chat.messageCount}
                            </div>
                        </div>

                        {chat.user?._id && (
                            <Link
                                href={`/appadmin/users/${chat.user._id}`}
                                className="block w-full mt-4 py-2 text-center text-xs font-medium bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
                            >
                                View User
                            </Link>
                        )}
                    </div>
                ))}
                {(!chats || chats.length === 0) && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                        <HiChat className="w-12 h-12 mb-4 opacity-50" />
                        <p>No chats found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
