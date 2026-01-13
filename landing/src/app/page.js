'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiCode,
  HiLightningBolt,
  HiChatAlt2,
  HiCog,
  HiChip,
  HiShieldCheck,
  HiArrowRight,
  HiDownload,
  HiPlay
} from 'react-icons/hi';
import { FaAndroid, FaApple, FaRobot, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import FeatureCard from '@/components/FeatureCard';
import { DualPhoneMockup } from '@/components/PhoneMockup';

const features = [
  {
    icon: HiCode,
    title: 'Code Generation',
    description: 'Generate clean, efficient code in multiple programming languages with AI-powered suggestions.',
  },
  {
    icon: HiLightningBolt,
    title: 'Instant Debugging',
    description: 'Identify and fix bugs quickly with intelligent error analysis and step-by-step solutions.',
  },
  {
    icon: HiChatAlt2,
    title: 'Natural Conversations',
    description: 'Chat naturally about programming concepts, get explanations, and learn as you code.',
  },
  {
    icon: HiChip,
    title: 'Multiple AI Models',
    description: 'Choose from various AI models like Llama 3.3 to get the best responses for your needs.',
  },
  {
    icon: HiCog,
    title: 'Customizable',
    description: 'Personalize your experience with different themes, preferences, and coding styles.',
  },
  {
    icon: HiShieldCheck,
    title: 'Privacy First',
    description: 'Your code and conversations are secure. We prioritize your privacy and data protection.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Download the App',
    description: 'Get DevGPT from the App Store or Google Play Store.',
  },
  {
    number: '02',
    title: 'Start Chatting',
    description: 'Ask any programming question or describe what you want to build.',
  },
  {
    number: '03',
    title: 'Get Solutions',
    description: 'Receive clear, detailed code examples and explanations instantly.',
  },
];

export default function Home() {
  return (
    <main className="relative bg-[var(--background)] overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-grid">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial" />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-20 blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-secondary)] rounded-full opacity-20 blur-[100px]"
        />

        <div className="relative section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--color-primary)] text-sm font-medium mb-6">
                  <FaRobot className="inline mr-2" />
                  AI-Powered Coding Assistant
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Code Smarter With{' '}
                <span className="gradient-text">DevGPT</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-[var(--foreground-muted)] mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Your AI-powered mobile companion for coding help. Get instant code
                generation, debugging assistance, and programming explanations on the go.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="#download" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                  <HiDownload className="w-5 h-5" />
                  Download Now
                </Link>
                <Link href="#features" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                  <HiPlay className="w-5 h-5" />
                  Learn More
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-8 mt-12 justify-center lg:justify-start"
              >
                {[
                  { value: '10K+', label: 'Downloads' },
                  { value: '4.9', label: 'Rating' },
                  { value: '100%', label: 'Free' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-[var(--foreground-muted)]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-64 md:w-80 animate-float">
                <div className="phone-mockup">
                  <div className="phone-notch" />
                  <div className="phone-screen relative aspect-[9/19.5]">
                    <Image
                      src="/appss01.png"
                      alt="DevGPT App"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-20 blur-3xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[var(--glass-border)] flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-[var(--color-primary)] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative bg-[var(--background-secondary)]">
        <div className="section-container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Everything you need for a better coding experience, powered by advanced AI technology.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="screenshots" className="relative bg-grid">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />

        <div className="relative section-container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">
              See It In <span className="gradient-text">Action</span>
            </h2>
            <p className="section-subtitle mx-auto">
              A glimpse into the powerful features and beautiful interface of DevGPT.
            </p>
          </AnimatedSection>

          <DualPhoneMockup
            screenshot1="/appss01.png"
            screenshot2="/appss02.png"
            alt1="DevGPT Welcome Screen"
            alt2="DevGPT Chat Interface"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative bg-[var(--background-secondary)]">
        <div className="section-container">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Get started with DevGPT in just a few simple steps.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <AnimatedSection
                key={step.number}
                delay={index * 0.1}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-8 text-center h-full"
                >
                  <div className="text-5xl font-bold gradient-text mb-4 opacity-50">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--foreground-muted)]">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-transparent" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About/Author Section */}
      <section id="about" className="relative bg-grid">
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />

        <div className="relative section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection variant="fadeLeft">
              <div className="relative">
                <div className="glass-card p-8 md:p-12">
                  <div className="flex items-center gap-6 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-3xl font-bold text-black"
                    >
                      A
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Aadi</h3>
                      <p className="text-[var(--color-primary)]">Full Stack Developer</p>
                    </div>
                  </div>

                  <p className="text-[var(--foreground-muted)] leading-relaxed mb-6">
                    Hi! I&apos;m Aadi, a passionate full-stack developer with a love for
                    creating innovative solutions. DevGPT was born from my desire to make
                    coding assistance accessible to everyone, anytime, anywhere.
                  </p>

                  <p className="text-[var(--foreground-muted)] leading-relaxed mb-8">
                    Built with React Native for a seamless mobile experience,
                    powered by cutting-edge AI models, DevGPT represents my commitment
                    to building tools that help developers work smarter.
                  </p>

                  <div className="flex gap-4">
                    {[
                      { icon: FaGithub, href: 'https://github.com' },
                      { icon: FaLinkedin, href: 'https://linkedin.com' },
                      { icon: FaTwitter, href: 'https://twitter.com' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[var(--color-primary)] rounded-2xl opacity-20 -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeRight" className="space-y-6">
              <h2 className="section-title">
                Built With <span className="gradient-text">Passion</span>
              </h2>

              <div className="space-y-4">
                {[
                  { label: 'React Native', value: 'Mobile Framework' },
                  { label: 'Expo', value: 'Development Platform' },
                  { label: 'Node.js', value: 'Backend Runtime' },
                  { label: 'Llama 3.3', value: 'AI Model' },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-4 glass-card"
                  >
                    <span className="font-medium text-white">{tech.label}</span>
                    <span className="text-[var(--foreground-muted)]">{tech.value}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="relative bg-[var(--background-secondary)]">
        <div className="section-container">
          <AnimatedSection className="glass-card p-8 md:p-16 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10" />

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-20 h-20 mx-auto mb-8 relative"
              >
                <Image
                  src="/logo.png"
                  alt="DevGPT Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>

              <h2 className="section-title mb-4">
                Ready to <span className="gradient-text">Code Smarter?</span>
              </h2>

              <p className="section-subtitle mx-auto mb-10">
                Download DevGPT now and experience the future of AI-powered coding assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center justify-center gap-3 text-lg px-8 py-4"
                >
                  <FaAndroid className="w-6 h-6" />
                  Download for Android
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary inline-flex items-center justify-center gap-3 text-lg px-8 py-4"
                >
                  <FaApple className="w-6 h-6" />
                  Coming Soon on iOS
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
