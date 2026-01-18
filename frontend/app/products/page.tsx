'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Eye, Heart, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import { mockProducts, getCategories, type Product } from '@/lib/mockProducts'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const filterDropdownRef = useRef<HTMLDivElement>(null)

  const categories = ['Tất cả', 'Điện tử', 'Xa xỉ', 'Thời trang', 'Đồng hồ']

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false)
      }
    }

    if (showFilterDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFilterDropdown])

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-low', label: 'Giá thấp đến cao' },
    { value: 'price-high', label: 'Giá cao đến thấp' },
    { value: 'popular', label: 'Phổ biến nhất' },
  ]

  const filteredProducts = useMemo(() => {
    let products = selectedCategory === 'Tất cả'
      ? [...mockProducts]
      : mockProducts.filter(p => p.category === selectedCategory)

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        products.sort((a, b) => b.views - a.views)
        break
      case 'newest':
      default:
        products.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
        break
    }

    return products
  }, [selectedCategory, sortBy])

  return (
    <main className="min-h-screen bg-brand-cream">
      <Header />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-brand-green mb-4">
              Khám phá Sản phẩm
            </h1>
          </motion.div>

          {/* Filter Section - Redesigned */}
          <div className="flex items-center justify-center mb-12">
            <div className="relative inline-block" ref={filterDropdownRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-3 px-8 py-4 bg-white rounded-full border-2 border-brand-green/20 hover:border-brand-green/40 transition-all shadow-md hover:shadow-lg"
              >
                <Filter className="w-5 h-5 text-brand-green" />
                <span className="text-brand-green font-semibold text-lg">Lọc sản phẩm:</span>
                <span className="text-brand-orange font-medium text-lg">
                  {sortOptions.find(opt => opt.value === sortBy)?.label}
                </span>
              </button>

              {/* Filter Dropdown */}
              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 min-w-[280px] z-50"
                  >
                    <div className="px-5 py-2 text-xs font-bold text-brand-green/60 uppercase tracking-wider">
                      Sắp xếp theo
                    </div>
                    <div className="px-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value)
                            setShowFilterDropdown(false)
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-base transition-all ${sortBy === option.value
                            ? 'bg-brand-orange text-white font-semibold shadow-md'
                            : 'text-brand-green/80 hover:bg-brand-cream hover:text-brand-orange font-medium'
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Product Count */}
          <div className="text-center text-sm text-gray-500 mb-8">
            Hiển thị {filteredProducts.length} sản phẩm
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group border border-slate-100"
              >
                <Link href={`/products/${product.id}`}>
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Trust Score Badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${product.trustScore >= 90
                      ? 'bg-emerald-500 text-white'
                      : 'bg-yellow-500 text-white'
                      }`}>
                      {product.trustScore}/100
                    </div>

                    {/* Expert Review Badge */}
                    {product.hasReview && (
                      <div className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <ShieldCheck className="w-3 h-3" />
                        Đã kiểm định
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-brand-orange" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="text-xs text-brand-green/60 mb-1">{product.category}</div>
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 h-12 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-emerald-600">
                        {product.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-xs text-slate-500">{product.condition}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400 text-sm border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{product.views}</span>
                      </div>
                      <span className="text-xs">{product.seller}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-green/90 transition-all shadow-lg">
              Xem thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
