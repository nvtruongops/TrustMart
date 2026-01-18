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
    email: 'user1@secondlife.com',
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
    email: 'seller@secondlife.com',
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
    email: 'reviewer@secondlife.com',
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
    email: 'admin@secondlife.com',
    password: 'admin123',
    name: 'Phạm Quản Trị',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin1',
    phone: '0934567890',
    joinedDate: '2023-12-01',
    isSeller: false,
    isReviewer: false,
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
  return email === 'admin@secondlife.com'
}

