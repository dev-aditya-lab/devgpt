'use client';

import { motion } from 'framer-motion';
import {
    HiUsers,
    HiChat,
    HiLightningBolt,
    HiMail,
    HiTrendingUp,
    HiGlobe
} from 'react-icons/hi';
import { adminApi } from '@/lib/api';
import { useApi } from '@/hooks';
import { LoadingOverlay } from '@/components/admin';

export default function DashboardPage() {
    const { data: stats, loading: statsLoading } = useApi(() => adminApi.getStats(), []);
    const { data: analytics, loading: analyticsLoading } = useApi(() => adminApi.getAnalytics(), []);

    const loading = statsLoading || analyticsLoading;

    if (loading) return <LoadingOverlay message="Loading dashboard..." />;

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats?.users?.total || 0}
                    subtext={`+${stats?.users?.today || 0} today`}
                    icon={HiUsers}
                    color="purple"
                />
                <StatCard
                    title="Total Chats"
                    value={stats?.chats?.total || 0}
                    subtext={`+${stats?.chats?.today || 0} today`}
                    icon={HiChat}
                    color="cyan"
                />
                <StatCard
                    title="Messages"
                    value={stats?.messages?.total || 0}
                    subtext={`+${stats?.messages?.today || 0} today`}
                    icon={HiLightningBolt}
                    color="pink"
                />
                <StatCard
                    title="New Contacts"
                    value={stats?.contacts?.pending || 0}
                    subtext="Pending replies"
                    icon={HiMail}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <HiTrendingUp className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-semibold text-white">User Growth (7 days)</h3>
                    </div>
                    <div className="space-y-4">
                        {analytics?.dailyGrowth?.length > 0 ? (
                            analytics.dailyGrowth.map((day) => (
                                <div key={day.date} className="flex items-center gap-4">
                                    <span className="text-xs text-gray-500 w-20">{day.date.slice(5)}</span>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                            style={{ width: `${Math.min(100, day.users * 10)}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-white font-medium w-8">{day.users}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No data available yet</p>
                        )}
                    </div>
                </motion.div>

                {/* Top Countries */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <HiGlobe className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Top Countries</h3>
                    </div>
                    <div className="space-y-3">
                        {analytics?.topCountries?.length > 0 ? (
                            analytics.topCountries.slice(0, 5).map((country, i) => (
                                <div key={country.country} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500 text-sm w-6">{i + 1}.</span>
                                        <span className="text-white">{country.country || 'Unknown'}</span>
                                    </div>
                                    <span className="text-cyan-400 text-sm font-medium">{country.logins} logins</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No location data yet</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Weekly Summary */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="glass-card p-6"
            >
                <h3 className="text-lg font-semibold text-white mb-4">Weekly Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                        <p className="text-3xl font-bold text-cyan-400">{analytics?.weeklyLogins || 0}</p>
                        <p className="text-gray-500 text-sm mt-1">Total Logins (7 days)</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                        <p className="text-3xl font-bold text-purple-400">{analytics?.topCountries?.length || 0}</p>
                        <p className="text-gray-500 text-sm mt-1">Countries Reached</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                        <p className="text-3xl font-bold text-green-400">Online</p>
                        <p className="text-gray-500 text-sm mt-1">Server Status</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function StatCard({ title, value, subtext, icon: Icon, color }) {
    const colorMap = {
        purple: 'from-purple-500/20 to-purple-500/5 text-purple-400',
        cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400',
        pink: 'from-pink-500/20 to-pink-500/5 text-pink-400',
        green: 'from-green-500/20 to-green-500/5 text-green-400',
        orange: 'from-orange-500/20 to-orange-500/5 text-orange-400',
    };

    const [gradientClass, textClass] = (colorMap[color] || colorMap.cyan).split(' text-');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-6 relative overflow-hidden"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-50`} />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm font-medium">{title}</span>
                    <Icon className={`w-5 h-5 text-${textClass}`} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{value.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{subtext}</div>
            </div>
        </motion.div>
    );
}
