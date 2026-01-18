'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ShoppingBag, Package, Heart, Clock, TrendingUp, DollarSign } from 'lucide-react'

export default function UserDashboard() {
    const { user, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    if (!user) return null

    const stats = [
        { label: 'Đơn hàng', value: '12', icon: ShoppingBag, color: 'bg-blue-500', change: '+2 tháng này' },
        { label: 'Đang giao', value: '3', icon: Package, color: 'bg-orange-500', change: 'Cập nhật 2h trước' },
        { label: 'Yêu thích', value: '24', icon: Heart, color: 'bg-red-500', change: '+5 tuần này' },
        { label: 'Chờ xử lý', value: '2', icon: Clock, color: 'bg-yellow-500', change: 'Cần xác nhận' },
    ]

    const walletInfo = {
        available: '5.250.000',
        escrow: '2.500.000',
        pending: '750.000'
    }

    return (
        <div className="min-h-screen bg-brand-cream">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-display font-bold text-brand-green">
                                Dashboard - Người dùng
                            </h1>
                            <p className="text-sm text-gray-600">Quản lý mua sắm và đơn hàng</p>
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
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white mb-8">
                    <h2 className="text-3xl font-bold mb-2">Xin chào, {user.name}!</h2>
                    <p className="text-blue-100">Chào mừng bạn quay trở lại với TrustMart</p>
                </div>

                {/* Wallet Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-brand-green">Ví điện tử</h3>
                        <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors text-sm">
                            Nạp tiền
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Số dư khả dụng</p>
                            <p className="text-2xl font-bold text-green-600">{walletInfo.available}đ</p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Đang giữ (Escrow)</p>
                            <p className="text-2xl font-bold text-yellow-600">{walletInfo.escrow}đ</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Chờ xử lý</p>
                            <p className="text-2xl font-bold text-blue-600">{walletInfo.pending}đ</p>
                        </div>
                    </div>
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

                {/* Recent Orders */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-brand-green">Đơn hàng gần đây</h3>
                        <button className="text-brand-orange hover:underline text-sm font-semibold">
                            Xem tất cả
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 1001, name: 'Túi xách Louis Vuitton', price: '15.000.000', status: 'Đã giao', statusColor: 'text-green-600' },
                            { id: 1002, name: 'iPhone 13 Pro Max', price: '18.500.000', status: 'Đang giao', statusColor: 'text-blue-600' },
                            { id: 1003, name: 'Giày Nike Air Jordan', price: '4.200.000', status: 'Đã giao', statusColor: 'text-green-600' },
                        ].map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                    <div>
                                        <p className="font-semibold text-brand-green">{order.name}</p>
                                        <p className="text-sm text-gray-600">Đơn hàng #{order.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-brand-orange">{order.price}đ</p>
                                    <p className={`text-sm ${order.statusColor}`}>{order.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
