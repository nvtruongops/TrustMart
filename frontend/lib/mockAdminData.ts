// Mock data cho Admin Dashboard
export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'finance_admin' | 'cs' | 'tech_support';
  status: 'active' | 'locked' | 'suspended';
  two_fa_enabled: boolean;
  last_login_at: string;
  created_at: string;
}

export interface Dispute {
  id: string;
  order_id: string;
  dispute_type: 'type_a' | 'type_b1' | 'type_b2';
  buyer_name: string;
  seller_name: string;
  reviewer_name?: string;
  product_name: string;
  product_value: number;
  reason: string;
  status: 'pending' | 'under_review' | 'resolved' | 'closed';
  priority: number;
  ai_similarity_score?: number;
  ai_recommendation?: string;
  created_at: string;
}

export interface ShiftKey {
  id: string;
  shift_start: string;
  shift_end: string;
  status: 'active' | 'expired' | 'revoked';
  created_by: string;
  assigned_admins: string[];
}

export interface AuditLog {
  id: string;
  admin_name: string;
  action_type: string;
  target_type: string;
  target_id: string;
  reason: string;
  ip_address: string;
  created_at: string;
}

export interface ReviewerApplication {
  id: string;
  user_name: string;
  email: string;
  categories: string[];
  experience_years: number;
  status: 'pending_approval' | 'approved' | 'rejected';
  certifications: string[];
  created_at: string;
}

export interface PlatformStats {
  total_revenue: number;
  reserve_fund_balance: number;
  active_transactions: number;
  dispute_rate: number;
  users_online: number;
  pending_disputes: number;
  active_reviewers: number;
}

// Mock current admin user
export const mockCurrentAdmin: AdminUser = {
  id: 'admin-001',
  email: 'admin@trustmart.com',
  full_name: 'Nguyễn Văn Admin',
  role: 'super_admin',
  status: 'active',
  two_fa_enabled: true,
  last_login_at: '2026-01-20T08:30:00Z',
  created_at: '2025-01-01T00:00:00Z',
};

// Mock platform stats
export const mockPlatformStats: PlatformStats = {
  total_revenue: 125000000,
  reserve_fund_balance: 15000000,
  active_transactions: 45,
  dispute_rate: 2.5,
  users_online: 234,
  pending_disputes: 8,
  active_reviewers: 67,
};

// Mock disputes
export const mockDisputes: Dispute[] = [
  {
    id: 'dispute-001',
    order_id: 'order-123',
    dispute_type: 'type_b1',
    buyer_name: 'Trần Thị Mai',
    seller_name: 'Lê Văn Hùng',
    reviewer_name: 'Phạm Minh Tuấn',
    product_name: 'iPhone 13 Pro 128GB',
    product_value: 15000000,
    reason: 'Sản phẩm có vết xước không được báo cáo',
    status: 'pending',
    priority: 3,
    ai_similarity_score: 65,
    ai_recommendation: 'manual_review',
    created_at: '2026-01-20T10:15:00Z',
  },
  {
    id: 'dispute-002',
    order_id: 'order-124',
    dispute_type: 'type_a',
    buyer_name: 'Hoàng Văn Nam',
    seller_name: 'Nguyễn Thị Lan',
    product_name: 'Áo khoác Zara',
    product_value: 800000,
    reason: 'Màu sắc không đúng như mô tả',
    status: 'under_review',
    priority: 1,
    ai_similarity_score: 45,
    ai_recommendation: 'approve_buyer',
    created_at: '2026-01-19T14:30:00Z',
  },
  {
    id: 'dispute-003',
    order_id: 'order-125',
    dispute_type: 'type_b2',
    buyer_name: 'Vũ Thị Hoa',
    seller_name: 'Đặng Văn Minh',
    reviewer_name: 'Lê Thị Thu',
    product_name: 'MacBook Pro M1 2020',
    product_value: 25000000,
    reason: 'Pin chai nhanh sau 2 tuần sử dụng',
    status: 'pending',
    priority: 2,
    ai_similarity_score: 88,
    ai_recommendation: 'manual_review',
    created_at: '2026-01-18T09:00:00Z',
  },
];

// Mock shift keys
export const mockShiftKeys: ShiftKey[] = [
  {
    id: 'shift-001',
    shift_start: '2026-01-20T08:00:00Z',
    shift_end: '2026-01-20T16:00:00Z',
    status: 'active',
    created_by: 'Nguyễn Văn Admin',
    assigned_admins: ['admin-001', 'admin-002', 'admin-003'],
  },
  {
    id: 'shift-002',
    shift_start: '2026-01-19T08:00:00Z',
    shift_end: '2026-01-19T16:00:00Z',
    status: 'expired',
    created_by: 'Nguyễn Văn Admin',
    assigned_admins: ['admin-001', 'admin-004'],
  },
];

// Mock audit logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-001',
    admin_name: 'Nguyễn Văn Admin',
    action_type: 'resolve_dispute',
    target_type: 'dispute',
    target_id: 'dispute-002',
    reason: 'AI phát hiện sai lệch đáng kể, hoàn tiền cho buyer',
    ip_address: '192.168.1.100',
    created_at: '2026-01-20T11:30:00Z',
  },
  {
    id: 'audit-002',
    admin_name: 'Trần Thị CS',
    action_type: 'approve_reviewer',
    target_type: 'reviewer_application',
    target_id: 'app-123',
    reason: 'Đủ bằng cấp và kinh nghiệm cho category Electronics',
    ip_address: '192.168.1.101',
    created_at: '2026-01-20T09:15:00Z',
  },
  {
    id: 'audit-003',
    admin_name: 'Lê Văn Finance',
    action_type: 'transfer_fund',
    target_type: 'reserve_fund',
    target_id: 'rf-001',
    reason: 'Bồi thường cho dispute-002, Compensation Wallet không đủ',
    ip_address: '192.168.1.102',
    created_at: '2026-01-19T16:45:00Z',
  },
];

// Mock reviewer applications
export const mockReviewerApplications: ReviewerApplication[] = [
  {
    id: 'app-001',
    user_name: 'Phạm Văn Chuyên',
    email: 'chuyen.pham@gmail.com',
    categories: ['Electronics', 'Phones', 'Laptops'],
    experience_years: 5,
    status: 'pending_approval',
    certifications: ['Chứng chỉ Kỹ thuật viên Apple', 'Bằng Kỹ sư CNTT'],
    created_at: '2026-01-19T10:00:00Z',
  },
  {
    id: 'app-002',
    user_name: 'Nguyễn Thị Thời Trang',
    email: 'thoitrang.nguyen@gmail.com',
    categories: ['Fashion', 'Shoes', 'Bags'],
    experience_years: 3,
    status: 'pending_approval',
    certifications: ['Chứng chỉ Thiết kế Thời trang'],
    created_at: '2026-01-18T14:30:00Z',
  },
  {
    id: 'app-003',
    user_name: 'Lê Văn Sách',
    email: 'sach.le@gmail.com',
    categories: ['Books', 'Stationery'],
    experience_years: 2,
    status: 'approved',
    certifications: ['Bằng Cử nhân Văn học'],
    created_at: '2026-01-15T09:00:00Z',
  },
];

// Mock admin users
export const mockAdminUsers: AdminUser[] = [
  mockCurrentAdmin,
  {
    id: 'admin-002',
    email: 'finance@trustmart.com',
    full_name: 'Lê Văn Finance',
    role: 'finance_admin',
    status: 'active',
    two_fa_enabled: true,
    last_login_at: '2026-01-20T08:00:00Z',
    created_at: '2025-02-01T00:00:00Z',
  },
  {
    id: 'admin-003',
    email: 'cs@trustmart.com',
    full_name: 'Trần Thị CS',
    role: 'cs',
    status: 'active',
    two_fa_enabled: true,
    last_login_at: '2026-01-20T07:45:00Z',
    created_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'admin-004',
    email: 'tech@trustmart.com',
    full_name: 'Hoàng Văn Tech',
    role: 'tech_support',
    status: 'active',
    two_fa_enabled: false,
    last_login_at: '2026-01-19T18:00:00Z',
    created_at: '2025-04-01T00:00:00Z',
  },
];
