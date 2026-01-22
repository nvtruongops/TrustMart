'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Eye, Heart, Filter, ChevronRight, ChevronDown, X, SlidersHorizontal, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/landing/Header'
import { mockProducts, type Product } from '@/lib/mockProducts'

// Category structure with subcategories
interface CategoryNode {
  name: string
  slug: string
  children?: CategoryNode[]
}

const categoryTree: CategoryNode[] = [
  {
    name: 'Điện tử',
    slug: 'dien-tu',
    children: [
      {
        name: 'Điện thoại',
        slug: 'dien-thoai',
        children: [
          { name: 'iPhone', slug: 'iphone' },
          { name: 'Samsung', slug: 'samsung' },
          { name: 'Xiaomi', slug: 'xiaomi' },
          { name: 'OPPO', slug: 'oppo' },
        ]
      },
      {
        name: 'Laptop',
        slug: 'laptop',
        children: [
          { name: 'MacBook', slug: 'macbook' },
          { name: 'Dell', slug: 'dell' },
          { name: 'ASUS', slug: 'asus' },
          { name: 'Lenovo', slug: 'lenovo' },
        ]
      },
      {
        name: 'Đồng hồ thông minh',
        slug: 'smartwatch',
        children: [
          { name: 'Apple Watch', slug: 'apple-watch' },
          { name: 'Samsung Watch', slug: 'samsung-watch' },
          { name: 'Xiaomi Band', slug: 'xiaomi-band' },
        ]
      },
      {
        name: 'Đồ gia dụng',
        slug: 'gia-dung',
        children: [
          { name: 'Máy hút bụi', slug: 'may-hut-bui' },
          { name: 'Máy sấy tóc', slug: 'may-say-toc' },
          { name: 'Nồi chiên', slug: 'noi-chien' },
        ]
      },
      { name: 'Tablet', slug: 'tablet' },
      { name: 'Tai nghe', slug: 'tai-nghe' },
      { name: 'Gaming', slug: 'gaming' },
    ]
  },
  {
    name: 'Thời trang',
    slug: 'thoi-trang',
    children: [
      {
        name: 'Giày dép',
        slug: 'giay-dep',
        children: [
          { name: 'Nike', slug: 'nike' },
          { name: 'Adidas', slug: 'adidas' },
          { name: 'Jordan', slug: 'jordan' },
          { name: 'Vans', slug: 'vans' },
        ]
      },
      {
        name: 'Quần áo',
        slug: 'quan-ao',
        children: [
          { name: 'Áo thun', slug: 'ao-thun' },
          { name: 'Áo khoác', slug: 'ao-khoac' },
          { name: 'Quần jeans', slug: 'quan-jeans' },
        ]
      },
      {
        name: 'Túi xách',
        slug: 'tui-xach',
        children: [
          { name: 'Louis Vuitton', slug: 'louis-vuitton' },
          { name: 'Chanel', slug: 'chanel' },
          { name: 'Gucci', slug: 'gucci' },
          { name: 'Hermès', slug: 'hermes' },
        ]
      },
      {
        name: 'Đồng hồ',
        slug: 'dong-ho',
        children: [
          { name: 'Rolex', slug: 'rolex' },
          { name: 'Omega', slug: 'omega' },
          { name: 'Casio', slug: 'casio' },
        ]
      },
      { name: 'Kính mắt', slug: 'kinh-mat' },
      { name: 'Phụ kiện', slug: 'phu-kien-tt' },
    ]
  },
  {
    name: 'Đồ sinh viên',
    slug: 'do-sinh-vien',
    children: [
      {
        name: 'Sách & Giáo trình',
        slug: 'sach-giao-trinh',
        children: [
          { name: 'CNTT & Lập trình', slug: 'cntt' },
          { name: 'Kinh tế', slug: 'kinh-te' },
          { name: 'Ngoại ngữ', slug: 'ngoai-ngu' },
          { name: 'Y Dược', slug: 'y-duoc' },
        ]
      },
      {
        name: 'Truyện & Sách văn học',
        slug: 'truyen-sach',
        children: [
          { name: 'Light Novel', slug: 'light-novel' },
          { name: 'Manga', slug: 'manga' },
          { name: 'Sách self-help', slug: 'self-help' },
        ]
      },
      {
        name: 'Đồ dùng học tập',
        slug: 'do-dung-hoc-tap',
        children: [
          { name: 'Balo & Túi', slug: 'balo-tui' },
          { name: 'Văn phòng phẩm', slug: 'van-phong-pham' },
          { name: 'Máy tính cầm tay', slug: 'may-tinh-cam-tay' },
        ]
      },
      { name: 'Xe đạp', slug: 'xe-dap' },
      { name: 'Đồ phòng trọ', slug: 'do-phong-tro' },
      { name: 'Đồ linh tinh', slug: 'do-linh-tinh' },
    ]
  },
]

// Category to product mapping
const categoryToProduct: Record<string, string> = {
  // Điện tử
  'dien-tu': 'Điện tử',
  'dien-thoai': 'Điện tử',
  'iphone': 'Điện tử',
  'samsung': 'Điện tử',
  'xiaomi': 'Điện tử',
  'oppo': 'Điện tử',
  'laptop': 'Điện tử',
  'macbook': 'Điện tử',
  'dell': 'Điện tử',
  'asus': 'Điện tử',
  'lenovo': 'Điện tử',
  'smartwatch': 'Điện tử',
  'apple-watch': 'Điện tử',
  'samsung-watch': 'Điện tử',
  'xiaomi-band': 'Điện tử',
  'gia-dung': 'Điện tử',
  'may-hut-bui': 'Điện tử',
  'may-say-toc': 'Điện tử',
  'noi-chien': 'Điện tử',
  'tablet': 'Điện tử',
  'tai-nghe': 'Điện tử',
  'gaming': 'Điện tử',
  // Thời trang
  'thoi-trang': 'Thời trang',
  'giay-dep': 'Thời trang',
  'nike': 'Thời trang',
  'adidas': 'Thời trang',
  'jordan': 'Thời trang',
  'vans': 'Thời trang',
  'quan-ao': 'Thời trang',
  'ao-thun': 'Thời trang',
  'ao-khoac': 'Thời trang',
  'quan-jeans': 'Thời trang',
  'tui-xach': 'Thời trang',
  'louis-vuitton': 'Thời trang',
  'chanel': 'Thời trang',
  'gucci': 'Thời trang',
  'hermes': 'Thời trang',
  'dong-ho': 'Thời trang',
  'rolex': 'Thời trang',
  'omega': 'Thời trang',
  'casio': 'Thời trang',
  'kinh-mat': 'Thời trang',
  'phu-kien-tt': 'Thời trang',
  // Đồ sinh viên
  'do-sinh-vien': 'Đồ sinh viên',
  'sach-giao-trinh': 'Đồ sinh viên',
  'cntt': 'Đồ sinh viên',
  'kinh-te': 'Đồ sinh viên',
  'ngoai-ngu': 'Đồ sinh viên',
  'y-duoc': 'Đồ sinh viên',
  'truyen-sach': 'Đồ sinh viên',
  'light-novel': 'Đồ sinh viên',
  'manga': 'Đồ sinh viên',
  'self-help': 'Đồ sinh viên',
  'do-dung-hoc-tap': 'Đồ sinh viên',
  'balo-tui': 'Đồ sinh viên',
  'van-phong-pham': 'Đồ sinh viên',
  'may-tinh-cam-tay': 'Đồ sinh viên',
  'xe-dap': 'Đồ sinh viên',
  'do-phong-tro': 'Đồ sinh viên',
  'do-linh-tinh': 'Đồ sinh viên',
}

// Keywords for filtering
const categoryKeywords: Record<string, string[]> = {
  // Điện tử
  'iphone': ['iPhone'],
  'samsung': ['Samsung', 'Galaxy'],
  'xiaomi': ['Xiaomi', 'Redmi'],
  'oppo': ['OPPO'],
  'macbook': ['MacBook'],
  'dell': ['Dell'],
  'asus': ['ASUS'],
  'lenovo': ['Lenovo', 'ThinkPad'],
  'apple-watch': ['Apple Watch'],
  'samsung-watch': ['Galaxy Watch'],
  'xiaomi-band': ['Xiaomi Band', 'Mi Band'],
  'may-hut-bui': ['Dyson', 'hút bụi'],
  'may-say-toc': ['Dyson', 'sấy tóc'],
  'noi-chien': ['nồi chiên', 'air fryer'],
  'tablet': ['iPad', 'Tab'],
  'tai-nghe': ['AirPods', 'tai nghe', 'headphone'],
  'gaming': ['PlayStation', 'PS5', 'Xbox', 'Nintendo'],
  // Thời trang
  'nike': ['Nike'],
  'adidas': ['Adidas'],
  'jordan': ['Jordan'],
  'vans': ['Vans'],
  'gucci': ['Gucci'],
  'chanel': ['Chanel'],
  'louis-vuitton': ['Louis Vuitton', 'LV'],
  'hermes': ['Hermès', 'Hermes'],
  'rolex': ['Rolex'],
  'omega': ['Omega'],
  'casio': ['Casio', 'G-Shock'],
  'kinh-mat': ['Ray-Ban', 'kính'],
  // Đồ sinh viên
  'cntt': ['lập trình', 'coding', 'CNTT', 'Python', 'Java'],
  'kinh-te': ['kinh tế', 'marketing', 'quản trị'],
  'ngoai-ngu': ['IELTS', 'TOEIC', 'tiếng Anh', 'tiếng Nhật'],
  'y-duoc': ['y học', 'dược', 'giải phẫu'],
  'light-novel': ['Light Novel', 'LN'],
  'manga': ['Manga', 'One Piece', 'Naruto'],
  'self-help': ['self-help', 'đắc nhân tâm'],
  'balo-tui': ['balo', 'túi'],
  'van-phong-pham': ['bút', 'vở', 'giấy'],
  'may-tinh-cam-tay': ['Casio fx', 'máy tính'],
  'xe-dap': ['xe đạp', 'Giant', 'Martin'],
}

// Price Range Dropdown Component
function PriceRangeDropdown({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onChange,
  isOpen,
  onToggle,
}: {
  minPrice: number
  maxPrice: number
  currentMin: number
  currentMax: number
  onChange: (min: number, max: number) => void
  isOpen: boolean
  onToggle: () => void
}) {
  const [localMin, setLocalMin] = useState(currentMin)
  const [localMax, setLocalMax] = useState(currentMax)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalMin(currentMin)
    setLocalMax(currentMax)
  }, [currentMin, currentMax])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onToggle()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}tr`
    return `${(price / 1000).toFixed(0)}k`
  }

  const presetRanges = [
    { label: 'Tất cả', min: minPrice, max: maxPrice },
    { label: 'Dưới 5tr', min: minPrice, max: 5000000 },
    { label: '5 - 15tr', min: 5000000, max: 15000000 },
    { label: '15 - 50tr', min: 15000000, max: 50000000 },
    { label: '50 - 100tr', min: 50000000, max: 100000000 },
    { label: 'Trên 100tr', min: 100000000, max: maxPrice },
  ]

  const hasCustomRange = currentMin !== minPrice || currentMax !== maxPrice

  const handleApply = () => {
    onChange(localMin, localMax)
    onToggle()
  }

  const getPercentage = (value: number) => ((value - minPrice) / (maxPrice - minPrice)) * 100

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${hasCustomRange
          ? 'bg-brand-orange text-white border-brand-orange'
          : 'bg-white border-slate-200 text-slate-700 hover:border-brand-orange'
          }`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>
          {hasCustomRange ? `${formatPrice(currentMin)} - ${formatPrice(currentMax)}` : 'Khoảng giá'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
          >
            {/* Quick Select */}
            <div className="p-4 border-b border-slate-100">
              <p className="text-xs text-slate-500 mb-2 font-medium">Chọn nhanh</p>
              <div className="flex flex-wrap gap-2">
                {presetRanges.map((range, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setLocalMin(range.min)
                      setLocalMax(range.max)
                      onChange(range.min, range.max)
                      onToggle()
                    }}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all ${currentMin === range.min && currentMax === range.max
                      ? 'bg-brand-orange text-white border-brand-orange'
                      : 'border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange'
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Range */}
            <div className="p-4">
              <p className="text-xs text-slate-500 mb-3 font-medium">Tùy chỉnh khoảng giá</p>

              {/* Slider */}
              <div className="relative h-2 bg-slate-100 rounded-full mb-4">
                <div
                  className="absolute h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full"
                  style={{
                    left: `${getPercentage(localMin)}%`,
                    width: `${getPercentage(localMax) - getPercentage(localMin)}%`,
                  }}
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step={1000000}
                  value={localMin}
                  onChange={(e) => setLocalMin(Math.min(Number(e.target.value), localMax - 1000000))}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step={1000000}
                  value={localMax}
                  onChange={(e) => setLocalMax(Math.max(Number(e.target.value), localMin + 1000000))}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Input Fields */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <label className="text-xs text-slate-400 mb-1 block">Từ</label>
                  <input
                    type="text"
                    value={localMin.toLocaleString('vi-VN')}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/\D/g, '')) || 0
                      setLocalMin(Math.max(minPrice, Math.min(val, localMax - 1000000)))
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
                  />
                </div>
                <span className="text-slate-300 mt-5">—</span>
                <div className="flex-1">
                  <label className="text-xs text-slate-400 mb-1 block">Đến</label>
                  <input
                    type="text"
                    value={localMax.toLocaleString('vi-VN')}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/\D/g, '')) || maxPrice
                      setLocalMax(Math.min(maxPrice, Math.max(val, localMin + 1000000)))
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full py-2.5 bg-brand-green text-white rounded-xl font-medium hover:bg-brand-green/90 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Category Dropdown Component - Support 3 levels
function CategoryDropdown({
  categories,
  selectedPath,
  onSelect,
  isOpen,
  onToggle,
}: {
  categories: CategoryNode[]
  selectedPath: string[]
  onSelect: (path: string[]) => void
  isOpen: boolean
  onToggle: () => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [hoveredLevel1, setHoveredLevel1] = useState<string | null>(null)
  const [hoveredLevel2, setHoveredLevel2] = useState<string | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onToggle()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  // Reset hover states when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setHoveredLevel1(null)
      setHoveredLevel2(null)
    }
  }, [isOpen])

  const getCategoryName = () => {
    if (selectedPath.length === 0) return 'Tất cả danh mục'
    let current: CategoryNode[] = categories
    let name = ''
    for (const slug of selectedPath) {
      const found = current.find(c => c.slug === slug)
      if (found) {
        name = found.name
        current = found.children || []
      }
    }
    return name
  }

  // Find level 1 category data
  const level1Data = hoveredLevel1 ? categories.find(c => c.slug === hoveredLevel1) : null

  // Find level 2 category data
  const level2Data = hoveredLevel2 && level1Data?.children
    ? level1Data.children.find(c => c.slug === hoveredLevel2)
    : null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${selectedPath.length > 0
          ? 'bg-brand-green text-white border-brand-green'
          : 'bg-white border-slate-200 text-slate-700 hover:border-brand-green'
          }`}
      >
        <Tag className="w-4 h-4" />
        <span>{getCategoryName()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden flex"
          >
            {/* Level 1 - Main Categories */}
            <div className="w-44 border-r border-slate-100 max-h-[400px] overflow-y-auto">
              <button
                onClick={() => {
                  onSelect([])
                  onToggle()
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-all ${selectedPath.length === 0
                  ? 'bg-brand-green/10 text-brand-green font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                Tất cả danh mục
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    if (!cat.children || cat.children.length === 0) {
                      onSelect([cat.slug])
                      onToggle()
                    } else {
                      // Select this category but keep dropdown open for drilling down
                      onSelect([cat.slug])
                    }
                  }}
                  onMouseEnter={() => {
                    setHoveredLevel1(cat.slug)
                    setHoveredLevel2(null)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between ${selectedPath[0] === cat.slug || hoveredLevel1 === cat.slug
                    ? 'bg-brand-green/10 text-brand-green font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <span>{cat.name}</span>
                  {cat.children && cat.children.length > 0 && (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Level 2 - Subcategories */}
            <AnimatePresence mode="wait">
              {level1Data?.children && level1Data.children.length > 0 && (
                <motion.div
                  key={hoveredLevel1}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="w-44 bg-slate-50/50 border-r border-slate-100 max-h-[400px] overflow-y-auto"
                >
                  {level1Data.children.map((sub) => (
                    <button
                      key={sub.slug}
                      onClick={() => {
                        if (!sub.children || sub.children.length === 0) {
                          onSelect([hoveredLevel1!, sub.slug])
                          onToggle()
                        } else {
                          // Select this subcategory but keep dropdown open
                          onSelect([hoveredLevel1!, sub.slug])
                        }
                      }}
                      onMouseEnter={() => setHoveredLevel2(sub.slug)}
                      className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between ${selectedPath[1] === sub.slug || hoveredLevel2 === sub.slug
                        ? 'bg-brand-green/10 text-brand-green font-medium'
                        : 'text-slate-600 hover:bg-white'
                        }`}
                    >
                      <span>{sub.name}</span>
                      {sub.children && sub.children.length > 0 && (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Level 3 - Sub-subcategories */}
            <AnimatePresence mode="wait">
              {level2Data?.children && level2Data.children.length > 0 && (
                <motion.div
                  key={hoveredLevel2}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="w-40 bg-slate-100/50 max-h-[400px] overflow-y-auto"
                >
                  {level2Data.children.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => {
                        onSelect([hoveredLevel1!, hoveredLevel2!, item.slug])
                        onToggle()
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-all ${selectedPath[2] === item.slug
                        ? 'bg-brand-green/10 text-brand-green font-medium'
                        : 'text-slate-600 hover:bg-white'
                        }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductsPage() {
  const priceRange = useMemo(() => {
    const prices = mockProducts.map(p => p.price)
    return { min: 0, max: Math.max(...prices) }
  }, [])

  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState({ min: priceRange.min, max: priceRange.max })
  const [sortBy, setSortBy] = useState<string>('newest')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPriceDropdown, setShowPriceDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false)
      }
    }
    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSortDropdown])

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-low', label: 'Giá thấp → cao' },
    { value: 'price-high', label: 'Giá cao → thấp' },
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'trust', label: 'Điểm tin cậy' },
  ]

  const clearAllFilters = () => {
    setSelectedCategoryPath([])
    setPriceFilter({ min: priceRange.min, max: priceRange.max })
  }

  const getCategoryName = (path: string[]): string => {
    if (path.length === 0) return ''
    let current: CategoryNode[] = categoryTree
    let name = ''
    for (const slug of path) {
      const found = current.find(c => c.slug === slug)
      if (found) {
        name = found.name
        current = found.children || []
      }
    }
    return name
  }

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts]

    // Category filter - support 3 levels with subcategory
    if (selectedCategoryPath.length > 0) {
      const lastSlug = selectedCategoryPath[selectedCategoryPath.length - 1]
      const categoryName = categoryToProduct[lastSlug]
      const keywords = categoryKeywords[lastSlug] || []

      products = products.filter(p => {
        // First check if product has subcategory matching the selected slug
        if (p.subcategory === lastSlug) {
          return true
        }

        // Then check main category match with keywords
        if (p.category === categoryName) {
          // If we're at the top level category (e.g., "Điện tử"), show all products in that category
          if (selectedCategoryPath.length === 1 && categoryToProduct[selectedCategoryPath[0]] === p.category) {
            return true
          }

          // If we have keywords, filter by them
          if (keywords.length > 0) {
            return keywords.some(kw =>
              p.name.toLowerCase().includes(kw.toLowerCase()) ||
              p.description.toLowerCase().includes(kw.toLowerCase()) ||
              (p.subcategory && p.subcategory.toLowerCase().includes(kw.toLowerCase()))
            )
          }
          return true
        }
        return false
      })
    }

    // Price filter
    products = products.filter(p => p.price >= priceFilter.min && p.price <= priceFilter.max)

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        products.sort((a, b) => b.views - a.views)
        break
      case 'trust':
        products.sort((a, b) => b.trustScore - a.trustScore)
        break
      default:
        products.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    }

    return products
  }, [selectedCategoryPath, priceFilter, sortBy])

  const hasFilters = selectedCategoryPath.length > 0 ||
    priceFilter.min !== priceRange.min ||
    priceFilter.max !== priceRange.max

  return (
    <main className="min-h-screen bg-brand-cream">
      <Header />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-brand-green mb-2">
              Khám phá Sản phẩm
            </h1>
            <p className="text-slate-500">Sản phẩm chất lượng, được kiểm định bởi chuyên gia</p>
          </motion.div>

          {/* Compact Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 mb-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Dropdown - Left side */}
              <CategoryDropdown
                categories={categoryTree}
                selectedPath={selectedCategoryPath}
                onSelect={setSelectedCategoryPath}
                isOpen={showCategoryDropdown}
                onToggle={() => {
                  setShowCategoryDropdown(!showCategoryDropdown)
                  setShowPriceDropdown(false)
                  setShowSortDropdown(false)
                }}
              />

              {/* Spacer to push right side items */}
              <div className="flex-1" />

              {/* Right side filters */}
              <div className="flex items-center gap-3">
                {/* Price Range Dropdown */}
                <PriceRangeDropdown
                  minPrice={priceRange.min}
                  maxPrice={priceRange.max}
                  currentMin={priceFilter.min}
                  currentMax={priceFilter.max}
                  onChange={(min, max) => setPriceFilter({ min, max })}
                  isOpen={showPriceDropdown}
                  onToggle={() => {
                    setShowPriceDropdown(!showPriceDropdown)
                    setShowCategoryDropdown(false)
                    setShowSortDropdown(false)
                  }}
                />

                {/* Divider */}
                <div className="hidden md:block w-px h-8 bg-slate-200" />

                {/* Sort Dropdown */}
                <div className="relative" ref={sortDropdownRef}>
                  <button
                    onClick={() => {
                      setShowSortDropdown(!showSortDropdown)
                      setShowCategoryDropdown(false)
                      setShowPriceDropdown(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-slate-300 transition-all"
                  >
                    <Filter className="w-4 h-4" />
                    <span>{sortOptions.find(o => o.value === sortBy)?.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showSortDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50"
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value)
                              setShowSortDropdown(false)
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-all ${sortBy === opt.value
                              ? 'bg-brand-green/10 text-brand-green font-medium'
                              : 'text-slate-600 hover:bg-slate-50'
                              }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasFilters && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 flex-wrap">
                <span className="text-xs text-slate-400">Đang lọc:</span>

                {selectedCategoryPath.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-medium">
                    {getCategoryName(selectedCategoryPath)}
                    <button onClick={() => setSelectedCategoryPath([])} className="hover:text-brand-green/70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {(priceFilter.min !== priceRange.min || priceFilter.max !== priceRange.max) && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-medium">
                    {priceFilter.min.toLocaleString('vi-VN')}đ - {priceFilter.max.toLocaleString('vi-VN')}đ
                    <button onClick={() => setPriceFilter({ min: priceRange.min, max: priceRange.max })} className="hover:text-brand-orange/70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}


                <button
                  onClick={clearAllFilters}
                  className="text-xs text-slate-400 hover:text-slate-600 underline ml-2"
                >
                  Xóa tất cả
                </button>
              </div>
            )}
          </motion.div>

          {/* Results Count */}
          <div className="text-sm text-slate-500 mb-6">
            Tìm thấy <span className="font-semibold text-brand-green">{filteredProducts.length}</span> sản phẩm
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group border border-slate-100"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${product.trustScore >= 90 ? 'bg-emerald-500 text-white' : 'bg-yellow-500 text-white'
                        }`}>
                        {product.trustScore}/100
                      </div>

                      {product.hasReview && (
                        <div className="absolute top-3 left-3 bg-purple-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                          <ShieldCheck className="w-3 h-3" />
                          Kiểm định
                        </div>
                      )}

                      <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                        <Heart className="w-5 h-5 text-brand-orange" />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-brand-green/60 mb-1">{product.category}</div>
                      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 h-12 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-emerald-600">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{product.condition}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-400 text-sm border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{product.views}</span>
                        </div>
                        <span className="text-xs truncate max-w-[100px]">{product.seller}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-slate-500 mb-4">Thử điều chỉnh bộ lọc để xem thêm sản phẩm</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90"
              >
                Xóa bộ lọc
              </button>
            </motion.div>
          )}

          {/* Load More */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-green/90 transition-all shadow-lg hover:shadow-xl">
                Xem thêm sản phẩm
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
