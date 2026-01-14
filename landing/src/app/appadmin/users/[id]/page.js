'use client';

import { useState, use } from 'react';
import { motion } from 'framer-motion';
import {
    HiUser,
    HiBan,
    HiShieldCheck,
    HiTrash,
    HiClock,
    HiChat,
    HiLocationMarker,
    HiGlobe
} from 'react-icons/hi';
import { adminApi } from '@/lib/api';
import { useApi } from '@/hooks';
import { LoadingOverlay, RoleBadge, StatusBadge } from '@/components/admin';

export default function UserDetailPage({ params }) {
    const { id: userId } = use(params);
    const [activeTab, setActiveTab] = useState('activity');
    const [banReason, setBanReason] = useState('');

    const { data, loading, error, refetch } = useApi(
        () => adminApi.getUser(userId),
        [userId],
        { immediate: !!userId }
    );

    const handleAction = async (action, payload = {}) => {
        try {
            switch (action) {
                case 'ban':
                    await adminApi.updateUser(userId, { isBanned: true });
                    break;
                case 'unban':
                    await adminApi.updateUser(userId, { isBanned: false });
                    break;
                case 'promote':
                    await adminApi.updateUser(userId, { role: 'admin' });
                    break;
                case 'demote':
                    await adminApi.updateUser(userId, { role: 'user' });
                    break;
                case 'banIp':
                    await adminApi.banIdentity({ type: 'ip', value: payload.ip, reason: banReason || 'Admin action' });
                    break;
                case 'delete':
                    if (confirm('Permanently delete this user? This cannot be undone.')) {
                        await adminApi.deleteUser(userId);
                        window.location.href = '/appadmin/users';
                        return;
                    }
                    return;
            }
            refetch();
        } catch (err) {
            alert(err.message || 'Action failed');
        }
    };

    if (loading) return <LoadingOverlay message="Loading user..." />;
    if (error) return <div className="text-red-400 text-center mt-20">Error: {error}</div>;
    if (!data) return <div className="text-gray-400 text-center mt-20">User not found</div>;

    const { user, logs = [], chats = [], stats = {} } = data;

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="glass-card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-black">
                            {user?.name?.[0] || '?'}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                                <RoleBadge role={user?.role} />
                                {user?.isBanned && <StatusBadge isBanned={true} />}
                            </div>
                            <p className="text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleAction(user?.role === 'admin' ? 'demote' : 'promote')}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-sm border border-purple-500/20 transition-colors"
                        >
                            <HiShieldCheck className="w-4 h-4" />
                            {user?.role === 'admin' ? 'Demote' : 'Promote'}
                        </button>
                        <button
                            onClick={() => handleAction(user?.isBanned ? 'unban' : 'ban')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors ${user?.isBanned
                                    ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20'
                                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20'
                                }`}
                        >
                            <HiBan className="w-4 h-4" />
                            {user?.isBanned ? 'Unban' : 'Ban'}
                        </button>
                        <button
                            onClick={() => handleAction('delete')}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm border border-red-500/20 transition-colors"
                        >
                            <HiTrash className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-cyan-400">{stats.totalChats || 0}</p>
                        <p className="text-xs text-gray-500">Total Chats</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">{stats.totalMessages || 0}</p>
                        <p className="text-xs text-gray-500">Messages</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{new Date(user?.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">Joined</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</p>
                        <p className="text-xs text-gray-500">Last Login</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/10 flex gap-6">
                {[
                    { id: 'activity', label: 'Login History', icon: HiClock },
                    { id: 'chats', label: 'Chats', icon: HiChat },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'activity' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Login History & Activity</h3>
                        <input
                            type="text"
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                            placeholder="Ban reason (optional)"
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-48"
                        />
                    </div>
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log._id} className="glass-card p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <ActionIcon action={log.action} />
                                            <span className="text-white font-medium">{log.action}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(log.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                            {log.ipAddress && (
                                                <span className="flex items-center gap-1">
                                                    <HiGlobe className="w-3 h-3" />
                                                    {log.ipAddress}
                                                </span>
                                            )}
                                            {log.location?.country && (
                                                <span className="flex items-center gap-1">
                                                    <HiLocationMarker className="w-3 h-3" />
                                                    {log.location.city && `${log.location.city}, `}
                                                    {log.location.country}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {log.ipAddress && (
                                        <button
                                            onClick={() => handleAction('banIp', { ip: log.ipAddress })}
                                            className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                                        >
                                            Ban IP
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {logs.length === 0 && (
                            <div className="text-gray-500 text-center py-8">No activity logs</div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'chats' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chats.map((chat) => (
                        <div key={chat._id} className="glass-card p-4 hover:bg-white/5 transition-colors">
                            <h4 className="font-semibold text-white mb-2 truncate">{chat.title}</h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{chat.messageCount} messages</span>
                                <span>{chat.model}</span>
                                <span>{new Date(chat.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                    {chats.length === 0 && (
                        <div className="col-span-full text-gray-500 text-center py-8">No chats</div>
                    )}
                </div>
            )}
        </div>
    );
}

function ActionIcon({ action }) {
    const iconClass = "w-4 h-4";
    if (action === 'LOGIN') return <HiClock className={`${iconClass} text-green-400`} />;
    if (action === 'REGISTER') return <HiUser className={`${iconClass} text-cyan-400`} />;
    if (action?.includes('BAN')) return <HiBan className={`${iconClass} text-red-400`} />;
    return <HiClock className={`${iconClass} text-gray-400`} />;
}
