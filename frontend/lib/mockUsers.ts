// Mock user database
export interface MockUser {
  id: string
  email: string
  password: string
  name: string
  avatar?: string
  phone?: string
  joinedDate: string
  // User có thể có nhiều vai trò
  isSeller: boolean
  isReviewer: boolean
  reviewerStatus?: 'pending' | 'approved' | 'rejected' // Chỉ có khi đăng ký làm reviewer
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'user1@trustmart.com',
    password: 'user123',
    name: 'Nguyễn Văn Minh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    phone: '0901234567',
    joinedDate: '2024-01-15',
    isSeller: false,
    isReviewer: false,
  },
  {
    id: '2',
    email: 'seller@trustmart.com',
    password: 'seller123',
    name: 'Trần Thị Hương',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=seller1',
    phone: '0912345678',
    joinedDate: '2024-02-20',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '3',
    email: 'reviewer@trustmart.com',
    password: 'reviewer123',
    name: 'Lê Văn Chuyên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reviewer1',
    phone: '0923456789',
    joinedDate: '2024-03-10',
    isSeller: true,
    isReviewer: true,
    reviewerStatus: 'approved',
  },
  {
    id: '4',
    email: 'admin@trustmart.com',
    password: 'admin123',
    name: 'Phạm Quản Trị',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin1',
    phone: '0934567890',
    joinedDate: '2023-12-01',
    isSeller: false,
    isReviewer: false,
  },
  {
    id: '5',
    email: 'hoang.e@trustmart.com',
    password: 'hoang123',
    name: 'Hoàng Văn E',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hoang5',
    phone: '0945678901',
    joinedDate: '2024-04-05',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '6',
    email: 'dinh.f@trustmart.com',
    password: 'dinh123',
    name: 'Đinh Văn F',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dinh6',
    phone: '0956789012',
    joinedDate: '2024-03-22',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '7',
    email: 'hoang.g@trustmart.com',
    password: 'hoang123',
    name: 'Nguyễn Hoàng G',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hoang7',
    phone: '0967890123',
    joinedDate: '2024-01-30',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '8',
    email: 'thu.h@trustmart.com',
    password: 'thu123',
    name: 'Trần Thị H',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thu8',
    phone: '0978901234',
    joinedDate: '2024-02-14',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '9',
    email: 'quang.i@trustmart.com',
    password: 'quang123',
    name: 'Lê Quang I',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quang9',
    phone: '0989012345',
    joinedDate: '2024-05-10',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '10',
    email: 'minh.j@trustmart.com',
    password: 'minh123',
    name: 'Phạm Minh J',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minh10',
    phone: '0990123456',
    joinedDate: '2024-04-18',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '11',
    email: 'thu.k@trustmart.com',
    password: 'thu123',
    name: 'Nguyễn Thị K',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thu11',
    phone: '0901234568',
    joinedDate: '2024-06-01',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '12',
    email: 'van.l@trustmart.com',
    password: 'van123',
    name: 'Trần Văn L',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=van12',
    phone: '0912345679',
    joinedDate: '2024-05-25',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '13',
    email: 'thi.m@trustmart.com',
    password: 'thi123',
    name: 'Vũ Thị M',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thi13',
    phone: '0923456790',
    joinedDate: '2024-03-08',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '14',
    email: 'van.n@trustmart.com',
    password: 'van123',
    name: 'Đỗ Văn N',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=van14',
    phone: '0934567891',
    joinedDate: '2024-04-12',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '15',
    email: 'minh.o@trustmart.com',
    password: 'minh123',
    name: 'Hoàng Minh O',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=minh15',
    phone: '0945678902',
    joinedDate: '2024-02-28',
    isSeller: true,
    isReviewer: true,
    reviewerStatus: 'approved',
  },
  {
    id: '16',
    email: 'thanh.p@trustmart.com',
    password: 'thanh123',
    name: 'Nguyễn Thành P',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thanh16',
    phone: '0956789013',
    joinedDate: '2024-06-15',
    isSeller: true,
    isReviewer: false,
  },
  {
    id: '17',
    email: 'buyer1@trustmart.com',
    password: 'buyer123',
    name: 'Lê Thị Hạnh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=buyer17',
    phone: '0967890124',
    joinedDate: '2024-07-01',
    isSeller: false,
    isReviewer: false,
  },
  {
    id: '18',
    email: 'buyer2@trustmart.com',
    password: 'buyer123',
    name: 'Phạm Văn Đức',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=buyer18',
    phone: '0978901235',
    joinedDate: '2024-07-10',
    isSeller: false,
    isReviewer: false,
  },
  {
    id: '19',
    email: 'reviewer2@trustmart.com',
    password: 'reviewer123',
    name: 'Nguyễn Minh Tuấn',
    avatar: '/images/reviewer-1.jpg',
    phone: '0989012346',
    joinedDate: '2023-06-15',
    isSeller: false,
    isReviewer: true,
    reviewerStatus: 'approved',
  },
  {
    id: '20',
    email: 'reviewer3@trustmart.com',
    password: 'reviewer123',
    name: 'Trần Thị Lan Hương',
    avatar: '/images/reviewer-2.jpg',
    phone: '0990123457',
    joinedDate: '2023-08-20',
    isSeller: false,
    isReviewer: true,
    reviewerStatus: 'approved',
  },
]

export function authenticateUser(email: string, password: string): MockUser | null {
  const user = mockUsers.find(u => u.email === email && u.password === password)
  return user || null
}

export function registerUser(email: string, password: string, name: string): MockUser {
  const newUser: MockUser = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    password,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    joinedDate: new Date().toISOString().split('T')[0],
    isSeller: false,
    isReviewer: false,
  }
  mockUsers.push(newUser)
  return newUser
}

export function isAdmin(email: string): boolean {
  return email === 'admin@trustmart.com'
}

