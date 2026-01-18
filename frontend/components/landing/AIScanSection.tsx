'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Scan, Upload, FileCheck, Search, ShieldCheck, CheckCircle2, ChevronRight, Loader2, ListTodo, Receipt, Tag as TagIcon, Camera } from 'lucide-react'
import Image from 'next/image'

// Simulation Steps
type ScanStep = 'idle' | 'uploading' | 'validating' | 'result'

export default function AIScanSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const [step, setStep] = useState<ScanStep>('idle')

    // Orchestrate the animation flow when in view
    useEffect(() => {
        if (isInView) {
            // Start automatically after a brief delay
            const t1 = setTimeout(() => setStep('uploading'), 500)
            const t2 = setTimeout(() => setStep('validating'), 2000)
            const t3 = setTimeout(() => setStep('result'), 6500) // Validation takes longer for effect

            return () => {
                clearTimeout(t1)
                clearTimeout(t2)
                clearTimeout(t3)
            }
        }
    }, [isInView])

    return (
        <section className="py-24 md:py-32 bg-gradient-to-b from-brand-cream/30 to-white relative overflow-hidden" ref={containerRef}>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-green/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                {/* Left: Text Content */}
                <div className="z-10 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-brand-green/5 px-4 py-2 rounded-full mb-6 border border-brand-green/10"
                    >
                        <ListTodo className="w-5 h-5 text-brand-green" />
                        <span className="text-brand-green font-bold font-mono uppercase tracking-widest text-xs">AI Compliance Check</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-green mb-8 leading-[1.1]"
                    >
                        Verified Evidence.<br />
                        <span className="text-brand-orange">Maximum Trust.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-brand-green/70 mb-10 max-w-lg leading-relaxed"
                    >
                        Our AI doesn't just look for scratches. It validates your listing evidence: receipts, tags, and full angles. Complete the checklist to earn a high Trust Score.
                    </motion.p>

                    <div className="space-y-4">
                        {[
                            {
                                icon: Upload,
                                title: "1. Upload Evidence",
                                desc: "Photos of product, tags, and original receipt.",
                                active: step === 'uploading' || step === 'idle'
                            },
                            {
                                icon: Scan,
                                title: "2. Automatic Validation",
                                desc: "AI checks if 5/5 required criteria are met.",
                                active: step === 'validating'
                            },
                            {
                                icon: ShieldCheck,
                                title: "3. Compliance Score",
                                desc: "High score for complete, verified listings.",
                                active: step === 'result'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${item.active
                                        ? 'bg-white shadow-lg border-brand-green/20 scale-105'
                                        : 'bg-white/40 border-transparent opacity-70'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${item.active ? 'bg-brand-green text-white' : 'bg-brand-green/10 text-brand-green'
                                    }`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm transition-colors ${item.active ? 'text-brand-green' : 'text-brand-green/80'}`}>
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-brand-green/60">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Interactive Phone Animation */}
                <div className="relative order-1 lg:order-2 h-[640px] flex items-center justify-center perspective-[2000px]">

                    {/* The Phone */}
                    <motion.div
                        className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3.5rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden transform-style-3d z-20"
                        initial={{ rotateY: -10, rotateX: 5 }}
                        animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Screen Content */}
                        <div className="absolute inset-0 bg-gray-50 overflow-hidden flex flex-col font-sans">

                            {/* Header */}
                            <div className="pt-12 px-6 pb-4 bg-white shadow-sm z-10">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
                                    </div>
                                    <span className="font-bold text-lg text-brand-green">New Listing</span>
                                    <div className="w-8 h-8" />
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden relative">

                                {/* Photo Upload Zone */}
                                <div className="aspect-[4/5] rounded-3xl bg-gray-100 relative overflow-hidden shadow-inner group transition-all duration-500">
                                    <AnimatePresence mode='wait'>

                                        {/* State: IDLE / UPLOAD PROMPT */}
                                        {step === 'idle' && (
                                            <motion.div
                                                key="upload-prompt"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-4"
                                            >
                                                <div className="grid grid-cols-2 gap-4 opacity-50">
                                                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"><Camera className="w-6 h-6" /></div>
                                                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"><TagIcon className="w-6 h-6" /></div>
                                                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"><Receipt className="w-6 h-6" /></div>
                                                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center"><Scan className="w-6 h-6" /></div>
                                                </div>
                                                <span className="text-sm font-medium">Upload Photos & Evidence</span>
                                            </motion.div>
                                        )}

                                        {/* State: UPLOADING */}
                                        {step === 'uploading' && (
                                            <motion.div
                                                key="uploading-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-20"
                                            >
                                                <Loader2 className="w-10 h-10 text-brand-green animate-spin mb-3" />
                                                <span className="text-sm font-medium text-brand-green">Processing Images...</span>
                                            </motion.div>
                                        )}

                                        {/* State: VALIDATING & RESULT (Image Visible) */}
                                        {(step === 'validating' || step === 'result') && (
                                            <motion.div
                                                key="image-visible"
                                                className="absolute inset-0 w-full h-full"
                                            >
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src="/images/shirt_listing_flatlay.png"
                                                        alt="Shirt Listing"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* CHECKLIST OVERLAY */}
                                                {(step === 'validating') && (
                                                    <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px] p-6 flex flex-col justify-center">
                                                        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                                                            <div className="bg-brand-green px-4 py-3 flex items-center justify-between">
                                                                <span className="text-white font-bold text-sm">Evidence Checklist</span>
                                                                <Scan className="w-4 h-4 text-white/70 animate-pulse" />
                                                            </div>
                                                            <div className="p-4 space-y-3">
                                                                {[
                                                                    { label: "Front & Back View", delay: 0.5 },
                                                                    { label: "Original Tag", delay: 1.5 },
                                                                    { label: "Purchase Receipt", delay: 2.5 },
                                                                    { label: "Brand Match", delay: 3.5 }
                                                                ].map((check, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        className="flex items-center justify-between text-sm"
                                                                        initial={{ opacity: 0.5, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: check.delay }}
                                                                    >
                                                                        <span className="text-gray-700 font-medium">{check.label}</span>
                                                                        <motion.div
                                                                            initial={{ scale: 0 }}
                                                                            animate={{ scale: 1 }}
                                                                            transition={{ delay: check.delay, type: 'spring' }}
                                                                        >
                                                                            <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-100" />
                                                                        </motion.div>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                                                                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        className="h-full bg-green-500"
                                                                        initial={{ width: "0%" }}
                                                                        animate={{ width: "100%" }}
                                                                        transition={{ duration: 4, ease: "linear" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Bottom UI: Result */}
                                <div className="h-24">
                                    <AnimatePresence mode="wait">
                                        {step === 'result' ? (
                                            <motion.div
                                                key="result-ui"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-brand-green text-white p-4 rounded-xl shadow-lg flex items-center justify-between"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Evidence Score</span>
                                                    <span className="text-2xl font-bold font-display">5/5 <span className="text-lg opacity-80 font-normal text-brand-orange">Pass</span></span>
                                                </div>
                                                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                                                    <ShieldCheck className="w-6 h-6 text-white" />
                                                </div>
                                            </motion.div>
                                        ) : step === 'validating' ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-center gap-3"
                                            >
                                                <Loader2 className="w-5 h-5 text-brand-green animate-spin" />
                                                <span className="text-sm font-semibold text-brand-green">Verifying Documentation...</span>
                                            </motion.div>
                                        ) : (
                                            <div className="h-full rounded-xl bg-gray-50 border-2 border-dashed border-gray-200" />
                                        )}
                                    </AnimatePresence>
                                </div>

                            </div>
                        </div>
                    </motion.div>

                    {/* Desktop: Floating Report Card (Only appears at result stage) */}
                    <AnimatePresence>
                        {step === 'result' && (
                            <motion.div
                                className="absolute -right-12 lg:-right-24 top-1/2 z-30 bg-white p-6 rounded-2xl shadow-xl w-72 border border-brand-green/10"
                                initial={{ x: 50, opacity: 0, scale: 0.9 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
                            >
                                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                                    <h4 className="font-bold text-brand-green">Compliance Report</h4>
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Requirements</span>
                                        <span className="font-bold text-brand-green">Met (5/5)</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Receipt</span>
                                        <span className="font-bold text-brand-green">Validated</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Auto-Listing</span>
                                        <span className="font-bold text-brand-green">Approved</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-xs text-brand-green/70">
                                        <ShieldCheck className="w-3 h-3" />
                                        <span>Verified Instant Listing</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </section>
    )
}
