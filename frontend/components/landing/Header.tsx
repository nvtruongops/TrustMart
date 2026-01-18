'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, X, Grid3x3, Laptop, Shirt, BookOpen, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
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

  const categories = [
    {
      name: 'Tất cả',
      href: '/products',
      Icon: Grid3x3,
      subcategories: []
    },
    {
      name: 'Điện tử',
      href: '/products?category=electronics',
      Icon: Laptop,
      subcategories: [
        { name: 'Điện thoại', href: '/products?category=phone' },
        { name: 'Laptop', href: '/products?category=laptop' },
        { name: 'Máy tính bảng', href: '/products?category=tablet' },
        { name: 'Tai nghe', href: '/products?category=headphone' },
        { name: 'Đồng hồ thông minh', href: '/products?category=smartwatch' },
      ]
    },
    {
      name: 'Thời trang',
      href: '/products?category=fashion',
      Icon: Shirt,
      subcategories: [
        { name: 'Quần áo', href: '/products?category=clothing' },
        { name: 'Giày dép', href: '/products?category=shoes' },
        { name: 'Túi xách', href: '/products?category=bags' },
        { name: 'Phụ kiện', href: '/products?category=accessories' },
      ]
    },
    {
      name: 'Góc Sinh Viên',
      href: '/products?category=student',
      Icon: BookOpen,
      subcategories: [
        { name: 'Sách giáo trình', href: '/products?category=textbook' },
        { name: 'Truyện', href: '/products?category=novel' },
        { name: 'Văn phòng phẩm', href: '/products?category=stationery' },
        { name: 'Đồ dùng học tập', href: '/products?category=study-tools' },
      ]
    },
  ]

  const handleMouseEnter = (categoryName: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    const timeout = setTimeout(() => {
      setHoveredCategory(categoryName)
    }, 200) // 200ms delay
    setHoverTimeout(timeout)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    // Delay trước khi đóng để user có thể di chuột vào dropdown
    const timeout = setTimeout(() => {
      setHoveredCategory(null)
    }, 300)
    setHoverTimeout(timeout)
  }

  const handleDropdownEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
  }

  const handleDropdownLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    const timeout = setTimeout(() => {
      setHoveredCategory(null)
    }, 100)
    setHoverTimeout(timeout)
  }

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-4 flex items-center gap-8 shadow-xl border border-white/50 w-full max-w-6xl justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 overflow-hidden">
            <Image
              src="/logo-shield.png"
              alt="TrustMart Logo"
              fill
              className="object-contain scale-200"
            />
          </div>
          <span className="font-display font-bold text-3xl text-brand-green tracking-tight">
            Trust<span className="text-brand-orange">Mart</span>.
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <AnimatePresence mode="wait">
          {!isSearchOpen ? (
            <motion.nav
              key="nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden md:flex items-center gap-6 flex-1 justify-center relative"
            >
              {categories.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-brand-green/80 hover:text-brand-orange transition-colors whitespace-nowrap flex items-center gap-1"
                  >
                    {item.name}
                    {item.subcategories.length > 0 && (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hoveredCategory === item.name && item.subcategories.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[200px] z-50"
                      >
                        {item.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-brand-green/80 hover:bg-brand-cream hover:text-brand-orange transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.nav>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="hidden md:flex items-center gap-4 flex-1 justify-center"
            >
              {/* Category Icons */}
              <div className="flex items-center gap-2">
                {categories.map((item) => {
                  const Icon = item.Icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-cream transition-colors group"
                      title={item.name}
                    >
                      <Icon className="w-5 h-5 text-brand-green/70 group-hover:text-brand-orange transition-colors" />
                    </Link>
                  )
                })}
              </div>

              {/* Search Input */}
              <div className="flex-1 max-w-md relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-brand-orange bg-white/90"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-brand-cream rounded-full transition-colors"
          >
            {isSearchOpen ? (
              <X className="w-5 h-5 text-brand-green" />
            ) : (
              <Search className="w-5 h-5 text-brand-green" />
            )}
          </button>

          {/* Notification Button */}
          <div
            className="relative"
            onMouseEnter={handleNotificationMouseEnter}
            onMouseLeave={handleNotificationMouseLeave}
          >
            <button
              onClick={handleNotificationClick}
              className="p-2 hover:bg-brand-cream rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5 text-brand-green" />
              {isLoggedIn && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-orange rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Notification Panel */}
            <AnimatePresence>
              {showNotificationPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseEnter={handlePromptMouseEnter}
                  onMouseLeave={handlePromptMouseLeave}
                  className="absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[380px] z-50 overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-brand-green text-lg">Thông báo</h3>
                  </div>

                  {/* Content */}
                  {!isLoggedIn ? (
                    // Login prompt
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-8 h-8 text-brand-orange" />
                      </div>
                      <h4 className="font-semibold text-brand-green mb-2">Đăng nhập để nhận thông báo</h4>
                      <p className="text-sm text-gray-600">Cập nhật đơn hàng, tin nhắn và nhiều hơn nữa</p>
                    </div>
                  ) : (
                    // Notifications list
                    <div className="max-h-[400px] overflow-y-auto">
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

                  {/* Footer - Only show when logged in */}
                  {isLoggedIn && (
                    <div className="px-5 py-3 border-t border-gray-100 text-center">
                      <button className="text-sm text-brand-orange font-semibold hover:text-brand-orange/80 transition-colors">
                        Xem tất cả thông báo
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
