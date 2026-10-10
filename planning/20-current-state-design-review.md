# LIS — Rà hiện trạng trước khi chọn hướng chỉnh

Ngày đối chiếu: 10/10/2026. Đây là bản rà soát và đề xuất phạm vi, chưa thay đổi giao diện.

## Căn cứ và giới hạn

- Đọc mã đang dùng của trang chủ, catalogue, PDP, tìm kiếm, mẫu đã lưu, Về LIS và footer. Trang chủ thực sự dùng `CampaignHero` và `EditorialHome`; các component hero/catalogue cũ không phải căn cứ để đánh giá trang hiện tại.
- Xem banner đang nằm trong `public/images/campaigns/20-10/`, toàn bộ 32 cặp ảnh chính/hover được chọn từ catalog hiện tại và ảnh chụp desktop/mobile đã có trong repo.
- Bảng ảnh đối chiếu được tạo trực tiếp từ catalog hiện tại, theo cách card đang hiển thị: khung 1:1, packshot contain, lifestyle cover và căn đáy. Đây là bảng xem tài nguyên, không phải ảnh chụp browser mới.
- Screenshot trang chủ/PDP ngày 10/10 được đối chiếu với CSS, component và cấu hình hiện tại. Screenshot có trước một số lần bổ sung ảnh và thay banner, nên chỉ dùng để đối chiếu bố cục tương ứng; không coi là xác nhận toàn bộ trang đang chạy.
- Công cụ trình duyệt đã chặn truy cập localhost. Chưa kiểm tra trực tiếp lại hover, menu, drawer, zoom hoặc toàn bộ giao diện đang chạy trong lần rà này. Không kết luận các kiểm tra đó đã đạt.

## Điều đã xác định

Catalog hiện có 11 mẫu, 32 màu, 84 ảnh; 24 màu có ảnh preview khác ảnh chính. Dữ liệu hiện tại khác tài liệu PRODUCT.md, vốn còn ghi 62 ảnh và tình trạng thiếu cặp trước các lần import mới.

| Phần | Hiện trạng | Quyết định phù hợp |
|---|---|---|
| Card sản phẩm | Khung 1:1; chỉ tên, màu, nút lưu và Hỏi giá; không còn đoạn mô tả dài | Giữ tỷ lệ và cấu trúc gọn. Bỏ đề xuất 4:5 và việc cắt mô tả đã được thực hiện |
| Nhóm Irisa/Dalia/Lilia | Cả 7 màu có packshot và ảnh mẫu đeo; nền studio tương đối đồng nhất | Giữ làm nhóm đầu trang, không thiết kế lại bộ ảnh |
| Mia/Calla/Nina | Đã có ảnh hover cho mọi màu; Nina và Mia/Calla dùng các đợt ảnh khác nhóm Dearly | Kiểm tra sự phù hợp của từng cặp và điểm nhìn trong khung vuông; không ghi là vẫn thiếu toàn bộ hover |
| Mila/Elena/Lucia | 8 màu chưa có packshot; nhiều màu đang dùng lifestyle ở cả ảnh chính và hover | Ghi rõ đây là thiếu tài nguyên. Giữ ảnh thật hiện có, bổ sung studio sau; CSS không thể biến lifestyle thành packshot |
| Trang chủ | Đã có Dearly → 4 sản phẩm → lookbook Mila/Elena → 7 sản phẩm còn lại → Bề mặt đan | Giữ cấu trúc đã có. Chỉ điều chỉnh nhịp và khoảng cách ở vị trí thực sự yếu khi xem trang; không đề xuất thêm lại lookbook |
| Lookbook | Đang chọn ảnh lifestyle đầu tiên của Mila/Elena, cùng ảnh được dùng làm fallback ảnh chính trên card | Cân nhắc ảnh khác trong gallery thật để tránh lặp cùng ảnh ở hai vai trò. Quyết định theo bố cục của ảnh, không ép toàn bộ thành tỷ lệ mới |
| Mobile homepage | CSS và capture tương ứng cho thấy banner 400px kèm khối chữ/nút, lookbook xếp dọc | Cần kiểm tra trực tiếp nhịp cuộn và vị trí CTA trước khi chốt mức thu gọn; không tự đặt chiều cao từ quy tắc chung |
| PDP | Gallery có mũi tên và số thứ tự, chưa có thumbnail; thông số nằm sau nhóm hành động | Thumbnail là cải tiến có căn cứ vì các gallery đã có nhiều ảnh. Rà lại thông tin gần lựa chọn màu và khung ảnh đang ép 4:5 |
| Lưu mẫu | Bấm tim hiện tăng số lượng và mở drawer; tim chưa thể hiện trạng thái đã lưu | Chuyển sang lưu yên lặng và có trạng thái đã lưu theo lựa chọn người dùng đã chốt; bảo toàn dữ liệu lưu hiện có |
| Bộ lọc | UI màu đã dùng popover riêng, không còn select cũ; danh mục/màu mới lưu ở state, không cập nhật URL | Không đề xuất thay lại dropdown từ screenshot cũ. Ưu tiên giữ lựa chọn qua reload/back/forward, rồi kiểm tra tràn viền trên UI thực tế |
| Tìm kiếm/footer/Về LIS | Đã có tìm kiếm theo mẫu/màu, trang Về LIS riêng, logo trắng và FAQ bấm mở | Không coi các phần này là thiếu. Chỉ đưa lỗi hoặc điểm yếu được quan sát trực tiếp vào phạm vi chỉnh |

## Danh sách ảnh còn thiếu

Thiếu hover: Lucia Tote Nâu đất/Đen, Lucky Charm Nâu/Đỏ/Be, Lily Charm Nâu/Đỏ/Be — tổng 8 màu.

Thiếu packshot: Mila Đỏ đô/Nâu đất/Be sữa, Elena Nâu/Đen, Lucia Nâu Socola/Be sữa/Nâu đất — tổng 8 màu.

Giữ dữ liệu gốc và khung catalogue 1:1. Ảnh lifestyle thiếu không được thay bằng ảnh khác sản phẩm hoặc màu; không thêm ảnh giả để đạt đủ số cặp.

## Chọn skill theo vấn đề

1. `shape`: tổng hợp phạm vi từ hiện trạng và các lựa chọn đã chốt; không hỏi lại font, tỷ lệ hoặc hướng thương hiệu.
2. `layout`/`adapt`: chỉ dành cho các đoạn có nhịp, khoảng cách hoặc bố cục mobile chưa tốt sau khi xem trực tiếp. Việc đổi tỷ lệ card không nằm trong phạm vi.
3. `harden`: rà lỗi chuyển ảnh, đổi màu, lưu mẫu và giữ bộ lọc. Mã `VariantImage` hiện giữ ảnh cũ đến khi ảnh mới decode; cần kiểm chứng trường hợp lỗi tải ảnh trước khi tuyên bố đã tái hiện.
4. `optimize`: áp dụng cho thumbnail lưu mẫu nếu sửa luồng này; ảnh đang tải bản lớn trong ô nhỏ, có sẵn các bản WebP nhỏ hơn.
5. `polish`: chỉ chạy sau khi phạm vi đã được chọn và triển khai. Không dùng để mở thêm một vòng redesign.

Chưa có căn cứ phải đổi font/màu (`typeset`/`colorize`), tăng hiệu ứng (`overdrive`/`delight`) hoặc khởi tạo lại tài liệu (`init`). Không chạy toàn bộ danh sách skill chỉ vì các lệnh tồn tại.

## Phạm vi plan nên giữ ngắn

- Giữ card 1:1, logo, font, màu LIS, chiến dịch Dearly và vị trí ba mẫu mới.
- Cải thiện các thao tác đã có vấn đề từ mã: lưu mẫu yên lặng, bộ lọc gắn URL; gallery có thumbnail.
- Kiểm tra trực tiếp rồi mới chọn phần cần tinh chỉnh nhịp trang chủ, điểm nhìn hover, mobile banner và nội dung Về LIS.
- Tách yêu cầu bổ sung packshot/hover khỏi việc sửa giao diện; không hứa đồng nhất catalogue khi còn thiếu ảnh studio.

Mỗi đề xuất cuối cùng cần có: vị trí trên page → ảnh chụp/trạng thái hiện tại → vấn đề → thay đổi → lợi ích → phần giữ nguyên. Những điều chưa xem trực tiếp chưa được chốt thành redesign.

## Bằng chứng tài nguyên

- `.impeccable/review/current-state-2026-10-10/asset-evidence.json`: lựa chọn ảnh chính/hover và danh sách thiếu cho từng màu.
- `.impeccable/review/current-state-2026-10-10/card-assets-1.jpg` đến `card-assets-4.jpg`: toàn bộ 32 lựa chọn màu trong khung card hiện tại.
