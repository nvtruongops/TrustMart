'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ReviewerSpotlight() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-brand-cream/20 relative">
            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-display font-bold text-center text-brand-green mb-16">
                    Meet the <span className="text-brand-purple">Experts</span>
                </h2>

                {/* Reviewer Avatars */}
                <div className="flex justify-center mb-16">
                    <div className="relative w-full max-w-4xl h-[400px]">
                        <Image
                            src="/reviewer-group.png"
                            alt="Expert Reviewers"
                            fill
                            className="object-contain"
                        />

                        {/* Floating Labels */}
                        <motion.div
                            className="absolute top-[10%] left-[20%] bg-white shadow-lg px-4 py-2 rounded-full border border-brand-green/10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <p className="font-bold text-brand-green">Alex</p>
                            <p className="text-xs text-brand-green/60 uppercase">Tech Guru</p>
                        </motion.div>

                        <motion.div
                            className="absolute top-[20%] right-[20%] bg-white shadow-lg px-4 py-2 rounded-full border border-brand-green/10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        >
                            <p className="font-bold text-brand-green">Sarah</p>
                            <p className="text-xs text-brand-green/60 uppercase">High Fashion</p>
                        </motion.div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-brand-green/10 py-12">
                    {[
                        { label: 'Experts', value: '200+' },
                        { label: 'Cities', value: '15' },
                        { label: 'Avg Rating', value: '4.9/5' },
                        { label: 'Verified Items', value: '1M+' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-display font-bold text-brand-green mb-1">{stat.value}</div>
                            <div className="text-brand-green/60 font-mono text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
