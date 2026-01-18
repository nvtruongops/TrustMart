'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Eye } from 'lucide-react'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'iPhone 13 Pro Max 256GB',
    price: 15500000,
    trustScore: 95,
    hasReview: true,
    views: 1250,
    image: '/images/product-1.jpg',
    category: 'Điện tử',
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
  },
]

export default function FeaturedProducts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="products" ref={ref} className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-xl text-slate-600">
            Được kiểm định và đánh giá cao bởi cộng đồng
          </p>
        </motion.div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group border border-slate-100"
            >
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
                
                {/* Category Tag */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 h-12 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-emerald-600">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-400 text-sm border-t border-slate-100 pt-3">
                  <Eye className="w-4 h-4" />
                  <span>{product.views.toLocaleString()} lượt xem</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a href="/products" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
            Xem tất cả sản phẩm
          </a>
        </motion.div>
      </div>
    </section>
  )
}
