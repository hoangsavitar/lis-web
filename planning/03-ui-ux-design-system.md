# 3. Hệ thống Thiết kế (UI/UX Design System) & Nguyên tắc Trải nghiệm

Tài liệu này định nghĩa hệ thống ngôn ngữ thị giác, Design Tokens, hệ thống typography, bảng màu, các components giao diện cốt lõi và các hiệu ứng chuyển động (micro-interactions) được thiết kế riêng cho thương hiệu túi xách & quà tặng thời trang cao cấp.

---

## 1. Triết lý Thiết kế Mới: Contemporary Chic & Youthful Luxury

Định hình lại toàn diện giao diện theo tinh thần **Thời thượng, Mịn màng, Trẻ trung (Chic & Youthful Luxury)** học tập từ các thương hiệu dẫn dắt xu hướng Gen Z & Millennials toàn cầu (**Jacquemus, Stand Oil, By Far, Coperni**):
* **Trẻ trung & Phóng khoáng**: Thoát khỏi các khuôn mẫu catalogue truyền thống, bố cục tạp chí Indie phóng khoáng với khoảng thở rộng rãi.
* **Đường nét Mịn màng (Soft Shapes)**: Khung ảnh bo góc mềm mại `rounded-2xl` (16px), các thẻ bo `rounded-xl`, các nhãn tag và nút bấm bo viên thuốc `rounded-full`.
* **Màu sắc Trong trẻo**: Gam màu sữa yến mạch (Oat Milk `#F8F6F0`), trắng ngọc trai (`#FBFBFB`), đen espresso (`#18181B`) và vàng champagne mịn.

---

## 2. Bảng Màu "Mịn — Xịn — Sang" (Color Tokens)

```css
:root {
  /* Canvas & Nền */
  --color-canvas-base: #F8F6F0;         /* Sữa yến mạch Oat Milk mịn màng */
  --color-canvas-surface: #FFFFFF;      /* Trắng tuyệt đối cho thẻ và modal */
  --color-canvas-subtle: #F0EDE4;       /* Warm Sand cho khối editorial */
  --color-canvas-dark: #121110;         /* Đen nhung cho footer */

  /* Text & Typography (Mềm mại, không đen gắt) */
  --color-text-main: #18181B;           /* Deep Espresso / Zinc 900 */
  --color-text-secondary: #52525B;     /* Zinc 600 thân thiện */
  --color-text-muted: #A1A1AA;         /* Zinc 400 */

  /* Chic Accents */
  --color-accent-rose: #9A2C46;        /* Đỏ cherry chín sang trọng */
  --color-accent-gold: #C5A880;        /* Vàng Champagne satin */
  --color-accent-butter: #F4EBD9;      /* Vàng bơ mềm mại */
  --color-accent-sale: #D9383A;        /* Tag giảm giá thời thượng */

  /* Bo góc Mềm mại (Soft Radii) */
  --radius-card: 16px;                 /* rounded-2xl */
  --radius-button: 9999px;             /* rounded-full */
  --radius-tag: 9999px;                /* pill shape */
}
```

---

## 3. Typography Mới (Loại Bỏ Font AI Cứng Nhắc)

* **Font chủ đạo (Headings & UI)**: **`Plus Jakarta Sans`**
  * Tính chất: Hình học bo tròn mềm mại, mịn màng, cực kỳ thời trang và trẻ trung, hiển thị tiếng Việt hoàn hảo không lỗi dấu.
* **Font điểm xuyết nghệ thuật (Editorial Accents)**: **`Cormorant Garamond`** (Italic)
  * Áp dụng: Chữ nghiêng thơ mộng cho các từ nhấn như *Collection*, *Atelier*, *New Muse*.
* **Font kỹ thuật (Prices & Metadata)**: **`Space Grotesk`**
  * Áp dụng: Giá bán, mã SKU, các thông số kích thước.

### Bảng phân cấp Typography Mới
| Cấp độ | Font Family | Kích thước Desktop / Mobile | Weight | Kiểu |
|---|---|---|---|---|
| **Display Hero** | `Plus Jakarta Sans` + `Cormorant` | 52px / 36px | Bold (700) + Italic | Trẻ trung, thời thượng, có từ nhấn nghiêng |
| **Section Title**| `Plus Jakarta Sans` | 32px / 24px | SemiBold (600) | Mịn màng, hiện đại |
| **Product Title**| `Plus Jakarta Sans` | 16px / 14px | Medium (500) | Rõ ràng, dễ đọc, không viết hoa gắt gỏng |
| **Price Bold** | `Space Grotesk` | 18px / 16px | Bold (700) | Cá tính, hiện đại |
| **Body Text** | `Plus Jakarta Sans` | 14px / 13px | Regular (400) | Thanh thoát, khoảng cách dòng thoáng |

---

## 4. Các UI Components Cốt lõi (Atomic UI Kit)

### 4.1. Thẻ Sản Phẩm (Product Card)
* **Kích thước ảnh**: Tỉ lệ 3:4 hoặc 1:1, góc bo nhẹ 2px (tinh tế, không bo tròn quá lớn mất nét sang trọng).
* **Hiệu ứng Hover (Desktop)**:
  * Khi rê chuột vào ảnh chính -> Tự động chuyển mượt sang ảnh chụp góc nghiêng/phía sau (`hover-image`) với hiệu ứng fade 0.3s.
  * Xuất hiện thanh màu sắc (`Color Swatches`) bên dưới ảnh.
* **Thanh chọn màu sắc (Color Swatches)**:
  * Các nút tròn đường kính 18px hiển thị màu sắc da thật hoặc họa tiết.
  * Có vòng viền `outline` cách 2px khi đang được chọn.
* **Nhãn khuyến mại (Discount Badge)**:
  * Nhãn góc trái trên: Vàng champagne hoặc đỏ đất `-25%` hoặc `NEW`.
* **Nút Mua Nhanh (Quick Add)**:
  * Nút trượt nhẹ từ dưới lên khi hover trên desktop; nút icon giỏ hàng tinh tế góc dưới ảnh trên mobile.

```
+------------------------------------+
| [SALE -30%]                 (Heart)|
|                                    |
|         HÌNH ẢNH SẢN PHẨM          |
|              (TỈ LỆ 3:4)           |
|                                    |
| [O Đen] [O Kem] [O Nâu] [O Mint]   |
+------------------------------------+
| Túi Xách Tay Aura Size 18          |
| 695.000₫   ~~993.000₫~~            |
| [     + THÊM VÀO GIỎ HÀNG        ] |
+------------------------------------+
```

### 4.2. Bộ lọc Đa năng (Faceted Filter Bar)
* **Desktop**:
  * Thanh lọc ngang đặt trên đầu danh sách sản phẩm gồm 4 dropdowns bấm mở:
    1. **Màu sắc**: Bảng chọn màu trực quan kèm tên tiếng Anh & tiếng Việt (Black, Beige, Burgundy, Tan, v.v.).
    2. **Khoảng giá**: Dual slider trượt kép mượt mà từ 0đ tới 5.000.000đ kèm 2 ô nhập số trực tiếp.
    3. **Loại dáng túi**: Checkbox dạng tag chọn nhanh (Túi xách tay, Kẹp nách, Đeo chéo, Tote, Ví).
    4. **Sắp xếp theo**: Radio list (Mới nhất, Giá tăng dần, Giá giảm dần, Bán chạy nhất).
    5. Nút **"Xóa bộ lọc"** xuất hiện ngay khi có ít nhất 1 điều kiện được áp dụng.
* **Mobile**:
  * Nút cố định "Bộ lọc & Sắp xếp (2)" mở một **Drawer trượt từ cạnh phải** chiếm 90% chiều rộng màn hình, có nút "Áp dụng (hiển thị 48 sản phẩm)" ghim chặt mép dưới.

### 4.3. Giỏ hàng Nổi (Mini-Cart Drawer)
* Chiều rộng 420px trên Desktop, 100% trên Mobile.
* Hiệu ứng trượt từ phải sang với backdrop mờ 40%.
* **Thanh tiến trình Freeship**:
  ```
  [=========>       ] Bạn còn thiếu 150.000đ để được FREESHIP!
  ```
* Danh sách sản phẩm: Ảnh thu nhỏ, tên, phân loại màu/size đã chọn, bộ đếm số lượng (+ / -), nút xóa.
* Ô nhập nhanh Mã giảm giá kèm nút "Áp dụng".
* Nút CTA lớn: **"TIẾN HÀNH THANH TOÁN • 1.290.000₫"**.

### 4.4. Thanh Sticky Add-to-Cart trên Trang Chi Tiết (PDP)
* Khi người dùng cuộn vượt quá nút "Thêm vào giỏ" chính:
  * Xuất hiện một thanh ghim cố định ở đáy màn hình (Bottom Sticky Bar).
  * Hiển thị: Thumbnail ảnh nhỏ + Tên sản phẩm + Giá + Nút bấm chọn nhanh biến thể + Nút "Thêm vào giỏ" ngay lập tức mà không cần cuộn ngược lên đầu trang.

---

## 5. Responsive Breakpoints & Trải nghiệm Di động

| Tên Breakpoint | Độ rộng (Viewport) | Bố cục Lưới Sản phẩm (Grid) | Cơ chế Menu & Điều hướng |
|---|---|---|---|
| **Mobile S** | 375px - 479px | 2 cột (khoảng cách gap 8px) | Hamburger menu drawer + Bottom Navigation Bar |
| **Mobile L** | 480px - 767px | 2 cột (khoảng cách gap 12px) | Hamburger menu drawer + Bottom Navigation Bar |
| **Tablet** | 768px - 1023px | 3 cột (khoảng cách gap 16px) | Top bar rút gọn, giỏ hàng popup |
| **Desktop** | 1024px - 1439px| 4 cột (khoảng cách gap 20px) | Full Mega Menu đa cấp, filter dropdown ngang |
| **Wide Screen** | >= 1440px | 4 hoặc 5 cột (Container max 1400px)| Bố cục chuẩn Studio thời trang cao cấp |

### Thanh điều hướng đáy màn hình cho Mobile (Bottom Navigation Bar)
Cố định dưới chân trình duyệt mobile (chiều cao 56px, hỗ trợ Safe Area của iPhone):
1. 🏠 **Trang chủ**
2. 👜 **Danh mục** (mở drawer chọn nhanh dáng túi)
3. 🔍 **Tìm kiếm** (mở full search overlay)
4. 🛍️ **Giỏ hàng** (có badge số lượng sản phẩm realtime)
5. 👤 **Tài khoản / Đơn hàng**
