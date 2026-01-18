'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, MapPin, Star } from 'lucide-react'
import Image from 'next/image'

const reviewers = [
  {
    name: 'Nguyễn Văn A',
    specialty: 'Chuyên gia Điện tử',
    rating: 4.9,
    reviews: 250,
    location: 'Hà Nội',
    avatar: '/images/reviewer-1.jpg',
  },
  {
    name: 'Trần Thị B',
    specialty: 'Chuyên gia Thời trang',
    rating: 5.0,
    reviews: 180,
    location: 'TP.HCM',
    avatar: '/images/reviewer-2.jpg',
  },
  {
    name: 'Lê Văn C',
    specialty: 'Chuyên gia Đồ xa xỉ',
    rating: 4.8,
    reviews: 320,
    location: 'Đà Nẵng',
    avatar: '/images/reviewer-3.jpg',
  },
]

export default function ReviewerNetwork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="reviewers" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-semibold">Mạng lưới Chuyên gia</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Được Kiểm Định Bởi<br />
            Chuyên Gia Hàng Đầu
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Hơn 200 chuyên gia được xác minh, sẵn sàng kiểm định 
            sản phẩm của bạn với độ chính xác cao nhất
          </p>
        </motion.div>
        
        {/* Reviewer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviewers.map((reviewer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer group border border-slate-100"
            >
              {/* Avatar */}
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-purple-100 group-hover:ring-purple-300 transition-all">
                <Image
                  src={reviewer.avatar}
                  alt={reviewer.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Info */}
              <h3 className="text-xl font-bold text-slate-900 text-center mb-1">
                {reviewer.name}
              </h3>
              <p className="text-purple-600 text-center mb-4 font-medium">
                {reviewer.specialty}
              </p>
              
              {/* Stats */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-slate-900">{reviewer.rating}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">{reviewer.reviews} đánh giá</span>
              </div>
              
              {/* Location */}
              <div className="flex items-center justify-center gap-2 text-slate-500 border-t border-slate-100 pt-4">
                <MapPin className="w-4 h-4" />
                <span>{reviewer.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="text-purple-600 font-bold hover:text-purple-700 transition-colors text-lg flex items-center gap-2 mx-auto">
            Xem tất cả chuyên gia <span className="text-2xl">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
