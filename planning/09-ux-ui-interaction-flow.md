# 9. Chi tiết Luồng Tương tác UX/UI & Phân tích DOM Chuyên sâu (Chuẩn Hapas.vn)

Tài liệu này là cẩm nang thiết kế và lập trình vi tương tác (Micro-interactions & UX/UI Flows), được trích xuất trực tiếp từ cấu trúc DOM, CSS rules và mã kịch bản thực tế của [Hapas.vn](https://hapas.vn/). Tài liệu đóng vai trò kim chỉ nam giúp tái hiện chính xác 100% từng hiệu ứng hình ảnh, trạng thái hover, chuyển động pop-out, bộ tìm kiếm chia đôi màn hình và giỏ hàng trượt.

---

## 1. Thẻ Sản Phẩm (Product Card / `proloop-item`)

### 1.1. Bản chất Kiến trúc (Architectural Insight)
Trên Hapas, **mỗi biến thể màu sắc của một mẫu túi được hiển thị như một thẻ sản phẩm độc lập** trong lưới danh mục và carousel:
> *Ví dụ:* Cùng một mẫu "Túi Xách Tay Aura Size 18", trên giao diện sẽ xuất hiện 3 thẻ riêng:
> 1. `Túi Xách Tay Aura Size 18 - Xanh Mint` (ảnh đại diện màu Xanh Mint)
> 2. `Túi Xách Tay Aura Size 18 - Kem` (ảnh đại diện màu Kem)
> 3. `Túi Xách Tay Aura Size 18 - Đen` (ảnh đại diện màu Đen)

Chiến lược này giúp khách hàng nhìn thấy toàn bộ dải màu thời trang ngay từ trang chủ/danh mục mà không cần phải nhấp vào từng sản phẩm.

---

### 1.2. Cấu trúc DOM Chuẩn (Exact DOM Anatomy)

```html
<div class="proloop-item" data-id="1073880591" data-variant-id="1167578835">
  <!-- KHỐI ẢNH VÀ HIỆU ỨNG POP-OUT KHI HOVER -->
  <div class="image-container">
    <a href="/products/tui-xach-tay-aura-size-18?variant=1167578835">
      <!-- Ảnh chính (góc trực diện) -->
      <img src="aura_mint_front.jpg" alt="Túi Aura - Xanh Mint" class="main-image" />
      <!-- Ảnh lật khi hover (góc nghiêng / phía sau / chi tiết khóa) -->
      <img src="aura_mint_back.jpg" alt="Túi Aura - Xanh Mint" class="hover-image" />
    </a>

    <!-- KHUNG DROPDOWN BẬT RA KHI HOVER TRÊN DESKTOP (Z-INDEX: 100) -->
    <div class="proloop-info proloop-info-in-image">
      <!-- Danh sách chấm tròn màu sắc -->
      <ul class="color-options">
        <li class="active" data-color="Xanh Mint">
          <span style="background-color: #94BAA2"></span>
        </li>
        <li data-color="Kem">
          <span style="background-color: #FAF9F6"></span>
        </li>
        <li data-color="Đen">
          <span style="background-color: #1E1E1E"></span>
        </li>
      </ul>
      <h3 class="proloop-title">
        <a href="/products/tui-xach-tay-aura-size-18?variant=1167578835">
          Túi Xách Tay Aura Size 18 - Xanh Mint
        </a>
      </h3>
      <p class="proloop-price">
        <span class="price highlight">993,000₫</span>
        <del>1,183,000₫</del>
        <span class="sale"><span>Giảm 16%</span></span>
      </p>
      <!-- Nút thêm nhanh giỏ hàng -->
      <button class="add-to-cart-btn" onclick="addToCart('1167578835')">
        THÊM VÀO GIỎ HÀNG
      </button>
    </div>
  </div>

  <!-- KHỐI THÔNG TIN TĨNH HIỂN THỊ MẶC ĐỊNH & DÀNH CHO MOBILE -->
  <div class="proloop-info proloop-info-first">
    <ul class="color-options">
      <li class="active" data-color="Xanh Mint"><span style="background-color: #94BAA2"></span></li>
      <li data-color="Kem"><span style="background-color: #FAF9F6"></span></li>
      <li data-color="Đen"><span style="background-color: #1E1E1E"></span></li>
    </ul>
    <h3 class="proloop-title">
      <a href="/products/tui-xach-tay-aura-size-18?variant=1167578835">
        Túi Xách Tay Aura Size 18 - Xanh Mint
      </a>
    </h3>
    <p class="proloop-price">
      <span class="price highlight">993,000₫</span>
      <del>1,183,000₫</del>
      <span class="sale"><span>Giảm 16%</span></span>
    </p>
  </div>
</div>
```

---

### 1.3. Cơ chế Chuyển động & CSS Chi tiết (Hover & Interactions)

```
[TRẠNG THÁI BÌNH THƯỜNG]
+------------------------------------+
|                                    |
|             MAIN IMAGE             |
|          (Ảnh mặt trước)           |
|                                    |
+------------------------------------+
| (o) (o) (o)   (Chấm màu swatch)    |
| Túi Xách Tay Aura Size 18 - Mint   |
| 993.000₫  ~~1.183.000₫~~  [-16%]   |
+------------------------------------+

              ▼ Khi rê chuột (Hover) trên Desktop

[TRẠNG THÁI HOVER - POP-OUT FRAME]
┌────────────────────────────────────┐ <--- Viền đen mảnh (1px solid #000)
│                                    │
│            HOVER IMAGE             │ <--- Mờ dần main-image,
│       (Ảnh góc nghiêng/lật sau)    │      hiện rõ hover-image (0.3s)
│                                    │
├────────────────────────────────────┤ <--- Khung info-in-image trượt xuống
│ (o) (o) (o)   (Active border viền) │      đè lên không gian bên dưới
│ Túi Xách Tay Aura Size 18 - Mint   │      (z-index: 100, height: auto)
│ 993.000₫  ~~1.183.000₫~~  [-16%]   │
│ [     THÊM VÀO GIỎ HÀNG          ] │ <--- Nút đen (#27282D), chữ trắng
└────────────────────────────────────┘
```

#### Quy tắc CSS cốt lõi:
1. **Lật ảnh 2 lớp**:
   ```css
   .image-container { position: relative; width: 100%; }
   .image-container .hover-image {
     position: absolute; inset: 0; width: 100%; height: 100%;
     object-fit: cover; opacity: 0; transition: opacity 0.3s ease;
   }
   .image-container:hover .main-image { opacity: 0; }
   .image-container:hover .hover-image { opacity: 1; }
   ```
2. **Hiệu ứng Pop-out Box**:
   - Ở trạng thái thường: `.proloop-info-in-image` có `visibility: hidden; opacity: 0; height: 0; top: 100%; position: absolute; z-index: 100; overflow: hidden; background: #fff; border: 1px solid #000; border-top: none;`
   - Khi hover `.proloop-item:hover`:
     - Container nâng `z-index: 10`.
     - `.image-container` nhận viền: `border-left: 1px solid #000; border-right: 1px solid #000; border-top: 1px solid #000;`
     - `.proloop-info-in-image` chuyển thành: `visibility: visible; opacity: 1; height: auto;` tạo thành một **khung viền đen chữ nhật hoàn hảo** bao trùm cả ảnh và nút thêm giỏ hàng.
3. **Chấm màu Swatch (`.color-options`)**:
   - Đường kính `18px`, bo tròn `50%`.
   - Viền mặc định: `1px solid transparent` (nếu là màu Trắng: viền `1px solid #ccc` để không lẫn với nền).
   - Khi hover hoặc active: `border: 1px solid #1A0C09`, có khoảng thở nhẹ giữa chấm màu và viền ngoài (`box-shadow` hoặc `outline-offset: 2px`).
   - **Tương tác khi click/hover chấm màu**:
     - Cập nhật ảnh chính sang màu tương ứng.
     - Cập nhật URL thẻ sản phẩm (`?variant=...`).
     - Đổi tên màu trên tiêu đề (ví dụ: đổi đuôi từ `- Kem` sang `- Đen`).

---

## 2. Trải nghiệm Tìm kiếm Đột phá (Search UI Flow: Split Mega-Drawer)

### 2.1. Bản chất Thiết kế
Khác với các website thông thường chỉ dùng 1 ô popup nhỏ xíu, Hapas thiết kế **Full-Height Split Drawer** (chiếm toàn bộ màn hình chiều cao, chia làm 2 cột bất đối xứng):

```
+-------------------------------------------------------------------------------+
|                             MÀN HÌNH NỀN TỐI (OVERLAY: rgba(0,0,0,0.65))       |
| +-----------------------------------------+---------------------------------+ |
| | CỘT TRÁI (610px) - NỀN TRẮNG            | CỘT PHẢI (430px) - NỀN XÁM NHẠT | |
| |                                         |                                 | |
| | [Menu danh mục thu nhỏ bên trong search]| [X ĐÓNG (Sticky SVG Close)]     | |
| |                                         |                                 | |
| | [ Ô NHẬP TÌM KIẾM GẠCH CHÂN DƯỚI      ] | TẠP CHÍ & XU HƯỚNG MỚI:         | |
| | TÌM KIẾM SẢN PHẨM...                    | [Ảnh bài viết 1]                | |
| |                                         | Universe of Notes: Nước hoa...  | |
| | (Danh sách gợi ý sản phẩm AJAX live)    | 04/09/2026                      | |
| | • [Ảnh] Túi Aura 18 - 695.000₫          |                                 | |
| | • [Ảnh] Túi Flora 20 - 1.283.000₫       | [Ảnh bài viết 2]                | |
| |                                         | Xu hướng túi xách Thu Đông...   | |
| | --------------------------------------- |                                 | |
| | [Liên kết nhanh]:                       |                                 | |
| | Liên hệ • Câu hỏi thường gặp • Cửa hàng |                                 | |
| +-----------------------------------------+---------------------------------+ |
+-------------------------------------------------------------------------------+
```

### 2.2. Chi tiết Tương tác & Lập trình (Interaction Breakdown)
1. **Kích hoạt (Trigger)**:
   - Người dùng bấm vào nút icon kính lúp trên Header (`[button-open-search]`).
   - Lớp `.sb-search` được thêm class `.active`:
     - `.sb-overlay`: Mờ dần từ `opacity: 0` -> `opacity: 1` (`background: rgba(0,0,0,0.65)`).
     - `.sb-body`: Trượt từ ngoài màn hình bên trái vào: `transform: translateX(-100%)` -> `transform: none` (thời gian `0.5s`, cubic-bezier mượt).
   - Tự động focus con trỏ chuột vào ô nhập liệu: `$('#inputSearchAuto').focus()`.
2. **Nhập liệu & Tìm kiếm thời gian thực (Live Search Autocomplete)**:
   - Người dùng gõ từ 2 ký tự (debounce 250ms).
   - Khung `#ajaxSearchResults.smart-search-wrapper` xổ xuống ngay dưới input:
     - Hiển thị tối đa 5 sản phẩm khớp nhất: Ảnh thu nhỏ 48x48px + Tên sản phẩm + Giá bán (in đỏ nổi bật).
     - Nút dưới cùng: `Xem tất cả 24 kết quả cho "[từ khóa]" ->`.
3. **Cột phải (Inspiration & Editorial)**:
   - Hiển thị 2 bài viết/Lookbook mới nhất kèm ảnh bìa thời trang và ngày đăng. Giúp tăng chuyển đổi ngay cả khi khách hàng chưa biết chính xác mình muốn tìm gì.
4. **Đóng (Dismissal)**:
   - Bấm nút icon X góc phải trên (`[button-close-search]`).
   - Hoặc bấm vào vùng tối bên ngoài (`.sb-overlay`).
   - Hoặc nhấn phím `Escape` trên bàn phím.

---

## 3. Trang Chi Tiết Sản Phẩm (PDP Interactions)

### 3.1. Bộ chọn Biến thể (Variant & Swatch Logic)
* **Quy tắc phụ thuộc 2 chiều (Color & Size Swatches)**:
  * Một sản phẩm có thể có Màu (Xanh Mint, Kem, Đen) và Kích thước (Size 18, Size 20).
  * Khi chọn màu "Xanh Mint":
    * Hệ thống quét qua bảng tồn kho. Nếu "Size 20" của màu này đã hết hàng:
      * Nút size 20 tự động nhận class `.soldout`, gạch chéo mờ và thuộc tính `disabled="disabled"`.
      * Khách không thể bấm chọn biến thể đã hết.
  * Khi đổi màu:
    * Gallery ảnh sản phẩm tự động cuộn (scroll) hoặc chuyển slide đến bức ảnh đầu tiên chụp chiếc túi màu đó.
    * Giá hiển thị cập nhật theo giá biến thể (nếu có chênh lệch giá giữa các size).

### 3.2. Thanh Ghim Cố Định Đáy Màn Hình (Sticky Bottom Bar)
* **Hiện tượng**: Khi khách hàng đọc mô tả hoặc cuộn xuống xem ảnh chi tiết vượt quá nút "Thêm vào giỏ" chính:
  * Một thanh công cụ `#add-to-cart-sticky` xuất hiện ghim chặt ở mép dưới màn hình.
  * **Nội dung trên Sticky Bar**:
    - Ảnh thumbnail nhỏ (50x50px).
    - Tên sản phẩm + Giá hiện tại.
    - Bộ chọn màu/size thu nhỏ (`#add-item-form-sb`).
    - Nút "Thêm vào giỏ" (hoặc hiển thị "Hết hàng" nếu biến thể đang chọn hết tồn kho).
  * **Tính đồng bộ (Bi-directional Sync)**: Mọi thao tác chọn màu trên Sticky Bar lập tức cập nhật ngược lại form chính trên đầu trang và ngược lại.

### 3.3. Accordion Thông tin & Bảo hành (`.collapse-container`)
* Gồm 3 mục:
  1. *Thông tin chi tiết sản phẩm* (Mã sản phẩm, chất liệu, kích thước cm, chi tiết khóa kéo/dây đeo).
  2. *Chính sách bảo hành & Đổi trả* (Điều kiện đổi trả 14 ngày, quy định thông báo 48h).
  3. *Hướng dẫn bảo quản da*.
* **Tương tác**:
  * Bấm vào tiêu đề `.collapse-header`:
    * Icon mũi tên `.arrow-icon` xoay chuyển động (rotate 90 độ hoặc 180 độ).
    * Nội dung `.collapse-content` trượt mở bằng hiệu ứng `slideDown(300ms)`.
    * Tự động đóng các mục khác đang mở (`slideUp(300ms)`) để giữ chiều cao trang luôn gọn gàng.

---

## 4. Giỏ Hàng Nổi (Mini-Cart Drawer Flow / `sitenav-cart`)

### 4.1. Luồng Kích hoạt (Triggering)
Giỏ hàng nổi (`.sitenav-wrapper.sitenav-cart`) tự động trượt ra từ cạnh phải trong 2 trường hợp:
1. Khách hàng chủ động bấm icon Giỏ hàng trên Header.
2. Khách bấm nút "THÊM VÀO GIỎ HÀNG" tại bất kỳ thẻ sản phẩm nào ngoài trang chủ hoặc trong trang chi tiết.

### 4.2. Bố cục 4 Phần của Drawer:
1. **Header**:
   - Tiêu đề: "Giỏ hàng của bạn" + Badge hiển thị tổng số lượng món đồ.
   - Nút X đóng drawer.
2. **Thanh đo Freeship (Free Shipping Goal)**:
   - Tính toán động: `500.000₫ - Tổng_tiền_hiện_tại`.
   - Nếu còn thiếu: Hiện thanh progress bar màu xanh kem + "Bạn còn thiếu [X]₫ để được FREESHIP".
   - Nếu đủ: Thanh chuyển sang màu vàng champagne/xanh lá + "Chúc mừng! Bạn đã được Miễn phí vận chuyển toàn quốc".
3. **Danh sách Món hàng (`.mini-cart__item`)**:
   - Ảnh đại diện WebP 70x70px.
   - Tên túi xách + Phân loại màu/size đã chọn.
   - Giá bán lẻ + Giá so sánh gạch ngang.
   - Bộ nút tăng giảm số lượng (+ / -) cập nhật tổng tiền tức thì không reload.
   - Nút icon thùng rác / X để xóa món đồ.
4. **Mục Gợi ý Mua kèm (Cross-sell Carousel / `.sitenav-suggest`)**:
   - Tiêu đề: "Có thể bạn sẽ thích".
   - Slider Swiper các món phụ kiện giá mềm (dây charm, ví thẻ mini, khăn lụa trang trí) kèm nút "Thêm vào giỏ" nhanh 1-click.
5. **Footer**:
   - Dòng tổng tiền: `Tổng tiền thanh toán: 1.283.000₫`.
   - Nút CTA lớn: **"TIẾN HÀNH THANH TOÁN"** -> Chuyển thẳng vào trang Checkout 1 bước.

---

## 5. Bảng Tổng hợp Tương tác & Mã Hiệu ứng Dự kiến (Implementation Mapping)

| Thành phần | Hành động của Khách | Hiệu ứng Thị giác (Visual Animation) | Công nghệ triển khai tối ưu |
|---|---|---|---|
| **Product Card** | Rê chuột vào ảnh (Desktop) | Ảnh chính fade-out (0.3s), ảnh phụ fade-in. Viền đen 1px xuất hiện quanh card. Bật khung nút thêm giỏ thả xuống (z-index: 100). | Tailwind v4: `group-hover:opacity-100`, `transition-opacity` |
| **Color Swatch** | Rê chuột / Bấm chọn màu | Vòng tròn màu xuất hiện viền đen bao quanh (`outline: 1px solid #000; outline-offset: 2px`). Đổi ảnh đại diện card tức thì. | React State / Zustand |
| **Search Button** | Nhấn icon kính lúp | Backdrop tối màn hình (65% đen). Cột trái trắng + Cột phải xám trượt vào từ trái sang phải trong 0.5s. Auto-focus input. | Framer Motion / Tailwind `translate-x-0` |
| **Search Input** | Nhập từ khóa | Xổ dropdown sản phẩm gợi ý kèm thumbnail & giá bên dưới thanh gạch chân trong 200ms debounce. | TanStack Query / Next.js Server Action |
| **Add to Cart** | Bấm thêm giỏ hàng | Nút giỏ hàng đổi icon loading quay nhẹ -> Drawer giỏ hàng trượt từ phải sang -> Cập nhật badge số trên header. | Zustand Cart Store + Toast Notification |
| **PDP Accordion** | Bấm mục thông tin | Mũi tên xoay 90 độ, khối văn bản trượt mở mượt mà (smooth accordion expand). | CSS Grid `grid-template-rows: 1fr` |
| **Sticky Bar** | Cuộn trang qua nút mua | Xuất hiện thanh bar cố định đáy màn hình (slide up từ đáy 0.3s). | Intersection Observer API |
| **Store Lookup** | Bấm "Tìm showroom" | Bật Modal popup danh sách cửa hàng kèm trạng thái "Còn hàng (Xanh)" hoặc "Hết hàng (Đỏ)". | React Portal Dialog Modal |
