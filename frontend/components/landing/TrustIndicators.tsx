'use client'

import Image from 'next/image'

export default function TrustIndicators() {
  return (
    <section className="py-12 bg-brand-green overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>

      <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16 items-center shrink-0">
            <span className="text-4xl font-display font-bold text-white/90">AUTHENTICATED LUXURY</span>
            <div className="w-16 h-16 relative">
              <Image src="/trust-badges.png" alt="Badge" fill className="object-cover rounded-full" />
            </div>
            <span className="text-4xl font-display font-bold text-brand-yellow">AI VERIFIED</span>
            <span className="text-4xl font-display font-bold text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
              SECURE PAYMENT
            </span>
            <div className="w-16 h-16 relative">
              <Image src="/trust-badges.png" alt="Badge" fill className="object-cover rounded-full" />
            </div>
            <span className="text-4xl font-display font-bold text-brand-blue">ECO FRIENDLY</span>
          </div>
        ))}
      </div>
    </section>
  )
}