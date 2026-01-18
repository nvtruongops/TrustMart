'use client'

import { motion } from 'framer-motion'
import { Scan, Upload, FileCheck, Search, ShieldCheck } from 'lucide-react'

export default function AIScanSection() {
    return (
        <section className="py-32 bg-brand-cream relative overflow-hidden">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left: Text Content */}
                <div className="z-10 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 bg-brand-green/5 px-4 py-2 rounded-full mb-6 border border-brand-green/10">
                        <Scan className="w-5 h-5 text-brand-green" />
                        <span className="text-brand-green font-bold font-mono uppercase tracking-widest text-xs">AI Vision Engine</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-display font-bold text-brand-green mb-8 leading-[1.1]">
                        Your Photos.<br />
                        <span className="text-brand-orange">Our Analysis.</span>
                    </h2>

                    <p className="text-xl text-brand-green/70 mb-10 max-w-lg leading-relaxed">
                        Upload simple photos and let our AI create a professional listing. We identify the brand, detect defects, and grade the condition instantly.
                    </p>

                    <div className="space-y-4">
                        {/* Feature List */}
                        {[
                            { icon: Upload, title: "Seller Uploads Photos", desc: "No professional gear needed." },
                            { icon: Search, title: "AI Scans Every Pixel", desc: "Detects scratches, fading, and authenticity markers." },
                            { icon: FileCheck, title: "Instant Trust Score", desc: "Buyer sees a verified report before they buy." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-brand-green/5">
                                <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-green text-sm">{item.title}</h4>
                                    <p className="text-xs text-brand-green/60">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: CSS-Native 3D Phone Animation */}
                <div className="relative order-1 lg:order-2 h-[600px] flex items-center justify-center perspective-[2000px]">

                    {/* The Phone (CSS Constructed) */}
                    <motion.div
                        className="relative w-[300px] h-[580px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden transform-style-3d"
                        initial={{ rotateY: -15, rotateX: 5 }}
                        animate={{ rotateY: [-15, 15, -15], rotateX: [5, -5, 5] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Screen Content */}
                        <div className="absolute inset-0 bg-white overflow-hidden flex flex-col">

                            {/* Status Bar Mock */}
                            <div className="h-8 bg-black w-full absolute top-0 z-20 flex justify-between px-6 items-center">
                                <div className="w-12 h-4 bg-black rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0"></div>
                                <span className="text-[10px] text-white font-medium">9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full border border-white"></div>
                                    <div className="w-4 h-3 bg-white rounded-[2px]"></div>
                                </div>
                            </div>

                            {/* App UI */}
                            <div className="mt-12 px-6 flex-1 flex flex-col relative">
                                <h3 className="font-display font-bold text-2xl text-brand-green mb-4">New Listing</h3>

                                {/* Photo Upload Area */}
                                <div className="aspect-[4/5] bg-gray-100 rounded-2xl relative overflow-hidden group">

                                    {/* The "Photo" being grouped */}
                                    <motion.div
                                        className="absolute inset-2 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300"
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 1, borderColor: 'transparent' }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                    >
                                        {/* Placeholder Product Image (using a solid gradient as proxy or the previous user image if available, let's use a nice CSS gradient to avoid external dependencies) */}
                                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center relative">
                                            <div className="text-6xl">👜</div>

                                            {/* Grid Scan Effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-brand-green/20 z-10"
                                                style={{ backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(to right, rgba(46, 92, 49, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(46, 92, 49, 0.1) 1px, transparent 1px)' }}
                                                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                                                animate={{ clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)', 'inset(100% 0 0% 0)'] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            />

                                            {/* Scanning Line */}
                                            <motion.div
                                                className="absolute w-full h-1 bg-brand-orange shadow-[0_0_15px_rgba(141,110,99,0.8)] z-20"
                                                animate={{ top: ['0%', '100%'] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Analysis Tags Popping Up */}
                                    <motion.div
                                        className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-lg text-xs font-bold text-brand-green flex items-center gap-1"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 1.5, type: 'spring' }}
                                    >
                                        <Scan className="w-3 h-3" /> Brand: CHANEL
                                    </motion.div>

                                    <motion.div
                                        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-lg text-xs font-bold text-brand-green flex items-center gap-1"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 1.8, type: 'spring' }}
                                    >
                                        <ShieldCheck className="w-3 h-3 text-brand-green" /> Condition: A+
                                    </motion.div>
                                </div>

                                {/* Process Indicator */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex justify-between text-sm font-medium text-brand-green/60">
                                        <span>Analyzing...</span>
                                        <span>98%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-brand-green"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "98%" }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>

                    {/* Floating "Trust Report" Card behind/beside */}
                    <motion.div
                        className="absolute -right-4 top-1/2 bg-white p-5 rounded-2xl shadow-xl w-64 border border-brand-green/10"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 30, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h4 className="font-bold text-brand-green border-b border-gray-100 pb-2 mb-3">Authenticity Report</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Confidence</span>
                                <span className="font-bold text-brand-green">99.9%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Source</span>
                                <span className="font-bold text-brand-green">Seller Photo</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
