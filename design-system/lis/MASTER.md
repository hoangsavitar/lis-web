# LIS Brand — Master Design System (Source of Truth)

> Generated using UI/UX Pro Max intelligence (`.agents/skills/ui-ux-pro-max`)
> Target Archetype: **Contemporary Chic & Youthful Luxury (Trẻ trung, Mịn màng, Xịn xò)**
> Benchmarks: **Jacquemus, Stand Oil, By Far, Coperni, Gentle Monster, Polène Paris (Modern Look)**

---

## 1. Triết Lý Thiết Kế & Định Vị Mới

* **Phong cách chủ đạo**: `Contemporary Chic + Soft Luxury + Modern Editorial`
* **Cảm xúc mang lại**:
  - Trẻ trung, phóng khoáng, thời thượng, mịn màng và tràn đầy năng lượng Gen Z / Modern Millennial.
  - Loại bỏ hoàn toàn sự già cỗi, nặng nề, khuôn mẫu của font chữ cổ điển rập khuôn hay giao diện AI cứng nhắc.
* **Quy tắc Hình khối & Không gian**:
  - Bo góc mềm mại, sang xịn: `rounded-2xl` (16px) cho khung ảnh, `rounded-xl` (12px) cho card, `rounded-full` cho tags và nút bấm.
  - Hiệu ứng kính mờ trong suốt: `backdrop-blur-xl bg-white/80` tạo chiều sâu thanh thoát.
  - Khoảng thở thoáng đãng, padding rộng rãi, không bị nhồi nhét.

---

## 2. Bảng Màu "Mịn — Xịn — Sang" (Color System)

```css
:root {
  /* Canvas & Nền (Sữa yến mạch & Ngọc trai) */
  --bg-canvas: #F8F6F0;           /* Oat Milk: Dịu mắt, mịn màng, cao cấp */
  --bg-surface: #FFFFFF;          /* Pure White: Thẻ sản phẩm, drawer, modal */
  --bg-subtle: #F0EDE4;           /* Warm Sand: Khối editorial, review */
  --bg-dark: #121110;             /* Đen nhung sâu cho footer */

  /* Text & Typography (Mềm mại, không bị đen gắt) */
  --text-main: #18181B;           /* Deep Espresso / Zinc 900: Sắc sảo, hiện đại */
  --text-body: #52525B;           /* Zinc 600: Thân thiện, dễ đọc */
  --text-muted: #A1A1AA;          /* Zinc 400: Nhãn phụ, placeholder */

  /* Điểm chạm Màu sắc Trẻ trung (Chic Accents) */
  --accent-rose: #9A2C46;         /* Đỏ cherry chín / Muted Berry sang trọng */
  --accent-gold: #C5A880;         /* Vàng Champagne satin mịn màng */
  --accent-butter: #F4EBD9;       /* Vàng bơ mềm mại thời thượng */
  --accent-green: #486954;        /* Xanh rêu sage hiện đại */
  --accent-tag: #18181B;          /* Tag đen pill chic */

  /* Đường viền Mịn (Hairline & Soft Ring) */
  --border-subtle: rgba(24, 24, 27, 0.07);
  --border-active: #18181B;

  /* Bóng đổ Êm ái (Soft Ambient Blur) */
  --shadow-chic: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 20px 40px -15px rgba(0, 0, 0, 0.08);
}
```

---

## 3. Hệ Thống Typography Mới (Loại Bỏ Font AI Cứng Nhắc)

| Vai trò | Font Family | Tùy chọn kiểu | Điểm nhấn thiết kế |
|---|---|---|---|
| **Tiêu đề Chính & Giao diện (Primary UI & Headings)** | **`Plus Jakarta Sans`** | 500 Medium / 600 SemiBold / 700 Bold | Đường cong hình học mềm mại, tròn trịa, mịn màng, hiện đại, hỗ trợ 100% tiếng Việt hoàn hảo. |
| **Điểm nhấn Nghệ thuật (Editorial Accents)** | **`Cormorant Garamond`** | Italic (Nghiêng nhẹ) | Thơ mộng như tạp chí thời trang Paris (dùng cho các từ khóa nhấn như *Collection*, *Atelier*, *New Muse*). |
| **Giá cả & Metadata (Numbers & Tech)** | **`Space Grotesk`** | 500 Medium / 600 SemiBold | Hiện đại, sắc nét, mang hơi thở thời trang công nghệ tương lai. |

---

## 4. Quy Tắc Micro-Interactions (60-120 FPS)

1. **Thẻ Sản Phẩm**:
   - Khung bo tròn nhẹ `rounded-2xl` mềm mại.
   - Khi hover: Ảnh chính chuyển sang ảnh lifestyle mượt mà trong 350ms (`scale: 1.03`), bóng đổ khuếch tán nhẹ nhàng, hiện thanh nút "Bỏ Túi Ngay" bo tròn viên thuốc (`rounded-full`).
2. **Chấm màu Swatch**:
   - Chấm tròn 16px viền mềm, khi active có vòng ring kép tinh xảo.
3. **Mini-Cart Drawer**:
   - Kính mờ trong trẻo `backdrop-blur-xl bg-white/90`.
   - Thanh tiến trình Freeship lấp lánh nhẹ nhàng, nút tăng giảm bo tròn êm tay.
