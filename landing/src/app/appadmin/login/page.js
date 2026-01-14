'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { adminApi, ApiError } from '@/lib/api';
import { STORAGE_KEYS, ROUTES, ADMIN_SECRET_CODE_LENGTH } from '@/lib/constants';
import { LoadingSpinner } from '@/components/admin';

export default function AdminLogin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        secretCode: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await adminApi.login(formData);

            if (response.success) {
                localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, response.data.token);
                localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(response.data.user));
                router.push(ROUTES.ADMIN_DASHBOARD);
            }
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 glass-card relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold gradient-text mb-2">Admin Panel</h1>
                    <p className="text-gray-400">Secure Access Only</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        placeholder="hello@devaditya.dev"
                    />
                    <FormField
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        placeholder="••••••••"
                    />
                    <FormField
                        label="Secret Code"
                        type="password"
                        value={formData.secretCode}
                        onChange={handleChange('secretCode')}
                        placeholder="------"
                        maxLength={ADMIN_SECRET_CODE_LENGTH}
                        className="bg-cyan-500/5 border-cyan-500/30 text-cyan-500 tracking-widest text-center"
                        labelClassName="text-cyan-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary mt-6 !flex items-center justify-center"
                    >
                        {loading ? <LoadingSpinner size="sm" /> : 'Access Dashboard'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

function FormField({
    label,
    type,
    value,
    onChange,
    placeholder,
    maxLength,
    className = '',
    labelClassName = 'text-gray-400'
}) {
    return (
        <div>
            <label className={`block text-sm mb-1 ${labelClassName}`}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors ${className}`}
                placeholder={placeholder}
                maxLength={maxLength}
                required
            />
        </div>
    );
}
