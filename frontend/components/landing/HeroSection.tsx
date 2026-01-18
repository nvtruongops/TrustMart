'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 -z-10" />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Content */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/30 px-4 py-2 rounded-full mb-6 border border-brand-yellow/50"
          >
            <Star className="w-4 h-4 text-brand-orange fill-brand-orange" />
            <span className="text-brand-green font-bold text-xs uppercase tracking-wider font-mono">
              Premium Secondhand
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-bold leading-[1.1] mb-8 text-brand-green"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Pre-Loved <br />
            <span className="text-brand-orange relative">
              Perfection
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-yellow -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-brand-green/70 mb-10 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover authenticated luxury treasures. AI-verified, expert-checked, and delivered with love. Join the circular revolution.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="#products" className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-orange/90 transition-transform hover:scale-105 shadow-xl shadow-brand-orange/20 flex items-center gap-2">
              Khám phá ngay <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/login" className="bg-white text-brand-green px-8 py-4 rounded-full font-bold text-lg border-2 border-brand-green/10 hover:border-brand-green hover:bg-brand-green hover:text-white transition-all">
              Đăng bán sản phẩm
            </a>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            className="mt-12 flex gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <p className="text-3xl font-bold font-display text-brand-green">50k+</p>
              <p className="text-sm font-mono text-brand-green/60">Happy Users</p>
            </div>
            <div className="w-px h-12 bg-black/10"></div>
            <div>
              <p className="text-3xl font-bold font-display text-brand-green">100%</p>
              <p className="text-sm font-mono text-brand-green/60">Verified</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Hero Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1.5 }}
        >
          <div className="relative aspect-square w-full max-w-[600px] mx-auto animate-float">
            <Image
              src="/hero-collage.png"
              alt="Premium Items Collage"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />

            {/* Floating Tags */}
            <motion.div
              className="absolute top-10 right-10 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-white/50 text-brand-green font-bold text-sm transform rotate-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1 }}
            >
              🛍️ LV Keepall
            </motion.div>

            <motion.div
              className="absolute bottom-20 left-0 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-white/50 text-brand-green font-bold text-sm transform -rotate-3"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 0 }}
            >
              ⌚ Rolex Submariner
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}