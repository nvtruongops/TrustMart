'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Elena R.",
    role: "Collector",
    text: "I was skeptical about buying a vintage Chanel online. But the expert report was so detailed! It felt like I was in a boutique.",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Tech Enthusiast",
    text: "Sold my MacBook Pro in 2 hours. The AI scan priced it perfectly, and the buyer paid instantly. Easiest sale ever.",
    rating: 5
  },
  {
    name: "Sarah L.",
    role: "Eco Warrior",
    text: "Finally, a platform that makes second-hand feel trustworthy. No shady meetups, just quality items.",
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-earth font-mono font-bold uppercase tracking-wider text-sm mb-4 block">Community Stories</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-green">
            Loved by <span className="text-brand-orange">Thousands</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-brand-cream p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Quote className="w-10 h-10 text-brand-orange/20 mb-6" />

              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, r) => (
                  <Star key={r} className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                ))}
              </div>

              <p className="text-brand-green/80 text-lg mb-8 leading-relaxed font-medium">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-brand-green">{t.name}</p>
                  <p className="text-sm text-brand-green/50 font-mono">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
