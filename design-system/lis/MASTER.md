# LIS — Hệ thống giao diện cửa hàng

Cập nhật 10/10/2026 theo giao diện Editorial kết hợp catalogue đã triển khai, giữ banner Dearly 20.10 đã duyệt. Token chuẩn và component hiện hành được ghi trong DESIGN.md và .impeccable/design.json. Tài liệu này thay thế các quyết định font, màu, bố cục và tương tác cũ trong các bản kế hoạch trước.

## Font và cỡ chữ

Tiêu đề dùng Manrope 600. Nội dung, menu và nút dùng Be Vietnam Pro 400/500/600. Cả hai tải qua next/font, có subset tiếng Việt; không dùng tiêu đề nghiêng.

| Thành phần | Desktop | Mobile |
|---|---:|---:|
| Nội dung | 18px | 16px |
| Menu và nút | 16px | 16px |
| Thông tin phụ | 14px trở lên | 14px trở lên |
| Tiêu đề Về LIS | 64px | 40px |
| Banner Dearly | Chữ gốc trên ảnh; H1 chỉ dành cho công nghệ hỗ trợ | 36px, dòng sự kiện 18px |
| Tiêu đề mục | 36px | 28px |
| Tên trên card | 22px | 18px |

Line-height tiêu đề 1.25–1.4, nội dung 1.65–1.75 để đủ chỗ cho dấu tiếng Việt. Không dùng nhãn tiếng Anh viết hoa làm điểm nhấn.

## Màu và logo

- Nền kem #F8F6F1, mặt trắng #FFFFFF, chữ #222220.
- Chữ phụ #62625C; viền #DEDED6.
- Đỏ thương hiệu #630D1A lấy từ logo được cung cấp.
- Footer #242622, chữ trắng và xám sáng.
- Focus bàn phím #46535A, trên footer dùng màu sáng.

Logo gốc giữ trong brand-assets/lis/originals/. Bản PNG web rộng 512 và 1024px giữ alpha, nằm trong public/brand/lis/. Header dùng logo đỏ cả trên nền hồng của banner và khi cuộn; drawer đen, footer trắng. Không vẽ lại logo bằng font. Cấu hình đường dẫn nằm trong data/site.ts.

## Bố cục

Header desktop cao tối thiểu 80px với 5 mục: Sản phẩm, Túi xách, Tote, Charm, Về LIS. Có tìm kiếm, danh sách lưu và tư vấn Facebook. Dưới 1024px dùng menu drawer và các nút biểu tượng 44px.

Trang chủ: banner Dearly 20.10 → Irisa/Dalia/Lilia/Mia bằng packshot → Cảm hứng phối đồ cùng LIS với Mila Đỏ đô/Elena Nâu → Nina/Calla/Lucia/Mila/Elena/Lucky/Lily → Bề mặt đan từ crop Lucia Đen → footer. Mười một mẫu có mặt đúng một lần trong hai lưới; ảnh editorial có liên kết riêng tới đúng màu. Bộ sưu tập cũng ưu tiên Irisa/Dalia/Lilia; bộ lọc danh mục/màu nằm ở trang bộ sưu tập. Trang /ve-lis giới thiệu thương hiệu bằng nội dung ngắn và ảnh sản phẩm thật. Banner desktop giữ khung ngang 1702:630 tràn chiều rộng, chữ Dearly có sẵn trong ảnh; CTA nằm dưới chữ ở góc trái. Dưới 768px ảnh cao 400px và crop tại 52% center; tên Dearly, dòng Quà tặng 20.10 và CTA ở dưới ảnh trên nền hồng liền mạch #EFD2CF. Header trong suốt ở đầu trang, chữ tối và logo đỏ; sau scrollY > 24px trở về nền trắng có viền. Không có scrim hoặc panel sau chữ desktop. Lưới trang chủ 4 cột từ 1200px, 2 cột từ 360px đến 1199px, 1 cột dưới 360px; lưới bộ sưu tập giữ 3 cột ở 768–1199px. Card vuông 1:1, thông tin mở trên nền trang, không mô tả dài hoặc đếm màu. Gallery PDP giữ 4:5. Lookbook desktop dùng hai cột 5:7 và ảnh lệch 48px; mobile một cột.

Ảnh chiến dịch gốc tại brand-assets/lis/campaigns/20-10/dearly-original.png, bản web tại public/images/campaigns/20-10/dearly.png giữ nguyên điểm ảnh, có metadata provenance do Impeccable gắn. Vì metadata, hash bản web khác hash bản gốc. Ảnh, tiêu đề, ngày và CTA cấu hình ở data/home-campaign.ts. Nút Chọn quà 20.10 dẫn đến #thiet-ke; Nhắn LIS mở Facebook. Không thêm giảm giá hoặc quà kèm chưa được xác nhận. Góc nút banner 2px là biến thể riêng của bề mặt này. Crop mobile cao 400px yêu cầu sizes 1081px dưới 768px; ở 768–1023px, Nhắn LIS nằm bên phải trên vùng nền sáng trống.

Footer có logo trắng, giới thiệu ngắn, liên kết thật và 3 FAQ dùng details/summary. Không có giá, freeship, đánh giá hay chính sách giả.

## Tương tác

- Ảnh và tên card mở đúng sản phẩm cùng tham số variant. Nút lưu luôn hiện; card dùng Hỏi giá 16px mở Facebook.
- Chấm màu có vùng bấm 44px, màu đang chọn có vòng đen. Hover nền xám nhẹ; chỉ click đổi ảnh. Focus bàn phím có vòng riêng.
- Ảnh mới chỉ xuất hiện sau khi decode; ảnh cũ còn hiện trong lúc tải.
- Card ưu tiên packshot, secondary chỉ là lifestyle của cùng variant và được decode gần viewport. Desktop hover/focus crossfade 180ms ease-out; touch vuốt hai ảnh với chấm chọn 44px, hỗ trợ phím mũi tên. Đổi variant reset media; lỗi secondary giữ primary. Lifestyle crop 50% 100% ưu tiên túi; reduced motion đổi tức thì.
- Bộ lọc màu dùng popover cạnh bộ lọc danh mục, có chấm màu và dấu chọn. Mũi tên/Home/End di chuyển focus; Enter/Space chọn; Escape đóng và trả focus. Vòng focus nằm trong option để không bị cắt.
- Tìm kiếm theo tên hoặc màu, không phân biệt chữ hoa/dấu. Kết quả màu mở đúng variant.
- Liên kết hỏi giá và Nhắn LIS trên Facebook mở URL trong data/site.ts ở tab mới.
- Sao chép tư vấn là thao tác riêng. Website không tự gửi tin.
- Danh sách lưu dùng schema localStorage lis_luxury_cart version 2 hiện có.
- Dialog native quản lý focus, Escape và khóa cuộn nền.
- Chuyển động nhẹ 160–250ms, bỏ chuyển động khi prefers-reduced-motion.

## Nội dung và dữ liệu

Viết ngắn, cụ thể, thân thiện. Không lặp hướng dẫn thao tác dưới mỗi mục. Mô tả ngắn của 11 mẫu dựa trên nội dung người dùng cung cấp. Ghi chú màu ảnh in nghiêng, không lặp lại tên màu đã chọn. Mô tả nguồn nằm trong catalog, scripts/build-catalog.py và data/additional-products.json; nguồn bổ sung này được giữ phía trước khi import XLSX. Hiện 11 mẫu/32 màu; kích thước, PU, khả năng chống nước/chống trầy, quai và phụ kiện theo nguồn. SKU Nina Nâu Socola chưa xác nhận vẫn ẩn; ba mẫu mới chưa có SKU được cung cấp. Không khẳng định sức chứa laptop Elena khi dữ liệu còn mâu thuẫn.

Ảnh thật bổ sung theo giai đoạn: 62 ảnh hiện có gồm 27 packshot/29 lifestyle/6 detail. Bảy màu Irisa/Dalia/Lilia có cặp packshot/lifestyle thật cùng variant và bật hover/swipe; 25 màu cũ vẫn thiếu cặp, trong đó 8 variant thiếu packshot. Toàn bộ 36 ảnh mới giữ nguyên byte từ ZIP, đối chiếu tại planning/source-audit/new-product-images.json. Mila/Elena trong khối phối đồ là ảnh trong nhà dùng tạm; chưa có ảnh dạo phố xác nhận. Chi tiết Lucia là crop từ ảnh thật có sẵn, không khẳng định thủ công hay da thật. Danh sách thiếu ảnh: planning/source-audit/product-media-gaps.json. Vai trò từng sourceFile ở data/product-media.json được dùng chung bởi sync/import; tên mới có packshot/lifestyle/detail được nhận diện, ảnh chưa phân loại báo lỗi thay vì kế thừa kind của ảnh đầu.

Giá và tồn kho chưa được xác nhận. Nút Facebook phục vụ hỏi giá; lưu mẫu chưa tạo đơn hàng. Không thêm backend hoặc checkout.
