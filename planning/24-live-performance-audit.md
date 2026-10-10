# Hiệu năng bản đã deploy — lisbylii.com

Đo ngày 10/10/2026, 21:44–21:47 (GMT+7). Website desktop nhanh; trang chủ mobile cần tối ưu banner. Bộ sưu tập và trang chi tiết đạt điểm hiệu năng tốt.

## Phương pháp

- Đo trực tiếp tên miền HTTPS bằng giao diện Google PageSpeed Insights, Lighthouse 13.5.0 / HeadlessChromium 153.0.8010.36.
- Mỗi URL có một lần đo mobile và một lần desktop; đây không phải trung vị nhiều lần chạy. Điểm có thể thay đổi giữa các lần đo.
- Mobile: Moto G Power giả lập, Slow 4G, initial page load. Desktop: Emulated Desktop, Custom throttling, initial page load.
- Cả ba báo cáo hiển thị **No Data** ở phần trải nghiệm người dùng thực tế. Không có số đo INP/CrUX để kết luận website đạt Core Web Vitals ngoài thực tế.
- Đọc DOM và console trên website thật để kiểm tra banner; đọc HTTP headers riêng để xác nhận định dạng, dung lượng và cache. HTTP probe không phải phép đo thời gian tải trang trong trình duyệt.
- API PageSpeed không có key trả HTTP 429; các kết quả bên dưới lấy từ báo cáo PageSpeed UI đã hoàn thành, không phải từ API bị lỗi.

## Kết quả

| Trang | Thiết bị | Performance | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---:|---:|---:|---:|---:|---:|
| Trang chủ | Mobile | 71 | 1,7 s | 7,4 s | 0 ms | 0 | 5,2 s |
| Trang chủ | Desktop | 99 | 0,5 s | 0,9 s | 30 ms | 0 | 0,8 s |
| /collections/all | Mobile | 98 | 1,5 s | 2,3 s | 10 ms | 0 | 1,5 s |
| /collections/all | Desktop | 100 | 0,4 s | 0,6 s | 0 ms | 0 | 0,5 s |
| Irisa Bag — Hồng | Mobile | 95 | 1,5 s | 2,9 s | 10 ms | 0 | 1,5 s |
| Irisa Bag — Hồng | Desktop | 100 | 0,5 s | 0,7 s | 20 ms | 0 | 0,5 s |

Các giá trị hiển thị đã được PageSpeed làm tròn. FCP là thời điểm nội dung đầu tiên xuất hiện; LCP là thời điểm phần nội dung lớn nhất xuất hiện, không phải thời điểm mọi tài nguyên tải xong. TBT mô tả việc luồng chính bị chặn trong phép đo tải trang, không thay thế số đo INP từ thao tác của khách.

Báo cáo gốc:

- [Trang chủ mobile](https://pagespeed.web.dev/analysis/https-lisbylii-com/cebnkcontg?form_factor=mobile) · [desktop](https://pagespeed.web.dev/analysis/https-lisbylii-com/cebnkcontg?form_factor=desktop).
- [Bộ sưu tập mobile](https://pagespeed.web.dev/analysis/https-lisbylii-com-collections-all/j07302rt1a?form_factor=mobile) · [desktop](https://pagespeed.web.dev/analysis/https-lisbylii-com-collections-all/j07302rt1a?form_factor=desktop).
- [Irisa mobile](https://pagespeed.web.dev/analysis/https-lisbylii-com-products-irisa-bag/flb3koubpa?form_factor=mobile) · [desktop](https://pagespeed.web.dev/analysis/https-lisbylii-com-products-irisa-bag/flb3koubpa?form_factor=desktop).

## Những phần đang tốt

- CLS = 0 ở cả sáu phép đo: không ghi nhận dịch chuyển bố cục trong lần tải này.
- TBT chỉ 0–30 ms: JavaScript không phải nút thắt nổi bật của lần đo.
- Best Practices và SEO đều 100 ở cả ba trang / hai thiết bị. Đây là các kiểm tra tự động, không phải bảo đảm thứ hạng tìm kiếm hay audit bảo mật toàn diện.
- Accessibility trang chủ và Irisa 100; bộ sưu tập 98 vì thứ tự heading chưa liên tục.
- Ảnh sản phẩm đang dùng WebP; ảnh packshot Irisa 320px kiểm tra riêng chỉ 2.144 byte. Không cần giảm chất lượng toàn bộ ảnh hay đổi tỷ lệ ảnh sản phẩm.
- Không thấy console error trên trang chủ trong lượt quan sát.

## Các điểm cần tối ưu, theo mức ảnh hưởng

### 1. Banner trang chủ — ưu tiên cao nhất

Phần tử LCP là ảnh chiến dịch 20/10. PageSpeed ghi nhận ảnh ở URL:

`/_next/image?url=%2Fimages%2Fcampaigns%2F20-10%2Fcampaign-20-10.jpg&w=1920&q=85`

Ảnh tải **777.630 byte (~778 KB / 759,4 KiB)**. Probe HTTP gửi Accept hỗ trợ AVIF/WebP vẫn nhận **image/jpeg**, đúng dung lượng file gốc. Không có header Cache-Control cho phản hồi này. Điều này xác nhận ảnh chưa được chuyển đổi/nén trên bản deploy ở request đã đo; việc dùng next/image trong code chưa đủ bảo đảm đã tối ưu trên Cloudflare.

PageSpeed ước tính riêng banner có thể giảm **692,9 KiB** bằng định dạng/nén hiệu quả hơn. Tổng cơ hội tối ưu ảnh trang chủ là 769,4 KiB, bao gồm banner, hai ảnh lookbook và logo; không cộng các số này với cơ hội cache vì có tài nguyên trùng nhau.

Repo hiện không khai báo binding IMAGES trong wrangler.jsonc. Theo [OpenNext: Image Optimization](https://opennext.js.org/cloudflare/howtos/image), tối ưu next/image trên Cloudflare cần image binding hoặc custom loader. Đây là nguyên nhân cấu hình có khả năng cao, phù hợp với phản hồi thực tế, nhưng chưa kiểm tra dashboard Cloudflare của tài khoản.

**Phương án đề xuất:** tạo các kích thước WebP banner từ ảnh gốc và phục vụ tĩnh như catalog. Giữ nguyên nội dung, tỷ lệ và cách crop; kiểm tra trực quan desktop/mobile để bảo đảm độ nét. Phương án thay thế là cấu hình Cloudflare Images đúng; dịch vụ này có thể phát sinh phí, nên chưa bật trong lượt đo.

Banner đã có preload và không lazy-load, nhưng DOM của img và preload đều chưa có fetchpriority="high". Nên thêm ưu tiên cao cho banner; đánh giá lại preload của các logo trong drawer/footer để tránh cạnh tranh không cần thiết. Điều chỉnh sizes phải dựa trên kích thước ảnh thực sự vẽ và crop mobile, không đơn giản thay thành 100vw khi ảnh cố ý rộng hơn màn hình.

### 2. Cache và phiên bản tài nguyên

- Phản hồi banner không có Cache-Control; PageSpeed báo Cache TTL None. Điều này làm lượt quay lại thiếu cache trình duyệt hiệu quả.
- Ảnh catalog kiểm tra có `public, max-age=0, must-revalidate`; Cloudflare báo MISS ở request đó. Không suy diễn toàn bộ CDN không cache chỉ từ một MISS.
- Nên dùng tên file/version thay đổi theo nội dung rồi đặt cache dài cho tài nguyên tĩnh. Không đặt immutable dài hạn cho URL cố định mà quy trình upload vẫn ghi đè cùng tên, vì khách có thể tiếp tục thấy ảnh cũ.
- HTML kiểm tra có Brotli và `s-maxage=31536000`; đây là chỉ thị shared cache, không phải max-age trình duyệt.

### 3. Gallery và ảnh phụ — ưu tiên sau banner

Irisa mobile LCP 2,9 s, vượt mục tiêu tham khảo 2,5 s. PageSpeed gợi ý giảm khoảng **97,1 KiB** ở nhóm ảnh được liệt kê. Gallery tải nhiều ảnh 960px; một số được vẽ nhỏ hơn kích thước file cần thiết, thumbnail 72px vẫn chọn file tối thiểu 320px.

Nên cân nhắc:

- Thêm kích thước thumbnail nhỏ (ví dụ 160px) vào quy trình ảnh.
- Kiểm tra sizes với chiều rộng gallery thực tế và DPR; dùng kích thước đủ nét, không giảm độ phân giải hàng loạt.
- Với gallery cuộn ngang, loading="lazy" vẫn có thể tải các slide lân cận. Nếu còn cần giảm lượt tải đầu, chỉ gắn ảnh lớn cho slide đang xem / slide kế tiếp, giữ nguyên swipe, nút next và thumbnail.
- Bổ sung cache versioned cho ảnh và logo; logo header đang tải PNG 512px cho kích thước hiển thị nhỏ, PageSpeed ước tính tiết kiệm khoảng 18,4 KiB.

### 4. Heading bộ sưu tập — ảnh hưởng accessibility, không phải nguyên nhân tải chậm

PageSpeed báo "Heading elements are not in a sequentially-descending order". Chỉnh cấp heading hợp lý trong collection và footer/card; không cần thay đổi thiết kế hay cỡ chữ để sửa ngữ nghĩa HTML.

## Mục tiêu kiểm tra sau khi sửa

Ưu tiên giảm LCP trang chủ mobile xuống dưới 2,5 s trong phép đo tương đương; đo lại ít nhất ba lần để xem mức ổn định, không cam kết một điểm Lighthouse trước khi có kết quả. Tham khảo [Google Web Vitals](https://web.dev/articles/vitals): đánh giá trải nghiệm thực tế dùng LCP, INP và CLS tại phân vị 75%, tách mobile/desktop. Hiện chưa có dữ liệu đó.

Lượt này chỉ đo và lưu báo cáo; chưa sửa ứng dụng, thay ảnh hoặc deploy. HTTP evidence nằm ở `planning/source-audit/live-headers-2026-10-10.json`; số đo PageSpeed đã chép từ giao diện nằm ở `planning/source-audit/live-performance-2026-10-10.json`.
