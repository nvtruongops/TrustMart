'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Search, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-8 shadow-xl border border-white/50 w-full max-w-5xl justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-orange"></div>
          <span className="font-display font-bold text-xl text-brand-green tracking-tight">
            Second<span className="text-brand-orange">Life</span>.
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {['Electronics', 'Fashion', 'Luxury', 'About Us'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm font-medium text-brand-green/80 hover:text-brand-orange transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-brand-cream rounded-full transition-colors">
            <Search className="w-5 h-5 text-brand-green" />
          </button>
          <button className="p-2 hover:bg-brand-cream rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5 text-brand-green" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-orange rounded-full border-2 border-white"></span>
          </button>
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
