'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, ShoppingCart, Package, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {

  const [searchQuery, setSearchQuery] = useState('')
  const [cartItemCount] = useState(0) // Mock cart count
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [notificationHoverTimeout, setNotificationHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  // Mock notifications data
  const mockNotifications = [
    { id: 1, title: 'Đơn hàng đã được xác nhận', message: 'Đơn hàng #12345 đang được chuẩn bị', time: '5 phút trước', unread: true },
    { id: 2, title: 'Sản phẩm mới phù hợp với bạn', message: 'iPhone 14 Pro Max giá tốt vừa được đăng', time: '1 giờ trước', unread: true },
    { id: 3, title: 'Tin nhắn mới từ người bán', message: 'Người bán đã trả lời câu hỏi của bạn', time: '2 giờ trước', unread: false },
    { id: 4, title: 'Đánh giá sản phẩm', message: 'Hãy đánh giá sản phẩm bạn đã mua', time: '1 ngày trước', unread: false },
    { id: 5, title: 'Khuyến mãi đặc biệt', message: 'Giảm 20% cho đơn hàng tiếp theo', time: '2 ngày trước', unread: false },
  ]

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem('trustmart_user')
    setIsLoggedIn(!!user)
  }, [])

  const handleNotificationMouseEnter = () => {
    if (notificationHoverTimeout) {
      clearTimeout(notificationHoverTimeout)
    }
    setShowNotificationPrompt(true)
  }

  const handleNotificationMouseLeave = () => {
    if (notificationHoverTimeout) {
      clearTimeout(notificationHoverTimeout)
    }
    const timeout = setTimeout(() => {
      setShowNotificationPrompt(false)
    }, 200)
    setNotificationHoverTimeout(timeout)
  }

  const handlePromptMouseEnter = () => {
    if (notificationHoverTimeout) {
      clearTimeout(notificationHoverTimeout)
    }
  }

  const handlePromptMouseLeave = () => {
    if (notificationHoverTimeout) {
      clearTimeout(notificationHoverTimeout)
    }
    const timeout = setTimeout(() => {
      setShowNotificationPrompt(false)
    }, 100)
    setNotificationHoverTimeout(timeout)
  }

  const handleNotificationClick = () => {
    if (isLoggedIn) {
      setShowNotificationPrompt(!showNotificationPrompt)
    }
  }

  // Quick navigation items
  const quickNavItems = [
    { name: 'Sản phẩm', href: '/products', icon: Package },
    { name: 'Khám phá', href: '/explore', icon: MapPin },
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-4 shadow-xl border border-white/50 w-full max-w-5xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-8 h-8 overflow-hidden">
            <Image
              src="/logo-shield.png"
              alt="TrustMart Logo"
              fill
              className="object-contain scale-200"
            />
          </div>
          <span className="font-display font-bold text-2xl text-brand-green tracking-tight hidden sm:block">
            Trust<span className="text-brand-orange">Mart</span>.
          </span>
        </Link>

        {/* Quick Nav Icons - Show icon only, name on hover */}
        <div className="hidden md:flex items-center gap-1">
          {quickNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative p-2.5 rounded-full hover:bg-brand-cream transition-all"
                title={item.name}
              >
                <Icon className="w-5 h-5 text-brand-green/70 group-hover:text-brand-orange transition-colors" />
                {/* Tooltip on hover */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Search Bar - Always visible */}
        <div className="flex-1 max-w-lg relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-4 pr-10 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 bg-white/90 text-sm transition-all"
          />
          <button
            onClick={searchQuery ? handleSearch : undefined}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-brand-cream transition-colors"
          >
            {searchQuery ? (
              <Search className="w-4 h-4 text-brand-orange" />
            ) : (
              <Search className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationPrompt(!showNotificationPrompt)}
              className="group relative p-2 hover:bg-brand-cream rounded-full transition-colors"
            >
              <Bell className="w-5 h-5 text-brand-green/70 group-hover:text-brand-orange transition-colors" />
              {isLoggedIn && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-orange rounded-full border-2 border-white"></span>
              )}
              {/* Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Thông báo
              </span>
            </button>

            {/* Notification Panel - Click to toggle */}
            <AnimatePresence>
              {showNotificationPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[380px] z-50 overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-brand-green text-lg">Thông báo</h3>
                    <button
                      onClick={() => setShowNotificationPrompt(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Content */}
                  {!isLoggedIn ? (
                    // Login prompt
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-brand-orange" />
                      </div>
                      <h4 className="font-semibold text-brand-green mb-2">Đăng nhập để nhận thông báo</h4>
                      <p className="text-sm text-gray-600 mb-4">Cập nhật đơn hàng, tin nhắn và nhiều hơn nữa</p>
                      <Link
                        href="/login"
                        className="inline-block bg-brand-green text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-green/90 transition-colors"
                      >
                        Đăng nhập ngay
                      </Link>
                    </div>
                  ) : (
                    // Notifications list
                    <div className="max-h-[350px] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-5 py-4 border-b border-gray-50 hover:bg-brand-cream/50 transition-colors cursor-pointer ${notification.unread ? 'bg-blue-50/30' : ''
                            }`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notification.unread ? 'bg-brand-orange' : 'bg-transparent'
                              }`}></div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm mb-1 ${notification.unread ? 'font-semibold text-brand-green' : 'font-medium text-gray-700'
                                }`}>
                                {notification.title}
                              </h4>
                              <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <span className="text-xs text-gray-400">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer - View all notifications */}
                  {isLoggedIn && (
                    <div className="px-5 py-4 border-t border-gray-100 bg-slate-50/50">
                      <Link
                        href="/notifications"
                        className="block text-center text-sm text-brand-orange font-semibold hover:text-brand-orange/80 transition-colors"
                        onClick={() => setShowNotificationPrompt(false)}
                      >
                        Hiện toàn bộ thông báo →
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="group relative p-2 hover:bg-brand-cream rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-brand-green/70 group-hover:text-brand-orange transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            {/* Tooltip */}
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              Giỏ hàng
            </span>
          </Link>

          <Link href="/register" className="text-brand-green px-5 py-2 rounded-full font-bold text-sm hover:bg-brand-cream transition-colors">
            Đăng ký
          </Link>
          <Link href="/login" className="bg-brand-green text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-brand-green/90 transition-colors shadow-lg shadow-brand-green/20">
            Đăng nhập
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
