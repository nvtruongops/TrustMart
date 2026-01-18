'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Eye, Heart, MapPin, Calendar, User, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'

// Mock data cho chi tiết sản phẩm
const productDetail = {
  id: 1,
  name: 'iPhone 13 Pro Max 256GB',
  price: 15500000,
  originalPrice: 28000000,
  trustScore: 95,
  hasReview: true,
  views: 1250,
  images: [
    '/images/product-1.jpg',
    '/images/product-2.jpg',
    '/images/product-3.jpg',
  ],
  category: 'Điện tử',
  condition: 'Như mới',
  seller: {
    name: 'Nguyễn Văn A',
    rating: 4.8,
    totalSales: 45,
    joinedDate: '2023-05-15',
  },
  description: 'iPhone 13 Pro Max 256GB màu xanh Sierra, máy đẹp như mới, không trầy xước. Pin 95%, full box, phụ kiện đầy đủ. Đã qua kiểm định chuyên gia.',
  specifications: {
    'Dung lượng': '256GB',
    'Màu sắc': 'Xanh Sierra',
    'Tình trạng pin': '95%',
    'Phụ kiện': 'Full box, sạc, cáp',
    'Bảo hành': 'Còn 6 tháng',
  },
  location: 'Quận 1, TP.HCM',
  postedDate: '2025-01-10',
  aiVerification: {
    score: 95,
    checks: [
      { name: 'Xác thực hình ảnh', passed: true },
      { name: 'Phát hiện khuyết điểm', passed: true },
      { name: 'Xác minh biên lai', passed: true },
      { name: 'Kiểm tra giá thị trường', passed: true },
    ]
  },
  reviewerReport: {
    reviewer: 'Chuyên gia Điện tử - Trần Văn B',
    date: '2025-01-12',
    summary: 'Sản phẩm đúng mô tả, tình trạng tốt, không có dấu hiệu sửa chữa hay thay thế linh kiện.',
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleBuyClick = () => {
    // Hiển thị prompt yêu cầu đăng nhập
    setShowLoginPrompt(true)
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href="/products" className="inline-flex items-center gap-2 text-brand-green hover:text-brand-orange mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại danh sách</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Images */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl mb-4"
              >
                <Image
                  src={productDetail.images[selectedImage]}
                  alt={productDetail.name}
                  fill
                  className="object-cover"
                />
                
                {/* Trust Badge */}
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {productDetail.trustScore}/100
                </div>
                
                {productDetail.hasReview && (
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                    <ShieldCheck className="w-4 h-4" />
                    Đã kiểm định
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-4">
                {productDetail.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden ${
                      selectedImage === idx ? 'ring-4 ring-brand-orange' : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-sm text-brand-green/60 mb-2">{productDetail.category}</div>
                <h1 className="text-4xl font-bold text-brand-green mb-4">{productDetail.name}</h1>
                
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-bold text-emerald-600">
                    {productDetail.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-xl text-slate-400 line-through">
                    {productDetail.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -45%
                  </span>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">{productDetail.description}</p>

                {/* Specifications */}
                <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                  <h3 className="font-bold text-brand-green mb-4">Thông số kỹ thuật</h3>
                  <div className="space-y-3">
                    {Object.entries(productDetail.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-600">{key}:</span>
                        <span className="font-medium text-brand-green">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seller Info */}
                <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                  <h3 className="font-bold text-brand-green mb-4">Thông tin người bán</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold">
                      {productDetail.seller.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-green">{productDetail.seller.name}</div>
                      <div className="text-sm text-slate-500">⭐ {productDetail.seller.rating} • {productDetail.seller.totalSales} giao dịch</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    {productDetail.location}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBuyClick}
                    className="flex-1 bg-brand-orange text-white py-4 rounded-full font-bold text-lg hover:bg-brand-orange/90 transition-all shadow-lg"
                  >
                    Mua ngay
                  </button>
                  <button className="bg-white border-2 border-brand-orange text-brand-orange p-4 rounded-full hover:bg-brand-cream transition-all">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Login Prompt */}
                {showLoginPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4"
                  >
                    <p className="text-yellow-800 mb-3">Vui lòng đăng nhập để mua sản phẩm</p>
                    <div className="flex gap-3">
                      <Link href="/login" className="flex-1 bg-brand-green text-white py-2 rounded-full font-bold text-center hover:bg-brand-green/90 transition-all">
                        Đăng nhập
                      </Link>
                      <Link href="/register" className="flex-1 bg-white border-2 border-brand-green text-brand-green py-2 rounded-full font-bold text-center hover:bg-brand-cream transition-all">
                        Đăng ký
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* AI Verification & Reviewer Report */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* AI Verification */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-brand-green mb-6">Xác thực AI</h3>
              <div className="space-y-4">
                {productDetail.aiVerification.checks.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      check.passed ? 'bg-emerald-500' : 'bg-red-500'
                    }`}>
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-slate-700">{check.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviewer Report */}
            {productDetail.hasReview && (
              <div className="bg-purple-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-brand-green mb-6">Báo cáo Chuyên gia</h3>
                <div className="mb-4">
                  <div className="font-semibold text-purple-700">{productDetail.reviewerReport.reviewer}</div>
                  <div className="text-sm text-slate-500">{productDetail.reviewerReport.date}</div>
                </div>
                <p className="text-slate-700 leading-relaxed">{productDetail.reviewerReport.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
