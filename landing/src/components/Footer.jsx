'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const footerLinks = {
    product: [
        { name: 'Features', href: '#features' },
        { name: 'Screenshots', href: '#screenshots' },
        { name: 'Download', href: '#download' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact', href: '/contact' },
    ],
};

const socialLinks = [
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
    { name: 'Email', icon: FaEnvelope, href: 'mailto:contact@devgpt.app' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[var(--background-secondary)] border-t border-[rgba(255,255,255,0.1)]">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2"
                    >
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo.png"
                                    alt="DevGPT Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold gradient-text">DevGPT</span>
                        </Link>
                        <p className="text-[var(--foreground-muted)] max-w-sm mb-6">
                            Your AI-powered coding assistant. Get help with code generation,
                            debugging, and programming concepts anytime, anywhere.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--foreground-muted)] hover:text-[var(--color-primary)] transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--foreground-muted)] hover:text-[var(--color-primary)] transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)]"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[var(--foreground-subtle)] text-sm">
                            © {currentYear} DevGPT. All rights reserved.
                        </p>
                        <p className="text-[var(--foreground-subtle)] text-sm">
                            Built with ❤️ by{' '}
                            <span className="text-[var(--color-primary)]">Aadi</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
