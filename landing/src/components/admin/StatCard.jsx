'use client';

import { motion } from 'framer-motion';

/**
 * StatCard Component
 * Displays a statistic with title, value, and optional icon
 */
export function StatCard({ title, value, subtext, icon, color = 'cyan' }) {
    const colorClasses = {
        cyan: 'bg-cyan-500/5 group-hover:bg-cyan-500/10 bg-cyan-500/10 text-cyan-400',
        purple: 'bg-purple-500/5 group-hover:bg-purple-500/10 bg-purple-500/10 text-purple-400',
        pink: 'bg-pink-500/5 group-hover:bg-pink-500/10 bg-pink-500/10 text-pink-400',
        green: 'bg-green-500/5 group-hover:bg-green-500/10 bg-green-500/10 text-green-400',
        red: 'bg-red-500/5 group-hover:bg-red-500/10 bg-red-500/10 text-red-400',
    };

    const colors = colorClasses[color] || colorClasses.cyan;
    const [bgGlow, hoverGlow, iconBg, iconText] = colors.split(' ');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-6 relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 ${bgGlow} rounded-full blur-[40px] ${hoverGlow} transition-all`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 font-medium">{title}</span>
                    <span className={`p-2 rounded-lg ${iconBg} ${iconText} text-xl`}>{icon}</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                {subtext && <div className="text-sm text-gray-500">{subtext}</div>}
            </div>
        </motion.div>
    );
}
