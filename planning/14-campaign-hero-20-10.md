# Trang chủ LIS — sự kiện 20.10

Mode: Persuade. Phạm vi: thay vùng hero và cách header đi cùng hero trong hệ thống LIS hiện có. Không tạo một nhận diện thương hiệu mới.

## Direction contract

THESIS: Một banner thời trang cho sự kiện 20.10, dùng ảnh người mẫu LIS tràn chiều ngang với chữ trực tiếp trên ảnh. Thay bố cục giới thiệu sản phẩm chia ô cũ theo yêu cầu người dùng.

OWN-WORLD: Giữ logo thật, đỏ #630D1A, Manrope 600 và Be Vietnam Pro. Dùng ảnh banner Dearly nền hồng người dùng cung cấp; header trong suốt với chữ tối và logo đỏ để dễ đọc trên nền sáng. Giữ nguyên chữ có sẵn trên ảnh, không chồng thêm tiêu đề desktop. Bên dưới là nền kem và lưới sản phẩm hiện có.

STORY: Khách nhận ra đây là dịp chọn quà 20.10, xem ảnh túi rồi bấm chọn quà hoặc nhắn LIS. Giữ dữ liệu giá, tồn kho, lựa chọn màu và danh sách lưu hiện tại.

FIRST VIEWPORT: Header phủ lên mép trên của ảnh. Desktop hiển thị nguyên banner ngang 1702×630 tràn chiều rộng, nút Chọn quà 20.10 ở góc dưới trái dưới chữ Dearly, cạnh liên kết Facebook. Mobile cắt khung ảnh 400px cao để giữ người mẫu và ba túi, rồi hiển thị tên Dearly, ngày sự kiện và nút trên nền hồng liền mạch; bộ sưu tập theo ngay sau.

FORM: Bố cục website thời trang phổ thông được người dùng yêu cầu rõ; tham khảo COS và Polène. Đây là thay đổi vùng hero trong một trang hiện có, code-led; không áp dụng concept-seed cho yêu cầu hẹp đã chỉ định bố cục. Header chuyển về nền trắng khi cuộn qua ngưỡng nhỏ, focus luôn có tương phản.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Thông tin đã chốt

Người dùng chọn sự kiện 20-10. Chưa có thông tin giảm giá, quà tặng kèm hoặc điều kiện khuyến mại; banner chỉ giới thiệu chọn quà. Không thêm các cam kết bán hàng chưa xác nhận.

## Tham khảo và nguồn ảnh

- https://www.cos.com/en-us/women — trang bộ sưu tập với ảnh thời trang và CTA đầu trang.
- https://www.polene-paris.com/ — tham khảo độ ưu tiên cho hình ảnh túi và điều hướng bộ sưu tập.
- Ảnh người dùng cung cấp: brand-assets/lis/campaigns/20-10/dearly-original.png; bản web public/images/campaigns/20-10/dearly.png giữ nguyên pixel, có metadata nguồn gốc. Ảnh lookbook ban đầu đã được thay bằng banner chính thức này. Không lấy ảnh của website tham khảo.
- Ngày, tiêu đề và CTA nằm ở data/home-campaign.ts để thay sự kiện sau này.


## Bàn giao và QA (10/10/2026)

- Đã triển khai banner Dearly do người dùng cung cấp, header trong suốt có logo đỏ/chữ tối, CTA chọn quà và liên kết Facebook. Cặp font, logo, catalog và hành vi cửa hàng được giữ. Mobile dùng ảnh crop cao 400px với sizes 1081px; tablet đặt Nhắn LIS trên vùng nền trống bên phải.
- Typecheck và production build thành công sau source cuối. QA tại 360/390/768/1024/1440px ghi nhận 0 tràn ngang, 0 page error và ảnh tải thành công. CTA/scroll, header, URL Facebook, tìm kiếm, drawer lưu, focus bàn phím, giảm chuyển động và liên kết Về LIS đã được kiểm tra; xem [báo cáo QA](source-audit/campaign-20-10-qa.json).
- [Review Impeccable cuối](../.impeccable/critique/campaign-20-10.md) kiểm tra đầy đủ banner Dearly/header và 10 capture, disposition ship, không có material fix. Review này thay thế verdict hẹp của phiên bản hai ảnh lookbook; báo cáo contrast cũ không mô tả banner Dearly hiện tại.
- Ảnh gốc giữ nguyên byte/hash so với tệp người dùng. Bản web giữ nguyên decoded pixels, có metadata nguồn do Impeccable gắn (scan 1 raster, 0 missing); vì metadata nên hash tệp web khác bản gốc. Không tạo ảnh AI mới cho chiến dịch.
- DESIGN.md, .impeccable/design.json và design-system/lis/MASTER.md ghi hệ thống hiện có cùng biến thể banner đã được duyệt; README.md và STATUS.md được cập nhật. YAML/token refs, thứ tự 8 mục và sidecar schemaVersion 2 đã được kiểm tra.
- Bản xem hiện tại [localhost:3000](http://localhost:3000/) là Next dev, đã xác nhận từ process. Production build đã pass trước đó; không có deploy hosting. Ảnh hero mới: [desktop](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-20-10-desktop.png), [mobile](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-20-10-mobile.png); đủ ảnh toàn trang/hero ở .impeccable/review/.
