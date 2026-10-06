# LIS — Hệ thống giao diện cửa hàng

Cập nhật 06/10/2026 theo kế hoạch đã được duyệt. Tài liệu này thay thế các quyết định font, màu, bố cục và tương tác cũ trong các bản kế hoạch trước.

## Font và cỡ chữ

Tiêu đề dùng Manrope 600. Nội dung, menu và nút dùng Be Vietnam Pro 400/500/600. Cả hai tải qua next/font, có subset tiếng Việt; không dùng tiêu đề nghiêng.

| Thành phần | Desktop | Mobile |
|---|---:|---:|
| Nội dung | 18px | 16px |
| Menu và nút | 16px | 16px |
| Thông tin phụ | 14px trở lên | 14px trở lên |
| Hero | 64px | 40px |
| Tiêu đề mục | 36px | 28px |
| Tên trên card | 22px | 18px |

Line-height tiêu đề 1.25–1.4, nội dung 1.65–1.75 để đủ chỗ cho dấu tiếng Việt. Không dùng nhãn tiếng Anh viết hoa làm điểm nhấn.

## Màu và logo

- Nền kem #F8F6F1, mặt trắng #FFFFFF, chữ #222220.
- Chữ phụ #62625C; viền #DEDED6.
- Đỏ thương hiệu #630D1A lấy từ logo được cung cấp.
- Footer #242622, chữ trắng và xám sáng.
- Focus bàn phím #46535A, trên footer dùng màu sáng.

Logo gốc giữ trong brand-assets/lis/originals/. Bản PNG web rộng 512 và 1024px giữ alpha, nằm trong public/brand/lis/. Header dùng đỏ, drawer đen, footer trắng. Không vẽ lại logo bằng font. Cấu hình đường dẫn nằm trong data/site.ts.

## Bố cục

Header desktop cao tối thiểu 80px với 5 mục: Sản phẩm, Túi xách, Tote, Charm, Về LIS. Có tìm kiếm, danh sách lưu và tư vấn Facebook. Dưới 1024px dùng menu drawer và các nút biểu tượng 44px.

Trang chủ: Mia Bag → lọc danh mục/màu và lưới 8 sản phẩm → 3 lối chọn theo nhu cầu → footer. Hero không dùng chiều cao viewport. Lưới 4 cột từ 1200px, 3 cột từ 768px, 2 cột từ 360px, 1 cột khi nhỏ hơn 360px.

Footer có logo trắng, giới thiệu ngắn, liên kết thật và 3 FAQ dùng details/summary. Không có giá, freeship, đánh giá hay chính sách giả.

## Tương tác

- Ảnh và tên card mở đúng sản phẩm cùng tham số variant. Nút lưu luôn hiện.
- Chấm màu có vùng bấm 44px, màu đang chọn có vòng đen. Hover nền xám nhẹ; chỉ click đổi ảnh. Focus bàn phím có vòng riêng.
- Ảnh mới chỉ xuất hiện sau khi decode; ảnh cũ còn hiện trong lúc tải.
- Tìm kiếm theo tên hoặc màu, không phân biệt chữ hoa/dấu. Kết quả màu mở đúng variant.
- Liên hệ giá và Nhắn LIS trên Facebook mở URL trong data/site.ts ở tab mới.
- Sao chép tư vấn là thao tác riêng. Website không tự gửi tin.
- Danh sách lưu dùng schema localStorage lis_luxury_cart version 2 hiện có.
- Dialog native quản lý focus, Escape và khóa cuộn nền.
- Chuyển động nhẹ 160–250ms, bỏ chuyển động khi prefers-reduced-motion.

## Nội dung và dữ liệu

Viết ngắn, cụ thể, thân thiện. Mô tả nguồn được cập nhật trong catalog và scripts/build-catalog.py. Giữ 8 mẫu/25 màu, kích thước, PU và phụ kiện theo nguồn. SKU Nina Nâu Socola chưa xác nhận vẫn ẩn. Không khẳng định sức chứa laptop Elena khi dữ liệu còn mâu thuẫn.

Giá và tồn kho chưa được xác nhận. Nút Facebook phục vụ hỏi giá; lưu mẫu chưa tạo đơn hàng. Không thêm backend hoặc checkout.