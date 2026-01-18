'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ShieldCheck, Clock, CheckCircle, XCircle, DollarSign, TrendingUp } from 'lucide-react'

export default function ReviewerDashboard() {
    const { user, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    if (!user) return null

    const stats = [
        { label: 'Chờ kiểm định', value: '8', icon: Clock, color: 'bg-yellow-500', change: '+3 hôm nay' },
        { label: 'Đã xác thực', value: '156', icon: CheckCircle, color: 'bg-green-500', change: 'Tháng này: 24' },
        { label: 'Từ chối', value: '12', icon: XCircle, color: 'bg-red-500', change: 'Tỷ lệ: 7.1%' },
        { label: 'Accuracy Score', value: '94.2', icon: ShieldCheck, color: 'bg-blue-500', change: '+2.1 điểm' },
    ]

    const walletInfo = {
        compensation: '15.000.000',
        hold: '3.500.000',
        available: '11.500.000',
        pending: '2.800.000'
    }

    return (
        <div className="min-h-screen bg-brand-cream">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-display font-bold text-brand-green">
                                Dashboard - Chuyên gia kiểm định
                            </h1>
                            <p className="text-sm text-gray-600">Quản lý công việc kiểm định và thu nhập</p>
                        </div>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white mb-8">
                    <h2 className="text-3xl font-bold mb-2">Xin chào, Chuyên gia {user.name}!</h2>
                    <p className="text-green-100">Bạn có 8 sản phẩm đang chờ kiểm định</p>
                </div>

                {/* Compensation Wallet */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-brand-green">Ví bồi thường (Compensation Wallet)</h3>
                        <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors text-sm">
                            Nạp tiền
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Tổng số dư</p>
                            <p className="text-2xl font-bold text-green-600">{walletInfo.compensation}đ</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Đang giữ (Hold)</p>
                            <p className="text-2xl font-bold text-red-600">{walletInfo.hold}đ</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Khả dụng</p>
                            <p className="text-2xl font-bold text-blue-600">{walletInfo.available}đ</p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Thu nhập chờ</p>
                            <p className="text-2xl font-bold text-yellow-600">{walletInfo.pending}đ</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                        💡 Nạp thêm tiền để nâng giới hạn giá trị đơn kiểm định
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold text-brand-green">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">{stat.change}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Pending Reviews */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-brand-green">Sản phẩm chờ kiểm định</h3>
                        <button className="text-brand-orange hover:underline text-sm font-semibold">
                            Xem Gig Board
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 2001, name: 'Túi xách Gucci Marmont', value: '25.000.000', time: '2 giờ trước', warranty: '1 tháng' },
                            { id: 2002, name: 'iPhone 14 Pro Max 256GB', value: '22.500.000', time: '4 giờ trước', warranty: '7 ngày' },
                            { id: 2003, name: 'Đồng hồ Rolex Submariner', value: '180.000.000', time: '5 giờ trước', warranty: '6 tháng' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                    <div>
                                        <p className="font-semibold text-brand-green">{item.name}</p>
                                        <p className="text-sm text-gray-600">Yêu cầu #{item.id} • Gửi {item.time}</p>
                                        <p className="text-xs text-blue-600">Bảo hành: {item.warranty}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                                        Xác thực
                                    </button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                                        Từ chối
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
