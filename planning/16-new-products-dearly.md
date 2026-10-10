# Thêm Irisa, Dalia và Lilia — 10/10/2026

Yêu cầu: giải nén toàn bộ ảnh từ ba ZIP người dùng cung cấp vào thư viện ảnh repo, thêm mô tả/thông số/màu và đưa ba mẫu mới lên đầu trang chủ lẫn bộ sưu tập.

Thứ tự: Irisa Bag → Dalia Bag → Lilia Bag. Trang chủ ưu tiên ba mẫu này rồi Mia; bảy mẫu cũ còn lại ở lưới sau, đủ 11 mẫu một lần. Giữ Dearly, ảnh phối đồ Mila/Elena và hệ thống LIS; không thêm một world/comp/concept mới.

Màu: Irisa Hồng/Be, Dalia Hồng/Be/Xanh, Lilia Trắng/Đen. Bảy màu có cặp packshot + lifestyle đúng màu: desktop hover/focus, mobile swipe tự hoạt động. 36 ảnh được giữ nguyên byte gốc, phân vào product-images/<mẫu>/<màu>/ bằng tên vai trò. Ảnh thông số/chi tiết ở gallery; không dùng làm ảnh hover. Bảng nguồn archive/entry/hash: planning/source-audit/new-product-images.json.

Mô tả và thông số từ nội dung người dùng; giá/tồn kho/SKU chưa có, không thêm số liệu giả. Kích thước ghi rõ ngang × cao × đáy; chiều dài quai và dây đeo chéo/hoa Calla theo mẫu. Không thêm dây đeo chéo cho Irisa vì chưa được cung cấp.

Nguồn ba mẫu mới: data/additional-products.json; import XLSX gốc luôn ghép ba mẫu này phía trước rồi sync thư mục ảnh, tránh lần import sau làm mất sản phẩm mới. Danh mục dùng id ổn định và đếm động, không dựa vào vị trí mảng.

Kiểm tra: hash 36 ảnh ZIP, phân màu/roles/62ảnh, import cách ly 11mẫu32màu giữ ảnh thêm, typecheck/build, trang chủ/catalog/PDP/tìm kiếm/màu/lưu/reload, hover/vuốt bằng ảnh thật và responsive. Bàn giao localhost; chưa deploy hosting.

## QA và bàn giao hoàn tất

- Catalog: 11 mẫu, 32 màu, 62 ảnh; 27 packshot/29 lifestyle/6 detail. Cả 7 màu mới có cặp thật cùng variant; 25 màu cũ thiếu cặp, 8 variant cũ thiếu packshot. Bảng thư mục ảnh đã thêm đủ bảy dòng mới ở đầu.
- Toàn bộ 36 sourceFile đối chiếu SHA-256 với entry trong ba ZIP, không sửa byte gốc. Import XLSX cách ly giữ ba mẫu bổ sung phía trước và tạo catalog giống hệt 11/32/62. Bằng chứng nguồn: planning/source-audit/new-product-images.json và new-product-source.json.
- Production QA ở 360/390/768/1024/1440px: 0 tràn ngang, 11 card, Irisa/Dalia/Lilia ở đầu, không ảnh nhìn thấy bị lỗi. Desktop hover/focus đúng ảnh lifestyle cho cả 7 màu; CDP touch swipe và đổi màu reset pass. Mobile capture dùng emulation điện thoại và cờ coarse-pointer trên Edge headless để tránh API chụp đặt lại pointer; không sửa CSS sản phẩm.
- Irisa Be/Dalia Xanh/Lilia Đen mở PDP → lưu → reload giữ đúng màu; tìm kiếm mẫu mới pass. Không ghi nhận lỗi trang. Hai capture PDP đã chụp lại sau decode.
- Review lần đầu yêu cầu bỏ nhãn Túi xách phía trên tên PDP. Đã sửa component dùng chung, typecheck/build cuối pass và production khởi động lại. Verdict pass độc lập kiểm tra hai capture PDP mới: **ship**, không còn material fix; breadcrumbs/menu/điều khiển còn nguyên. Review: .impeccable/critique/new-products.md.
- Detector chạy đúng một lần trên target dữ liệu đã đổi, trả `[]`; không lặp sau sửa nhãn. Scan provenance 304 raster, 0 thiếu metadata nguồn. QA tổng hợp: planning/source-audit/new-products-qa.json và .impeccable/review/new-products/qa.json.
- Documenter đối chiếu app/globals.css, app/layout.tsx, card/media/PDP, data/home-editorial.ts, nguồn catalog/import, PRODUCT.md, DESIGN.md và .impeccable/design.json. Giữ nguyên frontmatter palette/type/shape/spacing/component; sidecar không đổi vì sample Mia Be vẫn chưa có cặp. DESIGN.md chỉ sửa số mẫu hai lưới và trạng thái cặp thật. Drift token kế thừa của lần hybrid giữ là lịch sử, không hợp thức hóa vào token hoặc sửa ngoài phạm vi.
- Kiểm tra tài liệu: YAML parse thành công; nhóm frontmatter, 8 property component cho phép và tất cả token refs hợp lệ. Sidecar v2 có metadata/refs/snippet scope hợp lệ, narrative khớp DESIGN.md; tám section đúng thứ tự. Bảng ảnh đủ 32 dòng và bảy thư mục mới tồn tại; kiểm tra lại hash 36 sourceFile có 0 lệch. git diff --check cho các tệp tài liệu đã sửa sạch.

Bản xem production: http://localhost:3000/. Capture bàn giao: lis-new-products-desktop.png, lis-new-products-mobile.png, lis-irisa-hover.png trong C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/. Chưa deploy hosting.
