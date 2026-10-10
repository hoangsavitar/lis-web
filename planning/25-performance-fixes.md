# Tối ưu theo phép đo lisbylii.com — 10/10/2026

Đã sửa trong repo; chưa deploy hoặc đo lại PageSpeed trên tên miền. Baseline live: trang chủ mobile 71, LCP 7,4 s; collection 98 / 2,3 s; Irisa 95 / 2,9 s. Báo cáo trước sửa: planning/24-live-performance-audit.md.

## Thay đổi

- Banner dùng WebP tạo sẵn, không qua /_next/image. Bản 1702px: 44.146 byte so với JPEG gốc 777.630 byte, giảm 94,3%. Các bản 640/1080/1280px lần lượt 10.998 / 22.196 / 28.924 byte. Giữ ảnh, tỷ lệ, crop mobile và sizes 1081px theo chiều rộng ảnh cần phủ khung cao 400px. Fetch priority high, eager; CSS giữ kích thước và vị trí giống next/image fill trước đây.
- 84 ảnh sản phẩm tạo thêm bản 160px cho thumbnail. Gallery ban đầu chỉ gắn ảnh lớn của hai slide đầu; khi next/thumbnail/swipe thay active, ảnh hiện tại và lân cận được gắn. Giữ các ảnh đã được chọn. Không đổi ảnh nguồn, vai trò, variant hay tỷ lệ.
- Ảnh web mới dùng /media/ và hash 16 ký tự từ nguồn + profile encoder. public/_headers đặt immutable một năm cho namespace này và Next static chunks. Nguồn đổi / profile đổi làm URL đổi; không áp cache immutable cho các URL cũ không có phiên bản.
- Logo có bản 160/256/512/1024px, giữ PNG và alpha. Chỉ logo header eager; logo footer/drawer lazy, priority low. Không cạnh tranh preload với banner.
- sizes lookbook bám theo lưới 5fr/7fr và max-width hiện có.
- Card trên collection độc lập dùng h2 sau h1; card trong mục h2 vẫn dùng h3. Footer dùng h2, giữ cỡ chữ bằng CSS.
- Pipeline tự chạy trước Next/Cloudflare build. Logo/banner manifest ở data/storefront-media.json; nguồn cấu hình ở data/storefront-image-sources.json. Ảnh gốc và URL ảnh cũ được giữ để tương thích.

## Kiểm tra hoàn thành

- Typecheck pass. 9 kiểm tra storefront hiện có và 3 kiểm tra hiệu năng mới pass.
- So sánh catalog với HEAD sau khi bỏ trường ảnh: thông tin sản phẩm/giá/màu/mô tả không đổi, 11 mẫu / 32 màu. Toàn bộ đường dẫn ảnh responsive mới tồn tại.
- Next production build pass, bản xem tại http://localhost:3002/ (distDir .next-performance).
- OpenNext Cloudflare build pass từ thư mục .next sạch. Lượt trước gặp lỗi cache/build trên Windows; đã giữ cache lỗi trong .next-worker-failed-20261010, thuộc gitignore. Không sửa dependency hoặc API để né lỗi.
- Kiểm tra .open-next/assets/_headers giống hệt public/_headers; banner và mọi kích thước ảnh catalog đều được đóng gói.
- Browser desktop 1440×1000 và mobile 390×844: banner mới tải được, không tràn ngang. Hình và cách crop giữ đúng thiết kế. Bốn card đầu có ảnh preview sẵn.
- Irisa mobile: next tới ảnh 2, chọn thumbnail tới ảnh 7, ảnh cuối tải được; đổi Be reset ảnh 1/5. Next trên desktop chuyển ảnh 2/5. Console không có lỗi trong lượt kiểm tra.
- Collection desktop: tiêu đề card h2, footer h2; không tràn ngang. Các luồng lưu/khôi phục/hover fallback được kiểm tra bằng bộ test hiện có.
- git diff --check pass.

Capture: lis-performance-desktop.jpg và lis-performance-mobile.jpg trong thư mục visualization của chat.

## Sau khi deploy

Chạy build Cloudflare rồi deploy qua workflow hiện có. Kiểm tra banner trả image/webp, khoảng 44 KB hoặc nhỏ hơn, Cache-Control immutable; xác nhận URL ảnh có hash đổi khi thay nguồn. Sau đó chạy lại PageSpeed trang chủ/collection/Irisa trên mobile/desktop. Chưa có điểm sau tối ưu hoặc số đo LCP live mới; dung lượng giảm không đồng nghĩa đã chứng minh mức LCP cụ thể.

Cloudflare áp _headers cho static asset responses theo [tài liệu Workers](https://developers.cloudflare.com/workers/static-assets/headers/). Không áp quy tắc này cho HTML/API hoặc phản hồi do Worker tự tạo.
