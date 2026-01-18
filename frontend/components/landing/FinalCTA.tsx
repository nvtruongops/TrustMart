'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-white max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Sẵn Sàng Bắt Đầu?
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
            Tham gia cộng đồng hàng nghìn người đang mua bán 
            đồ cũ an toàn, minh bạch và thông minh hơn.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              className="bg-white text-emerald-600 hover:bg-slate-100 hover:text-emerald-700 px-10 py-8 text-xl rounded-full shadow-2xl group border-0"
            >
              Đăng ký Miễn phí
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-10 py-8 text-xl rounded-full"
            >
              Tìm hiểu thêm
            </Button>
          </div>
          
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-white/90 font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-full"><Check className="w-4 h-4" /></div>
              <span>Miễn phí đăng ký</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-full"><Check className="w-4 h-4" /></div>
              <span>Không cần thẻ tín dụng</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-full"><Check className="w-4 h-4" /></div>
              <span>Hủy bất cứ lúc nào</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
