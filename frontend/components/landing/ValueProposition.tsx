'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, X } from 'lucide-react'

const comparison = [
  {
    feature: 'Xác thực AI tự động',
    us: true,
    others: false,
  },
  {
    feature: 'Chuyên gia kiểm định',
    us: true,
    others: false,
  },
  {
    feature: 'Bảo hành sản phẩm',
    us: true,
    others: false,
  },
  {
    feature: 'Escrow bảo vệ tiền',
    us: true,
    others: 'Một số',
  },
  {
    feature: 'Giải quyết tranh chấp',
    us: 'Tự động + Thủ công',
    others: 'Chỉ thủ công',
  },
  {
    feature: 'Phí giao dịch',
    us: '3%',
    others: '5-10%',
  },
]

export default function ValueProposition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="pricing" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <p className="text-xl text-slate-600">
            So sánh với các nền tảng mua bán đồ cũ khác
          </p>
        </motion.div>
        
        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
        >
          <div className="grid grid-cols-3 bg-slate-900 text-white p-6">
            <div className="text-slate-400 font-medium flex items-center">Tính năng</div>
            <div className="text-center font-bold text-emerald-400 text-lg">SecondLife</div>
            <div className="text-center text-slate-400">Nền tảng khác</div>
          </div>
          
          {comparison.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className={`grid grid-cols-3 p-6 items-center ${
                index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
              } hover:bg-slate-50 transition-colors`}
            >
              <div className="font-semibold text-slate-700">{item.feature}</div>
              
              <div className="text-center">
                {typeof item.us === 'boolean' ? (
                  item.us ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                  ) : (
                    <X className="w-6 h-6 text-red-500 mx-auto" />
                  )
                ) : (
                  <span className="text-emerald-600 font-bold text-lg">{item.us}</span>
                )}
              </div>
              
              <div className="text-center">
                {typeof item.others === 'boolean' ? (
                  item.others ? (
                    <Check className="w-6 h-6 text-slate-400 mx-auto" />
                  ) : (
                     <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                        <X className="w-5 h-5 text-red-500" />
                    </div>
                  )
                ) : (
                  <span className="text-slate-500">{item.others}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Highlight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-10 text-white text-center shadow-xl transform hover:-translate-y-1 transition-transform"
        >
          <h3 className="text-3xl font-bold mb-4">
            Chỉ 3% Phí Giao Dịch
          </h3>
          <p className="text-lg opacity-90 leading-relaxed">
            Thấp hơn 40-70% so với các nền tảng khác, 
            với dịch vụ bảo vệ người dùng tốt hơn gấp nhiều lần.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
