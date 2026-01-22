'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    ShieldCheck,
    Star,
    MapPin,
    Package,
    MessageSquare,
    Eye,
    Heart,
    Filter,
    ChevronDown,
    User,
    Store,
    Grid3X3,
    List,
    X,
    TrendingUp
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import { mockProducts } from '@/lib/mockProducts'

// Mock sellers data
const mockSellers = [
    {
        id: '1',
        name: 'Tech Store HN',
        avatar: '/avatars/seller1.jpg',
        rating: 4.8,
        reviews: 234,
        followers: 1520,
        products: 45,
        verified: true,
        joinDate: '2023-05-15',
        location: 'Hà Nội',
        description: 'Chuyên cung cấp các sản phẩm công nghệ chính hãng, bảo hành uy tín.',
        responseRate: 98,
        responseTime: '< 1 giờ',
        categories: ['Điện tử', 'Phụ kiện']
    },
    {
        id: '2',
        name: 'Fashion Hub',
        avatar: '/avatars/seller2.jpg',
        rating: 4.5,
        reviews: 128,
        followers: 890,
        products: 89,
        verified: true,
        joinDate: '2023-08-20',
        location: 'TP.HCM',
        description: 'Thời trang cao cấp, hàng hiệu authentic 100%.',
        responseRate: 95,
        responseTime: '< 2 giờ',
        categories: ['Thời trang', 'Xa xỉ']
    },
    {
        id: '3',
        name: 'Luxury Brand VN',
        avatar: '/avatars/seller3.jpg',
        rating: 4.9,
        reviews: 567,
        followers: 3200,
        products: 23,
        verified: true,
        joinDate: '2022-11-10',
        location: 'Hà Nội',
        description: 'Hàng hiệu chính hãng, có đầy đủ hóa đơn và giấy tờ.',
        responseRate: 99,
        responseTime: '< 30 phút',
        categories: ['Xa xỉ', 'Đồng hồ']
    },
    {
        id: '4',
        name: 'Student Corner',
        avatar: '/avatars/seller4.jpg',
        rating: 4.3,
        reviews: 89,
        followers: 320,
        products: 156,
        verified: false,
        joinDate: '2024-01-05',
        location: 'Đà Nẵng',
        description: 'Đồ sinh viên giá rẻ, sách vở, đồ dùng học tập.',
        responseRate: 85,
        responseTime: '< 3 giờ',
        categories: ['Đồ sinh viên', 'Sách']
    },
    {
        id: '5',
        name: 'Gadget World',
        avatar: '/avatars/seller5.jpg',
        rating: 4.7,
        reviews: 312,
        followers: 1850,
        products: 78,
        verified: true,
        joinDate: '2023-03-25',
        location: 'TP.HCM',
        description: 'Thiết bị công nghệ, gaming gear, phụ kiện cao cấp.',
        responseRate: 97,
        responseTime: '< 1 giờ',
        categories: ['Điện tử', 'Gaming']
    },
    {
        id: '6',
        name: 'Watch Gallery',
        avatar: '/avatars/seller6.jpg',
        rating: 4.95,
        reviews: 189,
        followers: 2100,
        products: 34,
        verified: true,
        joinDate: '2022-06-18',
        location: 'Hà Nội',
        description: 'Đồng hồ cao cấp, Rolex, Omega, Patek Philippe authentic.',
        responseRate: 100,
        responseTime: '< 15 phút',
        categories: ['Đồng hồ', 'Xa xỉ']
    },
]

type SearchTab = 'all' | 'products' | 'sellers'
type ViewMode = 'grid' | 'list'

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState<SearchTab>('all')
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [sortBy, setSortBy] = useState('relevant')
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const [recentSearches, setRecentSearches] = useState<string[]>([
        'iPhone 14 Pro',
        'MacBook M2',
        'Nike Jordan',
        'Rolex Submariner'
    ])

    // Filter products based on search
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return []
        const query = searchQuery.toLowerCase()
        return mockProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        )
    }, [searchQuery])

    // Filter sellers based on search
    const filteredSellers = useMemo(() => {
        if (!searchQuery.trim()) return []
        const query = searchQuery.toLowerCase()
        return mockSellers.filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.categories.some(c => c.toLowerCase().includes(query))
        )
    }, [searchQuery])

    // Sort options
    const sortOptions = [
        { value: 'relevant', label: 'Liên quan nhất' },
        { value: 'newest', label: 'Mới nhất' },
        { value: 'popular', label: 'Phổ biến nhất' },
        { value: 'rating', label: 'Đánh giá cao' },
    ]

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (query.trim() && !recentSearches.includes(query)) {
            setRecentSearches(prev => [query, ...prev.slice(0, 4)])
        }
    }

    const clearRecentSearch = (search: string) => {
        setRecentSearches(prev => prev.filter(s => s !== search))
    }

    const totalResults = filteredProducts.length + filteredSellers.length

    // Popular searches
    const popularSearches = [
        'iPhone', 'MacBook', 'AirPods', 'Gucci', 'Rolex', 'Nike', 'Samsung', 'PlayStation'
    ]

    return (
        <main className="min-h-screen bg-brand-cream">
            <Header />

            <div className="pt-28 pb-16">
                <div className="container mx-auto px-4">
                    {/* Search Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-green text-center mb-6">
                            Tìm kiếm
                        </h1>

                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm sản phẩm, người bán, thương hiệu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                                className="w-full pl-14 pr-12 py-4 rounded-2xl border-2 border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all text-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* No Search Query - Show suggestions */}
                    {!searchQuery.trim() ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-3xl mx-auto"
                        >
                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                        <Search className="w-4 h-4" />
                                        Tìm kiếm gần đây
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((search, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 group"
                                            >
                                                <button
                                                    onClick={() => handleSearch(search)}
                                                    className="text-slate-700 hover:text-brand-green"
                                                >
                                                    {search}
                                                </button>
                                                <button
                                                    onClick={() => clearRecentSearch(search)}
                                                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Popular Searches */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Tìm kiếm phổ biến
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSearch(search)}
                                            className="px-4 py-2 bg-brand-green/10 text-brand-green rounded-full hover:bg-brand-green hover:text-white transition-colors font-medium"
                                        >
                                            {search}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Sellers */}
                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-2">
                                    <Store className="w-4 h-4" />
                                    Người bán nổi bật
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mockSellers.slice(0, 4).map((seller) => (
                                        <Link
                                            key={seller.id}
                                            href={`/sellers/${seller.id}`}
                                            className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-lg transition-all flex gap-4"
                                        >
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                                                    {seller.name.charAt(0)}
                                                </div>
                                                {seller.verified && (
                                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <ShieldCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-slate-800">{seller.name}</h4>
                                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                        {seller.rating}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{seller.products} sản phẩm</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            {/* Search Results Header */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                {/* Tabs */}
                                <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'all'
                                                ? 'bg-brand-green text-white'
                                                : 'text-slate-600 hover:text-brand-green'
                                            }`}
                                    >
                                        Tất cả ({totalResults})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('products')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'products'
                                                ? 'bg-brand-green text-white'
                                                : 'text-slate-600 hover:text-brand-green'
                                            }`}
                                    >
                                        <Package className="w-4 h-4" />
                                        Sản phẩm ({filteredProducts.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('sellers')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'sellers'
                                                ? 'bg-brand-green text-white'
                                                : 'text-slate-600 hover:text-brand-green'
                                            }`}
                                    >
                                        <Store className="w-4 h-4" />
                                        Người bán ({filteredSellers.length})
                                    </button>
                                </div>

                                {/* View & Sort Controls */}
                                <div className="flex items-center gap-3">
                                    {/* View Mode Toggle */}
                                    <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-brand-green text-white' : 'text-slate-500'
                                                }`}
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-brand-green text-white' : 'text-slate-500'
                                                }`}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sort Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowSortDropdown(!showSortDropdown)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700"
                                        >
                                            <Filter className="w-4 h-4" />
                                            {sortOptions.find(o => o.value === sortBy)?.label}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {showSortDropdown && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 8 }}
                                                    className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 min-w-[160px]"
                                                >
                                                    {sortOptions.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => {
                                                                setSortBy(option.value)
                                                                setShowSortDropdown(false)
                                                            }}
                                                            className={`w-full text-left px-4 py-2.5 text-sm transition-all ${sortBy === option.value
                                                                    ? 'bg-brand-green/10 text-brand-green font-medium'
                                                                    : 'text-slate-600 hover:bg-slate-50'
                                                                }`}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Results */}
                            {totalResults > 0 ? (
                                <div className="space-y-8">
                                    {/* Sellers Results */}
                                    {(activeTab === 'all' || activeTab === 'sellers') && filteredSellers.length > 0 && (
                                        <div>
                                            {activeTab === 'all' && (
                                                <div className="flex items-center justify-between mb-4">
                                                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                                        <Store className="w-5 h-5 text-brand-green" />
                                                        Người bán ({filteredSellers.length})
                                                    </h2>
                                                    {filteredSellers.length > 3 && (
                                                        <button
                                                            onClick={() => setActiveTab('sellers')}
                                                            className="text-sm text-brand-orange font-medium hover:underline"
                                                        >
                                                            Xem tất cả
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            <div className={`grid gap-4 ${viewMode === 'grid'
                                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                                    : 'grid-cols-1'
                                                }`}>
                                                {(activeTab === 'all' ? filteredSellers.slice(0, 3) : filteredSellers).map((seller) => (
                                                    <motion.div
                                                        key={seller.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                    >
                                                        <Link
                                                            href={`/sellers/${seller.id}`}
                                                            className={`block bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all overflow-hidden ${viewMode === 'list' ? 'flex' : ''
                                                                }`}
                                                        >
                                                            {/* Header/Avatar Section */}
                                                            <div className={`bg-gradient-to-br from-brand-green to-emerald-600 ${viewMode === 'list' ? 'w-48 flex items-center justify-center' : 'p-6 text-center'
                                                                }`}>
                                                                <div className={viewMode === 'list' ? '' : ''}>
                                                                    <div className={`mx-auto bg-white rounded-full flex items-center justify-center text-brand-green font-bold ${viewMode === 'list' ? 'w-16 h-16 text-2xl' : 'w-20 h-20 text-3xl mb-3'
                                                                        }`}>
                                                                        {seller.name.charAt(0)}
                                                                    </div>
                                                                    {viewMode === 'grid' && (
                                                                        <>
                                                                            <h3 className="font-bold text-white text-lg flex items-center justify-center gap-1">
                                                                                {seller.name}
                                                                                {seller.verified && <ShieldCheck className="w-5 h-5 text-white" />}
                                                                            </h3>
                                                                            <p className="text-white/80 text-sm mt-1">{seller.location}</p>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Info Section */}
                                                            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                                                {viewMode === 'list' && (
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <h3 className="font-bold text-slate-800 text-lg">{seller.name}</h3>
                                                                        {seller.verified && <ShieldCheck className="w-5 h-5 text-blue-500" />}
                                                                        <span className="text-slate-400">•</span>
                                                                        <span className="text-sm text-slate-500">{seller.location}</span>
                                                                    </div>
                                                                )}

                                                                <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                                                                    {seller.description}
                                                                </p>

                                                                <div className="flex items-center gap-4 text-sm">
                                                                    <span className="flex items-center gap-1 text-yellow-600">
                                                                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                                        {seller.rating} ({seller.reviews})
                                                                    </span>
                                                                    <span className="flex items-center gap-1 text-slate-500">
                                                                        <Package className="w-4 h-4" />
                                                                        {seller.products} sản phẩm
                                                                    </span>
                                                                    <span className="flex items-center gap-1 text-slate-500">
                                                                        <User className="w-4 h-4" />
                                                                        {seller.followers} theo dõi
                                                                    </span>
                                                                </div>

                                                                {/* Categories */}
                                                                <div className="flex flex-wrap gap-2 mt-3">
                                                                    {seller.categories.map((cat) => (
                                                                        <span key={cat} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                                                            {cat}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Products Results */}
                                    {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
                                        <div>
                                            {activeTab === 'all' && (
                                                <div className="flex items-center justify-between mb-4">
                                                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-brand-orange" />
                                                        Sản phẩm ({filteredProducts.length})
                                                    </h2>
                                                    {filteredProducts.length > 6 && (
                                                        <button
                                                            onClick={() => setActiveTab('products')}
                                                            className="text-sm text-brand-orange font-medium hover:underline"
                                                        >
                                                            Xem tất cả
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            <div className={`grid gap-6 ${viewMode === 'grid'
                                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                                    : 'grid-cols-1'
                                                }`}>
                                                {(activeTab === 'all' ? filteredProducts.slice(0, 8) : filteredProducts).map((product, index) => (
                                                    <motion.div
                                                        key={product.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.03 }}
                                                    >
                                                        <Link
                                                            href={`/products/${product.id}`}
                                                            className={`block bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all overflow-hidden group ${viewMode === 'list' ? 'flex' : ''
                                                                }`}
                                                        >
                                                            {/* Image */}
                                                            <div className={`relative bg-slate-100 overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'h-56'
                                                                }`}>
                                                                <Image
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    fill
                                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                                />
                                                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${product.trustScore >= 90 ? 'bg-emerald-500 text-white' : 'bg-yellow-500 text-white'
                                                                    }`}>
                                                                    {product.trustScore}/100
                                                                </div>
                                                                {product.hasReview && (
                                                                    <div className="absolute top-3 left-3 bg-purple-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                                        <ShieldCheck className="w-3 h-3" />
                                                                        Kiểm định
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Content */}
                                                            <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                                                                <div className="text-xs text-brand-green/60 mb-1">{product.category}</div>
                                                                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                                                    {product.name}
                                                                </h3>

                                                                <div className="flex items-center justify-between mb-3">
                                                                    <span className="text-lg font-bold text-emerald-600">
                                                                        {product.price.toLocaleString('vi-VN')}đ
                                                                    </span>
                                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                                                        {product.condition}
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center justify-between text-slate-400 text-sm">
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="flex items-center gap-1">
                                                                            <Eye className="w-4 h-4" />
                                                                            {product.views}
                                                                        </span>
                                                                        <span className="flex items-center gap-1">
                                                                            <Heart className="w-4 h-4" />
                                                                            {product.likes}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-xs truncate max-w-[100px]">{product.seller}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // No Results
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-12 h-12 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                        Không tìm thấy kết quả
                                    </h3>
                                    <p className="text-slate-500">
                                        Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả
                                    </p>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}
