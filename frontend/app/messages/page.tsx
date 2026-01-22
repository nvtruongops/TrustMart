'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Send,
    Image as ImageIcon,
    MoreVertical,
    Phone,
    Video,
    ArrowLeft,
    Check,
    CheckCheck,
    Smile,
    Paperclip,
    ShieldCheck,
    Circle,
    MessageSquare
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/landing/Header'

// Types
interface Message {
    id: number
    senderId: string
    content: string
    timestamp: Date
    type: 'text' | 'image' | 'product'
    status: 'sent' | 'delivered' | 'read'
    productInfo?: {
        id: number
        name: string
        price: number
        image: string
    }
}

interface Conversation {
    id: number
    participant: {
        id: string
        name: string
        avatar: string
        isOnline: boolean
        isVerified: boolean
        lastSeen?: string
    }
    lastMessage: {
        content: string
        timestamp: Date
        isFromMe: boolean
    }
    unreadCount: number
    messages: Message[]
}

// Mock data
const mockConversations: Conversation[] = [
    {
        id: 1,
        participant: {
            id: '1',
            name: 'Tech Store HN',
            avatar: '/avatars/seller1.jpg',
            isOnline: true,
            isVerified: true,
        },
        lastMessage: {
            content: 'Vâng, sản phẩm hiện đang còn hàng ạ. Anh/chị có thể đặt ngay nhé!',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            isFromMe: false,
        },
        unreadCount: 2,
        messages: [
            { id: 1, senderId: 'me', content: 'Chào shop, cho mình hỏi iPhone 14 Pro Max còn hàng không ạ?', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'text', status: 'read' },
            { id: 2, senderId: '1', content: 'Chào bạn! Hiện bên mình còn hàng màu Tím và Đen ạ.', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), type: 'text', status: 'read' },
            { id: 3, senderId: 'me', content: 'Cho mình xem sản phẩm với ạ', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), type: 'text', status: 'read' },
            { id: 4, senderId: '1', content: '', timestamp: new Date(Date.now() - 50 * 60 * 1000), type: 'product', status: 'read', productInfo: { id: 1, name: 'iPhone 14 Pro Max 256GB', price: 24500000, image: '/images/product-1.jpg' } },
            { id: 5, senderId: 'me', content: 'Giá này có thương lượng được không ạ?', timestamp: new Date(Date.now() - 30 * 60 * 1000), type: 'text', status: 'read' },
            { id: 6, senderId: '1', content: 'Dạ, giá này đã là giá tốt nhất rồi ạ. Nếu anh/chị mua thì bên mình tặng thêm ốp lưng và cường lực nhé!', timestamp: new Date(Date.now() - 10 * 60 * 1000), type: 'text', status: 'read' },
            { id: 7, senderId: '1', content: 'Vâng, sản phẩm hiện đang còn hàng ạ. Anh/chị có thể đặt ngay nhé!', timestamp: new Date(Date.now() - 5 * 60 * 1000), type: 'text', status: 'delivered' },
        ]
    },
    {
        id: 2,
        participant: {
            id: '2',
            name: 'Fashion Hub',
            avatar: '/avatars/seller2.jpg',
            isOnline: false,
            isVerified: true,
            lastSeen: '2 giờ trước',
        },
        lastMessage: {
            content: 'Ok em, anh đặt hàng rồi nhé!',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            isFromMe: true,
        },
        unreadCount: 0,
        messages: [
            { id: 1, senderId: '2', content: 'Chào anh! Cảm ơn anh đã quan tâm đến sản phẩm bên em ạ.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'text', status: 'read' },
            { id: 2, senderId: 'me', content: 'Cho anh hỏi size 42 còn không em?', timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), type: 'text', status: 'read' },
            { id: 3, senderId: '2', content: 'Dạ còn ạ! Anh đặt hàng em gửi ngay trong hôm nay luôn ạ.', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), type: 'text', status: 'read' },
            { id: 4, senderId: 'me', content: 'Ok em, anh đặt hàng rồi nhé!', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), type: 'text', status: 'read' },
        ]
    },
    {
        id: 3,
        participant: {
            id: '3',
            name: 'Luxury Brand VN',
            avatar: '/avatars/seller3.jpg',
            isOnline: true,
            isVerified: true,
        },
        lastMessage: {
            content: 'Túi này là hàng auth 100% đúng không shop?',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            isFromMe: true,
        },
        unreadCount: 0,
        messages: [
            { id: 1, senderId: 'me', content: 'Túi này là hàng auth 100% đúng không shop?', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), type: 'text', status: 'delivered' },
        ]
    },
    {
        id: 4,
        participant: {
            id: '4',
            name: 'Student Corner',
            avatar: '/avatars/seller4.jpg',
            isOnline: false,
            isVerified: false,
            lastSeen: '1 ngày trước',
        },
        lastMessage: {
            content: 'Sách còn mới 95% ạ, có hình thực tế nè',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            isFromMe: false,
        },
        unreadCount: 1,
        messages: [
            { id: 1, senderId: 'me', content: 'Cho mình hỏi sách này tình trạng như thế nào ạ?', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'text', status: 'read' },
            { id: 2, senderId: '4', content: 'Sách còn mới 95% ạ, có hình thực tế nè', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'text', status: 'delivered' },
        ]
    },
    {
        id: 5,
        participant: {
            id: '5',
            name: 'Gadget World',
            avatar: '/avatars/seller5.jpg',
            isOnline: true,
            isVerified: true,
        },
        lastMessage: {
            content: 'Cảm ơn bạn đã mua hàng! Chúc bạn một ngày tốt lành.',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            isFromMe: false,
        },
        unreadCount: 0,
        messages: [
            { id: 1, senderId: '5', content: 'Cảm ơn bạn đã mua hàng! Chúc bạn một ngày tốt lành.', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), type: 'text', status: 'read' },
        ]
    },
]

// Format time helper
function formatTime(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Vừa xong'
    if (minutes < 60) return `${minutes} phút`
    if (hours < 24) return `${hours} giờ`
    if (days === 1) return 'Hôm qua'
    if (days < 7) return `${days} ngày`
    return date.toLocaleDateString('vi-VN')
}

function formatMessageTime(date: Date): string {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

export default function MessagesPage() {
    const [conversations, setConversations] = useState(mockConversations)
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [isMobileView, setIsMobileView] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Check mobile view
    useEffect(() => {
        const checkMobile = () => setIsMobileView(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [selectedConversation?.messages])

    // Filter conversations
    const filteredConversations = useMemo(() => {
        if (!searchQuery) return conversations
        return conversations.filter(c =>
            c.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [conversations, searchQuery])

    // Send message
    const sendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return

        const newMsg: Message = {
            id: Date.now(),
            senderId: 'me',
            content: newMessage,
            timestamp: new Date(),
            type: 'text',
            status: 'sent',
        }

        setConversations(prev => prev.map(c => {
            if (c.id === selectedConversation.id) {
                return {
                    ...c,
                    messages: [...c.messages, newMsg],
                    lastMessage: {
                        content: newMessage,
                        timestamp: new Date(),
                        isFromMe: true,
                    }
                }
            }
            return c
        }))

        setSelectedConversation(prev => prev ? {
            ...prev,
            messages: [...prev.messages, newMsg],
        } : null)

        setNewMessage('')
        inputRef.current?.focus()
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

    return (
        <main className="min-h-screen bg-brand-cream">
            <Header />

            <div className="pt-24 pb-4 h-screen">
                <div className="container mx-auto px-4 h-full max-w-6xl">
                    {/* Main Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden h-[calc(100vh-120px)] flex"
                    >
                        {/* Conversation List - Hidden on mobile when chat is open */}
                        <div className={`${isMobileView && selectedConversation ? 'hidden' : 'flex'} flex-col w-full md:w-96 border-r border-slate-100`}>
                            {/* Header */}
                            <div className="p-4 border-b border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-xl font-bold text-brand-green flex items-center gap-2">
                                        <MessageSquare className="w-6 h-6" />
                                        Tin nhắn
                                        {totalUnread > 0 && (
                                            <span className="px-2 py-0.5 bg-brand-orange text-white text-xs font-bold rounded-full">
                                                {totalUnread}
                                            </span>
                                        )}
                                    </h1>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm cuộc trò chuyện..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {/* Conversation List */}
                            <div className="flex-1 overflow-y-auto overscroll-contain">
                                {filteredConversations.length > 0 ? (
                                    filteredConversations.map((conversation) => (
                                        <button
                                            key={conversation.id}
                                            onClick={() => {
                                                setSelectedConversation(conversation)
                                                // Mark as read
                                                setConversations(prev => prev.map(c =>
                                                    c.id === conversation.id ? { ...c, unreadCount: 0 } : c
                                                ))
                                            }}
                                            className={`w-full p-4 flex gap-3 hover:bg-brand-cream/50 transition-colors border-b border-slate-50 text-left ${selectedConversation?.id === conversation.id ? 'bg-brand-green/5' : ''
                                                }`}
                                        >
                                            {/* Avatar */}
                                            <div className="relative shrink-0">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                                                    {conversation.participant.name.charAt(0)}
                                                </div>
                                                {conversation.participant.isOnline && (
                                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-semibold text-slate-800 truncate">
                                                            {conversation.participant.name}
                                                        </span>
                                                        {conversation.participant.isVerified && (
                                                            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-slate-400 shrink-0">
                                                        {formatTime(conversation.lastMessage.timestamp)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'text-slate-800 font-medium' : 'text-slate-500'
                                                        }`}>
                                                        {conversation.lastMessage.isFromMe && (
                                                            <span className="text-slate-400">Bạn: </span>
                                                        )}
                                                        {conversation.lastMessage.content}
                                                    </p>
                                                    {conversation.unreadCount > 0 && (
                                                        <span className="w-5 h-5 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0 ml-2">
                                                            {conversation.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500">Không tìm thấy cuộc trò chuyện</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className={`${isMobileView && !selectedConversation ? 'hidden' : 'flex'} flex-1 flex-col`}>
                            {selectedConversation ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                                        <div className="flex items-center gap-3">
                                            {isMobileView && (
                                                <button
                                                    onClick={() => setSelectedConversation(null)}
                                                    className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
                                                >
                                                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                                                </button>
                                            )}

                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center text-white font-bold">
                                                    {selectedConversation.participant.name.charAt(0)}
                                                </div>
                                                {selectedConversation.participant.isOnline && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <h2 className="font-semibold text-slate-800">
                                                        {selectedConversation.participant.name}
                                                    </h2>
                                                    {selectedConversation.participant.isVerified && (
                                                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500">
                                                    {selectedConversation.participant.isOnline
                                                        ? 'Đang hoạt động'
                                                        : `Hoạt động ${selectedConversation.participant.lastSeen}`
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                                                <Phone className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                                                <Video className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-slate-50/50">
                                        {selectedConversation.messages.map((message, index) => {
                                            const isMe = message.senderId === 'me'
                                            const showAvatar = !isMe && (
                                                index === 0 ||
                                                selectedConversation.messages[index - 1]?.senderId === 'me'
                                            )

                                            return (
                                                <motion.div
                                                    key={message.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    {!isMe && (
                                                        <div className="w-8 h-8 shrink-0">
                                                            {showAvatar && (
                                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                                                                    {selectedConversation.participant.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className={`max-w-[70%] ${isMe ? 'order-first' : ''}`}>
                                                        {message.type === 'product' && message.productInfo ? (
                                                            <Link
                                                                href={`/products/${message.productInfo.id}`}
                                                                className="block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                                                            >
                                                                <div className="aspect-video relative bg-slate-100">
                                                                    <Image
                                                                        src={message.productInfo.image}
                                                                        alt={message.productInfo.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div className="p-3">
                                                                    <h4 className="font-medium text-slate-800 text-sm line-clamp-1">
                                                                        {message.productInfo.name}
                                                                    </h4>
                                                                    <p className="text-brand-green font-bold">
                                                                        {message.productInfo.price.toLocaleString('vi-VN')}đ
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        ) : (
                                                            <div
                                                                className={`px-4 py-2.5 rounded-2xl ${isMe
                                                                        ? 'bg-brand-green text-white rounded-br-md'
                                                                        : 'bg-white text-slate-800 rounded-bl-md shadow-sm'
                                                                    }`}
                                                            >
                                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                            </div>
                                                        )}

                                                        {/* Time & Status */}
                                                        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                            <span className="text-xs text-slate-400">
                                                                {formatMessageTime(message.timestamp)}
                                                            </span>
                                                            {isMe && (
                                                                <span className="text-slate-400">
                                                                    {message.status === 'read' ? (
                                                                        <CheckCheck className="w-4 h-4 text-blue-500" />
                                                                    ) : message.status === 'delivered' ? (
                                                                        <CheckCheck className="w-4 h-4" />
                                                                    ) : (
                                                                        <Check className="w-4 h-4" />
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 border-t border-slate-100 bg-white">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                                                <Paperclip className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                                                <ImageIcon className="w-5 h-5" />
                                            </button>

                                            <div className="flex-1 relative">
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    placeholder="Nhập tin nhắn..."
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all text-sm"
                                                />
                                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                                    <Smile className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={sendMessage}
                                                disabled={!newMessage.trim()}
                                                className="p-3 rounded-xl bg-brand-green text-white hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // Empty State
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare className="w-12 h-12 text-brand-green" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                        Chào mừng đến với Tin nhắn
                                    </h2>
                                    <p className="text-slate-500 max-w-sm">
                                        Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin với người bán hoặc người mua.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
