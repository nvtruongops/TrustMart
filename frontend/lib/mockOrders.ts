// Mock orders/transactions database
export interface Order {
    id: string
    productId: number
    productName: string
    productImage: string
    buyerId: string
    buyerName: string
    sellerId: string
    sellerName: string
    price: number
    status: 'pending' | 'paid' | 'reviewing' | 'shipping' | 'completed' | 'cancelled' | 'disputed'
    reviewerId?: string
    reviewerName?: string
    reviewStatus?: 'pending' | 'in_progress' | 'approved' | 'rejected'
    reviewFee?: number
    createdAt: string
    updatedAt: string
    shippingAddress?: string
    trackingNumber?: string
    notes?: string
}

export interface Transaction {
    id: string
    orderId: string
    type: 'payment' | 'refund' | 'review_fee' | 'payout'
    amount: number
    fromUserId?: string
    toUserId?: string
    status: 'pending' | 'completed' | 'failed'
    method: 'credit_card' | 'bank_transfer' | 'e_wallet' | 'escrow'
    createdAt: string
    description: string
}

export const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        productId: 1,
        productName: 'iPhone 13 Pro Max 256GB',
        productImage: '/images/product-1.jpg',
        buyerId: '17',
        buyerName: 'Lê Thị Hạnh',
        sellerId: '1',
        sellerName: 'Nguyễn Văn A',
        price: 15500000,
        status: 'completed',
        reviewerId: 'rev-1',
        reviewerName: 'Nguyễn Minh Tuấn',
        reviewStatus: 'approved',
        reviewFee: 300000,
        createdAt: '2025-01-10T10:30:00Z',
        updatedAt: '2025-01-15T16:45:00Z',
        shippingAddress: '123 Nguyễn Trãi, Q.1, TP.HCM',
        trackingNumber: 'VN123456789',
    },
    {
        id: 'ORD-002',
        productId: 3,
        productName: 'Túi Gucci GG Marmont Small',
        productImage: '/images/product-3.jpg',
        buyerId: '18',
        buyerName: 'Phạm Văn Đức',
        sellerId: '3',
        sellerName: 'Lê Văn C',
        price: 35000000,
        status: 'reviewing',
        reviewerId: 'rev-2',
        reviewerName: 'Trần Thị Lan Hương',
        reviewStatus: 'in_progress',
        reviewFee: 800000,
        createdAt: '2025-01-16T14:20:00Z',
        updatedAt: '2025-01-18T09:15:00Z',
        notes: 'Yêu cầu kiểm tra kỹ serial number và date code',
    },
    {
        id: 'ORD-003',
        productId: 7,
        productName: 'Rolex Submariner Date 41mm',
        productImage: '/images/product-7.png',
        buyerId: '1',
        buyerName: 'Nguyễn Văn Minh',
        sellerId: '7',
        sellerName: 'Nguyễn Hoàng G',
        price: 285000000,
        status: 'reviewing',
        reviewerId: 'rev-6',
        reviewerName: 'Trương Thị Mai Anh',
        reviewStatus: 'in_progress',
        reviewFee: 2500000,
        createdAt: '2025-01-17T08:00:00Z',
        updatedAt: '2025-01-18T11:30:00Z',
        notes: 'Đồng hồ cao cấp, yêu cầu thẩm định chuyên sâu',
    },
    {
        id: 'ORD-004',
        productId: 9,
        productName: 'Nike Air Jordan 1 Retro High OG Chicago',
        productImage: '/images/product-9.png',
        buyerId: '17',
        buyerName: 'Lê Thị Hạnh',
        sellerId: '9',
        sellerName: 'Lê Quang I',
        price: 8500000,
        status: 'shipping',
        reviewerId: 'rev-5',
        reviewerName: 'Nguyễn Hoàng Nam',
        reviewStatus: 'approved',
        reviewFee: 400000,
        createdAt: '2025-01-14T16:45:00Z',
        updatedAt: '2025-01-18T10:00:00Z',
        shippingAddress: '456 Lê Lợi, Q.3, TP.HCM',
        trackingNumber: 'VN987654321',
    },
    {
        id: 'ORD-005',
        productId: 5,
        productName: 'Samsung Galaxy S23 Ultra 512GB',
        productImage: '/images/product-5.png',
        buyerId: '18',
        buyerName: 'Phạm Văn Đức',
        sellerId: '5',
        sellerName: 'Hoàng Văn E',
        price: 18500000,
        status: 'pending',
        createdAt: '2025-01-18T20:30:00Z',
        updatedAt: '2025-01-18T20:30:00Z',
    },
    {
        id: 'ORD-006',
        productId: 2,
        productName: 'MacBook Pro M1 2021 14 inch',
        productImage: '/images/product-2.jpg',
        buyerId: '1',
        buyerName: 'Nguyễn Văn Minh',
        sellerId: '2',
        sellerName: 'Trần Thị Hương',
        price: 28000000,
        status: 'completed',
        reviewerId: 'rev-1',
        reviewerName: 'Nguyễn Minh Tuấn',
        reviewStatus: 'approved',
        reviewFee: 400000,
        createdAt: '2025-01-05T11:00:00Z',
        updatedAt: '2025-01-12T14:20:00Z',
        shippingAddress: '789 Trần Hưng Đạo, Q.5, TP.HCM',
        trackingNumber: 'VN456789123',
    },
    {
        id: 'ORD-007',
        productId: 6,
        productName: 'PlayStation 5 Digital Edition',
        productImage: '/images/product-6.png',
        buyerId: '17',
        buyerName: 'Lê Thị Hạnh',
        sellerId: '6',
        sellerName: 'Đinh Văn F',
        price: 9800000,
        status: 'paid',
        createdAt: '2025-01-18T15:00:00Z',
        updatedAt: '2025-01-18T15:30:00Z',
        notes: 'Chờ người bán xác nhận và chuẩn bị hàng',
    },
    {
        id: 'ORD-008',
        productId: 8,
        productName: 'Túi Chanel Classic Medium',
        productImage: '/images/product-8.png',
        buyerId: '1',
        buyerName: 'Nguyễn Văn Minh',
        sellerId: '8',
        sellerName: 'Trần Thị H',
        price: 95000000,
        status: 'cancelled',
        createdAt: '2025-01-08T09:00:00Z',
        updatedAt: '2025-01-09T10:00:00Z',
        notes: 'Người mua hủy đơn do thay đổi ý định',
    },
]

export const mockTransactions: Transaction[] = [
    {
        id: 'TXN-001',
        orderId: 'ORD-001',
        type: 'payment',
        amount: 15800000, // price + review fee
        fromUserId: '17',
        status: 'completed',
        method: 'bank_transfer',
        createdAt: '2025-01-10T10:35:00Z',
        description: 'Thanh toán đơn hàng ORD-001 (bao gồm phí thẩm định)',
    },
    {
        id: 'TXN-002',
        orderId: 'ORD-001',
        type: 'review_fee',
        amount: 300000,
        toUserId: 'rev-1',
        status: 'completed',
        method: 'escrow',
        createdAt: '2025-01-15T16:00:00Z',
        description: 'Thanh toán phí thẩm định cho reviewer',
    },
    {
        id: 'TXN-003',
        orderId: 'ORD-001',
        type: 'payout',
        amount: 15500000,
        toUserId: '1',
        status: 'completed',
        method: 'bank_transfer',
        createdAt: '2025-01-15T16:45:00Z',
        description: 'Thanh toán cho người bán sau khi hoàn tất đơn hàng',
    },
    {
        id: 'TXN-004',
        orderId: 'ORD-002',
        type: 'payment',
        amount: 35800000,
        fromUserId: '18',
        status: 'completed',
        method: 'credit_card',
        createdAt: '2025-01-16T14:25:00Z',
        description: 'Thanh toán đơn hàng ORD-002',
    },
    {
        id: 'TXN-005',
        orderId: 'ORD-003',
        type: 'payment',
        amount: 287500000,
        fromUserId: '1',
        status: 'completed',
        method: 'bank_transfer',
        createdAt: '2025-01-17T08:10:00Z',
        description: 'Thanh toán đơn hàng ORD-003 (Rolex Submariner)',
    },
    {
        id: 'TXN-006',
        orderId: 'ORD-004',
        type: 'payment',
        amount: 8900000,
        fromUserId: '17',
        status: 'completed',
        method: 'e_wallet',
        createdAt: '2025-01-14T16:50:00Z',
        description: 'Thanh toán đơn hàng ORD-004',
    },
    {
        id: 'TXN-007',
        orderId: 'ORD-004',
        type: 'review_fee',
        amount: 400000,
        toUserId: 'rev-5',
        status: 'completed',
        method: 'escrow',
        createdAt: '2025-01-18T09:30:00Z',
        description: 'Thanh toán phí thẩm định sneakers',
    },
    {
        id: 'TXN-008',
        orderId: 'ORD-006',
        type: 'payment',
        amount: 28400000,
        fromUserId: '1',
        status: 'completed',
        method: 'bank_transfer',
        createdAt: '2025-01-05T11:10:00Z',
        description: 'Thanh toán đơn hàng ORD-006',
    },
    {
        id: 'TXN-009',
        orderId: 'ORD-006',
        type: 'payout',
        amount: 28000000,
        toUserId: '2',
        status: 'completed',
        method: 'bank_transfer',
        createdAt: '2025-01-12T14:25:00Z',
        description: 'Thanh toán cho người bán MacBook Pro',
    },
    {
        id: 'TXN-010',
        orderId: 'ORD-007',
        type: 'payment',
        amount: 9800000,
        fromUserId: '17',
        status: 'completed',
        method: 'e_wallet',
        createdAt: '2025-01-18T15:05:00Z',
        description: 'Thanh toán đơn hàng PS5',
    },
]

// Get orders by buyer
export function getOrdersByBuyer(buyerId: string): Order[] {
    return mockOrders.filter(o => o.buyerId === buyerId)
}

// Get orders by seller
export function getOrdersBySeller(sellerId: string): Order[] {
    return mockOrders.filter(o => o.sellerId === sellerId)
}

// Get orders by reviewer
export function getOrdersByReviewer(reviewerId: string): Order[] {
    return mockOrders.filter(o => o.reviewerId === reviewerId)
}

// Get order by ID
export function getOrderById(id: string): Order | undefined {
    return mockOrders.find(o => o.id === id)
}

// Get pending review orders
export function getPendingReviewOrders(): Order[] {
    return mockOrders.filter(o => o.status === 'reviewing' && o.reviewStatus === 'pending')
}

// Get transactions by order
export function getTransactionsByOrder(orderId: string): Transaction[] {
    return mockTransactions.filter(t => t.orderId === orderId)
}

// Get user transactions
export function getUserTransactions(userId: string): Transaction[] {
    return mockTransactions.filter(t => t.fromUserId === userId || t.toUserId === userId)
}

// Calculate order statistics
export function getOrderStats(): {
    totalOrders: number
    completedOrders: number
    pendingReviews: number
    totalRevenue: number
} {
    return {
        totalOrders: mockOrders.length,
        completedOrders: mockOrders.filter(o => o.status === 'completed').length,
        pendingReviews: mockOrders.filter(o => o.status === 'reviewing').length,
        totalRevenue: mockOrders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + o.price, 0)
    }
}

// Format currency
export function formatCurrency(amount: number): string {
    return amount.toLocaleString('vi-VN') + 'đ'
}

// Format date
export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

// Get status label
export function getOrderStatusLabel(status: Order['status']): string {
    const labels: Record<Order['status'], string> = {
        pending: 'Chờ thanh toán',
        paid: 'Đã thanh toán',
        reviewing: 'Đang thẩm định',
        shipping: 'Đang giao hàng',
        completed: 'Hoàn thành',
        cancelled: 'Đã hủy',
        disputed: 'Đang tranh chấp',
    }
    return labels[status]
}

// Get status color
export function getOrderStatusColor(status: Order['status']): string {
    const colors: Record<Order['status'], string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        paid: 'bg-blue-100 text-blue-800',
        reviewing: 'bg-purple-100 text-purple-800',
        shipping: 'bg-cyan-100 text-cyan-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-gray-100 text-gray-800',
        disputed: 'bg-red-100 text-red-800',
    }
    return colors[status]
}
