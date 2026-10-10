# Trạng thái LIS

Cập nhật: 10/10/2026.

## Đã hoàn tất

- Trang chủ mở bằng banner Dearly 20.10 do người dùng cung cấp: desktop giữ toàn khung ảnh, mobile crop ảnh 400px rồi hiển thị tên chiến dịch và hành động trên nền hồng liền mạch.
- Trang chủ kết hợp Editorial và catalogue: Dearly → Irisa/Dalia/Lilia/Mia → Cảm hứng phối đồ cùng LIS với Mila Đỏ đô/Elena Nâu → Nina/Calla/Lucia/Mila/Elena/Lucky/Lily → crop Bề mặt đan Lucia Đen → footer. Mười một mẫu xuất hiện một lần trong hai lưới; bộ sưu tập cũng đặt Irisa/Dalia/Lilia lên đầu.
- Manrope cho tiêu đề, Be Vietnam Pro cho nội dung. Chữ nội dung 18/16px, thông tin phụ từ 14px.
- Logo người dùng cung cấp: 3 PNG nguyên bản trong brand-assets/lis/originals/, 6 PNG web có alpha trong public/brand/lis/.
- Header 5 mục, trong suốt với logo đỏ ở đầu banner, về nền trắng sau khi scrollY > 24px; dưới 1024px dùng menu drawer. Menu tự gọn khi cỡ chữ lớn để tránh tràn.
- Footer nền tối, logo trắng, liên kết danh mục, Facebook và 3 FAQ bấm mở.
- Chọn quà 20.10 ở banner dẫn đến nhóm card #thiet-ke. Nhắn LIS, Hỏi giá ở card và Liên hệ giá ở PDP/tìm kiếm/danh sách lưu mở Facebook LIS trong tab mới. Sao chép tư vấn là thao tác riêng.
- Tìm tên/màu không phân biệt dấu hoặc chữ hoa; kết quả có ảnh và mở đúng variant.
- Swatch chỉ đổi khi chọn, hover không thêm vòng đỏ, focus bàn phím riêng.
- Catalog hiện có 11 mẫu/32 màu/62 ảnh sản phẩm. Ba mẫu mới gồm Irisa Hồng/Be, Dalia Hồng/Be/Xanh, Lilia Trắng/Đen; URL, variant và dữ liệu lưu của mẫu cũ vẫn giữ được.
- Mô tả ngắn của 8 mẫu được viết lại từ nội dung người dùng cung cấp, đồng bộ catalog và nguồn import.
- Ba mẫu Dearly dùng mô tả, PU, kích thước, chống nước/chống trầy, quai và phụ kiện do người dùng cung cấp. 36 ảnh từ ba ZIP giữ nguyên byte, phân vào 7 thư mục màu và có audit archive/entry/sourceFile/hash. Import XLSX luôn giữ data/additional-products.json phía trước rồi sync thư mục ảnh.

- Về LIS có trang riêng /ve-lis, được liên kết từ menu desktop/mobile và footer.
- Bộ lọc màu là popover với chấm màu, hỗ trợ phím mũi tên, Enter/Space, Escape và click ngoài để đóng.
- Đã bỏ các đoạn hướng dẫn dài ở danh sách lưu, bộ sưu tập và nút sao chép. Ghi chú ảnh ở PDP chỉ còn chú thích ánh sáng/màn hình, in nghiêng.

- Card vuông 1:1, tên 22/18px, tên màu 14px, Hỏi giá 16px, lưu luôn hiện. Bỏ mô tả và đếm màu; gallery PDP sắp packshot → lifestyle → detail.
- Media hỗ trợ hover/focus crossfade 180ms hoặc mobile vuốt với chấm chọn 44px và bàn phím khi có cặp cùng variant. Decode gần viewport, đổi màu reset, lỗi secondary giữ primary, reduced motion tức thì. Bảy màu Irisa/Dalia/Lilia đã có cặp ảnh thật và bật preview hai ảnh; 25 màu cũ vẫn thiếu cặp.
- Vai trò từng sourceFile ở data/product-media.json dùng chung sync/import; ảnh mới nhận diện tên packshot/lifestyle/detail hoặc cần mapping. Import giữ ảnh gốc đã có và gọi sync để giữ góc bổ sung. WebP responsive có sidecar nguồn cho provenance.

## Kiểm tra các lần chỉnh cửa hàng trước

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

- Lần chỉnh nội dung và điều hướng: typecheck/build thành công; bộ lọc và trang Về LIS không tràn ở 320/360/390/768/1024/1440px. Màu chỉ đổi khi chọn, Escape trả focus, đổi danh mục đặt lại bộ lọc.

## Kiểm tra banner Dearly 20.10 (10/10/2026)

- Typecheck và production build thành công sau các chỉnh sửa source cuối cùng.
- Ảnh toàn trang và hero đã chụp ở 360/390/768/1024/1440px: không tràn ngang, ảnh tải được, không ghi nhận page error.
- Desktop/tablet giữ toàn khung 1702:630; H1 chỉ dành cho công nghệ hỗ trợ để tránh lặp chữ có sẵn trên ảnh. Mobile dùng sizes 1081px cho crop cao 400px và chọn được nguồn Next Image w=1200; Nhắn LIS ở tablet nằm trên nền sáng trống bên phải.
- CTA đến #thiet-ke, header đổi về nền trắng khi cuộn, Facebook mở đúng URL trong tab mới, tìm kiếm/drawer lưu mở được và menu mobile đến /ve-lis. Focus 2px với offset 4px; reduced motion chuyển scroll về auto và transition header về 0s.
- Hash ảnh gốc khớp tệp người dùng. Bản web giữ nguyên decoded pixels, có metadata nguồn Impeccable; scan ghi nhận 1 raster, 0 tệp thiếu provenance. Metadata làm hash bản web khác bản gốc.
- Review Impeccable đầy đủ cho banner Dearly/header hiện tại và cả 10 capture: disposition ship, material_fixes không có. Kết quả này thay thế verdict hẹp của phiên bản hai ảnh lookbook; số đo contrast 6.83:1 của phiên bản đó không áp dụng cho banner hiện tại.
- Kết quả chi tiết: [campaign-20-10-qa.json](planning/source-audit/campaign-20-10-qa.json). Review: [campaign-20-10.md](.impeccable/critique/campaign-20-10.md). Token YAML và sidecar schemaVersion 2 đã được kiểm tra theo schema Impeccable trong DESIGN.md và .impeccable/design.json.

## Kiểm tra bổ sung Irisa/Dalia/Lilia (10/10/2026)

- Typecheck và production build đã pass cả sau lần sửa cuối: bỏ nhãn Túi xách thừa phía trên tên PDP; breadcrumbs và menu danh mục vẫn giữ. Production đã khởi động lại; ảnh PDP Irisa Be/Dalia Xanh chụp sau decode xác nhận sửa cuối.
- QA ở 360/390/768/1024/1440px: không tràn ngang, đủ 11 card, ba mẫu mới đúng thứ tự đầu, không ảnh nhìn thấy bị lỗi. Bảy màu mới có hover/focus đúng lifestyle cùng variant; swipe touch và đổi màu reset pass.
- Touch được kiểm tra bằng CDP; capture mobile dùng Edge headless với emulation điện thoại và cờ coarse-pointer để giữ media query khi chụp. Không sửa CSS sản phẩm để phục vụ capture.
- Irisa Be, Dalia Xanh và Lilia Đen mở PDP → lưu → reload giữ đúng màu; tìm kiếm sản phẩm mới pass. Không ghi nhận lỗi trang trong luồng QA mới.
- Import XLSX cách ly giữ ba mẫu mới ở đầu, đủ 11 mẫu/32 màu/62 ảnh và catalog giống hệt. Toàn bộ 36 ảnh gốc mới đối chiếu hash với ZIP. Detector chạy một lần trên target dữ liệu đã đổi trả `[]`; scan 304 raster, 0 thiếu provenance.
- Bằng chứng: planning/source-audit/new-products-qa.json, .impeccable/review/new-products/qa.json; nguồn mô tả/ảnh: planning/source-audit/new-product-source.json và new-product-images.json. [Finish review cuối](.impeccable/critique/new-products.md) chốt **ship** sau xác nhận nhãn thừa PDP đã bỏ trong hai capture mới, không còn material fix. Documenter đã cập nhật số lượng, thứ tự và trạng thái cặp thật; DESIGN.md chỉ sửa hai dữ kiện bề mặt, token chuẩn và sidecar giữ nguyên.

## Lịch sử kiểm tra nhịp Editorial kết hợp catalogue trước khi thêm mẫu (10/10/2026)

- Typecheck và production build bản hybrid trước khi thêm ba mẫu thành công; localhost:3000 lúc đó chạy runtime production.
- Import XLSX trong workspace QA cách ly đã pass: 8 mẫu/25 màu/26 ảnh, phân loại khớp mapping và giữ góc Lucia thêm. Hai lần sync giữ hash catalog/manifest giống nhau. Bằng chứng import: .impeccable/review/hybrid/import-qa.json.
- Scan provenance ghi nhận 124 raster, 0 thiếu metadata; sidecar JSON nguồn được pipeline giữ bền vững.
- Detector chạy một lần trên target đã đổi, trả advisory về token drift kế thừa (cỡ chữ, màu overlay/footer/hồng campaign, radius 7px/2px); stdout bị cắt. Đây không phải kết quả không có finding. Các giá trị riêng hoặc cũ không được thêm vào token chung để hợp thức hóa drift.
- Đã đối chiếu source với DESIGN.md/sidecar/MASTER.md; frontmatter nhóm/props/refs, sidecar v2 và snippet scope được kiểm tra.
- QA production ở 360/390/768/1024/1440px: không tràn ngang, đúng 8 card vuông 1:1, không mô tả dài, không ID trùng và không ảnh nhìn thấy bị lỗi. Không ghi nhận lỗi trang/console trong luồng kiểm tra.
- 20 liên kết Facebook đúng; tìm Đỏ/đỏ/do cùng kết quả; Mia Đỏ → PDP → lưu → reload giữ đúng màu. Bộ lọc màu bộ sưu tập, menu mobile và Về LIS pass. Reduced motion có transition ảnh 0s.
- CSS page zoom 200% trên trang chủ/bộ sưu tập/PDP không tràn root; đây là mô phỏng bằng CSS, không phải native browser zoom hoặc kiểm tra tăng riêng cỡ chữ.
- Hover/focus, lỗi secondary giữ primary, mobile swipe không mở nhầm PDP, chấm chọn/bàn phím/reset màu được kiểm tra bằng fixture SVG synthetic có nhãn QA riêng. Fixture đã bị gỡ trước production (URL trả 404). Đây là kiểm tra khả năng của component; catalog thật vẫn không có cặp packshot/lifestyle cùng variant.
- 9 capture production mới trong .impeccable/review/hybrid/: desktop/mobile/mobile-360/tablet/desktop-1024, desktop-first/middle và mobile-first/middle. Bằng chứng tổng hợp: planning/source-audit/hybrid-shop-qa.json; tương tác: .impeccable/review/hybrid/qa.json; fixture: .impeccable/review/hybrid/fixture-qa.json.
- Finish review độc lập chốt **ship trong phạm vi giai đoạn 1 đã được duyệt**, không có material fixes. [Review mới](.impeccable/critique/hybrid-shop.md) giữ rõ phụ thuộc ảnh: 8 variant thiếu packshot, catalog thật chưa có preview hai ảnh; lookbook trong nhà và crop Lucia là phương án tạm bằng ảnh thật. Kết quả này thuộc bản hybrid, không dùng verdict banner trước thay thế.

## Bản xem

Bản xem hiện tại tại [localhost:3000](http://localhost:3000/) chạy runtime production với 11 mẫu sau typecheck/build cuối thành công. Không triển khai hosting trong bước này.

Capture mới: [desktop](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-new-products-desktop.png), [mobile](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-new-products-mobile.png), [Irisa hover](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-irisa-hover.png). Bộ bằng chứng nằm trong .impeccable/review/new-products/. Capture hybrid và Dearly trước giữ làm lịch sử.

## Còn cần dữ liệu riêng

- Giá và tồn kho xác nhận.
- Ảnh thật theo giai đoạn: 25 màu cũ thiếu cặp packshot/lifestyle cùng variant; 8 variant trong số đó thiếu packshot. Bảy màu mới đã có cặp thật; tổng 62 ảnh gồm 27 packshot/29 lifestyle/6 detail. Chưa có ảnh dạo phố xác nhận; ảnh Mila/Elena trong nhà được dùng tạm. Chi tiết Lucia là crop từ ảnh có sẵn, không chứng minh thủ công hay da thật. Danh sách: planning/source-audit/product-media-gaps.json.
- Xác nhận SKU Nina Nâu Socola và thông tin sức chứa Elena đang mâu thuẫn trong nguồn.
- Chính sách giao nhận/đổi trả; chỉ hiển thị sau khi được xác nhận.
