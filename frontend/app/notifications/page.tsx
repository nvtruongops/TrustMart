'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Bell,
    Package,
    MessageSquare,
    Star,
    Gift,
    ShieldCheck,
    Check,
    CheckCheck,
    Trash2,
    Filter,
    ChevronDown,
    Clock,
    X
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/landing/Header'

// Notification types
type NotificationType = 'order' | 'message' | 'review' | 'promo' | 'system'

interface Notification {
    id: number
    type: NotificationType
    title: string
    message: string
    time: string
    timestamp: Date
    unread: boolean
    link?: string
    image?: string
}

// Mock notifications data
const mockNotifications: Notification[] = [
    {
        id: 1,
        type: 'order',
        title: 'Đơn hàng đã được xác nhận',
        message: 'Đơn hàng #12345 của bạn đã được người bán xác nhận và đang được chuẩn bị giao hàng.',
        time: '5 phút trước',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        unread: true,
        link: '/orders/12345'
    },
    {
        id: 2,
        type: 'message',
        title: 'Tin nhắn mới từ Tech Store HN',
        message: 'Chào bạn, sản phẩm iPhone 14 Pro Max bạn quan tâm hiện đang còn hàng và có thể giao ngay trong ngày.',
        time: '30 phút trước',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        unread: true,
        link: '/messages/1'
    },
    {
        id: 3,
        type: 'promo',
        title: 'Ưu đãi đặc biệt cho bạn!',
        message: 'Giảm 15% cho đơn hàng tiếp theo. Mã: TRUST15. Áp dụng đến hết 31/01.',
        time: '1 giờ trước',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        unread: true,
    },
    {
        id: 4,
        type: 'review',
        title: 'Đánh giá sản phẩm đã mua',
        message: 'Bạn đã nhận được MacBook Pro M1. Hãy chia sẻ trải nghiệm của bạn để giúp người mua khác!',
        time: '2 giờ trước',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unread: false,
        link: '/orders/12344/review'
    },
    {
        id: 5,
        type: 'system',
        title: 'Xác minh tài khoản thành công',
        message: 'Tài khoản của bạn đã được xác minh. Bạn có thể đăng bán sản phẩm ngay bây giờ.',
        time: '3 giờ trước',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        unread: false,
    },
    {
        id: 6,
        type: 'order',
        title: 'Đơn hàng đang được giao',
        message: 'Đơn hàng #12340 đang trên đường giao đến bạn. Dự kiến nhận hàng trong hôm nay.',
        time: '5 giờ trước',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        unread: false,
        link: '/orders/12340'
    },
    {
        id: 7,
        type: 'message',
        title: 'Phản hồi từ người bán',
        message: 'Fashion Hub đã trả lời câu hỏi của bạn về sản phẩm Nike Air Jordan 1.',
        time: '1 ngày trước',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        unread: false,
        link: '/messages/2'
    },
    {
        id: 8,
        type: 'promo',
        title: 'Flash Sale cuối tuần',
        message: 'Giảm đến 50% cho các sản phẩm điện tử. Chỉ trong 2 ngày!',
        time: '2 ngày trước',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        unread: false,
        link: '/products?sale=true'
    },
    {
        id: 9,
        type: 'review',
        title: 'Sản phẩm của bạn được đánh giá',
        message: 'Người mua đã đánh giá 5 sao cho sản phẩm "iPhone 13 Pro Max" của bạn.',
        time: '3 ngày trước',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        unread: false,
        link: '/seller/reviews'
    },
    {
        id: 10,
        type: 'system',
        title: 'Cập nhật chính sách',
        message: 'TrustMart đã cập nhật chính sách bảo vệ người mua. Xem chi tiết.',
        time: '1 tuần trước',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        unread: false,
        link: '/policies'
    },
]

// Icon mapping for notification types
const typeIcons: Record<NotificationType, typeof Bell> = {
    order: Package,
    message: MessageSquare,
    review: Star,
    promo: Gift,
    system: ShieldCheck,
}

const typeColors: Record<NotificationType, string> = {
    order: 'bg-emerald-500',
    message: 'bg-blue-500',
    review: 'bg-yellow-500',
    promo: 'bg-brand-orange',
    system: 'bg-purple-500',
}

const typeLabels: Record<NotificationType, string> = {
    order: 'Đơn hàng',
    message: 'Tin nhắn',
    review: 'Đánh giá',
    promo: 'Khuyến mãi',
    system: 'Hệ thống',
}

type FilterType = 'all' | NotificationType

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications)
    const [filterType, setFilterType] = useState<FilterType>('all')
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const [selectedNotifications, setSelectedNotifications] = useState<Set<number>>(new Set())
    const [isSelectMode, setIsSelectMode] = useState(false)

    // Filter notifications
    const filteredNotifications = useMemo(() => {
        if (filterType === 'all') return notifications
        return notifications.filter(n => n.type === filterType)
    }, [notifications, filterType])

    // Group notifications by date
    const groupedNotifications = useMemo(() => {
        const groups: { label: string; notifications: Notification[] }[] = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const thisWeek = new Date(today)
        thisWeek.setDate(thisWeek.getDate() - 7)

        const todayNotifs = filteredNotifications.filter(n => n.timestamp >= today)
        const yesterdayNotifs = filteredNotifications.filter(n => n.timestamp >= yesterday && n.timestamp < today)
        const thisWeekNotifs = filteredNotifications.filter(n => n.timestamp >= thisWeek && n.timestamp < yesterday)
        const olderNotifs = filteredNotifications.filter(n => n.timestamp < thisWeek)

        if (todayNotifs.length) groups.push({ label: 'Hôm nay', notifications: todayNotifs })
        if (yesterdayNotifs.length) groups.push({ label: 'Hôm qua', notifications: yesterdayNotifs })
        if (thisWeekNotifs.length) groups.push({ label: 'Tuần này', notifications: thisWeekNotifs })
        if (olderNotifs.length) groups.push({ label: 'Trước đó', notifications: olderNotifs })

        return groups
    }, [filteredNotifications])

    const unreadCount = notifications.filter(n => n.unread).length

    const markAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n))
    }

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
    }

    const deleteNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
        setSelectedNotifications(prev => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
    }

    const deleteSelected = () => {
        setNotifications(prev => prev.filter(n => !selectedNotifications.has(n.id)))
        setSelectedNotifications(new Set())
        setIsSelectMode(false)
    }

    const toggleSelect = (id: number) => {
        setSelectedNotifications(prev => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    const selectAll = () => {
        if (selectedNotifications.size === filteredNotifications.length) {
            setSelectedNotifications(new Set())
        } else {
            setSelectedNotifications(new Set(filteredNotifications.map(n => n.id)))
        }
    }

    return (
        <main className="min-h-screen bg-brand-cream">
            <Header />

            <div className="pt-28 pb-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-2">
                                    Thông báo
                                </h1>
                                <p className="text-slate-500">
                                    {unreadCount > 0 ? `Bạn có ${unreadCount} thông báo chưa đọc` : 'Tất cả thông báo đã được đọc'}
                                </p>
                            </div>

                            {/* Notification Bell Icon */}
                            <div className="relative">
                                <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center">
                                    <Bell className="w-8 h-8 text-brand-green" />
                                </div>
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 mb-6"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {/* Filter Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-brand-green transition-all"
                                    >
                                        <Filter className="w-4 h-4" />
                                        <span>{filterType === 'all' ? 'Tất cả' : typeLabels[filterType]}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showFilterDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 min-w-[160px]"
                                            >
                                                <button
                                                    onClick={() => { setFilterType('all'); setShowFilterDropdown(false) }}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-2 ${filterType === 'all' ? 'bg-brand-green/10 text-brand-green font-medium' : 'text-slate-600 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <Bell className="w-4 h-4" />
                                                    Tất cả
                                                </button>
                                                {Object.entries(typeLabels).map(([type, label]) => {
                                                    const Icon = typeIcons[type as NotificationType]
                                                    return (
                                                        <button
                                                            key={type}
                                                            onClick={() => { setFilterType(type as NotificationType); setShowFilterDropdown(false) }}
                                                            className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-2 ${filterType === type ? 'bg-brand-green/10 text-brand-green font-medium' : 'text-slate-600 hover:bg-slate-50'
                                                                }`}
                                                        >
                                                            <Icon className="w-4 h-4" />
                                                            {label}
                                                        </button>
                                                    )
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Select Mode Toggle */}
                                <button
                                    onClick={() => {
                                        setIsSelectMode(!isSelectMode)
                                        setSelectedNotifications(new Set())
                                    }}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isSelectMode
                                            ? 'bg-slate-800 text-white'
                                            : 'border border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    {isSelectMode ? 'Hủy chọn' : 'Chọn nhiều'}
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                {isSelectMode && selectedNotifications.size > 0 && (
                                    <button
                                        onClick={deleteSelected}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Xóa ({selectedNotifications.size})
                                    </button>
                                )}

                                {isSelectMode && (
                                    <button
                                        onClick={selectAll}
                                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-300 transition-all"
                                    >
                                        {selectedNotifications.size === filteredNotifications.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                                    </button>
                                )}

                                {!isSelectMode && unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-green text-white text-sm font-medium hover:bg-brand-green/90 transition-all"
                                    >
                                        <CheckCheck className="w-4 h-4" />
                                        Đánh dấu đã đọc tất cả
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Notifications List */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {groupedNotifications.length > 0 ? (
                            groupedNotifications.map((group, groupIndex) => (
                                <div key={group.label}>
                                    {/* Group Label */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm font-medium text-slate-500">{group.label}</span>
                                        <div className="flex-1 h-px bg-slate-200" />
                                    </div>

                                    {/* Notifications */}
                                    <div className="space-y-3">
                                        {group.notifications.map((notification, index) => {
                                            const Icon = typeIcons[notification.type]
                                            const colorClass = typeColors[notification.type]
                                            const isSelected = selectedNotifications.has(notification.id)

                                            const content = (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: groupIndex * 0.1 + index * 0.03 }}
                                                    className={`bg-white rounded-2xl shadow-sm border transition-all group ${notification.unread
                                                            ? 'border-brand-orange/30 bg-brand-orange/5'
                                                            : 'border-slate-100 hover:border-slate-200'
                                                        } ${isSelected ? 'ring-2 ring-brand-green border-brand-green' : ''}`}
                                                >
                                                    <div className="p-4 flex gap-4">
                                                        {/* Select Checkbox */}
                                                        {isSelectMode && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                    toggleSelect(notification.id)
                                                                }}
                                                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${isSelected
                                                                        ? 'bg-brand-green border-brand-green'
                                                                        : 'border-slate-300 hover:border-brand-green'
                                                                    }`}
                                                            >
                                                                {isSelected && <Check className="w-4 h-4 text-white" />}
                                                            </button>
                                                        )}

                                                        {/* Icon */}
                                                        <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center shrink-0`}>
                                                            <Icon className="w-6 h-6 text-white" />
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div>
                                                                    <h3 className={`font-semibold mb-1 ${notification.unread ? 'text-brand-green' : 'text-slate-800'}`}>
                                                                        {notification.title}
                                                                    </h3>
                                                                    <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                                                                        {notification.message}
                                                                    </p>
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-xs text-slate-400">{notification.time}</span>
                                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass} bg-opacity-10 text-opacity-100`} style={{ color: colorClass.replace('bg-', '').includes('brand') ? '#D97706' : undefined }}>
                                                                            {typeLabels[notification.type]}
                                                                        </span>
                                                                        {notification.unread && (
                                                                            <span className="w-2 h-2 bg-brand-orange rounded-full" />
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Actions */}
                                                                {!isSelectMode && (
                                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        {notification.unread && (
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.preventDefault()
                                                                                    e.stopPropagation()
                                                                                    markAsRead(notification.id)
                                                                                }}
                                                                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-brand-green transition-colors"
                                                                                title="Đánh dấu đã đọc"
                                                                            >
                                                                                <Check className="w-4 h-4" />
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault()
                                                                                e.stopPropagation()
                                                                                deleteNotification(notification.id)
                                                                            }}
                                                                            className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                                                                            title="Xóa thông báo"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )

                                            if (notification.link && !isSelectMode) {
                                                return (
                                                    <Link key={notification.id} href={notification.link} onClick={() => markAsRead(notification.id)}>
                                                        {content}
                                                    </Link>
                                                )
                                            }

                                            return <div key={notification.id} onClick={() => isSelectMode && toggleSelect(notification.id)} className="cursor-pointer">{content}</div>
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100"
                            >
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bell className="w-10 h-10 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-700 mb-2">Không có thông báo</h3>
                                <p className="text-slate-500">
                                    {filterType === 'all'
                                        ? 'Bạn chưa có thông báo nào'
                                        : `Không có thông báo ${typeLabels[filterType].toLowerCase()} nào`
                                    }
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Bottom padding for mobile */}
                    <div className="h-20" />
                </div>
            </div>
        </main>
    )
}
