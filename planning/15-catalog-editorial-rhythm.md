# LIS — Editorial và catalogue cùng dẫn tới sản phẩm

Chốt 10/10/2026: banner Dearly → nhóm packshot chọn lọc → Cảm hứng phối đồ cùng LIS → các mẫu còn lại → Bề mặt đan → footer. Tám mẫu xuất hiện trong hai lưới, không phải hai hướng thay thế nhau. Giữ font, màu, logo và banner đã duyệt.

Card: ảnh vuông, bỏ mô tả dài và đếm màu, tên/chấm màu/tên màu/Hỏi giá. Ảnh và tên mở PDP đúng variant, lưu luôn hiện, hỏi giá mở Facebook. Desktop crossfade sang lifestyle cùng variant; mobile vuốt hai ảnh và có nút chọn ảnh. Chỉ bật khi có packshot và lifestyle đúng màu; đổi màu reset ảnh, secondary lỗi giữ primary.

Dữ liệu: phân loại từng sourceFile bằng data/product-media.json; sync và import đọc chung. Giữ gallery, URL và dữ liệu lưu; PDP sắp packshot→lifestyle→detail. Ảnh mới đặt tên có packshot/lifestyle/detail hoặc thêm vào mapping.

Ảnh thật làm dần: catalogue có 26 ảnh, hiện không có cặp packshot/lifestyle trong cùng variant; không tạo cặp sai màu. Tám variant chưa có packshot. Lookbook hiện có là ảnh trong nhà, không phải ảnh dạo phố; dùng tạm ảnh thật Mila/Elena và ghi riêng danh sách ảnh cần bổ sung. Craft dùng crop trình bày từ ảnh Lucia Đen, không khẳng định thủ công/quy trình chưa xác nhận.

Kiểm tra: card/catalogue/PDP, hover/focus/swipe, màu/lưu/reload, ảnh thiếu/lỗi, import và sync idempotent; 360/390/768/1024/1440, chữ200%, reduced-motion, typecheck/build. Finish review và tài liệu trước bàn giao localhost.


## Triển khai theo source (10/10/2026)

- components/home/editorial-home.tsx và data/home-editorial.ts tạo đúng nhịp Dearly → Nina/Mia/Calla/Lucia Đen → Mila Đỏ đô/Elena Nâu trong nhà → Mila/Elena/Lucky/Lily → crop Lucia Đen → footer. Hai lưới đại diện đủ 8 mẫu một lần; các ảnh editorial liên kết tới PDP đúng màu. Bộ lọc chỉ nằm ở trang bộ sưu tập. Banner/header/footer, font và palette giữ hệ thống đã duyệt.
- Card 1:1 bỏ mô tả/đếm màu, tên 22/18px, tên màu 14px, Hỏi giá 16px và lưu luôn hiện. lib/product-media.ts ưu tiên packshot; secondary chỉ là lifestyle cùng variant khi primary là packshot. Decode gần viewport, crossfade 180ms desktop hover/focus, mobile swipe/44px dot buttons/phím mũi tên, đổi variant reset và lỗi secondary giữ primary. Reduced motion tức thì. Lifestyle card dùng object-position 50% 100%.
- data/product-media.json phân loại riêng từng sourceFile; sync nhận tên semantic mới hoặc báo lỗi phân loại, không kế thừa kind của ảnh đầu. Import dùng chung mapping, giữ ảnh gốc đã có, tạo ảnh thiếu từ XLSX rồi sync để giữ thêm góc. URL/variant/store/anchors vẫn giữ hợp đồng.
- Dữ liệu ảnh hiện có: 18 packshot/8 lifestyle, không có cặp cùng variant và 8 variant thiếu packshot. Hiệu ứng hai ảnh chưa bật trên catalog thật. Dùng tạm ảnh indoor Mila/Elena theo lộ trình ảnh thật; không có ảnh dạo phố xác nhận. Bề mặt đan là crop ảnh Lucia Đen, không xác nhận thủ công hoặc da thật. Danh sách thiếu: planning/source-audit/product-media-gaps.json.
- DESIGN.md đã được lưu snapshot trong phiên trước khi sửa có mục tiêu; cập nhật cùng .impeccable/design.json, MASTER.md, README.md và STATUS.md từ source. Kết quả QA cuối và verdict mới được ghi bên dưới.

## Kiểm tra pipeline và build

- Typecheck và production build bản hybrid thành công; localhost:3000 hiện chạy production.
- Import XLSX cách ly pass 8 mẫu/25 màu/26 ảnh, roles khớp mapping, góc Lucia thêm được giữ (.impeccable/review/hybrid/import-qa.json). Hai lần sync giữ catalog/manifest hash giống nhau.
- Provenance scan: 124 raster, 0 thiếu metadata; pipeline tạo sidecar JSON nguồn lâu dài.
- Detector đã chạy đúng một lần trên target thay đổi; có advisory drift kế thừa về cỡ chữ 48/44/40/24/20, màu overlay/footer/hồng campaign và radius 7px/2px. Stdout bị cắt; không ghi nhận là không có finding và không chạy lại. Không đưa advisory này thành token toàn hệ thống hoặc sửa phạm vi cũ ngoài yêu cầu.
- QA tương tác và verdict finish review mới đã được bổ sung bên dưới; các kết quả banner trước chỉ giữ như lịch sử.

## QA production của nhịp hybrid

- QA production ở 360/390/768/1024/1440px: không tràn ngang, đúng 8 card vuông 1:1, không mô tả dài, không ID trùng và không ảnh nhìn thấy bị lỗi. Không ghi nhận lỗi trang/console trong luồng kiểm tra.
- 20 liên kết Facebook đúng; tìm Đỏ/đỏ/do cùng kết quả; Mia Đỏ → PDP → lưu → reload giữ đúng màu. Bộ lọc màu bộ sưu tập, menu mobile và Về LIS pass. Reduced motion có transition ảnh 0s.
- CSS page zoom 200% trên trang chủ/bộ sưu tập/PDP không tràn root; đây là mô phỏng bằng CSS, không phải native browser zoom hoặc kiểm tra tăng riêng cỡ chữ.
- Hover/focus, lỗi secondary giữ primary, mobile swipe không mở nhầm PDP, chấm chọn/bàn phím/reset màu được kiểm tra bằng fixture SVG synthetic có nhãn QA riêng. Fixture đã bị gỡ trước production (URL trả 404). Đây là kiểm tra khả năng của component; catalog thật vẫn không có cặp packshot/lifestyle cùng variant.
- 9 capture production mới trong .impeccable/review/hybrid/: desktop/mobile/mobile-360/tablet/desktop-1024, desktop-first/middle và mobile-first/middle. Bằng chứng tổng hợp: planning/source-audit/hybrid-shop-qa.json; tương tác: .impeccable/review/hybrid/qa.json; fixture: .impeccable/review/hybrid/fixture-qa.json.

Finish review độc lập chốt **ship cho giai đoạn 1 đã duyệt**, material_fixes: None; bằng chứng .impeccable/critique/hybrid-shop.md và finishReview trong planning/source-audit/hybrid-shop-qa.json. Ảnh thiếu vẫn là phụ thuộc cho giai đoạn sau, không biến fixture thành thành quả hover trên catalog thật. Indoor lookbook/crop Lucia là phương án tạm bằng ảnh thật. Không dùng verdict banner trước cho bản hybrid.

Capture bàn giao mới: [desktop](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-hybrid-desktop.png), [mobile](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-hybrid-mobile.png), [lookbook](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-hybrid-lookbook.png). Runtime production localhost:3000; chưa deploy hosting.


## Bổ sung từ người dùng

Ngày 10/10/2026: phần chưa có ảnh phù hợp được bỏ qua để người dùng tự tìm và thêm sau. Không tạo ảnh thay thế hoặc khối trống; giữ ảnh LIS thật đang có. Card chỉ hiện một ảnh cho tới khi cùng màu có đủ packshot và lifestyle. Hướng dẫn thư mục và tên file nằm ở product-images/README.md.
