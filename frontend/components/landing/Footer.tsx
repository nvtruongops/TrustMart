'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#091E10] text-white py-20 rounded-t-[3rem] mt-12 relative overflow-hidden">
      {/* Giant Text Background */}
      <div className="absolute -bottom-20 -left-10 text-[15rem] font-bold text-white/5 opacity-50 whitespace-nowrap pointer-events-none select-none font-display">
        TrustMart
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-display font-bold mb-6">Stay in the Loop</h3>
            <p className="mb-8 text-white/70 max-w-sm">
              Join our newsletter to get first dibs on quality drops and expert tips.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/10 border border-white/20 rounded-full px-6 py-3 w-full max-w-xs focus:outline-none focus:border-brand-yellow transition-colors"
              />
              <button className="bg-brand-yellow text-brand-green font-bold px-8 py-3 rounded-full hover:bg-brand-yellow/90 transition-transform hover:scale-105">
                Join
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="#" className="hover:text-brand-yellow transition-colors">Điện tử</Link></li>
              <li><Link href="#" className="hover:text-brand-yellow transition-colors">Thời trang</Link></li>
              <li><Link href="#" className="hover:text-brand-yellow transition-colors">Góc Sinh Viên</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center gap-3"><MapPin className="w-5 h-5" /> 123 Innovation Dr, Tech City</li>
              <li className="flex items-center gap-3"><Phone className="w-5 h-5" /> +84 123 456 789</li>
              <li className="flex items-center gap-3"><Mail className="w-5 h-5" /> hello@trustmart.com</li>
            </ul>
            <div className="flex gap-4 mt-8">
              <Facebook className="w-6 h-6 hover:text-brand-yellow cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 hover:text-brand-yellow cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 hover:text-brand-yellow cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>&copy; 2026 TrustMart Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}