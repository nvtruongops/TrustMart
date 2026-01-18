'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, ScanLine, FileCheck } from 'lucide-react'
import Image from 'next/image'

export default function AIShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">Công nghệ AI Tiên tiến</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trí Tuệ Nhân Tạo<br />
              Đánh Giá Tức Thì
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Hệ thống AI của chúng tôi phân tích hàng nghìn điểm dữ liệu 
              từ hình ảnh để đánh giá chất lượng sản phẩm chỉ trong vài giây,
              loại bỏ sự chủ quan và sai sót.
            </p>
            
            {/* Features */}
            <div className="space-y-6">
              {[
                { icon: ScanLine, text: 'Phát hiện khuyết điểm tự động (vết xước, rách)' },
                { icon: FileCheck, text: 'Xác thực biên lai & nguồn gốc bằng OCR' },
                { icon: Sparkles, text: 'Tính điểm tin cậy (Trust Score) 0-100 chuẩn xác' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-lg font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative"
          >
            <div className="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700">
              {/* Demo Image */}
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-6 bg-slate-900">
                <Image
                  src="/images/ai-demo.jpg"
                  alt="AI Analysis Demo"
                  fill
                  className="object-cover opacity-80"
                />
                
                {/* AI Overlay Annotations */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
                >
                  Trust Score: 92/100
                </motion.div>
                
                {/* Defect Detection Boxes */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-1/3 left-1/4 border-2 border-yellow-400 w-24 h-24 rounded-lg bg-yellow-400/10"
                >
                  <div className="absolute -top-8 left-0 bg-yellow-400 text-slate-900 px-2 py-1 rounded text-xs font-bold">
                    Phát hiện xước
                  </div>
                </motion.div>
                
                {/* Scanning Effect */}
                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20"
                />
              </div>
              
              {/* Analysis Results */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Chất lượng ảnh</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 md:w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '95%' }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="h-full bg-emerald-500"
                      />
                    </div>
                    <span className="text-white font-mono font-bold">95%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tình trạng vật lý</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 md:w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '88%' }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                    <span className="text-white font-mono font-bold">88%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Khớp biên lai</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 md:w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="h-full bg-purple-500"
                      />
                    </div>
                    <span className="text-white font-mono font-bold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
