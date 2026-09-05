# 2. Ma trận Tính năng: Hapas vs Phiên bản Cải tiến (LIS)

Tài liệu này đối chiếu toàn diện các tính năng trên website mẫu [Hapas.vn](https://hapas.vn/), phân loại rõ những thành phần cần **sao chép trực tiếp (Clone)**, những thành phần cần **lược bỏ (Drop)** để giảm tải hệ thống, và những thành phần cần **nâng cấp vượt trội (Enhance)** cho website thời trang của bạn.

---

## 1. Bảng Ma trận Phân tích Tính năng

| Phân hệ (Module) | Tính năng gốc trên Hapas.vn | Đánh giá / Hạn chế trên Hapas | Quyết định triển khai | Kế hoạch nâng cấp cho LIS |
|---|---|---|---|---|
| **Header & Điều hướng** | - Thanh thông báo chạy chữ (Top banner)<br>- Mega menu đa cấp có kèm 2 ảnh banner quảng cáo<br>- Menu mobile dạng drawer gập mở<br>- Tìm kiếm popup ajax | - Mega menu trên Haravan load HTML tĩnh khá nặng<br>- Giao diện mobile chưa tối ưu cho thao tác 1 tay | **CLONE & CẢI TIẾN** | - Mega menu mượt mà viết bằng Tailwind v4<br>- Thanh tìm kiếm dự đoán thông minh (Instant Search / Autocomplete với hình ảnh + giá)<br>- Bottom Navigation Bar cho giao diện Mobile (Trang chủ, Danh mục, Giỏ hàng, Tài khoản) |
| **Trang chủ (Homepage)** | - Hero banner video / slider full-width<br>- Block BST & Quà tặng nổi bật<br>- Carousel "Dáng túi bạn cần"<br>- Editorial "The making of a bag"<br>- Tin tức thời trang<br>- Cam kết chính sách<br>- Bạn thân Hapas (UGC / Instagram) | - Video banner trên Hapas chạy không mượt khi mạng yếu<br>- Các slider phụ thuộc vào thư viện jQuery Slick/Swiper nặng nề | **CLONE & CẢI TIẾN** | - Hỗ trợ Video Hero tự động nén, preload poster tĩnh giúp FCP < 0.8s<br>- Thay thế toàn bộ bằng Swiper nhẹ hoặc CSS scroll-snap nguyên bản kết hợp Framer Motion / GSAP<br>- Bộ sưu tập tương tác với bộ lọc dáng túi trực tiếp ngay tại trang chủ |
| **Danh mục & Bộ sưu tập** | - Lưới sản phẩm responsive (2 cột mobile, 4 cột desktop)<br>- Bộ lọc đa năng (Màu sắc với visual swatch, Khoảng giá dual slider, Loại sản phẩm, Sắp xếp)<br>- Nút xóa nhanh tất cả bộ lọc<br>- Banner mô tả đầu danh mục | - Bộ lọc Haravan reload lại trang hoặc dùng AJAX làm giật layout<br>- Không lưu trạng thái bộ lọc vào URL tiện chia sẻ | **CLONE & CẢI TIẾN** | - Bộ lọc tương tác thời gian thực bằng URL Query Params (`?color=den&price=300000-500000&sort=newest`)<br>- Tối ưu SEO cho từng URL lọc<br>- Hiển thị số lượng sản phẩm tương ứng với từng điều kiện lọc |
| **Thẻ sản phẩm (Product Card)** | - Ảnh chính + Ảnh hover (lật góc chụp khác)<br>- Thanh chọn màu sắc tròn (Color swatch hover)<br>- Nút "Thêm nhanh vào giỏ" ngay trên card<br>- Nhãn giảm giá % đỏ nổi bật | - Nút thêm nhanh trên mobile hay bị bấm nhầm<br>- Khi hover đổi màu swatch phản hồi còn trễ | **CLONE & CẢI TIẾN** | - Tối ưu 2 lớp ảnh bằng `next/image` định dạng WebP/AVIF<br>- Hover vào màu swatch nào thì ảnh card đổi ngay lập tức sang màu đó<br>- Mobile touch-friendly: Nhấn vào swatch màu để xem preview ảnh trước khi bấm chọn |
| **Trang chi tiết sản phẩm (PDP)** | - Gallery ảnh lớn + thumbnails trượt dọc/ngang<br>- Chọn biến thể Màu sắc + Kích thước (Size 18, 20...)<br>- Bộ đếm số lượng (+ / -)<br>- Nút "Mua ngay" & "Thêm vào giỏ"<br>- Thanh Sticky Add-to-cart khi cuộn xuống<br>- Accordion: Chi tiết SP, Chính sách đổi trả, Hướng dẫn bảo quản<br>- Nút "Tìm cửa hàng còn hàng"<br>- Slider "Sản phẩm cùng bộ sưu tập" | - Thiếu đánh giá thực tế có hình ảnh của khách hàng (Reviews UGC)<br>- Thông tin kích thước còn dạng text khô khan | **CLONE & CẢI TIẾN** | - Bổ sung bảng kích thước trực quan (Size Guide: so sánh kích thước túi với iPhone Pro Max / iPad / Laptop)<br>- Hệ thống Review 5 sao kèm hình ảnh khách chụp thật<br>- Pop-up tra cứu showroom theo quận/huyện còn hàng thực tế<br>- Sticky CTA Bar cố định mép dưới trên mobile |
| **Giỏ hàng (Cart)** | - Drawer Cart trượt từ phải sang (Flyout / Mini-cart)<br>- Hiển thị danh sách SP, thay đổi số lượng, nút xóa<br>- Ghi chú đơn hàng (Note)<br>- Tạm tính tổng tiền | - Không có thanh đo điều kiện Free Shipping (còn thiếu bao nhiêu tiền để được freeship)<br>- Không cho nhập mã giảm giá xem thử trước khi vào checkout | **CẢI TIẾN LỚN** | - **Thanh tiến trình Miễn phí vận chuyển** (Progress bar: "Mua thêm 150.000đ để được Freeship")<br>- Cho phép áp dụng Voucher/Mã khuyến mại ngay tại giỏ hàng<br>- Đề xuất Cross-sell phụ kiện nhỏ (dây charm, ví mini, khăn lụa quấn quai túi) 1-click thêm vào giỏ |
| **Quy trình Thanh toán (Checkout)** | - Dùng trang checkout mặc định của Haravan<br>- Form thông tin nhận hàng (Tỉnh/Thành, Quận/Huyện, Phường/Xã)<br>- Vận chuyển tiêu chuẩn<br>- Thanh toán COD, Chuyển khoản, VNPay, MoMo | - Giao diện checkout bên thứ 3 rời rạc, làm giảm tỷ lệ chuyển đổi (Drop-off cao)<br>- Khách chuyển khoản phải tự mở app ngân hàng nhập số tài khoản và nội dung thủ công | **CẢI TIẾN LỚN (ĐỘT PHÁ)** | - **1-Page Checkout hiện đại tích hợp ngay trong app**<br>- Tích hợp **VietQR động (PayOS)**: Tự sinh mã QR ngân hàng kèm sẵn đúng số tiền và mã đơn. Khách quét là thanh toán thành công tức thì không cần xác nhận thủ công<br>- Tự động gợi ý địa chỉ nhanh với API hành chính Việt Nam |
| **Hệ thống Cửa hàng (Store Locator)** | - Trang danh sách showroom theo tỉnh thành (`/pages/dia-diem-cua-hang`)<br>- Thông tin địa chỉ, hotline, giờ mở cửa | - Danh sách dạng text phẳng, không có bản đồ định vị động, không có nút "Chỉ đường Google Maps" | **CLONE & CẢI TIẾN** | - Bản đồ tương tác trực quan (Interactive Map với Mapbox / Google Maps Embed)<br>- Tự động tìm showroom gần vị trí khách hàng nhất<br>- Nút 1-click "Chỉ đường qua Google Maps" và nút gọi hotline ngay |
| **Tra cứu Đơn hàng (Order Tracking)** | - Khách phải liên hệ hotline hoặc fanpage để hỏi tình trạng vận đơn | - Trải nghiệm sau mua hàng (Post-purchase) kém, tốn nhân sự trực fanpage giải đáp "hàng em tới đâu rồi" | **TÍNH NĂNG MỚI (LIS)** | - Trang `/tra-cuu-don-hang`: Khách chỉ cần nhập Số điện thoại hoặc Mã đơn là thấy ngay tiến trình vận chuyển theo thời gian thực (Đã đóng gói -> Bàn giao bưu tá -> Đang giao -> Đã nhận) |
| **Quà tặng & Thiệp số (Digital Gifting)** | - Bán các set quà theo mùa cố định, in thiệp giấy truyền thống | - Chưa có điểm chạm công nghệ số tạo sự bất ngờ và riêng tư cho người nhận | **ĐẶC TRƯNG ĐỘC QUYỀN LIS** | - **Kế thừa Module LIS sẵn có**: Người tặng có thể soạn lời chúc riêng, hệ sinh thái sinh mã 6 số bí mật + QR in lên thiệp/hộp quà. Người nhận quét mở phong bì điện tử hiệu ứng GSAP độc bản |

---

## 2. Các Thành phần Cắt giảm / Lược bỏ (Drop List)

Nhằm đảm bảo website chạy nhanh gấp 3 lần bản gốc, chúng ta loại bỏ các yếu tố gây chậm sau:

1. **Loại bỏ toàn bộ jQuery và các jQuery plugins cũ**:
   - `jquery.min.js`, `jquery.jgrowl`, `slick-carousel` cồng kềnh. Thay thế 100% bằng React Hooks + Tailwind CSS + Web API native.
2. **Loại bỏ các Script Tracking bên thứ 3 dư thừa**:
   - Các script `CDP Web Insight`, beacon analytics không cần thiết làm chậm thời gian phân giải mạng của trình duyệt. Chỉ giữ lại Google Tag Manager (GTM) và Facebook Pixel được tối ưu tải bất đồng bộ (defer / web worker).
3. **Loại bỏ inline CSS & inline Scripts của Haravan**:
   - Chuyển toàn bộ sang chuẩn Module CSS / Tailwind CSS v4 biên dịch tĩnh.
4. **Loại bỏ cơ chế Reload trang khi lọc sản phẩm**:
   - Sử dụng Next.js Server Components kết hợp URL state và Suspense boundary để cập nhật danh sách sản phẩm tức thì không chớp màn hình.

---

## 3. Phân kỳ Triển khai Theo Thứ tự Ưu tiên (Phased Roadmap)

### Giai đoạn 1: Trọng tâm Giao diện Đỉnh cao & Giỏ hàng Hoàn hảo (Phase 1 MVP)
> **Mục tiêu số 1**: Giao diện đẹp xuất sắc chuẩn Quiet Luxury (Polène Paris / Jacquemus), chuyển động 60-120fps trên GPU, và hoàn thiện trọn vẹn trải nghiệm Giỏ hàng Mini-Cart Drawer.

- [x] **Thẩm mỹ & Brand Identity**: Hệ màu Stone/Burgundy/Champagne, Typography 3 tầng (`Playfair Display`, `Inter`, `JetBrains Mono`).
- [x] **Trang chủ đầy đủ 7 sections thời trang**: Hero Banner nghệ thuật, Best Sellers, Dáng túi bạn cần (Handbag, Shoulder, Crossbody, Tote), Di sản thương hiệu & Xưởng thủ công, Cam kết chất lượng, Footer tạp chí.
- [x] **Thẻ sản phẩm tương tác cao cấp**: Lật ảnh 2 lớp khi hover (300ms), pop-out viền đen trượt nút Quick Add, chấm tròn swatch đổi màu ảnh tức thì.
- [x] **Mega-Search 2 cột**: Cột trái tìm kiếm realtime + autocomplete ảnh và giá đỏ, cột phải tạp chí Lookbook.
- [x] **Chi tiết sản phẩm (PDP)**: Gallery ảnh đa góc chụp, bộ chọn màu sắc/kích thước, accordion thông số kỹ thuật, thanh Sticky Add-to-cart đáy màn hình.
- [x] **[TRỌNG TÂM] Mini-Cart Drawer hoàn chỉnh**:
  - Drawer trượt từ mép phải kèm backdrop blur `8px`.
  - **Thanh tiến trình Freeship realtime** tự động tính số tiền còn thiếu để đạt mốc 1.000.000₫.
  - Tăng/giảm số lượng (+ / -), xóa món đồ với hiệu ứng mờ dần (fade-out).
  - **In-Cart Cross-sell Carousel**: Gợi ý phụ kiện nhỏ mua kèm (khăn lụa, charm da, ví thẻ) với nút thêm nhanh 1 chạm.
  - Lưu trữ trạng thái bền bỉ bằng Zustand kết nối `localStorage` (F5 không mất giỏ hàng).

---

### Giai đoạn 2: Cổng Thanh toán & Vận chuyển Nội địa (Phase 2)
- [ ] Tích hợp VietQR tự động qua PayOS (sinh mã QR động Napas247 đúng số tiền, webhook 2s).
- [ ] Cổng thanh toán thẻ ATM / Visa qua VNPay / MoMo.
- [ ] Trang Checkout 1 bước (1-Page Checkout) tối giản.
- [ ] Kết nối API bưu cục Giao Hàng Nhanh (GHN Express) / GHTK tính phí tự động 3 cấp hành chính.

---

### Giai đoạn 3: Trải nghiệm Nâng cao, Tài khoản & Quản trị (Phase 3)
- [ ] Tài khoản người dùng: Đăng ký/đăng nhập OTP SMS/Zalo, sổ địa chỉ cá nhân, lịch sử đơn hàng.
- [ ] Hệ thống Quản trị Admin CMS: Dashboard doanh thu, quản lý xuất nhập kho, quản lý danh mục và coupon.
- [ ] Nghi thức Quà tặng & Thiệp số (Digital Gifting) đồng bộ mã 6 số bí mật.
- [ ] Bản đồ hệ thống Showroom định vị động và tra cứu tồn kho thực tế từng chi nhánh.
- [ ] Tra cứu đơn hàng thời gian thực (Realtime Order Tracking).
