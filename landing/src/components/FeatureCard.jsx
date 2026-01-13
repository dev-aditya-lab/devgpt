'use client';

import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="glass-card p-6 md:p-8 group cursor-pointer"
        >
            {/* Icon Container */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-[rgba(0,255,229,0.3)] transition-shadow duration-300"
            >
                <Icon className="w-7 h-7 text-black" />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {title}
            </h3>

            {/* Description */}
            <p className="text-[var(--foreground-muted)] leading-relaxed">
                {description}
            </p>

            {/* Hover Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border border-[var(--color-primary)] opacity-30" />
            </div>
        </motion.div>
    );
}
