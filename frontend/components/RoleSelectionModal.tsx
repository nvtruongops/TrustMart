'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ShieldCheck, Settings, X } from 'lucide-react'

interface RoleSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSelectRole: (role: 'user' | 'reviewer' | 'admin') => void
    availableRoles: ('user' | 'reviewer' | 'admin')[]
}

export default function RoleSelectionModal({ isOpen, onClose, onSelectRole, availableRoles }: RoleSelectionModalProps) {
    const roles = [
        {
            id: 'user' as const,
            title: 'Người dùng',
            description: 'Mua sắm và quản lý đơn hàng',
            icon: ShoppingBag,
            color: 'bg-blue-500',
            hoverColor: 'hover:bg-blue-600',
        },
        {
            id: 'reviewer' as const,
            title: 'Chuyên gia',
            description: 'Kiểm định và xác thực sản phẩm',
            icon: ShieldCheck,
            color: 'bg-green-500',
            hoverColor: 'hover:bg-green-600',
        },
        {
            id: 'admin' as const,
            title: 'Quản trị viên',
            description: 'Quản lý hệ thống và người dùng',
            icon: Settings,
            color: 'bg-purple-500',
            hoverColor: 'hover:bg-purple-600',
        },
    ]

    const filteredRoles = roles.filter(role => availableRoles.includes(role.id))

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative"
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-display font-bold text-brand-green mb-2">
                                    Chọn vai trò
                                </h2>
                                <p className="text-gray-600">
                                    Bạn muốn truy cập với vai trò nào?
                                </p>
                            </div>

                            {/* Role cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {filteredRoles.map((role) => {
                                    const Icon = role.icon
                                    return (
                                        <motion.button
                                            key={role.id}
                                            onClick={() => onSelectRole(role.id)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`${role.color} ${role.hoverColor} text-white p-6 rounded-xl transition-all flex flex-col items-center text-center space-y-3`}
                                        >
                                            <div className="bg-white/20 p-4 rounded-full">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">{role.title}</h3>
                                                <p className="text-sm text-white/90">{role.description}</p>
                                            </div>
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
