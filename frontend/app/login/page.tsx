'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import RoleSelectionModal from '@/components/RoleSelectionModal'

export default function LoginPage() {
    const { loginWithGoogle } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [availableRoles, setAvailableRoles] = useState<('user' | 'reviewer' | 'admin')[]>([])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Mock authentication - check credentials
        const mockUsers = [
            { email: 'user1@trustmart.com', password: 'user123', roles: ['user' as const] },
            { email: 'seller@trustmart.com', password: 'seller123', roles: ['user' as const] },
            { email: 'reviewer@trustmart.com', password: 'reviewer123', roles: ['user' as const, 'reviewer' as const] },
            { email: 'admin@trustmart.com', password: 'admin123', roles: ['user' as const, 'reviewer' as const, 'admin' as const] },
        ]

        const user = mockUsers.find(u => u.email === email && u.password === password)
        
        if (user) {
            setAvailableRoles(user.roles)
            setShowRoleModal(true)
        } else {
            setError('Email hoặc mật khẩu không đúng')
        }
    }

    const handleRoleSelection = (role: 'user' | 'reviewer' | 'admin') => {
        setShowRoleModal(false)
        router.push(`/dashboard/${role}`)
    }

    const handleGoogleLogin = () => {
        loginWithGoogle()
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-cream">

            {/* Role Selection Modal */}
            <RoleSelectionModal
                isOpen={showRoleModal}
                onClose={() => setShowRoleModal(false)}
                onSelectRole={handleRoleSelection}
                availableRoles={availableRoles}
            />

            {/* Left: Login Form */}
            <div className="flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md space-y-8">

                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block text-2xl font-display font-bold text-brand-orange mb-8">
                            TrustMart.
                        </Link>
                        <h1 className="text-4xl font-display font-bold text-brand-green mb-2">Welcome Back</h1>
                        <p className="text-brand-green/60">Enter your details to access your account.</p>
                    </div>

                    {/* Google Login */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Đăng nhập với Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-brand-cream text-gray-500">Hoặc đăng nhập với email</span></div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
                        >
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-green mb-2">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors outline-none"
                                    placeholder="name@example.com"
                                />
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-brand-green">Password</label>
                                <a href="#" className="text-sm font-bold text-brand-orange hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors outline-none"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-brand-green/90 transition-transform active:scale-[0.98] flex items-center justify-center gap-2">
                            Đăng nhập <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-xs font-semibold text-blue-800 mb-2">Tài khoản Demo:</p>
                        <div className="text-xs text-blue-700 space-y-1">
                            <div>👤 User: user1@trustmart.com / user123</div>
                            <div>🛍️ Seller: seller@trustmart.com / seller123</div>
                            <div>🛡️ Reviewer: reviewer@trustmart.com / reviewer123 (User + Reviewer)</div>
                            <div>⚙️ Admin: admin@trustmart.com / admin123 (All roles)</div>
                        </div>
                    </div>

                    <p className="text-center text-brand-green/70">
                        Chưa có tài khoản? <Link href="/register" className="font-bold text-brand-orange hover:underline">Đăng ký ngay</Link>
                    </p>

                </div>
            </div>

            {/* Right: Feature Image with actual image */}
            <div className="hidden lg:block relative overflow-hidden order-2">
                {/* Background Image - Optimized for clarity */}
                <Image
                    src="/login_feature.png"
                    alt="Expert Verification Process"
                    fill
                    className="object-cover"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                    priority
                />

                {/* Subtle overlay for text contrast - lighter to show image better */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-12 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                            Trust is <br /> <span className="text-brand-yellow">In the Details.</span>
                        </h2>
                        <p className="text-lg text-white max-w-md mx-auto mb-10 font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
                            Every item is physically inspected by certified experts to ensure 100% authenticity.
                        </p>
                    </motion.div>

                    {/* Stat Card */}
                    <motion.div
                        className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl flex items-center gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center">
                            <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="text-left">
                            <div className="text-2xl font-bold text-white leading-none">99.9%</div>
                            <div className="text-xs text-brand-yellow font-medium uppercase tracking-wider">Pass Rate</div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}
