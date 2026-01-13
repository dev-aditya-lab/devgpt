'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PhoneMockup({
    screenshot,
    alt = 'App screenshot',
    className = '',
    animate = true
}) {
    const Wrapper = animate ? motion.div : 'div';
    const wrapperProps = animate ? {
        initial: { opacity: 0, y: 50, rotateY: -10 },
        whileInView: { opacity: 1, y: 0, rotateY: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.8, ease: 'easeOut' },
        whileHover: { y: -10, rotateY: 5, transition: { duration: 0.4 } },
    } : {};

    return (
        <Wrapper
            {...wrapperProps}
            className={`phone-mockup relative ${className}`}
            style={{ perspective: '1000px' }}
        >
            {/* Phone Frame */}
            <div className="relative">
                {/* Notch */}
                <div className="phone-notch" />

                {/* Screen */}
                <div className="phone-screen relative aspect-[9/19.5] w-full">
                    <Image
                        src={screenshot}
                        alt={alt}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Screen Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-20 blur-2xl -z-10" />
        </Wrapper>
    );
}

// Dual phone showcase for displaying two screenshots
export function DualPhoneMockup({
    screenshot1,
    screenshot2,
    alt1 = 'App screenshot 1',
    alt2 = 'App screenshot 2'
}) {
    return (
        <div className="relative flex items-center justify-center gap-4 md:gap-8">
            {/* Phone 1 */}
            <motion.div
                initial={{ opacity: 0, x: -50, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="w-48 md:w-64 transform -rotate-6"
                style={{ perspective: '1000px' }}
            >
                <PhoneMockup screenshot={screenshot1} alt={alt1} animate={false} />
            </motion.div>

            {/* Phone 2 */}
            <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-48 md:w-64 transform rotate-6"
                style={{ perspective: '1000px' }}
            >
                <PhoneMockup screenshot={screenshot2} alt={alt2} animate={false} />
            </motion.div>

            {/* Center Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] opacity-15 blur-3xl -z-10" />
        </div>
    );
}
