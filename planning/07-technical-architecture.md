# 7. Kiến trúc Kỹ thuật & Hạ tầng Triển khai (Technical Architecture)

Tài liệu này quy định toàn bộ ngăn xếp công nghệ (Technology Stack), chiến lược tối ưu hiệu năng (Core Web Vitals), các cổng thanh toán & hãng vận chuyển nội địa Việt Nam, cùng cẩm nang triển khai lên Cloudflare Workers (tận dụng bài học đúc kết từ [CLOUDFLARE.md](file:///c:/Users/hoang/Documents/Code/lis/CLOUDFLARE.md)).

---

## 1. Ngăn xếp Công nghệ Toàn diện (Full Technology Stack)

```
+-------------------------------------------------------------------------+
|                              TRÌNH DUYỆT / KHÁCH HÀNG                   |
|           HTML5 • CSS3 (Tailwind v4) • React 19 • GSAP 3 (Thiệp số)     |
+-------------------------------------------------------------------------+
                                     │ (HTTPS / Edge CDN)
                                     ▼
+-------------------------------------------------------------------------+
|                  CLOUDFLARE EDGE NETWORK / VERCEL EDGE                  |
|     Edge Caching • Brotli Compression • SSL/TLS • DDoS Protection       |
+-------------------------------------------------------------------------+
                                     │
                                     ▼
+-------------------------------------------------------------------------+
|                      NEXT.JS 15 APPLICATION RUNTIME                     |
|  - App Router: Server Components (RSC) + Server Actions                 |
|  - Route Handlers: Webhooks, REST Endpoints                             |
|  - Image Optimization: WebP / AVIF CDN                                  |
|  - State Management: Zustand (Giỏ hàng & Drawer State)                  |
+-------------------------------------------------------------------------+
                    │                                 │
                    ▼                                 ▼
+-----------------------------+     +-----------------------------------+
|     DỮ LIỆU & LƯU TRỮ       |     |     TÍCH HỢP DỊCH VỤ VIỆT NAM     |
| - PostgreSQL (Neon/Supabase)|     | - Thanh toán: VietQR PayOS, VNPay |
| - Prisma ORM (Type-safe)    |     | - Vận chuyển: GHN, GHTK           |
| - Cloudflare KV (Cache tạm) |     | - Tin nhắn: Zalo ZNS / SMS Brand  |
| - Cloudflare R2 / S3 (Ảnh)  |     | - Google Maps API (Showroom)      |
+-----------------------------+     +-----------------------------------+
```

### Chi tiết các gói thư viện chủ lực (`package.json` dự kiến)
* **Core Framework**: `next@^15.5.x`, `react@^19.1.x`, `react-dom@^19.1.x`, `typescript@^5.9.x`
* **Styling**: `tailwindcss@^4.1.x`, `@tailwindcss/postcss`
* **Icons**: `@phosphor-icons/react` (bộ icon cao cấp, nét mảnh chuẩn luxury)
* **Animation**: `gsap@^3.13.x` (cho nghi thức mở phong bì quà tặng)
* **Icons & QR**: `qrcode.react@^4.2.x` (sinh mã QR thanh toán và thiệp số)
* **Forms & Validation**: `react-hook-form@^7.62.x`, `zod@^4.x`
* **State Management**: `zustand@^5.x` (nhẹ hơn Redux 10 lần, lưu trữ persistent cart vào LocalStorage)
* **Database**: `prisma@^6.15.x`, `@prisma/client`
* **Cloudflare Deployment**: `@opennextjs/cloudflare@^1.20.x`, `wrangler@^4.129.x`

---

## 2. Chiến lược Tối ưu Hiệu năng & Core Web Vitals (90+ Mobile)

Website mẫu Hapas gặp vấn đề tải chậm trên thiết bị di động do chèn quá nhiều thư viện JS cũ. Kiến trúc mới sẽ áp dụng các giải pháp đột phá:

### 2.1. Tối ưu LCP (Largest Contentful Paint < 1.2s)
* **Server Components (RSC)**: 90% nội dung trang chủ và danh mục được render sẵn thành HTML từ máy chủ, gửi về trình duyệt tức thì. Trình duyệt không cần chờ tải JS rồi mới vẽ giao diện.
* **Preload Hero Poster**: Thay vì nhúng thẻ `<video>` thô gây giật lag khi mạng chậm, chúng ta đặt 1 ảnh WebP poster chất lượng cao với thuộc tính `priority` của `next/image`. Video nền chỉ được nạp bất đồng bộ sau khi giao diện chính đã sẵn sàng.
* **Font Optimization**: Tận dụng `next/font/google` nạp trước font `Inter` và subset `vietnamese`, loại bỏ hiện tượng giật chữ (FOIT/FOUT).

### 2.2. Tối ưu CLS (Cumulative Layout Shift = 0)
* Đặt thuộc tính `aspect-ratio: 3 / 4` hoặc `aspect-ratio: 1 / 1` cứng cho mọi khung ảnh sản phẩm và skeleton placeholder. Khi ảnh tải xong sẽ vừa khít khung mà không đẩy các khối nội dung bên dưới chạy lộn xộn.

### 2.3. Tối ưu INP (Interaction to Next Paint < 100ms)
* Menu mobile, Drawer cart và Bộ lọc màu sắc sử dụng CSS hardware-accelerated transforms (`transform: translateX()`, `will-change: transform`), đảm bảo tần số quét 60-120 fps mượt mà trên iPhone và Android.

---

## 3. Tích hợp Thanh toán & Vận chuyển Nội địa Việt Nam

### 3.1. Cổng VietQR Động (PayOS / VietQR Open API)
* **Ưu thế vượt trội**: Không mất phí phần trăm thẻ tín dụng, tiền về thẳng tài khoản ngân hàng chính chủ của shop.
* **Cơ chế hoạt động**:
  1. Khách bấm đặt hàng -> Server tạo giao dịch trên PayOS với mã đơn `#LIS-XXXX`.
  2. Hiển thị mã QR chuẩn Napas247 có nhúng sẵn: Số tài khoản, Ngân hàng, Đúng số tiền từng xu, Nội dung chuyển khoản duy nhất.
  3. Khách chỉ cần mở app ngân hàng bất kỳ (Vietcombank, MB, Techcombank, VPBank, v.v.) quét mã -> Không cần gõ số tiền hay ghi chú thủ công -> Loại bỏ 100% sai sót.
  4. PayOS Webhook bắn về server trong 2-3 giây -> Màn hình web tự động nhảy sang "Thanh toán thành công!".

### 3.2. Cổng COD (Thanh toán khi nhận hàng)
* Phương thức truyền thống chiếm ~60% đơn thời trang tại Việt Nam.
* Cho phép xem hàng trước khi nhận (đồng kiểm), có tùy chọn gửi tin nhắn OTP qua Zalo/SMS để xác thực số điện thoại đối với khách mới nhằm giảm tỷ lệ hoàn đơn (Boom hàng).

### 3.3. Tích hợp Giao Hàng Nhanh (GHN Express)
* Sử dụng GHN Open API v2:
  * Lấy danh mục hành chính 3 cấp chuẩn: `/master-data/province`, `/district`, `/ward`.
  * Tính phí vận chuyển chính xác theo khối lượng (túi xách thường nặng 400g - 800g): `POST /v2/shipping-order/fee`.
  * Tự động đẩy đơn sang hệ thống GHN khi admin duyệt: `POST /v2/shipping-order/create`. Bưu tá sẽ tới tận kho lấy hàng.

---

## 4. Tối ưu SEO & Dữ liệu Có Cấu Trúc (Structured Data)

* **Product Schema (JSON-LD)**: Khai báo tên sản phẩm, thương hiệu, giá, tiền tệ VND, tình trạng còn hàng (`InStock`), hình ảnh và đánh giá sao. Giúp Google hiển thị thanh giá và số sao vàng trực tiếp trên kết quả tìm kiếm (Google Rich Results).
* **BreadcrumbList Schema**: Cung cấp đường dẫn phân cấp điều hướng cho Google Bot (`Trang chủ > Túi Xách > Túi Xách Tay`).
* **Dynamic OpenGraph Image**: Sử dụng `next/og` (Edge Image Generation) tự động ghép ảnh túi xách, giá bán và logo thương hiệu vào khung ảnh 1200x630px khi gửi link qua Zalo / Facebook Messenger / iMessage.

---

## 5. Cẩm nang Triển khai Cloudflare Workers (Kế thừa từ CLOUDFLARE.md)

Khi deploy website lên Cloudflare Workers thông qua `@opennextjs/cloudflare`:

1. **Tránh bẫy lặp build vô hạn trong `package.json`**:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "build:worker": "opennextjs-cloudflare build",
       "deploy": "opennextjs-cloudflare deploy"
     }
   }
   ```
   > [!IMPORTANT]
   > Luôn giữ script `"build": "next build"` thuần túy. Script build worker phải là `"build:worker": "opennextjs-cloudflare build"`. Nếu đặt `"build": "opennextjs-cloudflare build"`, opennext sẽ tự gọi `npm run build` tạo thành vòng lặp 30+ lần làm sập máy build.

2. **Cấu hình `wrangler.jsonc`**:
   - `main`: `.open-next/worker.js`
   - `compatibility_date`: `2025-09-01`
   - `compatibility_flags`: `["nodejs_compat"]`
   - `assets`: `{ "directory": ".open-next/assets", "binding": "ASSETS" }`

3. **Luật môi trường Workers**:
   - Không dùng `node:fs` tĩnh đọc ghi ổ cứng vì Workers không có ổ đĩa cứng cục bộ.
   - Cơ sở dữ liệu sử dụng kết nối HTTP/WebSocket Serverless Postgres (Neon / Supabase Transaction Pooler cổng 6543) hoặc Cloudflare Hyperdrive để tăng tốc độ truy vấn Prisma.
