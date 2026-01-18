'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { ShoppingBag, Store, ShieldCheck, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
    const { register, loginWithGoogle } = useAuth()
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+84',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validation
        if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
            setError('Vui lòng điền đầy đủ thông tin')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp')
            return
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự')
            return
        }

        const fullName = `${formData.firstName} ${formData.lastName}`
        // Note: passing phone/username to backend would require updating auth context signature
        const success = register(formData.email, formData.password, fullName)

        if (!success) {
            setError('Đăng ký thất bại. Email có thể đã được sử dụng.')
        }
    }

    const handleGoogleRegister = () => {
        loginWithGoogle()
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-cream">

            {/* Right: Feature Image */}
            <div className="hidden lg:block relative overflow-hidden order-2">
                {/* Background Image - Optimized for text readability */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/register_feature.png')",
                        imageRendering: '-webkit-optimize-contrast'
                    }}
                ></div>

                {/* Subtle overlay for text contrast - lighter to show image better */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <h2 className="text-5xl font-display font-bold text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                            Bắt đầu Hành trình.
                        </h2>
                        <p className="text-xl text-white max-w-md mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
                            Tham gia cộng đồng mua bán đồ cũ cao cấp được xác thực bởi AI và chuyên gia.
                        </p>

                        {/* Feature badges */}
                        <div className="flex flex-wrap gap-3">
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4 text-white" />
                                <span className="text-white text-sm font-medium">Mua sắm</span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
                                <Store className="w-4 h-4 text-white" />
                                <span className="text-white text-sm font-medium">Bán hàng</span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-white" />
                                <span className="text-white text-sm font-medium">Kiểm định</span>
                            </div>
                        </div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex gap-8 text-white"
                        >
                            <div>
                                <div className="text-2xl font-bold">50k+</div>
                                <div className="text-sm text-white/70">Người dùng</div>
                            </div>
                            <div className="w-px bg-white/30"></div>
                            <div>
                                <div className="text-2xl font-bold">100%</div>
                                <div className="text-sm text-white/70">Xác thực</div>
                            </div>
                            <div className="w-px bg-white/30"></div>
                            <div>
                                <div className="text-2xl font-bold">24/7</div>
                                <div className="text-sm text-white/70">Hỗ trợ</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Left: Register Form */}
            <div className="flex items-center justify-center p-4 lg:p-8 order-1 h-screen overflow-y-auto">
                <div className="w-full max-w-md space-y-6">

                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block text-2xl font-display font-bold text-brand-orange mb-4">
                            TrustMart.
                        </Link>
                        <h1 className="text-3xl font-display font-bold text-brand-green mb-1">Tạo Tài khoản</h1>
                        <p className="text-brand-green/60 text-sm">Đăng ký để bắt đầu mua, bán hoặc kiểm định sản phẩm.</p>
                    </div>

                    {/* Google Register */}
                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Đăng ký với Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-xs"><span className="px-2 bg-brand-cream text-gray-500">Hoặc đăng ký với email</span></div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2 text-sm"
                        >
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-xs font-medium text-brand-green mb-1.5">Username</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-sm"
                                placeholder="nguyenvana_123"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-brand-green mb-1.5">Họ</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-sm"
                                    placeholder="Nguyễn"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-brand-green mb-1.5">Tên</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-sm"
                                    placeholder="Văn A"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-brand-green mb-1.5">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-sm"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-brand-green mb-1.5">Số điện thoại</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-sm"
                                placeholder="0912 345 678"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-brand-green mb-1.5">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-brand-green mb-1.5">Xác nhận</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-brand-green/90 transition-transform active:scale-[0.98]">
                            Tạo tài khoản
                        </button>
                    </form>

                    <p className="text-center text-brand-green/70">
                        Đã có tài khoản? <Link href="/login" className="font-bold text-brand-orange hover:underline">Đăng nhập</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}
