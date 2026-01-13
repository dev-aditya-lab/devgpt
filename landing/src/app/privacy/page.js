'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
    return (
        <main className="bg-[var(--background)] min-h-screen">
            <Navbar />

            <div className="pt-24 md:pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="legal-content"
                >
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--color-primary)] transition-colors mb-8"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <h1 className="gradient-text">Privacy Policy</h1>
                    <p className="text-[var(--foreground-subtle)] mb-8">
                        Last updated: January 13, 2025
                    </p>

                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to DevGPT (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting
                        your privacy and ensuring you have a positive experience when using our mobile application.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
                    </p>

                    <h2>2. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <ul>
                        <li><strong>Account Information:</strong> Email address and profile details when you create an account.</li>
                        <li><strong>Usage Data:</strong> Information about how you use the app, including chat history and preferences.</li>
                        <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers.</li>
                        <li><strong>Log Data:</strong> Server logs that may include your IP address, browser type, and access times.</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process and respond to your coding queries</li>
                        <li>Personalize your experience</li>
                        <li>Communicate with you about updates and features</li>
                        <li>Ensure the security and integrity of our services</li>
                    </ul>

                    <h2>4. Data Storage and Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal
                        information against unauthorized access, alteration, disclosure, or destruction. Your
                        chat data is securely stored and encrypted.
                    </p>

                    <h2>5. Third-Party Services</h2>
                    <p>
                        Our app may use third-party AI services to process your coding queries. These services
                        are subject to their own privacy policies. We ensure that any third-party
                        providers we work with maintain high standards of data protection.
                    </p>

                    <h2>6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Export your chat history</li>
                        <li>Opt out of non-essential communications</li>
                    </ul>

                    <h2>7. Children&apos;s Privacy</h2>
                    <p>
                        DevGPT is not intended for children under 13 years of age. We do not knowingly
                        collect personal information from children under 13.
                    </p>

                    <h2>8. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any
                        changes by posting the new Privacy Policy on this page and updating the
                        &quot;Last updated&quot; date.
                    </p>

                    <h2>9. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:privacy@devgpt.app" className="text-[var(--color-primary)]">
                            privacy@devgpt.app
                        </a>
                    </p>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
