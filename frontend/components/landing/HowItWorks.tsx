'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Camera, Shield, Truck } from 'lucide-react'
import BackgroundShapes from '@/components/landing/BackgroundShapes'

const steps = [
  {
    icon: Camera,
    title: 'Đăng bán với AI',
    description: 'Upload ảnh, AI tự động phân tích chất lượng, phát hiện lỗi và đề xuất giá bán phù hợp nhất.',
    color: 'blue',
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Chuyên gia Kiểm định',
    description: 'Reviewer chuyên nghiệp xác minh tình trạng thực tế và cấp chứng nhận bảo hành cho sản phẩm.',
    color: 'purple',
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
  {
    icon: Truck,
    title: 'Giao dịch An toàn',
    description: 'Tiền được giữ an toàn trong ví Escrow và chỉ được giải ngân khi người mua xác nhận hài lòng.',
    color: 'emerald',
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="how-it-works" ref={ref} className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <BackgroundShapes />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Cách Hoạt Động
          </h2>
          <p className="text-xl text-slate-600">
            Chỉ 3 bước đơn giản để mua bán an toàn tuyệt đối
          </p>
        </motion.div>
        
        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-1 bg-slate-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Step Number */}
                  <div className="relative z-10 w-12 h-12 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-emerald-600 mb-6 shadow-sm">
                    {index + 1}
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center w-full h-full border border-slate-100 group">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${step.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}