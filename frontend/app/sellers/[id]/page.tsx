'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    ShieldCheck,
    Star,
    MapPin,
    Package,
    MessageSquare,
    Eye,
    Heart,
    Calendar,
    Clock,
    Users,
    Award,
    ChevronDown,
    Filter,
    Grid3X3,
    List,
    Share2,
    Flag,
    CheckCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import { mockProducts } from '@/lib/mockProducts'

// Mock sellers data
const mockSellers: Record<string, {
    id: string
    name: string
    avatar: string
    coverImage: string
    rating: number
    reviews: number
    followers: number
    following: number
    products: number
    verified: boolean
    joinDate: string
    location: string
    description: string
    responseRate: number
    responseTime: string
    categories: string[]
    badges: string[]
    stats: {
        totalSold: number
        successRate: number
        avgShipTime: string
    }
}> = {
    '1': {
        id: '1',
        name: 'Tech Store HN',
        avatar: '/avatars/seller1.jpg',
        coverImage: '/images/cover-tech.jpg',
        rating: 4.8,
        reviews: 234,
        followers: 1520,
        following: 45,
        products: 45,
        verified: true,
        joinDate: '2023-05-15',
        location: 'Hà Nội',
        description: 'Chuyên cung cấp các sản phẩm công nghệ chính hãng, bảo hành uy tín. Với hơn 5 năm kinh nghiệm trong lĩnh vực công nghệ, chúng tôi cam kết mang đến những sản phẩm chất lượng nhất với giá cả hợp lý.',
        responseRate: 98,
        responseTime: '< 1 giờ',
        categories: ['Điện tử', 'Phụ kiện', 'Gaming'],
        badges: ['Top Seller', 'Fast Responder', 'Trusted'],
        stats: {
            totalSold: 1250,
            successRate: 99.2,
            avgShipTime: '1-2 ngày'
        }
    },
    '2': {
        id: '2',
        name: 'Fashion Hub',
        avatar: '/avatars/seller2.jpg',
        coverImage: '/images/cover-fashion.jpg',
        rating: 4.5,
        reviews: 128,
        followers: 890,
        following: 32,
        products: 89,
        verified: true,
        joinDate: '2023-08-20',
        location: 'TP.HCM',
        description: 'Thời trang cao cấp, hàng hiệu authentic 100%. Chúng tôi chỉ bán các sản phẩm có nguồn gốc rõ ràng, có đầy đủ hóa đơn và giấy tờ chứng minh.',
        responseRate: 95,
        responseTime: '< 2 giờ',
        categories: ['Thời trang', 'Xa xỉ', 'Giày dép'],
        badges: ['Authentic Seller', 'Premium'],
        stats: {
            totalSold: 856,
            successRate: 98.5,
            avgShipTime: '2-3 ngày'
        }
    },
    '3': {
        id: '3',
        name: 'Luxury Brand VN',
        avatar: '/avatars/seller3.jpg',
        coverImage: '/images/cover-luxury.jpg',
        rating: 4.9,
        reviews: 567,
        followers: 3200,
        following: 15,
        products: 23,
        verified: true,
        joinDate: '2022-11-10',
        location: 'Hà Nội',
        description: 'Hàng hiệu chính hãng, có đầy đủ hóa đơn và giấy tờ. Chuyên các thương hiệu cao cấp: Louis Vuitton, Chanel, Gucci, Hermès. Cam kết 100% authentic.',
        responseRate: 99,
        responseTime: '< 30 phút',
        categories: ['Xa xỉ', 'Đồng hồ', 'Túi xách'],
        badges: ['Top Seller', 'Luxury Expert', 'VIP'],
        stats: {
            totalSold: 432,
            successRate: 100,
            avgShipTime: '1 ngày'
        }
    },
    '4': {
        id: '4',
        name: 'Student Corner',
        avatar: '/avatars/seller4.jpg',
        coverImage: '/images/cover-student.jpg',
        rating: 4.3,
        reviews: 89,
        followers: 320,
        following: 78,
        products: 156,
        verified: false,
        joinDate: '2024-01-05',
        location: 'Đà Nẵng',
        description: 'Đồ sinh viên giá rẻ, sách vở, đồ dùng học tập. Mình là sinh viên đại học, bán lại đồ cũ để tiết kiệm cho mọi người.',
        responseRate: 85,
        responseTime: '< 3 giờ',
        categories: ['Đồ sinh viên', 'Sách', 'Đồ dùng học tập'],
        badges: ['New Seller'],
        stats: {
            totalSold: 67,
            successRate: 95,
            avgShipTime: '2-4 ngày'
        }
    },
    '5': {
        id: '5',
        name: 'Gadget World',
        avatar: '/avatars/seller5.jpg',
        coverImage: '/images/cover-gadget.jpg',
        rating: 4.7,
        reviews: 312,
        followers: 1850,
        following: 23,
        products: 78,
        verified: true,
        joinDate: '2023-03-25',
        location: 'TP.HCM',
        description: 'Thiết bị công nghệ, gaming gear, phụ kiện cao cấp. Đam mê công nghệ và gaming, mình chia sẻ những sản phẩm tốt nhất đến cộng đồng.',
        responseRate: 97,
        responseTime: '< 1 giờ',
        categories: ['Điện tử', 'Gaming', 'Phụ kiện'],
        badges: ['Gamer', 'Tech Expert', 'Fast Ship'],
        stats: {
            totalSold: 945,
            successRate: 98.8,
            avgShipTime: '1-2 ngày'
        }
    },
    '6': {
        id: '6',
        name: 'Watch Gallery',
        avatar: '/avatars/seller6.jpg',
        coverImage: '/images/cover-watch.jpg',
        rating: 4.95,
        reviews: 189,
        followers: 2100,
        following: 8,
        products: 34,
        verified: true,
        joinDate: '2022-06-18',
        location: 'Hà Nội',
        description: 'Đồng hồ cao cấp, Rolex, Omega, Patek Philippe authentic. Với hơn 10 năm kinh nghiệm trong ngành đồng hồ luxury, chúng tôi cam kết mang đến những sản phẩm chính hãng 100%.',
        responseRate: 100,
        responseTime: '< 15 phút',
        categories: ['Đồng hồ', 'Xa xỉ'],
        badges: ['Watch Expert', 'VIP', 'Top Seller', 'Premium'],
        stats: {
            totalSold: 287,
            successRate: 100,
            avgShipTime: '1 ngày'
        }
    },
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular'

export default function SellerPage() {
    const params = useParams()
    const sellerId = params.id as string

    const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'about'>('products')
    const [sortBy, setSortBy] = useState<SortOption>('newest')
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [isFollowing, setIsFollowing] = useState(false)

    const seller = mockSellers[sellerId]

    // Get seller's products (mock - filter by sellerId)
    const sellerProducts = useMemo(() => {
        // In real app, filter by actual sellerId
        // For now, just take some random products
        let products = mockProducts.slice(0, 12)

        // Sort
        switch (sortBy) {
            case 'price-low':
                products = [...products].sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                products = [...products].sort((a, b) => b.price - a.price)
                break
            case 'popular':
                products = [...products].sort((a, b) => b.views - a.views)
                break
            default:
                products = [...products].sort((a, b) =>
                    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
                )
        }

        return products
    }, [sortBy])

    const sortOptions = [
        { value: 'newest', label: 'Mới nhất' },
        { value: 'price-low', label: 'Giá thấp → cao' },
        { value: 'price-high', label: 'Giá cao → thấp' },
        { value: 'popular', label: 'Phổ biến nhất' },
    ]

    // Mock reviews
    const mockReviews = [
        { id: 1, user: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm chính hãng, đóng gói cẩn thận. Giao hàng nhanh, sẽ ủng hộ shop lần sau!', date: '2025-01-15', product: 'iPhone 14 Pro Max' },
        { id: 2, user: 'Trần Thị B', rating: 5, comment: 'Shop tư vấn nhiệt tình, sản phẩm đúng mô tả. Rất hài lòng!', date: '2025-01-10', product: 'MacBook Pro M2' },
        { id: 3, user: 'Lê Văn C', rating: 4, comment: 'Hàng tốt, giao hàng nhanh. Chỉ có điều đóng gói có thể cải thiện thêm.', date: '2025-01-08', product: 'AirPods Pro 2' },
        { id: 4, user: 'Phạm Thị D', rating: 5, comment: 'Mua lần 3 rồi, shop uy tín lắm. Recommend cho mọi người!', date: '2025-01-05', product: 'Apple Watch Series 8' },
    ]

    if (!seller) {
        return (
            <main className="min-h-screen bg-brand-cream">
                <Header />
                <div className="pt-28 pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-2xl font-bold text-slate-700">Không tìm thấy người bán</h1>
                        <Link href="/search" className="text-brand-orange hover:underline mt-4 inline-block">
                            Quay lại tìm kiếm
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    const joinDate = new Date(seller.joinDate)
    const memberSince = `${joinDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}`

    return (
        <main className="min-h-screen bg-brand-cream">
            <Header />

            <div className="pt-20">
                {/* Cover & Profile Header */}
                <div className="relative">
                    {/* Cover Image */}
                    <div className="h-48 md:h-64 bg-gradient-to-r from-brand-green to-emerald-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#grid)" />
                            </svg>
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl border border-slate-100 -mt-20 relative z-10 overflow-hidden"
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center text-white font-bold text-5xl shadow-lg">
                                                {seller.name.charAt(0)}
                                            </div>
                                            {seller.verified && (
                                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                                                    <ShieldCheck className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{seller.name}</h1>
                                                    {seller.verified && (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Đã xác minh
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {seller.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        Tham gia {memberSince}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        Phản hồi {seller.responseTime}
                                                    </span>
                                                </div>

                                                <p className="text-slate-600 max-w-2xl">{seller.description}</p>

                                                {/* Badges */}
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {seller.badges.map((badge) => (
                                                        <span key={badge} className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-full flex items-center gap-1">
                                                            <Award className="w-3 h-3" />
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setIsFollowing(!isFollowing)}
                                                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${isFollowing
                                                            ? 'bg-slate-200 text-slate-700'
                                                            : 'bg-brand-green text-white hover:bg-brand-green/90'
                                                        }`}
                                                >
                                                    {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
                                                </button>
                                                <Link
                                                    href={`/messages?seller=${seller.id}`}
                                                    className="px-6 py-3 bg-white border-2 border-brand-green text-brand-green rounded-xl font-semibold hover:bg-brand-green hover:text-white transition-all flex items-center gap-2"
                                                >
                                                    <MessageSquare className="w-5 h-5" />
                                                    Nhắn tin
                                                </Link>
                                                <button className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300">
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-100">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                                            <Star className="w-5 h-5 fill-yellow-500" />
                                            <span className="text-2xl font-bold text-slate-800">{seller.rating}</span>
                                        </div>
                                        <p className="text-sm text-slate-500">{seller.reviews} đánh giá</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-800">{seller.products}</p>
                                        <p className="text-sm text-slate-500">Sản phẩm</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-800">{seller.followers.toLocaleString()}</p>
                                        <p className="text-sm text-slate-500">Người theo dõi</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-800">{seller.stats.totalSold.toLocaleString()}</p>
                                        <p className="text-sm text-slate-500">Đã bán</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-emerald-600">{seller.stats.successRate}%</p>
                                        <p className="text-sm text-slate-500">Tỷ lệ thành công</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="border-t border-slate-100">
                                <div className="flex">
                                    <button
                                        onClick={() => setActiveTab('products')}
                                        className={`flex-1 py-4 font-semibold transition-all border-b-2 ${activeTab === 'products'
                                                ? 'text-brand-green border-brand-green'
                                                : 'text-slate-500 border-transparent hover:text-brand-green'
                                            }`}
                                    >
                                        <Package className="w-5 h-5 inline mr-2" />
                                        Sản phẩm ({seller.products})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`flex-1 py-4 font-semibold transition-all border-b-2 ${activeTab === 'reviews'
                                                ? 'text-brand-green border-brand-green'
                                                : 'text-slate-500 border-transparent hover:text-brand-green'
                                            }`}
                                    >
                                        <Star className="w-5 h-5 inline mr-2" />
                                        Đánh giá ({seller.reviews})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className={`flex-1 py-4 font-semibold transition-all border-b-2 ${activeTab === 'about'
                                                ? 'text-brand-green border-brand-green'
                                                : 'text-slate-500 border-transparent hover:text-brand-green'
                                            }`}
                                    >
                                        <Users className="w-5 h-5 inline mr-2" />
                                        Giới thiệu
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="container mx-auto px-4 py-8">
                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Controls */}
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-slate-500">
                                    Hiển thị <span className="font-semibold text-slate-800">{sellerProducts.length}</span> sản phẩm
                                </p>

                                <div className="flex items-center gap-3">
                                    {/* View Toggle */}
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

                                    {/* Sort */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowSortDropdown(!showSortDropdown)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-medium"
                                        >
                                            <Filter className="w-4 h-4" />
                                            {sortOptions.find(o => o.value === sortBy)?.label}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                                        </button>

                                        {showSortDropdown && (
                                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 min-w-[160px]">
                                                {sortOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => {
                                                            setSortBy(option.value as SortOption)
                                                            setShowSortDropdown(false)
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm ${sortBy === option.value
                                                                ? 'bg-brand-green/10 text-brand-green font-medium'
                                                                : 'text-slate-600 hover:bg-slate-50'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                    : 'grid-cols-1'
                                }`}>
                                {sellerProducts.map((product, index) => (
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
                                            <div className={`relative bg-slate-100 overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'h-56'
                                                }`}>
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${product.trustScore >= 90 ? 'bg-emerald-500 text-white' : 'bg-yellow-500 text-white'
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

                                            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-3xl mx-auto space-y-4"
                        >
                            {/* Rating Summary */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 mb-6">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-5xl font-bold text-brand-green">{seller.rating}</p>
                                        <div className="flex items-center justify-center gap-1 my-2">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} className={`w-5 h-5 ${i <= Math.round(seller.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-slate-500">{seller.reviews} đánh giá</p>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        {[5, 4, 3, 2, 1].map((stars) => {
                                            const percentage = stars === 5 ? 75 : stars === 4 ? 20 : 5
                                            return (
                                                <div key={stars} className="flex items-center gap-2">
                                                    <span className="text-sm text-slate-600 w-12">{stars} sao</span>
                                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-yellow-500" style={{ width: `${percentage}%` }} />
                                                    </div>
                                                    <span className="text-sm text-slate-500 w-10">{percentage}%</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Reviews List */}
                            {mockReviews.map((review) => (
                                <div key={review.id} className="bg-white rounded-2xl p-5 border border-slate-100">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold">
                                                {review.user.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-800">{review.user}</h4>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                    <p className="text-slate-600 mb-2">{review.comment}</p>
                                    <p className="text-xs text-slate-400">Sản phẩm: {review.product}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* About Tab */}
                    {activeTab === 'about' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-6">
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-2">Giới thiệu</h3>
                                    <p className="text-slate-600">{seller.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm text-slate-500 mb-1">Địa điểm</h4>
                                        <p className="font-medium text-slate-800">{seller.location}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-slate-500 mb-1">Tham gia</h4>
                                        <p className="font-medium text-slate-800">{memberSince}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-slate-500 mb-1">Tỷ lệ phản hồi</h4>
                                        <p className="font-medium text-slate-800">{seller.responseRate}%</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-slate-500 mb-1">Thời gian phản hồi</h4>
                                        <p className="font-medium text-slate-800">{seller.responseTime}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-slate-500 mb-1">Thời gian giao hàng</h4>
                                        <p className="font-medium text-slate-800">{seller.stats.avgShipTime}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-slate-500 mb-1">Danh mục</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {seller.categories.map((cat) => (
                                                <span key={cat} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
                                        <Flag className="w-4 h-4" />
                                        Báo cáo người bán này
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </main>
    )
}
