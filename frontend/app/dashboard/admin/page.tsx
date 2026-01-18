'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Users, ShoppingBag, ShieldCheck, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react'

export default function AdminDashboard() {
    const { user, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    if (!user) return null

    const stats = [
        { label: 'Tổng người dùng', value: '1,234', icon: Users, color: 'bg-purple-500', change: '+45 tuần này' },
        { label: 'Đơn hàng', value: '567', icon: ShoppingBag, color: 'bg-blue-500', change: '+23 hôm nay' },
        { label: 'Chuyên gia', value: '45', icon: ShieldCheck, color: 'bg-green-500', change: '3 chờ duyệt' },
        { label: 'Doanh thu', value: '2.5B', icon: TrendingUp, color: 'bg-orange-500', change: '+12% tháng này' },
    ]

    const financeInfo = {
        reserve_fund: '125.000.000',
        escrow_total: '85.500.000',
        revenue: '42.300.000',
        pending_disputes: '5'
    }

    return (
        <div className="min-h-screen bg-brand-cream">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-display font-bold text-brand-green">
                                Dashboard - Quản trị viên
                            </h1>
                            <p className="text-sm text-gray-600">Quản lý toàn bộ hệ thống TrustMart</p>
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
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
                    <h2 className="text-3xl font-bold mb-2">Xin chào, Admin {user.name}!</h2>
                    <p className="text-purple-100">Quản lý toàn bộ hệ thống TrustMart</p>
                </div>

                {/* FinOps Center */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-brand-green">FinOps Center</h3>
                        <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors text-sm">
                            Xem chi tiết
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <p className="text-sm text-gray-600">Reserve Fund</p>
                            </div>
                            <p className="text-2xl font-bold text-green-600">{financeInfo.reserve_fund}đ</p>
                            <p className="text-xs text-green-700 mt-1">Healthy</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="w-4 h-4 text-blue-600" />
                                <p className="text-sm text-gray-600">Escrow Total</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-600">{financeInfo.escrow_total}đ</p>
                            <p className="text-xs text-blue-700 mt-1">42 giao dịch</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-orange-600" />
                                <p className="text-sm text-gray-600">Doanh thu tháng</p>
                            </div>
                            <p className="text-2xl font-bold text-orange-600">{financeInfo.revenue}đ</p>
                            <p className="text-xs text-orange-700 mt-1">+12% vs tháng trước</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                <p className="text-sm text-gray-600">Tranh chấp chờ</p>
                            </div>
                            <p className="text-2xl font-bold text-red-600">{financeInfo.pending_disputes}</p>
                            <p className="text-xs text-red-700 mt-1">Cần xử lý</p>
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

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Users */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-brand-green">Người dùng mới</h3>
                            <button className="text-brand-orange hover:underline text-sm font-semibold">
                                Xem tất cả
                            </button>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: 'Nguyễn Văn A', email: 'user1@example.com', time: '2h trước' },
                                { name: 'Trần Thị B', email: 'user2@example.com', time: '3h trước' },
                                { name: 'Lê Văn C', email: 'user3@example.com', time: '5h trước' },
                                { name: 'Phạm Thị D', email: 'user4@example.com', time: '6h trước' },
                            ].map((user, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-200 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold text-brand-green text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">{user.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Orders */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-brand-green">Đơn hàng gần đây</h3>
                            <button className="text-brand-orange hover:underline text-sm font-semibold">
                                Xem tất cả
                            </button>
                        </div>
                        <div className="space-y-3">
                            {[
                                { id: 3001, product: 'Túi xách Chanel', price: '25.000.000', status: 'Hoàn thành' },
                                { id: 3002, product: 'iPhone 14 Pro', price: '22.500.000', status: 'Đang giao' },
                                { id: 3003, product: 'Giày Nike Jordan', price: '4.200.000', status: 'Hoàn thành' },
                                { id: 3004, product: 'Đồng hồ Rolex', price: '180.000.000', status: 'Kiểm định' },
                            ].map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div>
                                        <p className="font-semibold text-brand-green text-sm">Đơn #{order.id}</p>
                                        <p className="text-xs text-gray-600">{order.product}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-brand-orange text-sm">{order.price}đ</p>
                                        <span className="text-xs text-green-600">{order.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
