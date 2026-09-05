# LIS — Contemporary Chic & Youthful Luxury

Website thương mại điện tử thời trang đồ da cao cấp **LIS**, lấy cảm hứng từ các thương hiệu thời trang dẫn đầu trào lưu giới trẻ toàn cầu (**Jacquemus, Stand Oil, By Far, Coperni, Gentle Monster**).

---

## ✨ Điểm Nổi Bật Về Giao Diện & Trải Nghiệm (UI/UX)

* **Phong cách Contemporary Chic & Youthful Luxury**: Tông màu Sữa yến mạch Oat Milk (`#F8F6F0`), Đen Espresso (`#18181B`), Đỏ Cherry Muted Berry (`#9A2C46`) và Vàng Champagne Satin (`#C5A880`).
* **Hệ Typography 3 Tầng**:
  - `Plus Jakarta Sans`: Font chủ đạo, tiêu đề & giao diện, nét cong hình học mịn màng, hỗ trợ tiếng Việt 100%.
  - `Cormorant Garamond` (Italic): Điểm xuyết thơ mộng cho các tiêu đề thời trang.
  - `Space Grotesk`: Hiển thị giá cả, mã SKU và metadata sắc sảo.
* **Thẻ Sản Phẩm Vi Tương Tác 60-120 FPS**:
  - Lật ảnh 2 lớp (Hover Image Cross-fade 350ms).
  - Khung bo góc `rounded-2xl` mềm mại.
  - Chấm tròn Swatch đổi ảnh tức thì.
  - Nút "BỎ TÚI NGAY" dạng viên thuốc `rounded-full`.
* **Hệ Thống Giỏ Hàng Tương Tác (Mini-Cart Drawer)**:
  - Hiệu ứng trượt kính mờ `backdrop-blur-xl`.
  - Thanh tiến trình Freeship realtime tính toán số tiền còn thiếu.
  - Đề xuất phụ kiện mua kèm (In-cart Cross-sell: Khăn lụa Twilly, Charm ngựa da).
  - Tự động đồng bộ giỏ hàng vào `localStorage` qua Zustand.
* **Bộ Tìm Kiếm Chia Đôi Màn Hình (Split Mega-Search)**:
  - Tìm kiếm trực tiếp thời gian thực (Live autocomplete) + Cột tạp chí thời trang.
* **Trang Chi Tiết Sản Phẩm (PDP)**:
  - Gallery ảnh đa góc chụp, chọn màu/size, thanh ghim đáy màn hình (Sticky Add-to-cart Bar).

---

## 🛠 Ngăn Xếp Công Nghệ (Tech Stack)

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Persist LocalStorage)
* **Icons**: [@phosphor-icons/react](https://phosphoricons.com/)
* **Typography**: Google Fonts via `next/font/google`
* **Deployment Target**: Cloudflare Workers / Pages (`@opennextjs/cloudflare`)

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev

# 3. Mở trình duyệt tại địa chỉ
http://localhost:3000
```

---

## 📂 Cấu Trúc Dự Án

```
├── app/                  # Next.js 15 App Router (layout, globals.css, pages)
│   ├── collections/      # Trang danh mục & bộ lọc
│   ├── products/         # Trang chi tiết sản phẩm (PDP)
│   └── page.tsx          # Trang chủ chính
├── components/           # Các khối UI tái sử dụng
│   ├── cart/             # MiniCartDrawer & giỏ hàng
│   ├── home/             # HeroSection, CategoryGrid, FeaturedProducts, Story, Lookbook
│   ├── layout/           # Header, Footer, AnnouncementBar
│   ├── product/          # ProductCard vi tương tác
│   └── search/           # SearchDrawer chia đôi màn hình
├── data/                 # Catalog 24 sản phẩm mẫu & dữ liệu Lookbook
├── design-system/        # Master tokens & tài liệu thiết kế UI/UX
├── lib/                  # Zustand stores (cart-store, search-store) & utils
└── public/               # Vector logo và tài nguyên đồ họa
```

---

© 2026 LIS Studio. All Rights Reserved.
