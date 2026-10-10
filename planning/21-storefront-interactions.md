# LIS — Cải thiện thao tác dựa trên hiện trạng

## Phạm vi thực hiện

- Giữ card 1:1, bộ ảnh, thứ tự sản phẩm mới, chiến dịch Dearly, bố cục trang chủ, logo, font và màu đã chốt.
- Nút lưu dùng chung cho card/PDP/thanh cố định: tim hiện trạng thái, bấm để lưu hoặc bỏ lưu đúng màu, không tự mở drawer. Thao tác thêm là idempotent, không tăng số lượng khi bấm lại. Giữ khóa lưu `lis_luxury_cart`, phiên bản 2 và số lượng đã có.
- Bộ lọc dùng `/collections/<danh-muc>?color=<ten-mau>`. Chọn danh mục cập nhật tiêu đề, reset màu. Trang nhận query từ server, remount đúng lựa chọn khi điều hướng; màu không hợp lệ dùng Tất cả màu.
- Gallery PDP thêm thumbnail 72px, trạng thái được chọn, thao tác bàn phím mũi tên/Home/End và cuộn ngang. Khung 1:1 với contain tránh cắt ảnh sản phẩm; ảnh dọc được giữ toàn bộ trong khung.
- Trạng thái ảnh tạo lại theo asset, ảnh của màu trước không được giữ khi màu mới tải lỗi. Có tải/lỗi/thử lại và nhận diện ảnh đã load trước hydration.
- Drawer dùng ảnh responsive cùng dữ liệu media hiện tại, khung vuông, không tải mặc định ảnh 1280px cho ô nhỏ.

## Kiểm tra

`node --test tests/storefront-behavior.test.cjs` kiểm tra 6 tình huống: lưu yên lặng và không tăng số lượng, bật/tắt riêng từng màu, phục hồi lưu từ storage với màu/số lượng, từ chối màu không hợp lệ hoặc hết hàng, giữ dữ liệu cũ, và round-trip URL của mọi lựa chọn màu trong catalogue/danh mục.

Chạy `npm run typecheck` và `npm run build` trước khi bàn giao. Không coi các kiểm tra đơn vị là bằng chứng browser Back/Forward, hover, focus hoặc responsive đã chạy thành công. Việc kiểm tra trực tiếp và chụp ảnh browser đang bị chặn bởi công cụ truy cập localhost; không thử đường khác để vượt chặn.

Kết quả: 6/6 test đạt; typecheck đạt; production build đạt với thư mục riêng `.next-lis-preview`. Đồng bộ build giữ nguyên 11 mẫu/32 màu/84 ảnh và mọi lựa chọn ảnh chính/hover so với bản rà hiện trạng. Server production đã báo Ready tại `http://localhost:3001`.

Thư mục `.next` có dấu hiệu bị lần chạy khác ghi lại, nên `next.config.mjs` hỗ trợ biến `LIS_BUILD_DIR` tùy chọn; mặc định vẫn là `.next`. Để chạy bản xem riêng bằng PowerShell:

```powershell
$env:LIS_BUILD_DIR='.next-lis-preview'
npm run build
npm run start -- --port 3001
```

Lần build riêng đầu cần tải font đã bị sandbox chặn mạng; lần build với quyền tải Manrope/Be Vietnam Pro đã thành công. Không thay font hoặc dùng font thay thế để vượt lỗi tải.

## Tài nguyên còn thiếu

Vẫn có 8 màu thiếu hover và 8 màu thiếu packshot theo bản rà hiện trạng 20. Không tạo ảnh thay thế, đổi sai màu hoặc thay ảnh gốc để che thiếu hụt này. Các cải tiến về nhịp trang chủ chưa triển khai khi chưa có kiểm chứng giao diện trực tiếp.
