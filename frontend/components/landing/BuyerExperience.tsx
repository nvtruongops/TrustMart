'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, ShieldCheck, UserCheck } from 'lucide-react'

export default function BuyerExperience() {
    return (
        <section className="py-32 bg-brand-green text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('/noise.png')] mix-blend-overlay"></div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Image (Expert Helping Buyer) */}
                    <motion.div
                        className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/expert-helping-buyer.png"
                            alt="Expert helping a happy buyer"
                            fill
                            className="object-cover"
                        />

                        {/* Overlay Text */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white font-display font-medium text-lg">
                                "We check every detail, so you don't have to."
                            </p>
                            <p className="text-white/60 font-mono text-sm mt-2">
                                — James, Senior Luxury Authenticator
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                                Expert Eyes.<br />
                                <span className="text-brand-yellow">Human Touch.</span>
                            </h2>
                            <p className="text-xl text-white/80 max-w-lg leading-relaxed">
                                Algorithms are great, but nothing beats the trained eye of a master. Our experts physically inspect your item before it ever reaches your door.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                {
                                    icon: UserCheck,
                                    title: 'In-Person Verification',
                                    desc: 'A real human expert verifies condition, materials, and functionality.'
                                },
                                {
                                    icon: ShieldCheck,
                                    title: 'The "Golden Stamp"',
                                    desc: 'Only 100% authentic items receive our seal of approval. No exceptions.'
                                },
                                {
                                    icon: CheckCircle,
                                    title: 'Money-Back Guarantee',
                                    desc: 'If we miss something, you get a full refund plus 10% credit.'
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-default"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <div className="mt-1">
                                        <feature.icon className="w-8 h-8 text-brand-yellow" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-display text-white mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white/60 text-sm leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
