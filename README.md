# LIS — Bộ sưu tập túi & charm

Website giới thiệu 11 mẫu LIS, 32 lựa chọn màu và 84 ảnh từ bảng `[LIS] Sản phẩm`, ba mẫu Dearly và các ảnh lookbook/photoshoot đã chọn. Khách có thể xem ảnh đúng màu, tìm kiếm, lọc bộ sưu tập và lưu mẫu để tư vấn. Giá cần được hỏi qua Facebook; card dùng **Hỏi giá**, các luồng khác dùng **Liên hệ giá**; danh sách lưu chưa phải đơn hàng hay thanh toán.

## Thêm hoặc thay ảnh sản phẩm

Ảnh nguồn nằm trong **[`product-images/`](./product-images/README.md)**, chia theo mẫu và màu:

```text
product-images/
  mia-bag/
    avocado/
      01-packshot.jpg
      02-lifestyle.jpg
      03-detail.jpg
```

1. Mở đúng thư mục mẫu/màu trong [bảng thư mục ảnh](./product-images/README.md).
2. Thay ảnh có sẵn hoặc thêm ảnh thật của cùng màu. Ảnh mới dùng tên chứa `packshot`, `lifestyle` hoặc `detail`; nếu tên khác, khai báo đúng `sourceFile` trong `data/product-media.json`. Vai trò ảnh cũ như `01-front.jpg` đã nằm trong mapping. Ảnh chưa phân loại sẽ báo lỗi sync; không tự kế thừa loại của ảnh đầu. Hỗ trợ JPG, JPEG, PNG, WebP. Nếu đổi định dạng, xóa file ảnh cũ tương ứng.
3. Commit và push lên GitHub. Khi dịch vụ deploy chạy `npm run build` hoặc `npm run build:worker`, ảnh sẽ tự tối ưu sang WebP và gallery được cập nhật.

Không cần sửa component khi thêm/thay góc ảnh của màu đã có; phải giữ phân loại ảnh theo tên hoặc mapping. Import XLSX cũng đọc mapping, giữ ảnh gốc đã có trong thư mục, chỉ tạo ảnh gốc còn thiếu và gọi sync để giữ góc ảnh thêm. Ba mẫu Irisa/Dalia/Lilia nằm trong `data/additional-products.json`, được ghép phía trước dữ liệu XLSX mỗi lần import rồi sync ảnh. Thêm sản phẩm hoặc màu mới cần cập nhật catalog và nguồn import tương ứng. Push lên GitHub chỉ xuất bản website nếu dịch vụ hosting đã được cấu hình build/deploy từ Git.

## Chạy local

```bash
npm ci
npm run images:sync
npm run dev
```

Mở `http://localhost:3000`. Kiểm tra bản production bằng `npm run build`, rồi `npm start`. Kiểm tra kiểu dữ liệu bằng `npm run typecheck`.

## Đưa bản hiện tại lên Git

Repo giữ mã nguồn, lockfile, dữ liệu, toàn bộ ảnh đã chọn trong `product-images/`, WebP trong `public/images/catalog/`, logo và banner. Không ignore các thư mục ảnh phục vụ website. Bộ 84 ảnh nguồn và các kích thước WebP phải được commit cùng dữ liệu catalog.

`.gitignore` loại dependencies, build Next.js/OpenNext, cache Wrangler, log, file tải dở, môi trường và khóa riêng. `.env.example`, `.env.template` và `.dev.vars.example` vẫn có thể commit khi cần.

Các bộ ảnh lớn chưa chọn trong `PTS Lis Bag/`, `brand-assets/lis/lookbook/**/originals/`, thư mục `image_extracted/downloaded_images/`, ZIP và helper import photoshoot dùng riêng trên máy được giữ local. Website/build không cần các thư mục này: ảnh đã chọn nằm trong `product-images/`. Các sidecar `public/images/catalog/**/*.webp.json` được tạo lại khi sync. Bảng nguồn XLSX, mapping media, tài liệu thiết kế và skill đã cài trong repo vẫn được giữ.

Trên nhánh `main` hiện tại:

```powershell
git add -A
git diff --cached --stat
git commit -m "feat: update LIS storefront, product gallery and images"
git push origin main
```

Các file tải về cũ đã được bỏ theo dõi bằng `git rm --cached`; trạng thái `D` ở nhóm này là xóa khỏi bản Git tiếp theo, file trên máy vẫn còn. Không chạy `git clean -fdx` vì nó sẽ xóa cả bộ ảnh local bị ignore. Commit dọn dẹp không xóa dữ liệu khỏi lịch sử Git cũ.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `product-images/` | Ảnh gốc để thêm/thay và push |
| `public/images/catalog/` | Ảnh WebP responsive do script tạo |
| `data/catalog.json` | Sản phẩm, màu, ảnh, SKU và dữ liệu nguồn |
| `data/additional-products.json` | Ba mẫu Dearly được giữ phía trước khi import XLSX |
| `data/product-media.json` | Vai trò packshot/lifestyle/detail theo từng ảnh nguồn |
| `data/home-editorial.ts` | Thứ tự mẫu, màu và ảnh cho nhịp trang chủ |
| `scripts/sync-product-images.mjs` | Tạo ảnh web và cập nhật gallery từ thư mục ảnh |
| `app/`, `components/` | Trang chủ, bộ sưu tập, chi tiết, tìm kiếm và danh sách lưu |
| `lib/store/` | Lưu mẫu/màu trong localStorage và chuyển dữ liệu giỏ cũ |
| `planning/source-audit/` | Đối chiếu dữ liệu và manifest ảnh |
| `planning/11-product-showcase-plan.md` | Kế hoạch và ghi nhận triển khai |

Stack: Next.js 15, React 19, Tailwind CSS 4, Zustand, Sharp. Giao diện dùng Manrope cho tiêu đề và Be Vietnam Pro cho nội dung, chuyển ảnh sau khi decode, gallery scroll-snap, drawer có quản lý focus và hỗ trợ giảm chuyển động.

Dữ liệu không có giá/tồn kho xác nhận. Chất liệu ghi theo nguồn là PU; không hiển thị giá giả, đánh giá giả hay cam kết da thật. SKU Nina Nâu Socola cần xác nhận nên được ẩn. Bản build local đã kiểm tra; chưa có báo cáo hiệu năng trên Cloudflare production.

## Giao diện cửa hàng (09–10/10/2026)

Trang chủ mở bằng banner Dearly cho sự kiện 20.10 do người dùng cung cấp, tiếp theo là 4 card packshot Irisa/Dalia/Lilia/Mia, mục Cảm hứng phối đồ cùng LIS với Mila Đỏ đô và Elena Nâu, 7 card Nina/Calla/Lucia/Mila/Elena/Lucky/Lily, crop Bề mặt đan từ Lucia Đen rồi footer. Mười một mẫu xuất hiện đúng một lần trong hai lưới; trang bộ sưu tập cũng đặt Irisa, Dalia, Lilia lên đầu. Bộ lọc danh mục/màu ở trang bộ sưu tập. Card ảnh vuông, gọn tên/chấm màu/tên màu/Hỏi giá, không mô tả dài hoặc đếm màu; nút lưu luôn hiện. Desktop giữ toàn khung ảnh ngang; mobile crop ảnh rồi hiển thị tên chiến dịch và nút trên nền hồng liền mạch. Header trong suốt với logo đỏ ở đầu banner, trở về nền trắng khi cuộn. Nút Chọn quà 20.10 dẫn xuống bộ sưu tập; Nhắn LIS mở Facebook. Menu gồm Sản phẩm, Túi xách, Tote, Charm, Về LIS; dưới 1024px mở drawer. Về LIS có trang riêng tại /ve-lis. Bộ lọc màu dùng popover với chấm màu và hỗ trợ bàn phím. Hỏi giá trên card và Liên hệ giá ở các luồng khác mở Facebook LIS trong tab mới. Sao chép nội dung tư vấn là thao tác riêng.

Logo gốc: brand-assets/lis/originals/. PNG web: public/brand/lis/. Tạo lại bằng node scripts/build-brand-assets.mjs. Cấu hình Facebook, menu và logo: data/site.ts. Token và component hiện hành: DESIGN.md, .impeccable/design.json. Quy tắc cửa hàng: design-system/lis/MASTER.md. Ghi nhận triển khai: planning/12-shop-redesign.md, planning/13-copy-and-navigation-refinement.md, planning/14-campaign-hero-20-10.md và planning/15-catalog-editorial-rhythm.md.

Card hỗ trợ desktop hover/focus crossfade sang ảnh mẫu đeo cùng variant và mobile vuốt hai ảnh với chấm chọn 44px khi có cặp hợp lệ. Hiện 62 ảnh gồm 27 packshot/29 lifestyle/6 detail; cả 7 màu Irisa/Dalia/Lilia có cặp ảnh thật đúng màu và đã bật hiệu ứng. 25 màu cũ vẫn chưa có cặp, trong đó 8 variant thiếu packshot. Ảnh phối đồ Mila/Elena là ảnh trong nhà dùng tạm theo giai đoạn bổ sung ảnh thật, chưa có ảnh dạo phố xác nhận. Không dùng ảnh sản phẩm giả hoặc ghép khác màu; [danh sách thiếu ảnh](planning/source-audit/product-media-gaps.json) giữ riêng khỏi giao diện khách.

## Thay banner chiến dịch

Ảnh gốc Dearly nằm trong brand-assets/lis/campaigns/20-10/dearly-original.png; bản web public/images/campaigns/20-10/dearly.png giữ nguyên điểm ảnh và có metadata nguồn do Impeccable gắn. Hash tệp web khác bản gốc vì metadata. Sửa ảnh, tiêu đề, ngày và CTA ở data/home-campaign.ts khi thay chiến dịch. Bản hiện tại dùng ảnh 1702×630; ảnh mới có tỷ lệ khác cần đối chiếu layout desktop/mobile trước khi thay. Chưa có giảm giá, quà kèm hay thời hạn khuyến mại được xác nhận.


## Kiểm tra bổ sung Irisa/Dalia/Lilia (10/10/2026)

Đã nhập toàn bộ 36 ảnh gốc từ ba ZIP vào thư mục mẫu/màu, giữ nguyên byte theo [audit archive/entry/hash](planning/source-audit/new-product-images.json). Mô tả, PU, kích thước theo ngang × cao × đáy, quai, phụ kiện và màu bám theo [nội dung người dùng](planning/source-audit/new-product-source.json). Import XLSX cách ly giữ 11 mẫu/32 màu/62 ảnh và tạo catalog giống hệt bản hiện tại.

QA production ở 360/390/768/1024/1440px ghi nhận không tràn ngang, đủ 11 card và ba mẫu mới đúng thứ tự đầu. Cả 7 màu có hover/focus đúng ảnh thật; touch swipe và đổi màu reset đã kiểm tra trên Edge headless với emulation điện thoại và cờ coarse-pointer để giữ media query khi capture. Irisa Be, Dalia Xanh và Lilia Đen mở PDP, lưu và reload đúng màu; tìm kiếm mẫu mới pass. Typecheck/build cuối đã pass sau khi bỏ nhãn Túi xách thừa trên PDP. [Finish review](.impeccable/critique/new-products.md) chốt **ship** sau đối chiếu hai capture PDP mới, không còn material fix. Detector chạy một lần trên target dữ liệu đã đổi trả `[]`; scan 304 raster, 0 thiếu provenance. [Báo cáo QA](planning/source-audit/new-products-qa.json).

Capture mới: [desktop](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-new-products-desktop.png), [mobile](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-new-products-mobile.png), [Irisa hover](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-irisa-hover.png). Chi tiết triển khai: [planning/16-new-products-dearly.md](planning/16-new-products-dearly.md). Chưa deploy hosting.

## Lịch sử kiểm tra bản Editorial kết hợp catalogue trước khi thêm mẫu (10/10/2026)

Typecheck/production build pass. QA production ở 360/390/768/1024/1440px không tràn ngang, đủ 8 card vuông, không ảnh nhìn thấy bị lỗi; các luồng tìm kiếm/màu/PDP/lưu/reload/bộ lọc/menu/Facebook/reduced motion pass. CSS page zoom 200% trên home/catalog/PDP không tràn root; đây không phải native browser zoom. [Báo cáo QA](planning/source-audit/hybrid-shop-qa.json) ghi rõ phạm vi.

Preview hai ảnh ở bản hybrid trước được kiểm tra bằng fixture SVG synthetic có nhãn QA, đã gỡ trước production; catalog thật lúc đó không có cặp cùng variant. Import XLSX cách ly giữ 8 mẫu/25 màu/26 ảnh và góc Lucia thêm; sync lặp giữ hash catalog/manifest. Scan 124 raster không thiếu provenance; detector chạy một lần có advisory drift kế thừa và stdout bị cắt. 9 capture nằm ở .impeccable/review/hybrid/. Finish review độc lập chốt **ship trong phạm vi giai đoạn 1 đã được duyệt**, không có material fixes. [Review lịch sử](.impeccable/critique/hybrid-shop.md) giữ rõ phụ thuộc ảnh tại thời điểm đó: 8 variant thiếu packshot, catalog thật chưa có preview hai ảnh; lookbook trong nhà và crop Lucia là phương án tạm bằng ảnh thật.

Bản xem production: [localhost:3000](http://localhost:3000/). Capture mới của hybrid: [desktop](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-hybrid-desktop.png), [mobile](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-hybrid-mobile.png), [lookbook](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-hybrid-lookbook.png). Bộ 9 capture kiểm chứng nằm trong .impeccable/review/hybrid/. Chưa deploy hosting.

## Kiểm tra banner trước và bản xem (10/10/2026)

Trong lần chỉnh banner trước, typecheck và production build đã pass. QA banner Dearly ở 360/390/768/1024/1440px ghi nhận không tràn ngang và không có page error; [báo cáo QA](planning/source-audit/campaign-20-10-qa.json) ghi rõ các thao tác đã kiểm tra. [Review Impeccable cuối](.impeccable/critique/campaign-20-10.md) chốt ship cho banner/header hiện tại.

Bản xem [localhost:3000](http://localhost:3000/) hiện chạy production sau typecheck và build cuối thành công cho bản 11 mẫu. Các ảnh dưới đây thuộc lần chỉnh banner trước; capture production và finish review của lần bổ sung Irisa/Dalia/Lilia đã cập nhật ở phần trên. Ảnh Dearly lịch sử: [desktop](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-20-10-desktop.png) và [mobile](C:/Users/hoang/.codex/visualizations/2026/09/22/01a0ca0c-9ec3-7d60-bc0a-d8443463a581/lis-20-10-mobile.png); bộ ảnh kiểm chứng toàn trang/hero nằm trong .impeccable/review/. Chưa deploy hosting trong bước này.
