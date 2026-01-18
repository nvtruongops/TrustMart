'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-brand-green">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8 whitespace-nowrap">
                        <Sparkles className="w-5 h-5 text-brand-yellow" />
                        <span className="text-white font-mono font-medium tracking-wide">Join 50,000+ Verified Users</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
                        Ready to trade with <br />
                        <span className="text-brand-yellow relative inline-block">
                            Confidence?
                            <svg className="absolute w-full h-4 -bottom-1 left-0 text-brand-orange -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6" />
                            </svg>
                        </span>
                    </h2>

                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Stop worrying about scams. Start buying and selling with AI authentication and expert grading today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/sell" className="group relative px-10 py-5 bg-brand-orange rounded-full overflow-hidden shadow-2xl hover:shadow-brand-orange/40 transition-all hover:-translate-y-1 w-full sm:w-auto">
                            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-in-out -translate-x-full skew-x-12" />
                            <span className="relative z-10 font-bold text-white text-lg flex items-center justify-center gap-2">
                                Start Selling Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <Link href="/shop" className="group px-10 py-5 bg-white text-brand-green rounded-full font-bold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                            Explore Treasures
                        </Link>
                    </div>

                    <p className="mt-8 text-white/40 text-sm">
                        No credit card required for browsing. 100% Buyer Protection.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
