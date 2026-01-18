// Mock product database
export interface Product {
    id: number
    name: string
    description: string
    price: number
    originalPrice?: number
    trustScore: number
    hasReview: boolean
    views: number
    likes: number
    image: string
    images?: string[]
    category: string
    condition: 'Mới' | 'Như mới' | 'Tốt' | 'Đã sử dụng'
    seller: string
    sellerId: string
    postedDate: string
    specifications?: { [key: string]: string }
    reviewerId?: string
    reviewStatus?: 'pending' | 'approved' | 'rejected'
    reviewNote?: string
}

export const mockProducts: Product[] = [
    {
        id: 1,
        name: 'iPhone 13 Pro Max 256GB',
        description: 'iPhone 13 Pro Max màu Xanh Sierra, fullbox, pin 95%. Máy đẹp như mới, không trầy xước. Đã được kiểm định chính hãng bởi chuyên gia.',
        price: 15500000,
        originalPrice: 29990000,
        trustScore: 95,
        hasReview: true,
        views: 1250,
        likes: 89,
        image: '/images/product-1.jpg',
        images: ['/images/product-1.jpg', '/images/product-1.jpg', '/images/product-1.jpg'],
        category: 'Điện tử',
        condition: 'Như mới',
        seller: 'Nguyễn Văn A',
        sellerId: '1',
        postedDate: '2025-01-15',
        specifications: {
            'Dung lượng': '256GB',
            'Màu sắc': 'Xanh Sierra',
            'Pin': '95%',
            'Bảo hành': '3 tháng'
        },
        reviewerId: '3',
        reviewStatus: 'approved',
        reviewNote: 'Máy chính hãng Apple, hoạt động tốt.'
    },
    {
        id: 2,
        name: 'MacBook Pro M1 2021 14 inch',
        description: 'MacBook Pro M1 Pro chip, 16GB RAM, 512GB SSD. Máy đẹp, pin cycle 45. Fullbox đầy đủ phụ kiện.',
        price: 28000000,
        originalPrice: 52990000,
        trustScore: 92,
        hasReview: true,
        views: 890,
        likes: 65,
        image: '/images/product-2.jpg',
        images: ['/images/product-2.jpg', '/images/product-2.jpg'],
        category: 'Điện tử',
        condition: 'Đã sử dụng',
        seller: 'Trần Thị B',
        sellerId: '2',
        postedDate: '2025-01-10',
        specifications: {
            'RAM': '16GB',
            'SSD': '512GB',
            'Chip': 'M1 Pro',
            'Pin cycle': '45'
        },
        reviewerId: '3',
        reviewStatus: 'approved'
    },
    {
        id: 3,
        name: 'Túi Gucci GG Marmont Small',
        description: 'Túi Gucci GG Marmont size small, da bê, màu đen. Hàng auth 100%, mua tại Store Việt Nam, có hóa đơn.',
        price: 35000000,
        originalPrice: 55000000,
        trustScore: 98,
        hasReview: true,
        views: 2100,
        likes: 156,
        image: '/images/product-3.jpg',
        category: 'Xa xỉ',
        condition: 'Như mới',
        seller: 'Lê Văn C',
        sellerId: '3',
        postedDate: '2025-01-12',
        specifications: {
            'Thương hiệu': 'Gucci',
            'Chất liệu': 'Da bê',
            'Size': 'Small',
            'Xuất xứ': 'Made in Italy'
        },
        reviewerId: '4',
        reviewStatus: 'approved',
        reviewNote: 'Hàng authentic, đầy đủ hồ sơ.'
    },
    {
        id: 4,
        name: 'Apple Watch Series 7 45mm GPS',
        description: 'Apple Watch Series 7 GPS, 45mm, vỏ nhôm màu Midnight. Pin khỏe, máy đẹp không trầy.',
        price: 7500000,
        originalPrice: 12990000,
        trustScore: 88,
        hasReview: false,
        views: 650,
        likes: 42,
        image: '/images/product-4.jpg',
        category: 'Điện tử',
        condition: 'Tốt',
        seller: 'Phạm Thị D',
        sellerId: '4',
        postedDate: '2025-01-18',
        specifications: {
            'Size': '45mm',
            'Kết nối': 'GPS',
            'Vỏ': 'Nhôm Midnight'
        }
    },
    {
        id: 5,
        name: 'Samsung Galaxy S23 Ultra 512GB',
        description: 'Samsung Galaxy S23 Ultra, 512GB, màu Tím Lavender. Fullbox, BHDT còn 8 tháng. Máy như mới 99%.',
        price: 18500000,
        originalPrice: 31990000,
        trustScore: 93,
        hasReview: true,
        views: 1100,
        likes: 78,
        image: '/images/product-5.png',
        category: 'Điện tử',
        condition: 'Như mới',
        seller: 'Hoàng Văn E',
        sellerId: '5',
        postedDate: '2025-01-08',
        specifications: {
            'Dung lượng': '512GB',
            'RAM': '12GB',
            'Màu sắc': 'Tím Lavender',
            'BHDT': '8 tháng'
        },
        reviewerId: '5',
        reviewStatus: 'approved'
    },
    {
        id: 6,
        name: 'PlayStation 5 Digital Edition',
        description: 'PS5 Digital Edition, fullbox, đầy đủ phụ kiện. Máy ít sử dụng, còn bảo hành Sony. Tặng thêm 2 game.',
        price: 9800000,
        originalPrice: 14990000,
        trustScore: 91,
        hasReview: true,
        views: 1450,
        likes: 112,
        image: '/images/product-6.png',
        category: 'Điện tử',
        condition: 'Như mới',
        seller: 'Đinh Văn F',
        sellerId: '6',
        postedDate: '2025-01-14',
        specifications: {
            'Phiên bản': 'Digital Edition',
            'Dung lượng': '825GB SSD',
            'Phụ kiện': 'Fullbox + 2 games',
            'Bảo hành': 'Sony VN 6 tháng'
        },
        reviewerId: '3',
        reviewStatus: 'approved'
    },
    {
        id: 7,
        name: 'Rolex Submariner Date 41mm',
        description: 'Rolex Submariner Date ref.126610LN, sản xuất 2023, fullset, card đầy đủ. Hàng authentic 100%.',
        price: 285000000,
        originalPrice: 320000000,
        trustScore: 99,
        hasReview: true,
        views: 3200,
        likes: 245,
        image: '/images/product-7.png',
        category: 'Đồng hồ',
        condition: 'Như mới',
        seller: 'Nguyễn Hoàng G',
        sellerId: '7',
        postedDate: '2025-01-05',
        specifications: {
            'Thương hiệu': 'Rolex',
            'Model': 'Submariner Date',
            'Ref': '126610LN',
            'Năm SX': '2023',
            'Đường kính': '41mm'
        },
        reviewerId: '6',
        reviewStatus: 'approved',
        reviewNote: 'Đồng hồ chính hãng, fullset papers.'
    },
    {
        id: 8,
        name: 'Túi Chanel Classic Medium',
        description: 'Túi Chanel Classic Flap Medium, da lambskin, màu đen, khóa vàng. Hàng vintage năm 2018, tình trạng 85%.',
        price: 95000000,
        originalPrice: 150000000,
        trustScore: 94,
        hasReview: true,
        views: 1890,
        likes: 167,
        image: '/images/product-8.png',
        category: 'Xa xỉ',
        condition: 'Đã sử dụng',
        seller: 'Trần Thị H',
        sellerId: '8',
        postedDate: '2025-01-11',
        specifications: {
            'Thương hiệu': 'Chanel',
            'Model': 'Classic Flap',
            'Size': 'Medium 25cm',
            'Chất liệu': 'Lambskin',
            'Năm': '2018'
        },
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    {
        id: 9,
        name: 'Nike Air Jordan 1 Retro High OG Chicago',
        description: 'Jordan 1 Chicago 2022, size 42.5, DS (deadstock chưa qua sử dụng). Fullbox, có receipt.',
        price: 8500000,
        originalPrice: 12000000,
        trustScore: 96,
        hasReview: true,
        views: 2340,
        likes: 198,
        image: '/images/product-9.png',
        category: 'Thời trang',
        condition: 'Mới',
        seller: 'Lê Quang I',
        sellerId: '9',
        postedDate: '2025-01-16',
        specifications: {
            'Thương hiệu': 'Nike / Jordan',
            'Model': 'Air Jordan 1 Retro High OG',
            'Colorway': 'Chicago',
            'Size': '42.5 EU',
            'Tình trạng': 'Deadstock'
        },
        reviewerId: '5',
        reviewStatus: 'approved'
    },
    {
        id: 10,
        name: 'Canon EOS R5 Body',
        description: 'Canon EOS R5 body only, shutter count 15k. Máy đẹp, hoạt động hoàn hảo. Fullbox đầy đủ phụ kiện gốc.',
        price: 65000000,
        originalPrice: 99990000,
        trustScore: 90,
        hasReview: true,
        views: 780,
        likes: 56,
        image: '/images/product-10.png',
        category: 'Điện tử',
        condition: 'Tốt',
        seller: 'Phạm Minh J',
        sellerId: '10',
        postedDate: '2025-01-09',
        specifications: {
            'Thương hiệu': 'Canon',
            'Model': 'EOS R5',
            'Shutter count': '15,000',
            'Video': '8K RAW',
            'Sensor': '45MP Full-frame'
        },
        reviewerId: '4',
        reviewStatus: 'approved'
    },
    {
        id: 11,
        name: 'Dyson Supersonic Hair Dryer',
        description: 'Dyson Supersonic máy sấy tóc, màu Fuchsia/Nickel. Mới 99%, fullbox, mua tại Dyson VN.',
        price: 8900000,
        originalPrice: 13900000,
        trustScore: 89,
        hasReview: false,
        views: 520,
        likes: 38,
        image: '/images/product-11.png',
        category: 'Điện tử',
        condition: 'Như mới',
        seller: 'Nguyễn Thị K',
        sellerId: '11',
        postedDate: '2025-01-17',
        specifications: {
            'Thương hiệu': 'Dyson',
            'Model': 'Supersonic HD03',
            'Màu': 'Fuchsia/Nickel',
            'Phụ kiện': 'Đủ 5 đầu'
        }
    },
    {
        id: 12,
        name: 'Ray-Ban Aviator Classic',
        description: 'Kính Ray-Ban Aviator Classic, gọng vàng, lens G-15 xanh lá. Hàng auth, fullbox.',
        price: 2800000,
        originalPrice: 4500000,
        trustScore: 87,
        hasReview: true,
        views: 445,
        likes: 29,
        image: '/images/product-12.png',
        category: 'Thời trang',
        condition: 'Như mới',
        seller: 'Trần Văn L',
        sellerId: '12',
        postedDate: '2025-01-13',
        specifications: {
            'Thương hiệu': 'Ray-Ban',
            'Model': 'Aviator RB3025',
            'Lens': 'G-15 Green',
            'Gọng': 'Gold'
        },
        reviewerId: '5',
        reviewStatus: 'approved'
    },
    {
        id: 13,
        name: 'Louis Vuitton Neverfull MM',
        description: 'LV Neverfull MM Monogram, da canvas, túi mẹ con. Hàng năm 2022, tình trạng 90%.',
        price: 28000000,
        originalPrice: 42000000,
        trustScore: 95,
        hasReview: true,
        views: 1560,
        likes: 134,
        image: '/images/product-3.jpg',
        category: 'Xa xỉ',
        condition: 'Đã sử dụng',
        seller: 'Vũ Thị M',
        sellerId: '13',
        postedDate: '2025-01-07',
        specifications: {
            'Thương hiệu': 'Louis Vuitton',
            'Model': 'Neverfull MM',
            'Họa tiết': 'Monogram',
            'Năm': '2022',
            'Chất liệu': 'Canvas'
        },
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    {
        id: 14,
        name: 'iPad Pro 12.9 inch M2 256GB WiFi',
        description: 'iPad Pro 12.9 inch M2 chip, 256GB WiFi, màu Space Gray. Fullbox, BHDT còn 10 tháng.',
        price: 22000000,
        originalPrice: 32990000,
        trustScore: 91,
        hasReview: true,
        views: 980,
        likes: 71,
        image: '/images/product-1.jpg',
        category: 'Điện tử',
        condition: 'Như mới',
        seller: 'Đỗ Văn N',
        sellerId: '14',
        postedDate: '2025-01-06',
        specifications: {
            'Chip': 'M2',
            'Dung lượng': '256GB',
            'Kết nối': 'WiFi',
            'Màn hình': '12.9 inch Liquid Retina XDR'
        },
        reviewerId: '4',
        reviewStatus: 'approved'
    },
    {
        id: 15,
        name: 'Omega Seamaster Diver 300M',
        description: 'Omega Seamaster 300M Blue dial, ref.210.30.42.20.03.001. Năm 2024, fullset warranty card còn hiệu lực.',
        price: 115000000,
        originalPrice: 148000000,
        trustScore: 97,
        hasReview: true,
        views: 1120,
        likes: 89,
        image: '/images/product-7.png',
        category: 'Đồng hồ',
        condition: 'Như mới',
        seller: 'Hoàng Minh O',
        sellerId: '15',
        postedDate: '2025-01-04',
        specifications: {
            'Thương hiệu': 'Omega',
            'Model': 'Seamaster Diver 300M',
            'Đường kính': '42mm',
            'Chống nước': '300m',
            'Movement': 'Co-Axial Master Chronometer'
        },
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    {
        id: 16,
        name: 'AirPods Pro 2nd Generation USB-C',
        description: 'AirPods Pro 2 phiên bản USB-C, fullbox seal 100%. Hàng VN/A chính hãng Apple.',
        price: 4800000,
        originalPrice: 6990000,
        trustScore: 94,
        hasReview: true,
        views: 2890,
        likes: 215,
        image: '/images/product-4.jpg',
        category: 'Điện tử',
        condition: 'Mới',
        seller: 'Nguyễn Thành P',
        sellerId: '16',
        postedDate: '2025-01-19',
        specifications: {
            'Model': 'AirPods Pro 2nd Gen',
            'Cổng sạc': 'USB-C',
            'Tính năng': 'ANC, Transparency Mode',
            'Bảo hành': 'Apple VN 12 tháng'
        },
        reviewerId: '4',
        reviewStatus: 'approved'
    }
]

// Get products by category
export function getProductsByCategory(category: string): Product[] {
    if (category === 'Tất cả') return mockProducts
    return mockProducts.filter(p => p.category === category)
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
    return mockProducts.find(p => p.id === id)
}

// Get featured products (high trust score)
export function getFeaturedProducts(limit: number = 6): Product[] {
    return [...mockProducts]
        .sort((a, b) => b.trustScore - a.trustScore)
        .slice(0, limit)
}

// Get popular products (most views)
export function getPopularProducts(limit: number = 6): Product[] {
    return [...mockProducts]
        .sort((a, b) => b.views - a.views)
        .slice(0, limit)
}

// Get products by seller
export function getProductsBySeller(sellerId: string): Product[] {
    return mockProducts.filter(p => p.sellerId === sellerId)
}

// Get verified products (has expert review)
export function getVerifiedProducts(): Product[] {
    return mockProducts.filter(p => p.hasReview && p.reviewStatus === 'approved')
}

// Search products
export function searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase()
    return mockProducts.filter(p =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.category.toLowerCase().includes(lowercaseQuery)
    )
}

// Get all categories
export function getCategories(): string[] {
    const categories = new Set(mockProducts.map(p => p.category))
    return ['Tất cả', ...Array.from(categories)]
}
