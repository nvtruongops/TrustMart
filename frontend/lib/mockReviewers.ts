// Mock reviewer database
export interface Reviewer {
    id: string
    name: string
    email: string
    avatar: string
    phone?: string
    bio: string
    expertise: string[]
    rating: number
    totalReviews: number
    verifiedReviews: number
    joinedDate: string
    status: 'pending' | 'approved' | 'rejected'
    certifications?: string[]
    responseTime: string // Average response time
    location: string
    languages: string[]
    priceRange: {
        min: number
        max: number
    }
}

export const mockReviewers: Reviewer[] = [
    {
        id: 'rev-1',
        name: 'Nguyễn Minh Tuấn',
        email: 'tuan.reviewer@trustmart.com',
        avatar: '/images/reviewer-1.jpg',
        phone: '0901234567',
        bio: 'Chuyên gia thẩm định đồ điện tử với hơn 10 năm kinh nghiệm. Từng làm việc tại các chuỗi bán lẻ điện tử lớn như Thế Giới Di Động, FPT Shop.',
        expertise: ['Điện tử', 'Điện thoại', 'Laptop', 'Tablet'],
        rating: 4.9,
        totalReviews: 523,
        verifiedReviews: 498,
        joinedDate: '2023-06-15',
        status: 'approved',
        certifications: ['Apple Certified Technician', 'Samsung Authorized Service'],
        responseTime: '2-4 giờ',
        location: 'TP. Hồ Chí Minh',
        languages: ['Tiếng Việt', 'English'],
        priceRange: { min: 150000, max: 500000 }
    },
    {
        id: 'rev-2',
        name: 'Trần Thị Lan Hương',
        email: 'huong.reviewer@trustmart.com',
        avatar: '/images/reviewer-2.jpg',
        phone: '0912345678',
        bio: 'Chuyên gia thẩm định hàng xa xỉ, có chứng chỉ từ Luxury Institute. 8 năm kinh nghiệm làm việc với các thương hiệu Hermès, Chanel, Louis Vuitton.',
        expertise: ['Xa xỉ', 'Túi xách', 'Phụ kiện', 'Thời trang cao cấp'],
        rating: 4.95,
        totalReviews: 412,
        verifiedReviews: 398,
        joinedDate: '2023-08-20',
        status: 'approved',
        certifications: ['Entrupy Certified', 'Real Authentication Expert'],
        responseTime: '4-8 giờ',
        location: 'Hà Nội',
        languages: ['Tiếng Việt', 'English', 'Français'],
        priceRange: { min: 300000, max: 1500000 }
    },
    {
        id: 'rev-3',
        name: 'Lê Văn Chuyên',
        email: 'chuyen.reviewer@trustmart.com',
        avatar: '/images/reviewer-3.jpg',
        phone: '0923456789',
        bio: 'Kỹ sư điện tử với bằng thạc sĩ từ ĐH Bách Khoa. Chuyên thẩm định các thiết bị gaming, console và phụ kiện gaming cao cấp.',
        expertise: ['Điện tử', 'Gaming', 'Console', 'PC Components'],
        rating: 4.85,
        totalReviews: 287,
        verifiedReviews: 265,
        joinedDate: '2024-01-10',
        status: 'approved',
        certifications: ['Sony PlayStation Certified', 'ASUS ROG Partner'],
        responseTime: '2-6 giờ',
        location: 'Đà Nẵng',
        languages: ['Tiếng Việt', 'English'],
        priceRange: { min: 100000, max: 400000 }
    },
    {
        id: 'rev-4',
        name: 'Phạm Thu Hà',
        email: 'ha.reviewer@trustmart.com',
        avatar: '/images/reviewer-4.png',
        phone: '0934567890',
        bio: 'Chuyên gia công nghệ với 12 năm kinh nghiệm. Biên tập viên công nghệ cho các tạp chí Tinhte, GenK. Đam mê đánh giá smartphone và laptop.',
        expertise: ['Điện tử', 'Smartphone', 'Laptop', 'Camera'],
        rating: 4.92,
        totalReviews: 634,
        verifiedReviews: 612,
        joinedDate: '2023-03-05',
        status: 'approved',
        certifications: ['Google Android Expert', 'Apple Certified Mac Technician'],
        responseTime: '1-3 giờ',
        location: 'TP. Hồ Chí Minh',
        languages: ['Tiếng Việt', 'English', '日本語'],
        priceRange: { min: 200000, max: 600000 }
    },
    {
        id: 'rev-5',
        name: 'Nguyễn Hoàng Nam',
        email: 'nam.reviewer@trustmart.com',
        avatar: '/images/reviewer-5.png',
        phone: '0945678901',
        bio: 'Chuyên gia thẩm định sneakers và streetwear. Collector với bộ sưu tập hơn 200 đôi giày hiếm. Cộng tác với StockX Vietnam.',
        expertise: ['Thời trang', 'Sneakers', 'Streetwear', 'Limited Edition'],
        rating: 4.88,
        totalReviews: 389,
        verifiedReviews: 371,
        joinedDate: '2023-11-01',
        status: 'approved',
        certifications: ['StockX Authenticator', 'CheckCheck Pro'],
        responseTime: '3-6 giờ',
        location: 'TP. Hồ Chí Minh',
        languages: ['Tiếng Việt', 'English'],
        priceRange: { min: 150000, max: 800000 }
    },
    {
        id: 'rev-6',
        name: 'Trương Thị Mai Anh',
        email: 'maianh.reviewer@trustmart.com',
        avatar: '/images/reviewer-6.png',
        phone: '0956789012',
        bio: 'Chuyên gia đồng hồ với hơn 15 năm kinh nghiệm. Thành viên Hiệp hội Đồng hồ Việt Nam. Đại diện cho nhiều thương hiệu đồng hồ Thụy Sĩ.',
        expertise: ['Đồng hồ', 'Luxury Watches', 'Vintage Timepieces'],
        rating: 4.97,
        totalReviews: 256,
        verifiedReviews: 248,
        joinedDate: '2023-05-12',
        status: 'approved',
        certifications: ['Swiss Watch Institute', 'WOSTEP Certified Watchmaker'],
        responseTime: '4-12 giờ',
        location: 'Hà Nội',
        languages: ['Tiếng Việt', 'English', 'Deutsch'],
        priceRange: { min: 500000, max: 3000000 }
    },
    {
        id: 'rev-7',
        name: 'Võ Đình Khoa',
        email: 'khoa.reviewer@trustmart.com',
        avatar: '/images/reviewer-1.jpg',
        phone: '0967890123',
        bio: 'Nhiếp ảnh gia chuyên nghiệp kiêm chuyên gia thẩm định thiết bị ảnh. 20 năm trong ngành nhiếp ảnh.',
        expertise: ['Điện tử', 'Camera', 'Lens', 'Photography Equipment'],
        rating: 4.86,
        totalReviews: 178,
        verifiedReviews: 165,
        joinedDate: '2024-02-01',
        status: 'approved',
        certifications: ['Canon Professional Services', 'Sony Alpha Community'],
        responseTime: '6-12 giờ',
        location: 'TP. Hồ Chí Minh',
        languages: ['Tiếng Việt', 'English'],
        priceRange: { min: 200000, max: 1000000 }
    },
    {
        id: 'rev-8',
        name: 'Đặng Minh Châu',
        email: 'chau.reviewer@trustmart.com',
        avatar: '/images/reviewer-2.jpg',
        bio: 'Fashion stylist và chuyên gia thẩm định thời trang. Từng làm việc cho các tạp chí Elle, Harper\'s Bazaar Vietnam.',
        expertise: ['Thời trang', 'Xa xỉ', 'Designer Fashion', 'Vintage Clothing'],
        rating: 4.82,
        totalReviews: 234,
        verifiedReviews: 220,
        joinedDate: '2023-09-15',
        status: 'approved',
        certifications: ['Fashion Institute Certified', 'Vestiaire Collective Partner'],
        responseTime: '6-8 giờ',
        location: 'TP. Hồ Chí Minh',
        languages: ['Tiếng Việt', 'English', 'Italiano'],
        priceRange: { min: 250000, max: 1200000 }
    }
]

// Get reviewer by ID
export function getReviewerById(id: string): Reviewer | undefined {
    return mockReviewers.find(r => r.id === id)
}

// Get reviewers by expertise
export function getReviewersByExpertise(expertise: string): Reviewer[] {
    return mockReviewers.filter(r =>
        r.expertise.some(e => e.toLowerCase().includes(expertise.toLowerCase())) &&
        r.status === 'approved'
    )
}

// Get top rated reviewers
export function getTopReviewers(limit: number = 5): Reviewer[] {
    return [...mockReviewers]
        .filter(r => r.status === 'approved')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit)
}

// Get all approved reviewers
export function getApprovedReviewers(): Reviewer[] {
    return mockReviewers.filter(r => r.status === 'approved')
}

// Search reviewers
export function searchReviewers(query: string): Reviewer[] {
    const lowercaseQuery = query.toLowerCase()
    return mockReviewers.filter(r =>
        r.name.toLowerCase().includes(lowercaseQuery) ||
        r.bio.toLowerCase().includes(lowercaseQuery) ||
        r.expertise.some(e => e.toLowerCase().includes(lowercaseQuery))
    )
}

// Get reviewer stats
export function getReviewerStats(): {
    totalReviewers: number
    totalReviews: number
    averageRating: number
} {
    const approved = mockReviewers.filter(r => r.status === 'approved')
    return {
        totalReviewers: approved.length,
        totalReviews: approved.reduce((sum, r) => sum + r.totalReviews, 0),
        averageRating: approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
    }
}
