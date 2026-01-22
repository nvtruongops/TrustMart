// Mock data cho User (Buyer/Seller)

export interface User {
  id: string;
  email: string;
  phone_number: string;
  full_name: string;
  avatar_url: string | null;
  roles: ('buyer' | 'seller')[];
  trust_score: number;
  fraud_strikes: number;
  status: 'active' | 'locked' | 'suspended';
  email_verified: boolean;
  phone_verified: boolean;
  created_at: string;
  last_login_at: string;
}

export interface UserAddress {
  id: string;
  address_type: 'home' | 'work' | 'other';
  full_address: string;
  city: string;
  district: string;
  ward: string;
  is_default: boolean;
}

export interface UserStats {
  total_purchases: number;
  total_sales: number;
  pending_orders: number;
  completed_orders: number;
  wallet_balance: number;
  escrow_balance: number;
  pending_balance: number;
}

export interface Order {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  status: 'pending_payment' | 'paid' | 'in_escrow' | 'in_transit' | 'delivered' | 'completed' | 'cancelled' | 'disputed';
  transaction_type: 'ai_only' | 'reviewer_verified';
  buyer_name?: string;
  seller_name?: string;
  created_at: string;
  delivered_at?: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'sale' | 'refund' | 'fee';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// Mock current user
export const mockCurrentUser: User = {
  id: 'user-001',
  email: 'nguyenvana@example.com',
  phone_number: '0901234567',
  full_name: 'Nguyễn Văn A',
  avatar_url: null,
  roles: ['buyer', 'seller'],
  trust_score: 85,
  fraud_strikes: 0,
  status: 'active',
  email_verified: true,
  phone_verified: true,
  created_at: '2025-06-15T10:00:00Z',
  last_login_at: '2026-01-20T08:30:00Z',
};

// Mock user addresses
export const mockUserAddresses: UserAddress[] = [
  {
    id: 'addr-001',
    address_type: 'home',
    full_address: '123 Nguyễn Huệ, Phường Bến Nghé',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    is_default: true,
  },
  {
    id: 'addr-002',
    address_type: 'work',
    full_address: '456 Lê Lợi, Phường Bến Thành',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Thành',
    is_default: false,
  },
];

// Mock user stats
export const mockUserStats: UserStats = {
  total_purchases: 12,
  total_sales: 5,
  pending_orders: 2,
  completed_orders: 15,
  wallet_balance: 5000000,
  escrow_balance: 2000000,
  pending_balance: 500000,
};

// Mock orders (purchases)
export const mockPurchases: Order[] = [
  {
    id: 'order-001',
    product_id: 'prod-001',
    product_name: 'iPhone 13 Pro 128GB',
    product_image: '/images/product-1.jpg',
    price: 15000000,
    status: 'delivered',
    transaction_type: 'reviewer_verified',
    seller_name: 'Lê Văn Hùng',
    created_at: '2026-01-15T10:00:00Z',
    delivered_at: '2026-01-18T14:30:00Z',
  },
  {
    id: 'order-002',
    product_id: 'prod-002',
    product_name: 'MacBook Pro M1 2020',
    product_image: '/images/product-2.jpg',
    price: 25000000,
    status: 'in_transit',
    transaction_type: 'reviewer_verified',
    seller_name: 'Trần Thị Mai',
    created_at: '2026-01-18T09:00:00Z',
  },
  {
    id: 'order-003',
    product_id: 'prod-003',
    product_name: 'Áo khoác Zara',
    product_image: '/images/product-3.jpg',
    price: 800000,
    status: 'completed',
    transaction_type: 'ai_only',
    seller_name: 'Nguyễn Thị Lan',
    created_at: '2026-01-10T14:00:00Z',
    delivered_at: '2026-01-12T10:00:00Z',
  },
];

// Mock orders (sales)
export const mockSales: Order[] = [
  {
    id: 'order-004',
    product_id: 'prod-004',
    product_name: 'iPad Air 2022',
    product_image: '/images/product-4.jpg',
    price: 12000000,
    status: 'completed',
    transaction_type: 'reviewer_verified',
    buyer_name: 'Phạm Văn Nam',
    created_at: '2026-01-12T11:00:00Z',
    delivered_at: '2026-01-15T16:00:00Z',
  },
  {
    id: 'order-005',
    product_id: 'prod-005',
    product_name: 'Giày Nike Air Max',
    product_image: '/images/product-5.png',
    price: 2500000,
    status: 'in_escrow',
    transaction_type: 'ai_only',
    buyer_name: 'Hoàng Thị Hoa',
    created_at: '2026-01-19T15:00:00Z',
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    type: 'deposit',
    amount: 10000000,
    description: 'Nạp tiền vào ví',
    status: 'completed',
    created_at: '2026-01-15T09:00:00Z',
  },
  {
    id: 'txn-002',
    type: 'purchase',
    amount: -15000000,
    description: 'Mua iPhone 13 Pro 128GB',
    status: 'completed',
    created_at: '2026-01-15T10:30:00Z',
  },
  {
    id: 'txn-003',
    type: 'sale',
    amount: 12000000,
    description: 'Bán iPad Air 2022',
    status: 'completed',
    created_at: '2026-01-15T16:00:00Z',
  },
  {
    id: 'txn-004',
    type: 'fee',
    amount: -360000,
    description: 'Phí giao dịch (3%)',
    status: 'completed',
    created_at: '2026-01-15T16:00:00Z',
  },
  {
    id: 'txn-005',
    type: 'withdrawal',
    amount: -5000000,
    description: 'Rút tiền về tài khoản ngân hàng',
    status: 'pending',
    created_at: '2026-01-19T14:00:00Z',
  },
];

// Mock notifications
export interface Notification {
  id: string;
  type: 'order' | 'payment' | 'dispute' | 'system';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'order',
    title: 'Đơn hàng đã được giao',
    message: 'Đơn hàng iPhone 13 Pro đã được giao thành công. Vui lòng xác nhận đã nhận hàng.',
    is_read: false,
    created_at: '2026-01-18T14:30:00Z',
  },
  {
    id: 'notif-002',
    type: 'payment',
    title: 'Nạp tiền thành công',
    message: 'Bạn đã nạp 10,000,000 VND vào ví thành công.',
    is_read: true,
    created_at: '2026-01-15T09:00:00Z',
  },
  {
    id: 'notif-003',
    type: 'order',
    title: 'Có người mua sản phẩm của bạn',
    message: 'Hoàng Thị Hoa đã mua Giày Nike Air Max của bạn.',
    is_read: false,
    created_at: '2026-01-19T15:00:00Z',
  },
  {
    id: 'notif-004',
    type: 'system',
    title: 'Cập nhật điều khoản sử dụng',
    message: 'TrustMart đã cập nhật điều khoản sử dụng. Vui lòng xem lại.',
    is_read: true,
    created_at: '2026-01-10T10:00:00Z',
  },
];

// Mock cart items
export interface CartItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  seller_name: string;
  seller_id: string;
  trust_score: number;
  has_reviewer: boolean;
  added_at: string;
}

export const mockCartItems: CartItem[] = [
  {
    id: 'cart-001',
    product_id: 'prod-010',
    product_name: 'Samsung Galaxy S23 Ultra 256GB',
    product_image: '/images/product-10.png',
    price: 22000000,
    seller_name: 'Phạm Văn Đức',
    seller_id: 'seller-005',
    trust_score: 92,
    has_reviewer: true,
    added_at: '2026-01-19T10:00:00Z',
  },
  {
    id: 'cart-002',
    product_id: 'prod-011',
    product_name: 'Tai nghe Sony WH-1000XM5',
    product_image: '/images/product-11.png',
    price: 7500000,
    seller_name: 'Nguyễn Thị Hương',
    seller_id: 'seller-006',
    trust_score: 88,
    has_reviewer: false,
    added_at: '2026-01-20T08:00:00Z',
  },
  {
    id: 'cart-003',
    product_id: 'prod-012',
    product_name: 'Apple Watch Series 8 45mm',
    product_image: '/images/product-12.png',
    price: 9500000,
    seller_name: 'Lê Minh Tuấn',
    seller_id: 'seller-007',
    trust_score: 95,
    has_reviewer: true,
    added_at: '2026-01-20T09:30:00Z',
  },
];

// Helper functions
export const getTrustScoreLevel = (score: number): { label: string; color: string } => {
  if (score >= 90) return { label: 'Xuất sắc', color: 'text-green-600' };
  if (score >= 80) return { label: 'Tốt', color: 'text-green-600' };
  if (score >= 70) return { label: 'Khá', color: 'text-blue-600' };
  if (score >= 60) return { label: 'Trung bình', color: 'text-yellow-600' };
  return { label: 'Cần cải thiện', color: 'text-red-600' };
};

export const getOrderStatusBadge = (status: string): { label: string; color: string } => {
  const badges: Record<string, { label: string; color: string }> = {
    pending_payment: { label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-800' },
    paid: { label: 'Đã thanh toán', color: 'bg-blue-100 text-blue-800' },
    in_escrow: { label: 'Đang giữ tiền', color: 'bg-purple-100 text-purple-800' },
    in_transit: { label: 'Đang giao hàng', color: 'bg-blue-100 text-blue-800' },
    delivered: { label: 'Đã giao hàng', color: 'bg-green-100 text-green-800' },
    completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Đã hủy', color: 'bg-gray-100 text-gray-800' },
    disputed: { label: 'Tranh chấp', color: 'bg-red-100 text-red-800' },
  };
  return badges[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
};

export const getTransactionTypeBadge = (type: string): { label: string; color: string; icon: string } => {
  const badges: Record<string, { label: string; color: string; icon: string }> = {
    deposit: { label: 'Nạp tiền', color: 'text-green-600', icon: '↓' },
    withdrawal: { label: 'Rút tiền', color: 'text-red-600', icon: '↑' },
    purchase: { label: 'Mua hàng', color: 'text-blue-600', icon: '🛒' },
    sale: { label: 'Bán hàng', color: 'text-green-600', icon: '💰' },
    refund: { label: 'Hoàn tiền', color: 'text-purple-600', icon: '↩' },
    fee: { label: 'Phí', color: 'text-orange-600', icon: '📊' },
  };
  return badges[type] || { label: type, color: 'text-gray-600', icon: '•' };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Vừa xong';
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return formatDate(dateString);
};

