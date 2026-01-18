# SecondLife Marketplace - Nền tảng Thương mại Điện tử Đồ cũ Cao cấp

## 🚀 Tổng quan

Nền tảng mua bán đồ cũ cao cấp với xác thực AI và chuyên gia kiểm định. Từ "chợ trời" đến "showroom" sang trọng.

## ✨ Tính năng

- 🤖 **AI Assessment**: Đánh giá tự động chất lượng sản phẩm
- 👨‍💼 **Expert Review**: Chuyên gia kiểm định chuyên nghiệp
- 💰 **Escrow System**: Bảo vệ tiền giao dịch
- 🛡️ **Reserve Fund**: Quỹ bảo hiểm bồi thường
- 📱 **Responsive Design**: Tối ưu cho mọi thiết bị

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter + Playfair Display

## 📦 Cài đặt

```bash
# Clone repository
git clone <repo-url>

# Di chuyển vào thư mục
cd secondlife-marketplace

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 📁 Cấu trúc Project

```
secondlife-marketplace/
├── app/
│   ├── layout.tsx          # Root layout với fonts
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   └── landing/
│       ├── HeroSection.tsx
│       ├── TrustIndicators.tsx
│       ├── HowItWorks.tsx
│       └── Footer.tsx
├── public/                 # Static assets
└── package.json
```

## 🎨 Landing Page Sections

1. **Hero Section** - Full screen với CTA buttons
2. **Trust Indicators** - Thống kê với CountUp animation
3. **How It Works** - 3 bước đơn giản
4. **Footer** - Links và thông tin liên hệ

## 🚧 Đang phát triển

- [ ] AI Showcase Section
- [ ] Reviewer Network Section
- [ ] Featured Products Section
- [ ] Testimonials Section
- [ ] Value Proposition Section
- [ ] Final CTA Section
- [ ] Header Navigation
- [ ] Authentication Pages
- [ ] Dashboard Pages

## 📝 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🌐 Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT_ID=your-project-id
```

## 📄 License

MIT License - Copyright (c) 2025 SecondLife

## 👥 Team

- Frontend: Next.js 16 + TypeScript
- Backend: Python + FastAPI (đang phát triển)
- AI: Google Cloud Vision API
- Database: PostgreSQL + Redis

## 📞 Liên hệ

- Email: support@secondlife.vn
- Website: https://secondlife.vn
- Phone: 1900 xxxx
