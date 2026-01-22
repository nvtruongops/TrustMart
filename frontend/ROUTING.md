# TrustMart - Routing Structure

## Cấu trúc đã cập nhật (2026-01-20)

### ✅ PUBLIC ROUTES (Không cần đăng nhập)
```
/                           → Landing page
/products                   → Danh sách sản phẩm
/products/[id]              → Chi tiết sản phẩm
/login                      → Đăng nhập
/register                   → Đăng ký
/forgot-password            → Quên mật khẩu
```

### ✅ USER ROUTES (Buyer/Seller)
```
/account                    → Tổng quan tài khoản ⭐ (thay /dashboard)
/account/profile            → Hồ sơ cá nhân
/account/wallet             → Quản lý ví
/account/orders             → Tất cả đơn hàng
/account/orders/purchases   → Đơn đã mua
/account/orders/sales       → Đơn đã bán
/account/disputes           → Tranh chấp

/sell                       → Quản lý sản phẩm đang bán (listings)
/sell/new                   → Đăng bán sản phẩm mới
```

### ✅ REVIEWER ROUTES
```
/reviewer                   → Dashboard ⭐
/reviewer/gigs              → Bảng công việc
/reviewer/calendar          → Lịch làm việc
/reviewer/inspect/[id]      → Kiểm định sản phẩm
/reviewer/wallet            → Thu nhập & Compensation Wallet
/reviewer/disputes          → Tranh chấp
/reviewer/register          → Đăng ký Reviewer
```

### ✅ ADMIN ROUTES
```
/admin                      → Dashboard ⭐
/admin/disputes             → Quản lý tranh chấp
/admin/reviewers            → Quản lý Reviewer
/admin/users                → Quản lý User
/admin/finance              → Quản lý tài chính
/admin/shifts               → Quản lý ca trực
/admin/audit-logs           → Nhật ký kiểm toán
/admin/reports              → Báo cáo
/admin/settings             → Cấu hình hệ thống
/admin/tech-support         → Tech Support
/admin/login                → Đăng nhập Admin (2FA)
```

## Thay đổi chính

### ❌ CŨ (SAI):
```
/dashboard              → User dashboard
/dashboard/admin        → Admin dashboard
/reviewer/dashboard     → Reviewer dashboard
```

### ✅ MỚI (ĐÚNG):
```
/account                → User account (không dùng "dashboard")
/admin                  → Admin dashboard
/reviewer               → Reviewer dashboard
```

## Lý do thay đổi

1. **User không cần "dashboard"**: Trong sàn TMĐT (Shopee, Amazon, Tiki), user dùng `/account` hoặc `/my-account`
2. **"Dashboard" chỉ cho vai trò quản lý**: Admin và Reviewer là vai trò quản lý nên dùng dashboard
3. **Nhất quán và ngắn gọn**: `/admin` thay vì `/dashboard/admin`
4. **Dễ nhớ và SEO tốt hơn**: `/account/orders` rõ ràng hơn `/dashboard/orders`

## File Structure

```
frontend/app/
├── page.tsx                    → Landing (/)
├── login/page.tsx              → /login
├── register/page.tsx           → /register
├── products/
│   ├── page.tsx                → /products
│   └── [id]/page.tsx           → /products/[id]
├── account/                    ⭐ MỚI
│   ├── page.tsx                → /account
│   ├── profile/page.tsx        → /account/profile
│   ├── wallet/page.tsx         → /account/wallet
│   ├── orders/
│   │   ├── page.tsx            → /account/orders
│   │   ├── purchases/page.tsx  → /account/orders/purchases
│   │   └── sales/page.tsx      → /account/orders/sales
│   └── disputes/page.tsx       → /account/disputes
├── sell/
│   ├── page.tsx                → /sell (listings)
│   └── new/page.tsx            → /sell/new
├── reviewer/                   ⭐ CẬP NHẬT
│   ├── page.tsx                → /reviewer (dashboard)
│   ├── gigs/page.tsx           → /reviewer/gigs
│   ├── calendar/page.tsx       → /reviewer/calendar
│   ├── wallet/page.tsx         → /reviewer/wallet
│   └── disputes/page.tsx       → /reviewer/disputes
└── admin/                      ⭐ DI CHUYỂN từ dashboard/admin
    ├── page.tsx                → /admin (dashboard)
    ├── disputes/page.tsx       → /admin/disputes
    ├── reviewers/page.tsx      → /admin/reviewers
    ├── users/page.tsx          → /admin/users
    ├── finance/page.tsx        → /admin/finance
    ├── shifts/page.tsx         → /admin/shifts
    └── audit-logs/page.tsx     → /admin/audit-logs
```

## Redirect Logic

```typescript
// After login
if (role === 'buyer' || role === 'seller') {
  redirect('/account')  // ⭐ Thay đổi từ /dashboard
}
if (role === 'reviewer') {
  redirect('/reviewer')  // ⭐ Thay đổi từ /reviewer/dashboard
}
if (role === 'admin') {
  redirect('/admin')  // ⭐ Thay đổi từ /admin/dashboard
}
```

## Navigation

### User Header (sau đăng nhập):
- Logo → `/`
- Sản phẩm → `/products`
- Đăng bán → `/sell/new`
- **Tài khoản** → `/account` ⭐
  - Hồ sơ → `/account/profile`
  - Ví → `/account/wallet`
  - Đơn hàng → `/account/orders`
  - Tranh chấp → `/account/disputes`

### Reviewer Sidebar:
- **Dashboard** → `/reviewer` ⭐
- Công việc → `/reviewer/gigs`
- Lịch → `/reviewer/calendar`
- Ví → `/reviewer/wallet`
- Tranh chấp → `/reviewer/disputes`

### Admin Sidebar:
- **Dashboard** → `/admin` ⭐
- Tranh chấp → `/admin/disputes`
- Reviewer → `/admin/reviewers`
- User → `/admin/users`
- Tài chính → `/admin/finance`
- Ca trực → `/admin/shifts`
- Audit Logs → `/admin/audit-logs`

## Status

✅ **Đã hoàn thành:**
- [x] Tạo `/account/page.tsx`
- [x] Tạo `/reviewer/page.tsx`
- [x] Di chuyển `/dashboard/admin` → `/admin`
- [x] Cập nhật links trong admin pages
- [x] Tạo tài liệu routing mới

⏳ **Cần làm tiếp:**
- [ ] Tạo các pages còn lại trong `/account/*`
- [ ] Tạo các pages còn lại trong `/reviewer/*`
- [ ] Tạo các pages còn lại trong `/admin/*`
- [ ] Cập nhật navigation components
- [ ] Cập nhật middleware cho protected routes
- [ ] Testing routing flow

## References

- Shopee: `/user/account`, `/user/purchase`
- Amazon: `/your-account`, `/your-orders`
- Tiki: `/customer/account`, `/customer/order`
- **TrustMart**: `/account`, `/account/orders` ⭐
