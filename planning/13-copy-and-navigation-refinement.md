# Chỉnh nội dung và điều hướng LIS

Hoàn tất mã nguồn và kiểm tra bản production ngày 07/10/2026; bàn giao và mở lại localhost ngày 09/10/2026.

## Thay đổi

- Bỏ các đoạn giải thích dư trong danh sách lưu, phần đầu bộ sưu tập, nút sao chép và khu vực tư vấn.
- Bỏ khối “Bạn đang tìm gì?” vì trùng danh mục phía trên.
- Tạo trang /ve-lis, liên kết từ header, menu mobile và footer. Nội dung không thêm lịch sử, địa chỉ hoặc chính sách chưa có nguồn.
- Thay select màu mặc định bằng popover gọn: chấm màu, tên màu, dấu chọn; menu nằm ngay dưới nút, không tràn viewport.
- Viết lại mô tả ngắn 8 mẫu từ tệp nội dung người dùng cung cấp; cập nhật đồng thời data/catalog.json và scripts/build-catalog.py. Những mẫu bổ sung trong tệp chưa có dữ liệu catalog/ảnh không được tạo mới trong phạm vi này.
- Ghi chú PDP chỉ còn “Màu thực tế có thể khác nhẹ theo ánh sáng và màn hình.”, in nghiêng. Tên màu vẫn ở bộ chọn.
- Giữ catalog 8 mẫu/25 màu/26 ảnh, URL variant, dữ liệu đã lưu và liên kết Facebook.

## Kiểm tra

- npm run typecheck: đạt.
- npm run build: đạt; /ve-lis là route static.
- git diff --check: đạt.
- Bộ lọc màu: kiểm tra 320/360/390/768/1024/1440px, không tràn ngang. Arrow/Home/End chỉ chuyển focus; Enter/Space chọn; Escape trả focus; Tab rời bộ lọc; đổi danh mục đặt màu về tất cả.
- Chọn Đen mở đúng biến thể Lucia/Elena/Calla. Trang Về LIS và ảnh hiển thị ở tất cả kích thước trên.
- Menu mobile mở Về LIS đúng route và đóng drawer.
- PDP hiển thị mô tả mới và ghi chú in nghiêng. Lưu Mila vẫn giữ đúng màu; dữ liệu thử được dọn.
- Không thấy lỗi console trong các luồng đã kiểm tra.

## Bàn giao

Bản production được mở lại tại http://localhost:3000/. Không triển khai hosting trong lần chỉnh này. Ảnh mới chưa chụp được tại thời điểm bàn giao do công cụ trình duyệt không khởi tạo được sandbox (helper_unknown_error: setup refresh had errors); không dùng ảnh bản cũ để minh họa bản mới.
