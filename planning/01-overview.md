# 1. Tổng quan Dự án Clone & Phát triển Website Thời trang (Chuẩn Hapas.vn)

## 1. Bối cảnh & Mục tiêu

### 1.1. Bối cảnh
[Hapas.vn](https://hapas.vn/) là một trong những thương hiệu bán lẻ túi xách, giày dép và phụ kiện thời trang nữ hàng đầu tại Việt Nam, sở hữu hệ sinh thái chuỗi cửa hàng vật lý kết hợp kênh bán lẻ online (Omnichannel). Website hiện tại của Hapas được xây dựng trên nền tảng Haravan với cấu trúc sản phẩm phong phú, khả năng phân loại bộ sưu tập linh hoạt, các chiến dịch khuyến mại/quà tặng theo mùa (8/3, 20/10, Valentine, v.v.), cùng các tính năng thương mại điện tử chuyên sâu cho thị trường Việt Nam (tìm cửa hàng còn hàng, COD, chuyển khoản, lọc theo màu sắc swatch, phân loại theo kích thước/dáng túi).

### 1.2. Mục tiêu dự án
1. **Phân tích và Clone kiến trúc cốt lõi**: Nắm bắt trọn vẹn mô hình tổ chức danh mục, luồng mua hàng (Shopping Flow), hệ thống lọc sản phẩm theo biến thể (Faceted Search), và giao diện thời trang tinh tế của Hapas.
2. **Loại bỏ nhược điểm của website mẫu**: 
   - Hapas hiện tại load rất nhiều thư viện JS nặng (jQuery, slick-slider, các plugin tích hợp rời rạc của Haravan, script tracking bên thứ 3) gây tụt điểm Core Web Vitals (đặc biệt là điểm Mobile).
   - Cần hiện đại hóa toàn bộ stack bằng **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**, tối ưu tải trang cực nhanh (< 1.2s), điểm Google Lighthouse 95+.
3. **Định hình phiên bản tùy biến cho thương hiệu LIS**:
   - Tinh chỉnh phong cách thị giác theo trường phái Quiet Luxury / Clean Editorial (sử dụng gam màu ấm, typography thanh lịch, tỉ lệ khung hình chuẩn tạp chí).
   - Tích hợp điểm chạm độc quyền: Tính năng **Tặng quà & Thiệp điện tử (Digital Gifting)** kế thừa từ dự án LIS sẵn có (người mua có thể tạo thiệp chúc mừng, tạo mã bí mật hoặc in kèm mã QR lên hộp quà).

---

## 2. Phân tích Mô hình & Đối tượng Người dùng

### 2.1. Chân dung khách hàng mục tiêu (Target Persona)
- **Nữ giới từ 18 - 35 tuổi**: Sinh viên, nhân viên văn phòng, phụ nữ hiện đại yêu thích thời trang thanh lịch, bắt kịp xu hướng (Trendsetter).
- **Nam giới mua quà tặng**: Nhóm khách hàng phát sinh vào các dịp lễ lớn (Valentine 14/2, Quốc tế Phụ nữ 8/3, Phụ nữ Việt Nam 20/10, Sinh nhật, Giáng sinh). Nhóm này cần gợi ý set quà đóng gói sẵn, thao tác mua nhanh, thanh toán tiện lợi và có thiệp kèm theo.
- **Hành vi truy cập**: Hơn **85% lượng truy cập đến từ thiết bị di động** (qua Facebook Ads, TikTok, Instagram, Shopee redirection). Trải nghiệm Mobile-first là yếu tố sống còn.

### 2.2. Các trụ cột giá trị (Value Propositions)
| Trụ cột | Mô tả trên Hapas | Cải tiến cho phiên bản LIS |
|---|---|---|
| **Dáng túi đa dạng** | Túi xách tay, túi kẹp nách/đeo vai, túi đeo chéo, túi tote, ví & phụ kiện | Giữ nguyên phân loại dáng túi trực quan, bổ sung hướng dẫn "Chọn kích thước vừa điện thoại / laptop" |
| **Quà tặng theo mùa** | Các BST theo mùa lễ hội (Set hộp quà sang trọng, combo) | Nâng tầm với nghi thức mở quà số: Kèm thiệp điện tử quét mã QR mở phong bì hoạt họa (GSAP) |
| **Độ phủ kênh bán lẻ** | Hệ thống showroom đa tỉnh thành | Tích hợp bản đồ trực quan, tra cứu tồn kho từng showroom theo thời gian thực (Realtime store inventory) |
| **Chính sách an tâm** | Đổi trả 14 ngày, kiểm tra hàng trước khi thanh toán (đồng kiểm COD) | Quy trình đổi trả minh bạch, tích hợp tra cứu vận đơn tự động qua Zalo/SMS |

---

## 3. Bản đồ Tài liệu Kế hoạch (Planning Artifacts Map)

Hệ thống tài liệu quy hoạch chi tiết được phân bổ trong thư mục `planning/`:

```
c:\Users\hoang\Documents\Code\lis\planning\
├── 01-overview.md                 # Tài liệu này: Tổng quan, mục tiêu, định vị
├── 02-feature-matrix.md           # Ma trận tính năng Hapas: Giữ lại, Bỏ bớt, Cải tiến
├── 03-ui-ux-design-system.md      # Hệ thống thiết kế, bảng màu, typography, UI components
├── 04-site-architecture.md        # Cấu trúc sitemap, routing Next.js, luồng người dùng
├── 05-data-modeling.md            # Mô hình dữ liệu Prisma/PostgreSQL, bảng quan hệ
├── 06-api-specifications.md       # Danh sách API endpoints, route handlers, server actions
├── 07-technical-architecture.md   # Kiến trúc hạ tầng, thanh toán, vận chuyển, Core Web Vitals
└── 08-implementation-roadmap.md   # Lộ trình triển khai chi tiết 5 giai đoạn (Sprints & Checklist)
```

---

## 4. Các Tiêu chuẩn Kỹ thuật (Technical Benchmarks)

1. **Hiệu năng & Tốc độ**:
   - Google PageSpeed Insights: **> 90 Mobile, > 98 Desktop**.
   - LCP (Largest Contentful Paint) < 1.5s trên mạng 4G tiêu chuẩn.
   - CLS (Cumulative Layout Shift) = 0.
2. **SEO & Khả năng hiển thị**:
   - Cấu trúc URL thân thiện, chuẩn SEO (`/collections/[slug]`, `/products/[slug]`, `/blogs/[category]/[slug]`).
   - Tự động sinh `sitemap.xml`, `robots.txt`, OpenGraph Image động (Dynamic OG Image) cho từng sản phẩm.
   - Tích hợp đầy đủ dữ liệu có cấu trúc (JSON-LD Schema) cho `Product`, `BreadcrumbList`, `Organization`, `LocalBusiness`.
3. **Thanh toán & Vận chuyển nội địa**:
   - Thanh toán quét mã **VietQR (PayOS / SeAPay / MBBank)** tự động xác nhận đơn hàng trong 3 giây.
   - Cổng VNPay, MoMo, và phương thức COD (thanh toán khi nhận hàng).
   - Tích hợp tính phí vận chuyển tự động với Giao Hàng Nhanh (GHN) / Giao Hàng Tiết Kiệm (GHTK).
