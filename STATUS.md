# Trạng thái LIS

Cập nhật: 07/10/2026.

## Đã hoàn tất

- Giao diện cửa hàng: hero Mia gọn, bộ lọc và lưới 8 sản phẩm, ba lối chọn theo nhu cầu.
- Manrope cho tiêu đề, Be Vietnam Pro cho nội dung. Chữ nội dung 18/16px, thông tin phụ từ 14px.
- Logo người dùng cung cấp: 3 PNG nguyên bản trong brand-assets/lis/originals/, 6 PNG web có alpha trong public/brand/lis/.
- Header 5 mục; dưới 1024px dùng menu drawer. Menu tự gọn khi cỡ chữ lớn để tránh tràn.
- Footer nền tối, logo trắng, liên kết danh mục, Facebook và 3 FAQ bấm mở.
- Liên hệ giá ở hero, card, PDP, tìm kiếm và danh sách lưu mở Facebook LIS trong tab mới. Sao chép tư vấn là thao tác riêng.
- Tìm tên/màu không phân biệt dấu hoặc chữ hoa; kết quả có ảnh và mở đúng variant.
- Swatch chỉ đổi khi chọn, hover không thêm vòng đỏ, focus bàn phím riêng.
- Catalog vẫn 8 mẫu/25 màu/26 ảnh. URL, schema dữ liệu lưu, SKU và thông tin nguồn được giữ nguyên.
- Mô tả được cập nhật đồng thời trong catalog và nguồn import.

## Kiểm tra

- npm run typecheck và production build: thành công. git diff --check: sạch.
- Trang chủ, bộ sưu tập, PDP, tìm kiếm, drawer lưu và menu: kiểm tra ở 360/390/768/1024/1440px, không tràn ngang. Menu chính dùng drawer dưới 1024px.
- Mia đỏ → PDP → lưu → tải lại: giữ đúng màu và liên kết. Dữ liệu thử đã được dọn.
- Đỏ/đỏ/do: cùng kết quả. Tote + Đen mở đúng Lucia/Elena màu đen.
- Lucia Đen có 2 ảnh; Back khôi phục màu sau khi đổi variant.
- Tab chỉ chuyển focus; Space chọn màu. Hover màu khác không đổi ảnh hoặc tạo viền đỏ. Escape đóng drawer và trả focus.
- Focus PDP nằm giữa header và thanh cố định, không bị che.
- Mọi liên kết liên hệ được đối chiếu href Facebook chính thức và target=_blank.
- Logo gốc khớp hash với tệp người dùng; bản web đúng kích thước, tỷ lệ và alpha.
- Không thấy lỗi console trong các luồng đã kiểm tra.
- Chữ 200%: kiểm tra reflow trên bản sao HTML với mọi font-size được nhân đôi. Đây là mô phỏng tăng cỡ chữ, không phải thao tác zoom trình duyệt.
- Giảm chuyển động: kiểm tra quy tắc CSS được áp dụng trên bản QA tạm và nhánh matchMedia của gallery; không thay đổi cài đặt hệ điều hành.
- Các tệp và máy chủ QA tạm đã được dọn. Kết quả chi tiết: planning/source-audit/shop-redesign-qa.json.

## Bản xem

Bản production hiện chạy tại http://localhost:3000/. Ảnh desktop/mobile và các màn hình kiểm tra được lưu trong thư mục artifact của cuộc trò chuyện. Không triển khai hosting trong bước chỉnh giao diện này.

## Còn cần dữ liệu riêng

- Giá và tồn kho xác nhận.
- Xác nhận SKU Nina Nâu Socola và thông tin sức chứa Elena đang mâu thuẫn trong nguồn.
- Chính sách giao nhận/đổi trả; chỉ hiển thị sau khi được xác nhận.