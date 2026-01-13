'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const contactInfo = [
    {
        icon: HiMail,
        title: 'Email',
        value: 'contact@devgpt.app',
        href: 'mailto:contact@devgpt.app',
    },
    {
        icon: HiLocationMarker,
        title: 'Location',
        value: 'India',
        href: null,
    },
];

const socialLinks = [
    { icon: FaGithub, name: 'GitHub', href: 'https://github.com' },
    { icon: FaLinkedin, name: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: FaTwitter, name: 'Twitter', href: 'https://twitter.com' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <main className="bg-[var(--background)] min-h-screen">
            <Navbar />

            <div className="pt-24 md:pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--color-primary)] transition-colors mb-8"
                        >
                            <HiArrowLeft className="w-5 h-5" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Get In <span className="gradient-text">Touch</span>
                        </h1>
                        <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                            Have a question, feedback, or just want to say hello? We&apos;d love to hear from you.
                            Fill out the form below or reach out through our social channels.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="glass-card p-8">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                                            <HiMail className="w-8 h-8 text-black" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                                        <p className="text-[var(--foreground-muted)]">
                                            Thank you for reaching out. We&apos;ll get back to you soon.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="mt-6 text-[var(--color-primary)] hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-white placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-white placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-white placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                                placeholder="How can we help?"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-white placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                                                placeholder="Tell us more..."
                                            />
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            {/* About DevGPT */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold text-white mb-4">About DevGPT</h3>
                                <p className="text-[var(--foreground-muted)] leading-relaxed">
                                    DevGPT is an AI-powered mobile coding assistant developed by Aadi.
                                    Our mission is to make coding assistance accessible to developers
                                    everywhere, helping them write better code faster.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
                                <div className="space-y-4">
                                    {contactInfo.map((item) => (
                                        <div key={item.title} className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-[var(--color-primary)]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--foreground-subtle)]">{item.title}</p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-white hover:text-[var(--color-primary)] transition-colors">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-white">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="glass-card p-8">
                                <h3 className="text-xl font-semibold text-white mb-6">Follow Us</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-12 h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
                                            aria-label={social.name}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
