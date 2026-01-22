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
    subcategory?: string
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
    // ==================== ĐIỆN TỬ ====================
    // Điện thoại - iPhone
    {
        id: 1,
        name: 'iPhone 13 Pro Max 256GB',
        description: 'iPhone 13 Pro Max màu Xanh Sierra, fullbox, pin 95%. Máy đẹp như mới, không trầy xước.',
        price: 15500000,
        originalPrice: 29990000,
        trustScore: 95,
        hasReview: true,
        views: 1250,
        likes: 89,
        image: '/images/product-1.jpg',
        images: ['/images/product-1.jpg', '/images/product-1.jpg', '/images/product-1.jpg'],
        category: 'Điện tử',
        subcategory: 'iphone',
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
        name: 'iPhone 14 Pro 128GB Deep Purple',
        description: 'iPhone 14 Pro màu tím, Dynamic Island, camera 48MP. Pin 92%, fullbox có sạc.',
        price: 19800000,
        originalPrice: 27990000,
        trustScore: 94,
        hasReview: true,
        views: 980,
        likes: 72,
        image: '/images/product-1.jpg',
        category: 'Điện tử',
        subcategory: 'iphone',
        condition: 'Như mới',
        seller: 'Trần Minh B',
        sellerId: '2',
        postedDate: '2025-01-18',
        reviewerId: '4',
        reviewStatus: 'approved'
    },
    // Điện thoại - Samsung
    {
        id: 3,
        name: 'Samsung Galaxy S23 Ultra 512GB',
        description: 'Samsung Galaxy S23 Ultra, 512GB, màu Tím Lavender. Fullbox, BHDT còn 8 tháng.',
        price: 18500000,
        originalPrice: 31990000,
        trustScore: 93,
        hasReview: true,
        views: 1100,
        likes: 78,
        image: '/images/product-5.png',
        category: 'Điện tử',
        subcategory: 'samsung',
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
        id: 4,
        name: 'Samsung Galaxy Z Fold 5 256GB',
        description: 'Galaxy Z Fold 5 màu đen, gập như mới, không nếp gấp rõ. Fullbox.',
        price: 28000000,
        originalPrice: 40990000,
        trustScore: 91,
        hasReview: true,
        views: 750,
        likes: 45,
        image: '/images/product-5.png',
        category: 'Điện tử',
        subcategory: 'samsung',
        condition: 'Như mới',
        seller: 'Lê Văn C',
        sellerId: '3',
        postedDate: '2025-01-10',
        reviewerId: '4',
        reviewStatus: 'approved'
    },
    // Laptop - MacBook
    {
        id: 5,
        name: 'MacBook Pro M1 2021 14 inch',
        description: 'MacBook Pro M1 Pro chip, 16GB RAM, 512GB SSD. Máy đẹp, pin cycle 45.',
        price: 28000000,
        originalPrice: 52990000,
        trustScore: 92,
        hasReview: true,
        views: 890,
        likes: 65,
        image: '/images/product-2.jpg',
        images: ['/images/product-2.jpg', '/images/product-2.jpg'],
        category: 'Điện tử',
        subcategory: 'macbook',
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
        id: 6,
        name: 'MacBook Air M2 2022 256GB',
        description: 'MacBook Air M2 màu Midnight, 8GB RAM, 256GB. Pin cycle 20, như mới.',
        price: 22000000,
        originalPrice: 32990000,
        trustScore: 90,
        hasReview: true,
        views: 650,
        likes: 48,
        image: '/images/product-2.jpg',
        category: 'Điện tử',
        subcategory: 'macbook',
        condition: 'Như mới',
        seller: 'Phạm Văn D',
        sellerId: '4',
        postedDate: '2025-01-12',
        reviewerId: '5',
        reviewStatus: 'approved'
    },
    // Đồng hồ thông minh - Apple Watch
    {
        id: 7,
        name: 'Apple Watch Series 7 45mm GPS',
        description: 'Apple Watch Series 7 GPS, 45mm, vỏ nhôm màu Midnight. Pin khỏe, máy đẹp.',
        price: 7500000,
        originalPrice: 12990000,
        trustScore: 88,
        hasReview: false,
        views: 650,
        likes: 42,
        image: '/images/product-4.jpg',
        category: 'Điện tử',
        subcategory: 'apple-watch',
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
        id: 8,
        name: 'Apple Watch Ultra 2 Titanium',
        description: 'Apple Watch Ultra 2 vỏ Titanium, fullbox, chưa active, seal nguyên.',
        price: 18500000,
        originalPrice: 23990000,
        trustScore: 96,
        hasReview: true,
        views: 520,
        likes: 38,
        image: '/images/product-4.jpg',
        category: 'Điện tử',
        subcategory: 'apple-watch',
        condition: 'Mới',
        seller: 'Tech Store HN',
        sellerId: '10',
        postedDate: '2025-01-19',
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    // Đồ gia dụng
    {
        id: 9,
        name: 'Dyson Supersonic Hair Dryer',
        description: 'Dyson Supersonic máy sấy tóc, màu Fuchsia. Mới 99%, fullbox, mua tại Dyson VN.',
        price: 8900000,
        originalPrice: 13900000,
        trustScore: 89,
        hasReview: false,
        views: 520,
        likes: 38,
        image: '/images/product-11.png',
        category: 'Điện tử',
        subcategory: 'may-say-toc',
        condition: 'Như mới',
        seller: 'Nguyễn Thị K',
        sellerId: '11',
        postedDate: '2025-01-17',
        specifications: {
            'Thương hiệu': 'Dyson',
            'Model': 'Supersonic HD03',
            'Màu': 'Fuchsia/Nickel'
        }
    },
    // Gaming
    {
        id: 10,
        name: 'PlayStation 5 Digital Edition',
        description: 'PS5 Digital Edition, fullbox, đầy đủ phụ kiện. Máy ít sử dụng, còn bảo hành Sony.',
        price: 9800000,
        originalPrice: 14990000,
        trustScore: 91,
        hasReview: true,
        views: 1450,
        likes: 112,
        image: '/images/product-6.png',
        category: 'Điện tử',
        subcategory: 'gaming',
        condition: 'Như mới',
        seller: 'Đinh Văn F',
        sellerId: '6',
        postedDate: '2025-01-14',
        specifications: {
            'Phiên bản': 'Digital Edition',
            'Dung lượng': '825GB SSD'
        },
        reviewerId: '3',
        reviewStatus: 'approved'
    },
    // Tai nghe
    {
        id: 11,
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
        subcategory: 'tai-nghe',
        condition: 'Mới',
        seller: 'Nguyễn Thành P',
        sellerId: '16',
        postedDate: '2025-01-19',
        reviewerId: '4',
        reviewStatus: 'approved'
    },
    // Tablet
    {
        id: 12,
        name: 'iPad Pro 12.9 inch M2 256GB WiFi',
        description: 'iPad Pro 12.9 inch M2 chip, 256GB WiFi, màu Space Gray. Fullbox.',
        price: 22000000,
        originalPrice: 32990000,
        trustScore: 91,
        hasReview: true,
        views: 980,
        likes: 71,
        image: '/images/product-1.jpg',
        category: 'Điện tử',
        subcategory: 'tablet',
        condition: 'Như mới',
        seller: 'Đỗ Văn N',
        sellerId: '14',
        postedDate: '2025-01-06',
        reviewerId: '4',
        reviewStatus: 'approved'
    },

    // ==================== THỜI TRANG ====================
    // Giày dép - Nike/Jordan
    {
        id: 13,
        name: 'Nike Air Jordan 1 Retro High OG Chicago',
        description: 'Jordan 1 Chicago 2022, size 42.5, DS (deadstock chưa qua sử dụng). Fullbox.',
        price: 8500000,
        originalPrice: 12000000,
        trustScore: 96,
        hasReview: true,
        views: 2340,
        likes: 198,
        image: '/images/product-9.png',
        category: 'Thời trang',
        subcategory: 'jordan',
        condition: 'Mới',
        seller: 'Lê Quang I',
        sellerId: '9',
        postedDate: '2025-01-16',
        specifications: {
            'Size': '42.5 EU',
            'Tình trạng': 'Deadstock'
        },
        reviewerId: '5',
        reviewStatus: 'approved'
    },
    {
        id: 14,
        name: 'Nike Dunk Low Panda',
        description: 'Nike Dunk Low màu Panda đen trắng, size 41, worn 2 lần. Fullbox có hoá đơn.',
        price: 2800000,
        originalPrice: 3500000,
        trustScore: 88,
        hasReview: false,
        views: 890,
        likes: 67,
        image: '/images/product-9.png',
        category: 'Thời trang',
        subcategory: 'nike',
        condition: 'Như mới',
        seller: 'Trần Văn H',
        sellerId: '8',
        postedDate: '2025-01-14'
    },
    // Túi xách - Luxury brands
    {
        id: 15,
        name: 'Túi Gucci GG Marmont Small',
        description: 'Túi Gucci GG Marmont size small, da bê, màu đen. Hàng auth 100%, có hóa đơn.',
        price: 35000000,
        originalPrice: 55000000,
        trustScore: 98,
        hasReview: true,
        views: 2100,
        likes: 156,
        image: '/images/product-3.jpg',
        category: 'Thời trang',
        subcategory: 'gucci',
        condition: 'Như mới',
        seller: 'Lê Văn C',
        sellerId: '3',
        postedDate: '2025-01-12',
        specifications: {
            'Thương hiệu': 'Gucci',
            'Chất liệu': 'Da bê',
            'Size': 'Small'
        },
        reviewerId: '4',
        reviewStatus: 'approved'
    },
    {
        id: 16,
        name: 'Túi Chanel Classic Medium',
        description: 'Túi Chanel Classic Flap Medium, da lambskin, màu đen, khóa vàng. Tình trạng 85%.',
        price: 95000000,
        originalPrice: 150000000,
        trustScore: 94,
        hasReview: true,
        views: 1890,
        likes: 167,
        image: '/images/product-8.png',
        category: 'Thời trang',
        subcategory: 'chanel',
        condition: 'Đã sử dụng',
        seller: 'Trần Thị H',
        sellerId: '8',
        postedDate: '2025-01-11',
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    {
        id: 17,
        name: 'Louis Vuitton Neverfull MM',
        description: 'LV Neverfull MM Monogram, da canvas, túi mẹ con. Năm 2022, tình trạng 90%.',
        price: 28000000,
        originalPrice: 42000000,
        trustScore: 95,
        hasReview: true,
        views: 1560,
        likes: 134,
        image: '/images/product-3.jpg',
        category: 'Thời trang',
        subcategory: 'louis-vuitton',
        condition: 'Đã sử dụng',
        seller: 'Vũ Thị M',
        sellerId: '13',
        postedDate: '2025-01-07',
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    // Đồng hồ
    {
        id: 18,
        name: 'Rolex Submariner Date 41mm',
        description: 'Rolex Submariner Date ref.126610LN, sản xuất 2023, fullset, card đầy đủ.',
        price: 285000000,
        originalPrice: 320000000,
        trustScore: 99,
        hasReview: true,
        views: 3200,
        likes: 245,
        image: '/images/product-7.png',
        category: 'Thời trang',
        subcategory: 'rolex',
        condition: 'Như mới',
        seller: 'Nguyễn Hoàng G',
        sellerId: '7',
        postedDate: '2025-01-05',
        specifications: {
            'Ref': '126610LN',
            'Năm SX': '2023',
            'Đường kính': '41mm'
        },
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    {
        id: 19,
        name: 'Omega Seamaster Diver 300M',
        description: 'Omega Seamaster 300M Blue dial, năm 2024, fullset warranty card.',
        price: 115000000,
        originalPrice: 148000000,
        trustScore: 97,
        hasReview: true,
        views: 1120,
        likes: 89,
        image: '/images/product-7.png',
        category: 'Thời trang',
        subcategory: 'omega',
        condition: 'Như mới',
        seller: 'Hoàng Minh O',
        sellerId: '15',
        postedDate: '2025-01-04',
        reviewerId: '6',
        reviewStatus: 'approved'
    },
    // Kính mắt
    {
        id: 20,
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
        subcategory: 'kinh-mat',
        condition: 'Như mới',
        seller: 'Trần Văn L',
        sellerId: '12',
        postedDate: '2025-01-13',
        reviewerId: '5',
        reviewStatus: 'approved'
    },

    // ==================== ĐỒ SINH VIÊN ====================
    // Sách & Giáo trình - CNTT
    {
        id: 21,
        name: 'Giáo trình Lập trình Python cơ bản',
        description: 'Sách học Python từ cơ bản đến nâng cao, bản tiếng Việt. Sách mới 95%, có ghi chú.',
        price: 85000,
        originalPrice: 150000,
        trustScore: 82,
        hasReview: false,
        views: 234,
        likes: 18,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'cntt',
        condition: 'Tốt',
        seller: 'Sinh viên CNTT',
        sellerId: '20',
        postedDate: '2025-01-19'
    },
    {
        id: 22,
        name: 'Combo 5 sách Java + Spring Boot',
        description: 'Bộ 5 cuốn sách học Java và Spring Boot. Sách tiếng Anh, tình trạng tốt.',
        price: 350000,
        originalPrice: 800000,
        trustScore: 85,
        hasReview: false,
        views: 189,
        likes: 12,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'cntt',
        condition: 'Tốt',
        seller: 'Dev Học Hành',
        sellerId: '21',
        postedDate: '2025-01-17'
    },
    // Sách - Kinh tế
    {
        id: 23,
        name: 'Giáo trình Marketing căn bản - Philip Kotler',
        description: 'Sách Marketing căn bản của Philip Kotler, bản dịch tiếng Việt mới nhất.',
        price: 120000,
        originalPrice: 250000,
        trustScore: 80,
        hasReview: false,
        views: 156,
        likes: 9,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'kinh-te',
        condition: 'Như mới',
        seller: 'SV Kinh Tế',
        sellerId: '22',
        postedDate: '2025-01-15'
    },
    // Truyện - Manga
    {
        id: 24,
        name: 'Trọn bộ One Piece tập 1-100',
        description: 'Full bộ manga One Piece từ tập 1 đến 100, bản tiếng Việt. Tình trạng tốt.',
        price: 1800000,
        originalPrice: 3500000,
        trustScore: 88,
        hasReview: false,
        views: 567,
        likes: 45,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'manga',
        condition: 'Tốt',
        seller: 'Otaku Shop',
        sellerId: '23',
        postedDate: '2025-01-12'
    },
    {
        id: 25,
        name: 'Light Novel Sword Art Online Vol 1-10',
        description: 'Bộ Light Novel SAO tiếng Anh từ vol 1 đến 10. Sách mới, bọc bìa cẩn thận.',
        price: 450000,
        originalPrice: 900000,
        trustScore: 86,
        hasReview: false,
        views: 234,
        likes: 28,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'light-novel',
        condition: 'Như mới',
        seller: 'Anime Fan',
        sellerId: '24',
        postedDate: '2025-01-18'
    },
    // Sách self-help
    {
        id: 26,
        name: 'Đắc Nhân Tâm - Dale Carnegie',
        description: 'Sách Đắc Nhân Tâm bản đặc biệt bìa cứng. Sách mới 98%, chưa đọc.',
        price: 75000,
        originalPrice: 120000,
        trustScore: 84,
        hasReview: false,
        views: 345,
        likes: 23,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'self-help',
        condition: 'Như mới',
        seller: 'Book Lover',
        sellerId: '25',
        postedDate: '2025-01-16'
    },
    // Đồ dùng học tập - Balo
    {
        id: 27,
        name: 'Balo Laptop The North Face 17 inch',
        description: 'Balo The North Face chống nước, chứa được laptop 17 inch. Dùng 6 tháng.',
        price: 650000,
        originalPrice: 1500000,
        trustScore: 83,
        hasReview: false,
        views: 189,
        likes: 15,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'balo-tui',
        condition: 'Tốt',
        seller: 'SV Bách Khoa',
        sellerId: '26',
        postedDate: '2025-01-14'
    },
    // Máy tính cầm tay
    {
        id: 28,
        name: 'Máy tính Casio fx-580VN X',
        description: 'Máy tính Casio fx-580VN X, dùng 1 năm, còn hoạt động tốt, full chức năng.',
        price: 280000,
        originalPrice: 550000,
        trustScore: 81,
        hasReview: false,
        views: 123,
        likes: 8,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'may-tinh-cam-tay',
        condition: 'Tốt',
        seller: 'SV Toán',
        sellerId: '27',
        postedDate: '2025-01-10'
    },
    // Xe đạp
    {
        id: 29,
        name: 'Xe đạp Giant ATX 830 2023',
        description: 'Xe đạp địa hình Giant ATX 830, màu xanh. Đi được 500km, bảo dưỡng định kỳ.',
        price: 4500000,
        originalPrice: 7500000,
        trustScore: 87,
        hasReview: false,
        views: 456,
        likes: 34,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'xe-dap',
        condition: 'Tốt',
        seller: 'Cyclist SV',
        sellerId: '28',
        postedDate: '2025-01-08'
    },
    // Đồ phòng trọ
    {
        id: 30,
        name: 'Nồi cơm điện Sharp 1.8L',
        description: 'Nồi cơm điện Sharp 1.8L, mua 1 năm, hoạt động tốt. Phù hợp phòng trọ.',
        price: 350000,
        originalPrice: 750000,
        trustScore: 78,
        hasReview: false,
        views: 89,
        likes: 5,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'do-phong-tro',
        condition: 'Tốt',
        seller: 'SV Ra Trường',
        sellerId: '29',
        postedDate: '2025-01-05'
    },
    // Đồ linh tinh
    {
        id: 31,
        name: 'Quạt mini USB văn phòng',
        description: 'Quạt mini cắm USB, 3 tốc độ, pin sạc. Dùng cho laptop khi học.',
        price: 45000,
        originalPrice: 120000,
        trustScore: 75,
        hasReview: false,
        views: 67,
        likes: 3,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'do-linh-tinh',
        condition: 'Tốt',
        seller: 'SV Ktx',
        sellerId: '30',
        postedDate: '2025-01-19'
    },
    {
        id: 32,
        name: 'Đèn học LED chống cận',
        description: 'Đèn học LED 3 chế độ sáng, chống cận thị. Còn bảo hành 6 tháng.',
        price: 180000,
        originalPrice: 350000,
        trustScore: 80,
        hasReview: false,
        views: 134,
        likes: 11,
        image: '/images/product-1.jpg',
        category: 'Đồ sinh viên',
        subcategory: 'do-linh-tinh',
        condition: 'Như mới',
        seller: 'SV Y Học',
        sellerId: '31',
        postedDate: '2025-01-17'
    },
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

// Get products by subcategory
export function getProductsBySubcategory(subcategory: string): Product[] {
    return mockProducts.filter(p => p.subcategory === subcategory)
}
