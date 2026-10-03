# Trạng thái LIS

Cập nhật: 03/10/2026.

- Đã triển khai trang chủ theo chương sản phẩm, bộ sưu tập có bộ lọc và trang chi tiết giữ lựa chọn màu trong URL.
- Catalog có 8 mẫu, 25 màu, 26 ảnh; ảnh Lucia Đen gồm ảnh chính và góc chụp bổ sung từ nguồn Drive.
- Ảnh nguồn được chia rõ theo mẫu/màu trong `product-images/`. Script tự tạo WebP responsive và cập nhật gallery trước build Next.js/Cloudflare.
- Hiển thị **Liên hệ giá**. Khách lưu mẫu/màu, thay số lượng và sao chép danh sách để tư vấn. Chưa có checkout hoặc giá/tồn kho xác nhận.
- Đã xử lý lưu variant và migration dữ liệu giỏ cũ, tìm kiếm không phân biệt dấu tiếng Việt, drawer native dialog và reduced motion.
- API import Excel cũ đã ngừng hoạt động; website chạy từ catalog và ảnh trong repo, không phụ thuộc workbook trên máy dev.

## Kiểm tra

- `npm run build`: thành công, gồm đồng bộ ảnh và kiểm tra kiểu dữ liệu.
- Đối chiếu tham chiếu ảnh: đủ 8 sản phẩm, 25 màu, 26 ảnh; mọi ảnh nguồn và kích thước WebP được tham chiếu đều tồn tại.
- Kiểm tra trình duyệt ở desktop và rộng 390px: đổi màu Mia cập nhật ảnh/URL/SKU; lưu và tải lại giữ đúng màu, không có ảnh lỗi hoặc lỗi console trong luồng đã kiểm tra.
- First Load JS theo build Next.js: trang chủ 112 kB, trang chi tiết 115 kB. Đây là số của build local, không phải kết quả đo Core Web Vitals.

## Còn cần dữ liệu hoặc triển khai riêng

- Giá, tồn kho, liên hệ tư vấn chính thức và chính sách giao nhận/đổi trả.
- Xác nhận SKU Nina Nâu Socola và thông tin sức chứa Elena đang mâu thuẫn trong nguồn.
- Deploy và đo hiệu năng trên hosting thực tế. Chưa xác nhận website production đạt các ngân sách trong kế hoạch.
