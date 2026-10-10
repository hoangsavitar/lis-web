# LIS — Rà hiệu năng trước hosting

Ngày kiểm tra: 10/10/2026. Bản production `.next-lis-preview` sau sửa gallery và hover Lucia Đen; BUILD_ID ghi trong JSON đính kèm.

## Kết luận và giới hạn

Web đã có các tối ưu tải tài nguyên cơ bản. Dung lượng mã trên trang chủ chưa cho thấy một bundle quá lớn; ảnh sản phẩm chính nhẹ. Cần chỉnh kích thước ảnh card và quyết định cách phục vụ banner trên Cloudflare trước khi triển khai.

Chưa có hosting. Truy cập localhost qua công cụ browser đã bị chặn ở lần trước, nên lần này chỉ đo filesystem của production build và đọc mã nguồn; không đổi công cụ để vượt chặn. Không có điểm Lighthouse, thời gian FCP/LCP, TTFB, TBT, INP hoặc CLS. Không kết luận trang tải trong bao nhiêu giây chỉ từ dung lượng file. Các kích thước gzip/Brotli được tính bằng Node zlib, không phải transferSize ghi từ network; kết quả thực tế phụ thuộc compression, cache, mạng và thiết bị.

Dữ liệu chi tiết: `planning/source-audit/performance-static-2026-10-10.json`. Đọc danh sách script thật trong HTML trang chủ để tính toàn bộ JavaScript, bao gồm shared layout; không cộng route manifest máy móc hoặc coi tổng thư mục repo là dữ liệu mỗi lượt xem.

## Số đo từ bản build

Đơn vị bảng là KB thập phân (1 KB = 1000 bytes).

| Tài nguyên | Raw | Gzip | Brotli |
|---|---:|---:|---:|
| JavaScript trong các script trang chủ, trình duyệt hiện đại | 463,3 KB | 131,5 KB | 111,4 KB |
| CSS chung | 92,9 KB | 17,7 KB | 15,1 KB |
| HTML trang chủ, bao gồm payload React | 141,5 KB | 16,5 KB | 12,3 KB |

- Bộ build có 15 file WOFF2, tổng 117,4 KB. Đây là tổng font/subset có sẵn, không phải số byte tất cả trình duyệt tải trong lần đầu; unicode-range, ký tự và font weight quyết định file được dùng.
- Banner nguồn `campaign-20-10.jpg`: 1702 × 630, 777,6 KB. Thử Sharp trong bộ nhớ, không thay file: WebP quality 85 ở 1280px là 29,6 KB, ở kích thước nguồn là 45,7 KB. Đây là so sánh encoding, không phải response thực tế của `/_next/image`; Next.js local đang dùng bộ tối ưu ảnh riêng, vì vậy không nói khách hiện phải tải nguyên JPEG 777,6 KB.
- Bốn packshot đầu trang (Irisa Hồng, Dalia Hồng, Lilia Trắng, Mia Xanh bơ) có tổng 29,2 KB ở 480px. Bốn ảnh hover cùng nhóm có tổng 66,4 KB ở 480px.
- Ảnh lớn nhất ở bản tối đa 1280px hiện là chi tiết Lilia Đen: 365,0 KB. Không phải ảnh đại diện đầu trang.
- HTML có 25 img gắn lazy, 6 img không gắn lazy (banner và logo, gồm logo drawer). Đây là số thẻ, không phải số request; cùng URL có thể dùng chung cache và ảnh lazy trong dialog đóng có thể không tải.

## Những gì đã có

- Ảnh catalog được tạo WebP ở 320/480/640/960/1280px, sử dụng srcset/sizes và async decode. File gốc chỉ dùng khi build; khách không tải toàn bộ `product-images/` hay thư viện ảnh local.
- Banner dùng priority và preload; trang chủ dựng sẵn trong production build, nội dung chính có HTML sẵn.
- Các ảnh thường dùng loading lazy; hover chỉ decode khi card tới gần viewport (rootMargin 200px), giữ ảnh chính nếu preview lỗi.
- next/font tự phục vụ WOFF2, có unicode-range và display swap, giữ font tiếng Việt đã chốt.
- Khung ảnh có kích thước/aspect-ratio, giúp giữ chỗ trong layout. Đây là cơ chế phòng layout shift, không chứng minh CLS đã đạt.
- Tìm kiếm/lưu mẫu dùng dữ liệu local, không có request backend trong những luồng này. Không tìm thấy import GSAP trong mã thực sự dùng; việc package còn trong package.json không đồng nghĩa nó nằm trong JavaScript khách tải.

## Ưu tiên đề xuất

### 1. Phục vụ banner trên Cloudflare

`CampaignHero` đang dùng next/image mặc định và URL `/_next/image`. `wrangler.jsonc` chưa có binding IMAGES, next.config cũng chưa có custom loader. OpenNext yêu cầu binding hoặc loader phù hợp để bật tối ưu ảnh trên Cloudflare: [OpenNext Image Optimization](https://opennext.js.org/cloudflare/howtos/image).

Đề xuất cho LIS: tạo sẵn banner WebP responsive khi build, phục vụ static tương tự catalog, giữ crop, tỷ lệ và ưu tiên tải đang có. Cách này tránh xử lý ảnh vào lượt xem đầu tiên và không phụ thuộc bộ resize runtime. Phương án khác là cấu hình Cloudflare Images đúng theo tài liệu; cần quyết định khi setup hosting. Chưa đổi banner hay cấu hình ở lần rà này.

### 2. Khai báo đúng chiều rộng card

Homepage hiện dùng `25vw` từ 1200px, trong khi container tối đa 1360px, padding hai bên 40px và ba gap 24px. Tại viewport 1440px, ảnh thực theo CSS khoảng 302px nhưng sizes khai báo 360px. Với DPR2, mô hình chọn ảnh dự kiến lấy bản 960px thay vì 640px.

Đo các file hiện có cho bốn card đầu:
- Bản 960px: packshot 84,1 KB + preview 203,3 KB = 287,4 KB.
- Bản 640px: packshot 45,6 KB + preview 103,8 KB = 149,4 KB.

Có thể giảm khoảng 48% dung lượng của nhóm 8 ảnh này bằng sizes khớp CSS trong kịch bản đó. Đây là ước tính chọn srcset ở viewport/DPR đã nêu, không phải giảm 48% tổng tải trang hoặc kết quả network capture. Cần xác nhận trên browser khi công cụ cho phép.

### 3. Chỉ tách thêm JavaScript khi có bằng chứng cần

Header, drawer tìm kiếm và drawer lưu cùng được import ở root layout. Có thể tải phần nội dung drawer khi mở lần đầu; hiện toàn bộ JS trang chủ khoảng 131,5 KB gzip nên đây là ưu tiên sau ảnh. Giữ hành vi focus, màu, lưu mẫu và tốc độ mở drawer nếu thực hiện. Không đề xuất đổi font hoặc gỡ thư viện dựa đơn thuần vào việc chúng xuất hiện trong package.json.

## Đo sau khi deploy

Chạy Lighthouse mobile/desktop trên homepage, collection và PDP trong cấu hình ghi rõ cache/mạng/CPU; lấy ba lần và so sánh trung vị khi sửa. Ghi LCP/FCP/TBT/CLS và request waterfall. INP cần đo tương tác hoặc dữ liệu người dùng; Lighthouse tải trang thông thường dùng TBT thay cho INP.

Mốc đánh giá trải nghiệm tốt: LCP ≤ 2,5 giây, INP ≤ 200 ms, CLS ≤ 0,1, đánh giá ở phân vị 75 trên dữ liệu người dùng và tách mobile/desktop. Nguồn: [Google Web Vitals](https://web.dev/articles/vitals). Chưa có dữ liệu để kết luận LIS đạt các mốc này.
