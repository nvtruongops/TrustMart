// Mock data cho Seller (Đăng bán sản phẩm)

export interface Category {
  id: string;
  name: string;
  slug: string;
  trust_tier: 'tier_1_high' | 'tier_2_medium' | 'tier_3_community';
  ai_level: 'level_1_full' | 'level_2_standard' | 'level_3_basic';
  required_images: string[];
  min_images: number;
  recommended_images: number;
  requires_reviewer: boolean;
  reviewer_threshold?: number;
  checklist_template: Record<string, any>;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  category_name: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  receipt_images: string[];
  attributes: Record<string, any>;
  trust_score: number;
  ai_assessment?: {
    image_quality_score: number;
    detected_category: string;
    detected_brand: string;
    defects: string[];
    confidence: number;
  };
  requires_deposit: boolean;
  deposit_percentage?: number;
  status: 'draft' | 'pending_review' | 'active' | 'sold' | 'removed';
  view_count: number;
  favorite_count: number;
  created_at: string;
  published_at?: string;
  sold_at?: string;
}

export interface AIAssessmentResult {
  image_quality_score: number;
  detected_category: string;
  detected_brand: string;
  detected_model: string;
  defects: Array<{
    type: string;
    location: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  confidence: number;
  suggestions: string[];
  trust_score_estimate: number;
}

export interface ReceiptOCRResult {
  store_name: string;
  purchase_date: string;
  product_name: string;
  price: number;
  serial_number?: string;
  confidence: number;
  matched: boolean;
}

// Mock categories
export const mockCategories: Category[] = [
  {
    id: 'cat-001',
    name: 'Điện thoại',
    slug: 'phones',
    trust_tier: 'tier_1_high',
    ai_level: 'level_1_full',
    required_images: ['exterior_6_sides', 'screen_white', 'settings', 'battery_health', 'accessories'],
    min_images: 4,
    recommended_images: 6,
    requires_reviewer: true,
    reviewer_threshold: 2000000,
    checklist_template: {
      brand: { type: 'text', required: true },
      model: { type: 'text', required: true },
      storage: { type: 'select', options: ['64GB', '128GB', '256GB', '512GB', '1TB'], required: true },
      color: { type: 'text', required: true },
      imei: { type: 'text', required: true },
      battery_health: { type: 'number', min: 0, max: 100, required: true },
      condition: { type: 'select', options: ['New', 'Like New', 'Good', 'Fair'], required: true },
    },
  },
  {
    id: 'cat-002',
    name: 'Laptop',
    slug: 'laptops',
    trust_tier: 'tier_1_high',
    ai_level: 'level_1_full',
    required_images: ['exterior_6_sides', 'screen_on', 'keyboard', 'ports', 'system_info'],
    min_images: 4,
    recommended_images: 6,
    requires_reviewer: true,
    reviewer_threshold: 5000000,
    checklist_template: {
      brand: { type: 'text', required: true },
      model: { type: 'text', required: true },
      processor: { type: 'text', required: true },
      ram: { type: 'select', options: ['4GB', '8GB', '16GB', '32GB', '64GB'], required: true },
      storage: { type: 'text', required: true },
      screen_size: { type: 'text', required: true },
      condition: { type: 'select', options: ['New', 'Like New', 'Good', 'Fair'], required: true },
    },
  },
  {
    id: 'cat-003',
    name: 'Thời trang',
    slug: 'fashion',
    trust_tier: 'tier_2_medium',
    ai_level: 'level_2_standard',
    required_images: ['full_body', 'close_up_fabric', 'label', 'defects_if_any'],
    min_images: 2,
    recommended_images: 4,
    requires_reviewer: false,
    checklist_template: {
      brand: { type: 'text', required: true },
      size: { type: 'select', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
      material: { type: 'text', required: true },
      color: { type: 'text', required: true },
      condition: { type: 'select', options: ['New', 'Like New', 'Good', 'Fair'], required: true },
    },
  },
  {
    id: 'cat-004',
    name: 'Sách',
    slug: 'books',
    trust_tier: 'tier_3_community',
    ai_level: 'level_3_basic',
    required_images: ['front_cover', 'back_cover', 'spine', 'sample_page'],
    min_images: 2,
    recommended_images: 3,
    requires_reviewer: false,
    checklist_template: {
      title: { type: 'text', required: true },
      author: { type: 'text', required: true },
      publisher: { type: 'text', required: false },
      year: { type: 'number', required: false },
      condition: { type: 'select', options: ['New', 'Like New', 'Good', 'Fair'], required: true },
    },
  },
];

// Mock seller's products
export const mockSellerProducts: Product[] = [
  {
    id: 'prod-001',
    seller_id: 'user-001',
    category_id: 'cat-001',
    category_name: 'Điện thoại',
    title: 'iPhone 13 Pro 128GB Xanh Sierra',
    description: 'iPhone 13 Pro màu xanh Sierra, dung lượng 128GB. Máy còn mới 95%, pin 89%, full box, sạc cáp zin.',
    price: 15000000,
    images: ['/images/product-1.jpg', '/images/product-2.jpg'],
    receipt_images: ['/images/receipt-1.jpg'],
    attributes: {
      brand: 'Apple',
      model: 'iPhone 13 Pro',
      storage: '128GB',
      color: 'Xanh Sierra',
      imei: '352054321234567',
      battery_health: 89,
      condition: 'Like New',
    },
    trust_score: 92,
    ai_assessment: {
      image_quality_score: 95,
      detected_category: 'Điện thoại',
      detected_brand: 'Apple',
      defects: [],
      confidence: 0.98,
    },
    requires_deposit: true,
    deposit_percentage: 20,
    status: 'active',
    view_count: 234,
    favorite_count: 12,
    created_at: '2026-01-15T10:00:00Z',
    published_at: '2026-01-15T11:00:00Z',
  },
  {
    id: 'prod-002',
    seller_id: 'user-001',
    category_id: 'cat-002',
    category_name: 'Laptop',
    title: 'MacBook Pro M1 2020 13 inch',
    description: 'MacBook Pro M1 2020, màn hình 13 inch, RAM 8GB, SSD 256GB. Máy đẹp, pin còn 92%.',
    price: 22000000,
    images: ['/images/product-6.png'],
    receipt_images: [],
    attributes: {
      brand: 'Apple',
      model: 'MacBook Pro M1 2020',
      processor: 'Apple M1',
      ram: '8GB',
      storage: '256GB SSD',
      screen_size: '13 inch',
      condition: 'Good',
    },
    trust_score: 78,
    ai_assessment: {
      image_quality_score: 85,
      detected_category: 'Laptop',
      detected_brand: 'Apple',
      defects: ['Vài vết xước nhỏ ở vỏ'],
      confidence: 0.92,
    },
    requires_deposit: false,
    status: 'active',
    view_count: 156,
    favorite_count: 8,
    created_at: '2026-01-18T14:00:00Z',
    published_at: '2026-01-18T15:00:00Z',
  },
  {
    id: 'prod-003',
    seller_id: 'user-001',
    category_id: 'cat-003',
    category_name: 'Thời trang',
    title: 'Áo khoác Zara size M',
    description: 'Áo khoác Zara màu đen, size M, chất liệu vải dày dặn, mặc 2-3 lần.',
    price: 800000,
    images: ['/images/product-3.jpg'],
    receipt_images: [],
    attributes: {
      brand: 'Zara',
      size: 'M',
      material: 'Cotton blend',
      color: 'Đen',
      condition: 'Like New',
    },
    trust_score: 85,
    status: 'active',
    view_count: 89,
    favorite_count: 5,
    created_at: '2026-01-19T09:00:00Z',
    published_at: '2026-01-19T10:00:00Z',
  },
  {
    id: 'prod-004',
    seller_id: 'user-001',
    category_id: 'cat-001',
    category_name: 'Điện thoại',
    title: 'Samsung Galaxy S21 Ultra',
    description: 'Samsung Galaxy S21 Ultra, màu đen, 256GB. Đang soạn thảo...',
    price: 18000000,
    images: [],
    receipt_images: [],
    attributes: {
      brand: 'Samsung',
      model: 'Galaxy S21 Ultra',
      storage: '256GB',
      color: 'Đen',
    },
    trust_score: 0,
    status: 'draft',
    view_count: 0,
    favorite_count: 0,
    created_at: '2026-01-20T08:00:00Z',
  },
  {
    id: 'prod-005',
    seller_id: 'user-001',
    category_id: 'cat-001',
    category_name: 'Điện thoại',
    title: 'iPhone 12 64GB',
    description: 'iPhone 12 màu trắng, 64GB, pin 85%.',
    price: 12000000,
    images: ['/images/product-5.png'],
    receipt_images: [],
    attributes: {
      brand: 'Apple',
      model: 'iPhone 12',
      storage: '64GB',
      color: 'Trắng',
      battery_health: 85,
      condition: 'Good',
    },
    trust_score: 55,
    status: 'pending_review',
    view_count: 0,
    favorite_count: 0,
    created_at: '2026-01-19T16:00:00Z',
  },
];

// Mock AI assessment result
export const mockAIAssessment: AIAssessmentResult = {
  image_quality_score: 92,
  detected_category: 'Điện thoại',
  detected_brand: 'Apple',
  detected_model: 'iPhone 13 Pro',
  defects: [
    {
      type: 'Vết xước nhỏ',
      location: 'Góc dưới bên phải',
      severity: 'low',
    },
  ],
  confidence: 0.95,
  suggestions: [
    'Chụp thêm ảnh màn hình sáng nền trắng để kiểm tra dead pixel',
    'Chụp ảnh Settings > About để xác thực thông số',
    'Chụp ảnh Battery Health để xác nhận tình trạng pin',
  ],
  trust_score_estimate: 88,
};

// Mock receipt OCR result
export const mockReceiptOCR: ReceiptOCRResult = {
  store_name: 'CellphoneS',
  purchase_date: '2023-05-15',
  product_name: 'iPhone 13 Pro 128GB',
  price: 25990000,
  serial_number: 'F17XYZ123456',
  confidence: 0.92,
  matched: true,
};

// Helper functions
export const getStatusBadge = (status: string): { label: string; color: string } => {
  const badges: Record<string, { label: string; color: string }> = {
    draft: { label: 'Bản nháp', color: 'bg-gray-100 text-gray-800' },
    pending_review: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-800' },
    active: { label: 'Đang bán', color: 'bg-green-100 text-green-800' },
    sold: { label: 'Đã bán', color: 'bg-blue-100 text-blue-800' },
    removed: { label: 'Đã gỡ', color: 'bg-red-100 text-red-800' },
  };
  return badges[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
};

export const getTrustScoreBadge = (score: number): { label: string; color: string } => {
  if (score >= 80) return { label: 'Tốt', color: 'bg-green-100 text-green-800' };
  if (score >= 60) return { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800' };
  return { label: 'Thấp', color: 'bg-red-100 text-red-800' };
};

export const getTrustTierInfo = (tier: string): { label: string; description: string; color: string } => {
  const tiers: Record<string, { label: string; description: string; color: string }> = {
    tier_1_high: {
      label: 'Tier 1 - Cốt lõi Niềm tin',
      description: 'Điện tử giá trị cao, yêu cầu AI đầy đủ + Reviewer',
      color: 'text-purple-600',
    },
    tier_2_medium: {
      label: 'Tier 2 - Thời trang & Lifestyle',
      description: 'Chỉ dùng AI Vision, không cần Reviewer',
      color: 'text-blue-600',
    },
    tier_3_community: {
      label: 'Tier 3 - Cộng đồng',
      description: 'AI OCR cơ bản, niềm tin dựa vào Community',
      color: 'text-green-600',
    },
  };
  return tiers[tier] || tiers.tier_2_medium;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const calculateListingFee = (price: number, trustScore: number): number => {
  // Miễn phí nếu Trust Score >= 60
  if (trustScore >= 60) return 0;
  // Thu phí 2% nếu Trust Score < 60
  return price * 0.02;
};
