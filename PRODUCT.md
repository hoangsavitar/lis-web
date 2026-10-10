# LIS — Thông tin sản phẩm và phạm vi website

Ghi nhận từ yêu cầu và dữ liệu đã được người dùng cung cấp trong cuộc trò chuyện; cập nhật 10/10/2026.

## Sản phẩm và khách hàng

LIS giới thiệu túi xách, tote và charm. Khách xem ảnh, chọn màu, tìm mẫu, lưu mẫu trên trình duyệt và nhắn Facebook LIS để hỏi giá hoặc được tư vấn. Website phục vụ cả việc chọn túi cho bản thân và chọn quà.

Catalog hiện có 11 mẫu, 32 lựa chọn màu và 62 ảnh. Nguồn sự thật là data/catalog.json và thư mục product-images/; data/additional-products.json giữ ba mẫu mới khi import XLSX. Chất liệu, kích thước, phụ kiện đi kèm bám theo dữ liệu đã đối chiếu. Giá và tồn kho chưa được xác nhận. Chưa có checkout hoặc backend đặt hàng.

Irisa, Dalia và Lilia được người dùng cung cấp thêm bằng ba ZIP và nội dung sản phẩm, xếp theo thứ tự này ở đầu trang chủ và bộ sưu tập. Irisa có Hồng/Be, Dalia Hồng/Be/Xanh, Lilia Trắng/Đen. Cả ba dùng PU và ghi khả năng chống nước/chống trầy theo nguồn người dùng. Kích thước ghi ngang × cao × đáy: Irisa 26 × 12 × 10 cm, Dalia và Lilia 23 × 15 × 8 cm. Irisa có 3 ngăn chính, 2 ngăn phụ và quai 27 cm; Dalia có quai 10 cm và dây đeo chéo; Lilia có quai 8 cm, dây đeo chéo và charm hoa Calla. Không có dữ liệu dây đeo chéo cho Irisa. 36 ảnh gốc từ ZIP được giữ nguyên byte và đối chiếu archive/entry/hash; cả 7 màu mới có packshot/lifestyle thật cùng variant.

Facebook chính thức: https://www.facebook.com/lisbyliiofficial. Liên kết mở tab mới; nội dung tư vấn được sao chép bằng thao tác riêng, không tự gửi tin nhắn.

## Cam kết từ người dùng

- Giữ logo LIS được cung cấp; logo gốc nằm trong brand-assets/lis/originals/.
- Giữ Manrope cho tiêu đề, Be Vietnam Pro cho nội dung và menu, có tiếng Việt; màu thương hiệu #630D1A.
- Giữ URL sản phẩm, variant, danh sách mẫu đã lưu và catalog hiện tại.
- Dùng website cửa hàng thời trang phổ thông làm tham khảo: ảnh mở đầu lớn, chữ đè lên ảnh với nền trong suốt; tránh bố cục nối các khối như slide và hướng dẫn thao tác dài.
- Về LIS có trang riêng /ve-lis. Tìm kiếm, lọc màu, lưu mẫu và liên hệ phải dùng được trên mobile.

## Sự kiện đầu trang

Người dùng chọn sự kiện 20-10 cho banner trang chủ. Banner Dearly do người dùng cung cấp có nội dung ngày Phụ nữ Việt Nam, kèm nút “Chọn quà 20.10” và dẫn khách xuống bộ sưu tập để chọn quà hoặc mở Facebook để nhắn LIS. Ảnh gốc được người dùng gửi ngày 09/10/2026, lưu trong brand-assets/lis/campaigns/20-10/; bản web nằm trong public/images/campaigns/20-10/.

Chưa có dữ liệu giảm giá, quà kèm, thời hạn hay điều kiện khuyến mại. Không thêm các thông tin này vào banner. Nội dung sự kiện được cấu hình tại data/home-campaign.ts và thay thủ công khi chiến dịch kết thúc.

## Phạm vi kỹ thuật và bàn giao

Next.js 15, React 19, Tailwind CSS 4 và Zustand. Ưu tiên web responsive, tiếng Việt dễ đọc, bàn phím dùng được và hỗ trợ giảm chuyển động. Trang chủ giữ banner Dearly, lưới đầu Irisa/Dalia/Lilia/Mia, ảnh phối đồ Mila/Elena rồi bảy mẫu cũ còn lại và crop Lucia. Ảnh packshot ưu tiên cho catalogue; hover/vuốt bật cho bảy màu mới có ảnh mẫu đeo cùng variant. 25 màu cũ vẫn thiếu cặp; 8 màu trong số đó thiếu packshot. Chưa có ảnh dạo phố xác nhận; dùng ảnh LIS trong nhà theo lộ trình bổ sung ảnh thật. Giữ hệ thống cửa hàng đã có. Bàn giao bằng preview localhost, không triển khai hosting trong bước này.

## Nguồn liên quan

- data/catalog.json, scripts/build-catalog.py: dữ liệu sản phẩm và mô tả nguồn.
- data/additional-products.json, planning/source-audit/new-product-source.json, planning/source-audit/new-product-images.json: nguồn ba mẫu Dearly và đối chiếu ảnh ZIP.
- data/site.ts: Facebook, menu, logo.
- design-system/lis/MASTER.md: quy tắc giao diện đã chốt.
- .impeccable/surfaces/app-page-tsx.md: hợp đồng trang chủ kết hợp editorial và catalogue.
