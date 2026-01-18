'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { ShoppingBag, Store, ShieldCheck, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
    const { register, loginWithGoogle } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
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
            <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-brand-orange via-brand-orange/90 to-brand-green order-2">
                <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl"></div>
                
                <div className="absolute inset-0 flex items-center justify-center text-center p-20">
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl font-display font-bold text-white mb-6">
                                Bắt đầu Hành trình.
                            </h2>
                            <p className="text-xl text-white/90 max-w-md mx-auto mb-12">
                                Tham gia cộng đồng mua bán đồ cũ cao cấp được xác thực bởi AI và chuyên gia.
                            </p>
                        </motion.div>

                        {/* Visual representation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
                        >
                            {/* Buy */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingBag className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-white font-bold mb-2">Mua sắm</h3>
                                <p className="text-white/70 text-sm">Khám phá sản phẩm chất lượng</p>
                            </div>

                            {/* Sell */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Store className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-white font-bold mb-2">Bán hàng</h3>
                                <p className="text-white/70 text-sm">Đăng bán dễ dàng</p>
                            </div>

                            {/* Review */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-white font-bold mb-2">Kiểm định</h3>
                                <p className="text-white/70 text-sm">Đăng ký làm chuyên gia</p>
                            </div>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 flex justify-center gap-8 text-white/80"
                        >
                            <div>
                                <div className="text-3xl font-bold">50k+</div>
                                <div className="text-sm">Người dùng</div>
                            </div>
                            <div className="w-px bg-white/30"></div>
                            <div>
                                <div className="text-3xl font-bold">100%</div>
                                <div className="text-sm">Xác thực</div>
                            </div>
                            <div className="w-px bg-white/30"></div>
                            <div>
                                <div className="text-3xl font-bold">24/7</div>
                                <div className="text-sm">Hỗ trợ</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Left: Register Form */}
            <div className="flex items-center justify-center p-8 lg:p-16 order-1">
                <div className="w-full max-w-md space-y-8">

                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block text-2xl font-display font-bold text-brand-orange mb-8">
                            SecondLife.
                        </Link>
                        <h1 className="text-4xl font-display font-bold text-brand-green mb-2">Tạo Tài khoản</h1>
                        <p className="text-brand-green/60">Đăng ký để bắt đầu mua, bán hoặc kiểm định sản phẩm.</p>
                    </div>

                    {/* Google Register */}
                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Đăng ký với Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-brand-cream text-gray-500">Hoặc đăng ký với email</span></div>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-green mb-2">Họ</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                                    placeholder="Nguyễn"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-green mb-2">Tên</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                                    placeholder="Văn A"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-green mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-green mb-2">Mật khẩu</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-green mb-2">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs text-blue-800">
                                💡 Sau khi đăng ký, bạn có thể mua sắm ngay lập tức. Để bán hàng hoặc trở thành chuyên gia kiểm định, vui lòng hoàn tất thêm thông tin trong tài khoản.
                            </p>
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
