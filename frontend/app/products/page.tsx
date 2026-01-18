'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Eye, Heart, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'

// Mock data - sẽ được thay thế bằng API call
const allProducts = [
  {
    id: 1,
    name: 'iPhone 13 Pro Max 256GB',
    price: 15500000,
    trustScore: 95,
    hasReview: true,
    views: 1250,
    image: '/images/product-1.jpg',
    category: 'Điện tử',
    condition: 'Như mới',
    seller: 'Nguyễn Văn A',
  },
  {
    id: 2,
    name: 'MacBook Pro M1 2021',
    price: 28000000,
    trustScore: 92,
    hasReview: true,
    views: 890,
    image: '/images/product-2.jpg',
    category: 'Điện tử',
    condition: 'Đã sử dụng',
    seller: 'Trần Thị B',
  },
  {
    id: 3,
    name: 'Túi Gucci Marmont',
    price: 35000000,
    trustScore: 98,
    hasReview: true,
    views: 2100,
    image: '/images/product-3.jpg',
    category: 'Xa xỉ',
    condition: 'Như mới',
    seller: 'Lê Văn C',
  },
  {
    id: 4,
    name: 'Apple Watch Series 7',
    price: 7500000,
    trustScore: 88,
    hasReview: false,
    views: 650,
    image: '/images/product-4.jpg',
    category: 'Điện tử',
    condition: 'Tốt',
    seller: 'Phạm Thị D',
  },
  {
    id: 5,
    name: 'iPad Pro 12.9" M1',
    price: 18000000,
    trustScore: 93,
    hasReview: true,
    views: 1100,
    image: '/images/product-1.jpg',
    category: 'Điện tử',
    condition: 'Như mới',
    seller: 'Hoàng Văn E',
  },
  {
    id: 6,
    name: 'Louis Vuitton Neverfull',
    price: 42000000,
    trustScore: 96,
    hasReview: true,
    views: 1800,
    image: '/images/product-3.jpg',
    category: 'Xa xỉ',
    condition: 'Như mới',
    seller: 'Vũ Thị F',
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả')
  const [sortBy, setSortBy] = useState<string>('newest')

  const categories = ['Tất cả', 'Điện tử', 'Xa xỉ', 'Thời trang', 'Đồng hồ']

  const filteredProducts = selectedCategory === 'Tất cả' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory)

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
            <p className="text-xl text-brand-green/70">
              Tất cả sản phẩm đã được xác thực bởi AI và chuyên gia
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-orange text-white shadow-lg'
                      : 'bg-white text-brand-green hover:bg-brand-cream'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full border border-brand-green/20 bg-white text-brand-green font-medium"
            >
              <option value="newest">Mới nhất</option>
              <option value="price-low">Giá thấp đến cao</option>
              <option value="price-high">Giá cao đến thấp</option>
              <option value="popular">Phổ biến nhất</option>
            </select>
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
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      product.trustScore >= 90 
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

      <Footer />
    </main>
  )
}
