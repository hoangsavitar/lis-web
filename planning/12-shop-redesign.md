# Chỉnh LIS thành website cửa hàng

Ngày triển khai: 06/10/2026. Theo kế hoạch người dùng đã duyệt, dùng skill ui-ux-pro-max.

## Phạm vi

- Manrope + Be Vietnam Pro; chữ lớn hơn, hỗ trợ tiếng Việt.
- Logo người dùng cung cấp; lưu gốc và PNG web giữ trong suốt.
- Header 5 mục, drawer mobile, trang chủ hero Mia gọn và lưới sản phẩm.
- Footer với danh mục, Facebook, 3 FAQ bấm mở.
- Liên hệ giá mở Facebook; sao chép tư vấn riêng.
- Tìm kiếm có ảnh, tên, màu và URL variant đúng.
- Lưu mẫu/màu giữ schema và dữ liệu cũ; swatch chỉ đổi khi click.
- Mô tả catalog và nguồn import viết lại theo dữ liệu thật.

Cấu hình chung: data/site.ts. Quyết định thiết kế hiện hành: design-system/lis/MASTER.md. Các kế hoạch trước đây được giữ để tham khảo lịch sử; quyết định giao diện ở tài liệu này và MASTER.md được ưu tiên.

## Bàn giao

Chạy kiểm tra kiểu dữ liệu, production build và kiểm tra trình duyệt ở 360/390/768/1024/1440px. Ghi kết quả sau khi hoàn tất. Chỉ chạy localhost, không triển khai hosting trong phạm vi chỉnh giao diện này.
## Kết quả kiểm tra và bàn giao (07/10/2026)

- Typecheck, production build và kiểm tra whitespace đã qua.
- Kiểm tra trang chủ, bộ sưu tập, PDP, tìm kiếm, menu và danh sách lưu ở 360/390/768/1024/1440px: không tràn ngang.
- Lưới lần lượt 2/2/3/3/4 cột; dưới 360px dùng 1 cột.
- Luồng Mia đỏ → PDP → lưu → tải lại giữ màu. Tìm Đỏ/đỏ/do cho cùng kết quả; lọc Tote + Đen mở đúng variant.
- Hover màu khác không đổi lựa chọn và không có viền đỏ. Tab/Space, Escape và focus khi có header/thanh cố định được kiểm tra.
- Gallery Lucia có 2 ảnh; Back khôi phục màu đúng. FAQ footer bấm mở được; logo trắng hiển thị trên nền tối.
- Tất cả liên kết liên hệ được đối chiếu đúng Facebook, tab mới; không gửi tin nhắn trong quá trình kiểm tra.
- Bản gốc logo khớp hash nguồn. Xuất web đúng alpha, tỷ lệ và kích thước.
- Không có lỗi console trong các luồng đã thử. Dữ liệu mẫu dùng thử đã dọn.

Chữ 200% được kiểm tra bằng bản sao HTML đã render và CSS tăng gấp đôi mọi cỡ chữ. Giảm chuyển động được kiểm tra bằng cách áp dụng quy tắc reduce của CSS trên bản QA tạm, cùng kiểm tra nhánh matchMedia của gallery. Không dùng browser zoom hay thay đổi tùy chọn hệ điều hành. Bản QA tạm và máy chủ riêng đã được xóa/dừng.

Kết quả máy đọc được: source-audit/shop-redesign-qa.json. Bản production để xem: http://localhost:3000/. Không deploy hosting.

Ảnh bàn giao nằm trong artifact của cuộc trò chuyện:
- lis-shop-desktop-1440.jpg
- lis-shop-mobile-390.jpg
- lis-footer-desktop-1440.jpg
- lis-saved-mobile-390.jpg
- lis-text-200-390.jpg