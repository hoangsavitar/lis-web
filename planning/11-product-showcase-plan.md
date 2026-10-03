# LIS — Kế hoạch làm nổi bật từng sản phẩm và biến thể màu

Ngày lập: 23/09/2026. Trạng thái: KẾ HOẠCH CHI TIẾT, đã đối chiếu hai tab Google Sheets và xem 35 ảnh nhúng. Đây là kế hoạch thiết kế/triển khai, chưa phải kết quả website đã được xây dựng hoặc đo hiệu năng. Các mâu thuẫn ngay trong nguồn được ghi riêng để xử lý trước xuất bản.

## 1. Mục tiêu và bằng chứng

Shop ít mẫu nên mỗi sản phẩm phải dễ nhận biết, có lý do lựa chọn rõ ràng và được xem đúng màu trước khi thêm vào giỏ. Hiệu ứng tạo cảm xúc ở ảnh và thao tác chọn màu, nhưng không trì hoãn đọc nội dung hay mua hàng.

Nguồn người dùng yêu cầu: https://docs.google.com/spreadsheets/d/1uJEhFVcKbgNNqo7nC41cD01zrVTZnuwP-zkxsf3c_SM/edit?gid=1891504744#gid=1891504744

Đã đọc bản XLSX xuất trực tiếp sau khi người dùng xác nhận: tab “TT SP ” có dữ liệu sản phẩm B2:H26, tab “Hình ảnh” có danh mục link C2:H35. Đã xem 35 ảnh nhúng cùng anchor ô trong tab thông tin. Xem bản tổng quan ảnh tại `source-audit/embedded-images-contact.jpg`, tọa độ và kích thước tại `source-audit/image-anchors.json`. Các thư mục Drive liên kết là nguồn tìm ảnh gốc trong giai đoạn sản xuất, chưa kiểm kê toàn bộ nội dung từng thư mục. Không coi các thông tin marketing trong code là dữ liệu đã được chứng thực.

Nguồn xác nhận 8 mẫu, tổng cộng 25 dòng màu: 6 mẫu túi và 2 mẫu charm. Hai bộ sưu tập là The New Classic và Urban Heartbeat. Tên trong nguồn là Mila, Nina, Lucia Tote, Elena Tote, Lucky charm, Mia Bag, Calla Bag, Lily Charm; tab ảnh dùng Mila Bag/Nina Bag. Không có cột giá hoặc tồn kho trong bảng đã đọc, nên giá local chưa được xác nhận. Mô tả cả tám mẫu ghi da PU; không tiếp tục dùng tuyên bố da bò Ý, Epsom, Saddle Stitch hoặc Fenice trong local nếu không có bằng chứng mới.

### Catalog chuẩn theo bảng nguồn

| Mẫu | Màu theo cột H | Kích thước theo cột E | Nguồn ô |
|---|---|---|---|
| Mila | Đỏ đô; Nâu đất; Be sữa | 19 × 12 × 12 cm | B2:H4 |
| Nina | Đỏ burgundy; Nâu Socola; Be sữa | 20.5 × 11.5 × 21.5 cm | B5:H7 |
| Lucia Tote | Nâu Socola; Be sữa; Nâu đất; Đen | 38 × 11 × 28 cm | B8:H11 |
| Elena Tote | Nâu; Đen | 32 × 12 × 26 cm | B12:H13 |
| Lucky charm | Nâu; Đỏ; Be | 6 cm | B14:H16 |
| Mia Bag | Be; Nâu; Xanh bơ; Đỏ | 21 × 10 × 16 cm | B17:H20 |
| Calla Bag | Xanh rêu; Nâu; Đen | 26 × 6 × 26 cm | B21:H23 |
| Lily Charm | Nâu; Đỏ; Be | 6 cm | B24:H26 |

Tổng: 3 + 3 + 4 + 2 + 3 + 4 + 3 + 3 = 25 biến thể. Không tự đổi tên màu thành tên mỹ thuật; mã HEX chỉ là swatch xấp xỉ được đối chiếu ảnh, không thay tên màu kinh doanh.

### Mâu thuẫn và dữ liệu thiếu cần xử lý khi triển khai

1. C6 của Nina nâu ghi `LIS-TNC25-MILA -CHOCO`. Giữ raw SKU trong audit, tạo variantId nội bộ riêng và yêu cầu xác nhận SKU chuẩn trước xuất bản/nhập hàng; không tự sửa mã kinh doanh rồi coi là nguồn.
2. Nina D6 trông rất tối trong ảnh trong khi H6 ghi Nâu Socola. Cần so ảnh gốc để phân biệt nâu rất đậm với đen; không tự thêm màu Đen.
3. Elena E12 vừa ghi laptop tới 15 inch, vừa cảnh báo 15–15.6 inch không khuyến nghị. Kích thước 32cm cũng cần đối chiếu kích thước máy thực. Nội dung an toàn cho bản thiết kế: “Xem kích thước và sức chứa”, không hero claim “vừa laptop 15 inch”.
4. Ảnh minh họa F19/G19 của Mia mang màu tối dù neo ở dòng Xanh bơ. Anchor ô không có nghĩa là ảnh đúng variant; phải gắn ảnh theo nội dung đã xem, không theo row đơn thuần. Xác minh ảnh tối thuộc Nâu hay Đỏ trước mapping cuối.
5. Lucky có ảnh hình nhiều cánh trong khi mô tả gọi cỏ bốn lá. Dùng tên Lucky và ảnh thật, chưa viết số cánh trong quảng cáo trước xác minh.
6. Calla E21 ghi charm hoa đồng màu đi kèm. Phân biệt phụ kiện kèm theo với Lily bán riêng; không tự cộng tiền hoặc upsell một món đã có sẵn.
7. Không có giá, tồn kho, chính sách đổi trả/bảo hành và đánh giá định lượng trong bảng. Cần bổ sung dữ liệu thương mại, không giữ giá giảm/review ngẫu nhiên từ code. Tab ảnh E28 ghi Mia chưa có feedback; không dựng review để lấp khoảng trống.

Những điểm kỹ thuật đã đọc:

- `components/product/product-card.tsx`: ảnh chính theo màu nhưng ảnh hover dùng chung; liên kết PDP không mang màu đã chọn; vùng bấm swatch chỉ 18px.
- `app/products/[handle]/page.tsx`: đổi màu thay ảnh chính, chưa có gallery theo variant; sticky CTA dựa trên ngưỡng scroll 600px; trang là client component.
- `lib/store/cart-store.ts`: ghép productId, tên màu và size thành khóa giỏ; cần variantId ổn định.
- `data/products.ts`: vẫn giữ catalog mẫu DEFAULT_PRODUCTS; thông tin phân loại/số lượng có thể lệch nguồn thật.
- Lần typecheck ở lượt so sánh trước lỗi tại `app/api/extract/route.ts:118` và cache `.next/types`; phải kiểm tra lại khi triển khai, không coi báo cáo STATUS là bằng chứng build sạch.

## 2. Hướng mỹ thuật đề xuất: một bộ sưu tập được tuyển chọn

Giữ nhận diện LIS đang có: nền Oat Milk #F8F6F0, chữ Espresso #18181B, Cherry #9A2C46 làm điểm nhấn. Ảnh sản phẩm quyết định màu trang; nền phụ trung tính không làm sai cảm nhận màu da. Cherry dành cho CTA/trạng thái chọn, không phủ mọi card.

Giữ Plus Jakarta Sans làm chữ chính, Cormorant Garamond italic chỉ cho một vài tiêu đề editorial. Đánh giá bỏ tải Space Grotesk nếu giá hiển thị đẹp bằng font chính; quyết định qua prototype và số byte thực tế. Không đổi font hàng loạt trước khi thử dấu tiếng Việt.

Desktop: container tối đa khoảng 1440px, lề 40–64px, khoảng cách giữa các chương 80–112px. Mobile: lề 20px, khoảng cách chương 48–64px, chữ nội dung 16px, tiêu đề 32–44px. Đây là token đề xuất, sẽ kiểm tra trên ảnh thật và màn hình 360px.

Ảnh packshot dùng nền thống nhất, tỷ lệ 4:5, object-fit contain và khoảng trống đủ cho quai túi. Ảnh lifestyle có thể cover với tiêu điểm theo từng file. Không dùng cùng crop cho mọi mẫu; charm cần crop và ảnh đeo kèm để hiểu kích thước thực.

## 3. Cấu trúc trải nghiệm

### Trang chủ

1. Header gọn: logo, Bộ sưu tập, Về LIS, tìm kiếm và giỏ. Tránh menu nhiều cấp khi chỉ có vài mẫu.
2. Hero: một mẫu chủ đạo, tên rõ, một câu giới thiệu ngắn, giá nếu đã xác thực, CTA “Khám phá [tên mẫu]”. Ảnh và CTA hiện ngay trong HTML, không chờ animation. Chọn mẫu chủ đạo theo chất lượng bộ ảnh và định hướng kinh doanh sau đối chiếu, chưa mặc định Mila là mẫu bán chạy.
3. Dải “Tất cả thiết kế”: liệt kê toàn bộ mẫu để người muốn mua nhanh tới được sản phẩm mà không phải cuộn hết câu chuyện.
4. Các chương sản phẩm: mỗi túi có ảnh chính lớn, một ảnh chi tiết/lifestyle phụ, tên, lợi ích đã kiểm chứng và swatch. Xen kẽ ảnh trái/phải ở desktop; mobile luôn ảnh → nội dung → màu → CTA.
5. Khu charm: hai mẫu có vị trí riêng, ảnh cận và ảnh phối túi. Không chỉ xuất hiện như món mua kèm ở cuối giỏ.
6. Khối chọn theo nhu cầu: thông tin sức chứa/kích thước đã xác nhận, dẫn đến 2–3 mẫu phù hợp. Nếu nguồn thiếu kích thước thì chưa xuất bản lời hứa đựng laptop/điện thoại.
7. Cam kết thật, thông tin liên hệ và footer. Chỉ hiển thị bảo hành, xuất xứ, đánh giá và giảm giá khi có nguồn.

Không biến trang chủ thành tám hero toàn màn hình liên tục. Chương sản phẩm có độ dài khác nhau theo chất lượng nội dung, nhưng mỗi mẫu đều có đủ tên, ảnh rõ, màu và đường vào PDP. Có liên kết xem toàn bộ ở đầu trang.

### Danh mục

Một trang “Tất cả thiết kế”, desktop 3 cột, tablet/mobile 2 cột khi vẫn đủ diện tích ảnh và vùng chạm. Ở 320–360px cần thử 1 cột hoặc giảm nội dung phụ thay vì thu nhỏ control. Chỉ dùng các bộ lọc có ích như Túi/Charm, màu; ẩn nhóm rỗng, không tạo nhiều trang danh mục chỉ có một mẫu.

Card có tên, giá thật, tên màu đang chọn, chấm màu và nút xem mẫu. Hover thay góc chụp cùng màu. Mobile không phụ thuộc hover. Quick add chỉ bật nếu biến thể đã được xác định đầy đủ; nếu còn size/màu bắt buộc thì mở bộ chọn ngắn.

### Trang chi tiết

Desktop chia khoảng 60% gallery / 40% mua hàng; khối mua hàng sticky trong giới hạn section. Mobile đưa tên, giá, gallery, màu và CTA lên trước mô tả dài. Gallery có vuốt ngang, nút trước/sau và số ảnh; không tự chạy.

Trình tự: tên + mô tả ngắn → ảnh đúng màu → giá/tình trạng → chọn màu → kích thước nếu có nhiều lựa chọn → thêm vào giỏ → kích thước/sức chứa → chất liệu/chăm sóc → giao nhận/đổi trả → phối charm.

Chọn màu cập nhật gallery, SKU, giá nếu khác, tình trạng và URL `?variant=<id>`. Link từ card phải giữ màu. Back/forward khôi phục trạng thái. Màu không tồn tại trong URL được xử lý có chủ đích, không làm crash trang. Màu hết hàng vẫn xem được nhưng CTA mua bị vô hiệu hóa và có giải thích.

CTA sticky xuất hiện khi CTA chính ra khỏi viewport (IntersectionObserver), biến mất khi drawer mở. Có khoảng đệm đáy và safe-area để không che nội dung trên điện thoại.

## 4. Art direction theo từng mẫu — dựa trên ảnh đã xem

| Mẫu | Điều cần làm nổi bật qua ảnh thật | Cấu trúc kể chuyện đề xuất | Hiệu ứng riêng và điều kiện |
|---|---|---|---|
| Mila | Đan nhỏ, ba cách đeo, bảng màu ấm | D2 làm editorial, D3/D4 cho màu còn lại; lấy packshot từ thư mục E3 tab ảnh | Tách ảnh và tiêu đề, reveal nhẹ; không animate ảnh D2 có chữ in sẵn bằng crop làm mất túi |
| Nina | Hobo đan, quai ngắn/dài, khóa nam châm | D5/D6/D7 là packshot; F5 là ba cách đeo; G5 chi tiết khóa; F7 sức chứa | Chọn “Cầm tay / Đeo vai / Đeo chéo” để đổi ảnh có sẵn; không dựng chuyển hình giả |
| Lucia Tote | Dáng tote cao, dây dài, đan nhỏ | D8/D9/D10 là lifestyle; D11 đen cần bản gốc | Ảnh lifestyle đứng cạnh thông số; chuyển màu giữ cùng tỷ lệ, không phóng ảnh 200px |
| Elena Tote | Đan bản lớn, đường quai liền, pouch | D12/D13 lifestyle; F12/G12 minh họa pouch và góc nhìn | Reveal túi chính rồi ảnh pouch độc lập; dùng ảnh riêng chất lượng cao thay phóng strip ghép |
| Lucky charm | Dây treo dài đồng màu, bề mặt và đường viền | D14/D15/D16 cùng bố cục, thuận lợi đổi màu | Lắc tối đa 3 độ một lần nếu cutout đã kiểm tra; chú trọng crossfade đồng vị trí |
| Mia Bag | Phom cong, khóa zip, chân đế và lòng túi | D17:D20 là bốn màu; F18/G18 mở túi; G19 chân đế | Hero màu Xanh bơ là điểm khác biệt; đổi góc “Bên trong / Đáy túi” sau xác minh màu ảnh phụ |
| Calla Bag | Đan bản lớn có mảng chất liệu khác nhau, phom dẹt | D21:D23 ba màu; bổ sung lifestyle từ tab ảnh E31 | Macro chuyển sang tổng thể trong section riêng; giữ hình dáng thật, không mesh warp |
| Lily Charm | Chi tiết tạo hình và phối màu | Ảnh cận → ảnh gắn túi | Nhấn chuyển màu; không dùng xoay 360° nếu thiếu ảnh đủ góc |

Lily: D24/D25/D26 là ba packshot 1350px đồng bố cục, có khoen vàng, khác dây dài của Lucky. Câu chuyện riêng là chi tiết hoàn thiện và cách gắn; cần ảnh phối túi để thể hiện tỷ lệ 6cm. Không gọi hoa chuông như local vì nguồn ghi hoa 5 cánh.

### Chọn ảnh và thứ tự triển khai

Đề xuất hero Mia Xanh bơ (D19): packshot 1800×1800 sắc nét, khác biệt với nền ấm; giữ một ảnh chính tải nhanh và swatch bốn màu. Mở đầu editorial phụ bằng Mila đỏ đô D2 để nối ngôn ngữ lookbook đang có. Đây là lựa chọn thiết kế, không phải khẳng định mẫu bán chạy.

Thứ tự chương đề xuất: Mia → Mila → Nina → Lucia/Elena (hai chương ngắn liền nhau để chọn tote) → Calla → Lucky và Lily. Dải tất cả thiết kế ở đầu trang bảo đảm các mẫu cuối không bị khó tìm.

Ảnh sẵn dùng để prototype: Mila D2:D4 (1366×2048 hoặc 2048²); Nina D5/D6/D7 (800², đủ card nhưng hạn chế zoom); Lucia D8:D10 (2048²); Elena D12/D13 (2048²); Lucky D14:D16 (1920²); Mia D17:D20 (1800²); Calla D21:D23 (800², cần bản gốc cho hero/zoom); Lily D24:D26 (1350²).

Ưu tiên ảnh bổ sung P0: Lucia đen D11 chỉ 200², phải tìm file gốc tại tab ảnh E20 hoặc chọn ảnh khác đúng màu; packshot thống nhất ba màu Mila tại E3; xác minh Nina nâu và ảnh phụ Mia. P1: ảnh macro đủ lớn cho Nina/Calla, ảnh pouch Elena tách riêng khỏi strip, ảnh phối từng charm. Có 35 ảnh nhúng nhưng không đồng nghĩa đủ 35 ảnh sản phẩm độc lập chất lượng cao.

Các ô nguồn tab “Hình ảnh” cho ảnh hiển thị đầu: Mila E2, Nina E10, Elena E16, Lucia E23, Mia E27, Calla E32; charm dùng thư mục E35. Khi sản xuất cần mở file gốc ở các link đó và so với ảnh nhúng trước chọn bản cuối. Chưa tuyên bố các thư mục Drive đã được kiểm kê.

## 5. Hợp đồng dữ liệu sản phẩm và màu

Product: id, slug, tên chuẩn, mô tả đã duyệt, category, thông số có nguồn, danh sách variantId, heroVariantId, editorialAssets và provenance (sheet/range/source).

Variant: id ổn định, productId, SKU, colorId, tên màu đúng nguồn, swatchHex phục vụ hiển thị, giá, tiền tệ VND, availability, size nếu có và danh sách ảnh. Chỉ ghi tồn kho bằng số khi có hệ thống cung cấp số thật. Trạng thái chưa biết không tự đổi thành còn hàng.

Asset: id, productId/variantId, vai trò front/back/detail/lifestyle, đường dẫn file, width/height, focal point, alt, nguồn và trạng thái đã kiểm tra. Ảnh dùng chung phải được đánh dấu rõ là ảnh minh họa chung; không giả là ảnh đúng màu.

Quy tắc chọn màu:

- Mặc định lấy heroVariantId hợp lệ; phản ánh chính xác trạng thái hàng.
- Click/tap xác nhận màu. Hover swatch không tự đổi biến thể đã chọn để tránh vô tình mua nhầm.
- Swatch có vùng chạm đề xuất 44×44 CSS px; vòng chọn và tên màu bằng chữ, hỗ trợ bàn phím và aria-pressed/radio semantics phù hợp.
- Feedback chọn có ngay; ảnh giữ nguyên khung tới khi ảnh mới decode xong, sau đó crossfade. Nếu lỗi tải, hiển thị trạng thái lỗi và giữ thao tác thử lại; không âm thầm gán ảnh màu khác.
- Xử lý thao tác đổi màu nhanh bằng token yêu cầu mới nhất để ảnh tải chậm không ghi đè lựa chọn sau.
- Thêm vào giỏ lưu variantId, SKU, tên màu và thumbnail chuẩn của variant, không lấy ảnh đang xem bất kỳ trong gallery.
- Giỏ cũ từ localStorage có migration/version; biến thể không còn tồn tại được báo rõ, không thay sản phẩm tự động.

## 6. Chuẩn hóa ảnh trước khi thiết kế chuyển động

Lập manifest ảnh theo sản phẩm × màu × góc chụp. Kiểm tra mở file thật, độ phân giải, dung lượng, file trùng, ảnh mờ, màu sai và quyền dùng ảnh. Giữ bản gốc; xuất derivative riêng. Không chỉnh màu túi bằng hue/CSS hoặc AI để tạo biến thể hàng thật.

Tối thiểu mỗi màu có một ảnh chính đúng màu. Mục tiêu mỗi mẫu có front, góc sau/cạnh, chi tiết, ảnh trên người/phối túi; chỉ yêu cầu chụp bổ sung khi nguồn thực sự thiếu. Với mỗi màu, ưu tiên bổ sung góc chính đồng nhất để chuyển swatch đẹp.

Quy ước file: `products/<product>/<variant>/<role>-<width>.<format>`. Sinh kích thước 320/480/640/960/1280/1600 theo nhu cầu thực, không upscale ảnh nhỏ. Dùng WebP/AVIF sau kiểm tra màu và chi tiết; chọn định dạng thực sự nhẹ hơn ở mức chất lượng chấp nhận được.

Google Drive/Sheets là nguồn biên tập, không là máy chủ ảnh khi khách truy cập. Nhập ảnh và metadata trước build; phục vụ derivative từ public/CDN phù hợp Cloudflare. Không chạy trích xuất Excel trong request mua hàng.

## 7. Đặc tả motion

| Tình huống | Đề xuất desktop | Mobile / reduced motion | Tiêu chí |
|---|---|---|---|
| Hero | Chữ phụ/chi tiết vào 400–600ms, translate 12px | Giảm còn fade hoặc tĩnh | Ảnh LCP và CTA có ngay, không opacity 0 chờ JS |
| Chương sản phẩm | Reveal 450–650ms, stagger 60ms, chạy một lần | Translate tối đa 8px; reduced motion tĩnh | Không bắt cuộn theo timeline |
| Swatch | Crossfade 160–220ms sau decode | Tương tự; reduced motion thay tức thì | Màu, ảnh, giá, CTA luôn đồng bộ |
| Hover card | Đổi góc cùng màu 180–250ms; scale ≤1.025 | Tap/controls rõ ràng, không hover | Không tải tất cả ảnh hover lúc đầu |
| Gallery | Swipe/snap và nút chuyển | Native scroll-snap | Không chặn cuộn dọc khi vuốt lệch |
| Thêm giỏ | Nút phản hồi ngay; drawer 220–280ms | Như desktop; reduced motion tức thì | Focus vào drawer, Escape đóng, trả focus |
| Charm | Dao động nhỏ một lần khi vào màn hình | Bỏ dao động | Không loop nền hoặc animation ở ngoài viewport |

CSS transform/opacity cho phần lớn hiệu ứng. Chỉ tải GSAP/ScrollTrigger ở section cần timeline; cleanup khi route đổi, dùng matchMedia cho breakpoint/reduced-motion. Không thêm smooth-scroll library, custom cursor hoặc video autoplay vào đường tải đầu. 360°/WebGL là phần mở rộng chỉ xem xét sau khi có dữ liệu ảnh và ngân sách đo được.

## 8. Ngân sách hiệu năng và cách đo

Các số sau là MỤC TIÊU nghiệm thu, chưa phải kết quả đo local:

- Dữ liệu người dùng thực ở percentile 75: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, phân tách mobile/desktop. Nguồn ngưỡng: https://web.dev/articles/vitals
- Lab trước phát hành: ít nhất 3 lần cold load mỗi template ở mobile throttling cố định, báo median và lần xấu nhất; lưu cấu hình mạng/CPU, version build và báo cáo. Lighthouse performance mục tiêu ≥90; không dùng điểm này thay cho INP thực địa.
- Mục tiêu truyền tải màn đầu mobile ≤700KB compressed gồm HTML, CSS, JS, font và ảnh cần thiết; ghi waterfall thực tế thay vì ước lượng từ file nguồn.
- Hero mobile mục tiêu ≤180KB, desktop ≤300KB; card ≤60KB, PDP ảnh đầu ≤200KB. Cho phép điều chỉnh nếu nén làm mất chi tiết, nhưng phải giữ tổng ngân sách và CWV.
- JavaScript route đầu mục tiêu ≤200KB gzip gồm framework; phần motion tăng thêm ≤30KB gzip. Nếu vượt, giảm module/tải chậm trước khi thêm hiệu ứng.
- Không tải gallery toàn bộ màu ở lần mở trang. Tải ảnh đang dùng và tối đa ảnh kế tiếp có nhu cầu; không preload hàng loạt theo mousemove. Ảnh ngoài màn hình lazy-load.
- Với Next.js 15 dùng Image sizes đúng bố cục, width/height hoặc aspect-ratio cố định; priority chỉ cho ảnh LCP. Kiểm tra optimizer/CDN trên bản Cloudflare preview, không giả định cấu hình local tương đương production. Nguồn: https://nextjs.org/docs/15/app/api-reference/components/image
- Kiểm tra performance trace lúc đổi màu, vuốt gallery, mở giỏ; mục tiêu phản hồi trực quan dưới 100ms, không long task >50ms do motion. Mạng chậm có loading state rõ ràng.

Khi vượt ngân sách: bỏ parallax và blur lớn → hoãn ảnh phụ/GSAP → tối ưu font và derivative → đo lại. Không giảm chức năng chọn màu, độ rõ giá hoặc khả năng truy cập để giữ hiệu ứng.

## 9. Trình tự triển khai và đầu ra từng giai đoạn

Ước lượng 9–13 ngày công khi có đủ dữ liệu/ảnh, chưa gồm chụp bổ sung và chờ phản hồi; cần điều chỉnh sau audit nguồn.

| Giai đoạn | Công việc cụ thể | Đầu ra / điều kiện chuyển bước | Ước lượng |
|---|---|---|---|
| 0. Nguồn | Đọc hai tab, đối chiếu 8 mẫu local, xem ảnh, lập danh sách màu/ảnh thiếu | Catalog + asset manifest có provenance; không còn thông tin giả định được ghi như sự thật | 1–2 ngày |
| 1. Thiết kế | Wireframe home/catalog/PDP, thử một túi nhiều màu và một charm, mẫu desktop/mobile | Storyboard và prototype đủ trạng thái chọn màu, lỗi ảnh, hết hàng, giỏ; chốt art direction | 1–2 ngày |
| 2. Nền dữ liệu | Variant schema, parser/import tách khỏi route, migration cart, sửa typecheck, derivative ảnh | Build sạch; kiểm tra mapping tất cả variant và file ảnh | 2 ngày |
| 3. Trải nghiệm | ProductChapter, VariantSelector, gallery, sticky buy, navigation giữ màu | Home + toàn bộ PDP hoạt động đúng trên mobile/desktop trước motion nâng cao | 2–3 ngày |
| 4. Motion | Tích hợp timeline chọn lọc, decode/crossfade, reduced-motion, responsive | Prototype đầy đủ motion có trace và không chặn nội dung | 1–2 ngày |
| 5. QA | Kiểm tra ảnh từng màu, bàn phím, mạng chậm, production build và Cloudflare preview | Biên bản nghiệm thu, báo cáo hiệu năng, danh sách lỗi đã xử lý | 2 ngày |

File dự kiến: `data/products-from-excel.ts` chuyển sang dữ liệu chuẩn có provenance; thêm module variant/asset; `components/product/product-card.tsx` sửa mapping và vùng chạm; tách PDP server shell và client purchase panel; `components/home` thêm các chương sản phẩm; `lib/store/cart-store.ts` thêm variantId và migration. Tên module cụ thể chốt khi triển khai, tránh thay toàn bộ dự án chỉ vì kế hoạch mới.

Không cần CMS lớn ở giai đoạn này. Quy trình cập nhật là nguồn → kiểm tra thay đổi → import có kiểm soát → build → preview → phát hành. Checkout thực tế là phạm vi riêng cần được xác định trước khi nhận đơn; không tuyên bố nút hiện tại đã thanh toán được.

## 10. Checklist nghiệm thu bắt buộc

- [ ] Danh sách sản phẩm và tên màu đối chiếu trực tiếp với nguồn; có tọa độ sheet/range hoặc liên kết asset.
- [ ] Tất cả mẫu có ảnh chính đủ tốt và nội dung riêng, không trùng ảnh sai sản phẩm.
- [ ] Mỗi swatch hiện đúng màu, gallery, trạng thái và SKU; đổi nhanh vẫn đúng.
- [ ] Card → PDP → giỏ → reload giữ cùng variant; giỏ cũ được xử lý rõ.
- [ ] Hết hàng, không có ảnh, lỗi mạng và URL variant sai đều có trạng thái đúng.
- [ ] Hover không đổi sang màu khác; mobile không cần hover để mua/xem màu.
- [ ] Kiểm tra 360/390/768/1024/1440px, zoom 200%, bàn phím và giảm chuyển động.
- [ ] Focus không bị sticky CTA che; swatch có nhãn; drawer có focus management; contrast nội dung đạt mục tiêu 4.5:1.
- [ ] Build/typecheck pass; asset references không 404; import không phụ thuộc file Excel nằm trên máy dev.
- [ ] Cloudflare preview được đo với cấu hình thật; CWV/lab và byte budgets có báo cáo, không chỉ screenshot đẹp.
- [ ] Những claim giá gạch, đánh giá sao, da Ý, bảo hành và sức chứa chỉ xuất hiện khi có chứng cứ.

## 11. Những quyết định đầu vào trước khi triển khai

Kế hoạch đã bao gồm catalog nguồn, đủ 25 tên màu, đánh giá 35 ảnh nhúng, hướng thiết kế riêng cho tám mẫu, hành vi biến thể, timeline motion, ngân sách hiệu năng và các bước nghiệm thu. Phần triển khai cần xác nhận giá/tồn kho/chính sách; xử lý các mâu thuẫn SKU, màu và sức chứa nêu tại mục 1; lấy ảnh gốc còn thiếu trước khi xuất bản. Những điểm này là đầu vào của giai đoạn 0, không ngăn việc chốt hướng thiết kế và làm prototype bằng ảnh đã có.

Kế hoạch ban đầu chỉ bao gồm thiết kế. Sau đó người dùng đã cho phép triển khai và push lên GitHub; ghi nhận triển khai bên dưới cập nhật phạm vi này.

Tham khảo motion: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/ — dùng media conditions và cleanup cho responsive/reduced-motion. Tra cứu skill UI/UX trả về hướng chung, chưa đủ phù hợp để thay brand master; kế hoạch giữ nhận diện hiện có và áp dụng nhận định thiết kế riêng đã ghi là đề xuất.

## 12. Ghi nhận triển khai — 03/10/2026

Đã triển khai catalog 8 mẫu/25 màu, homepage theo chương sản phẩm, bộ lọc, PDP giữ màu trong URL và danh sách lưu mẫu để tư vấn. Theo lựa chọn của người dùng, giá hiển thị “Liên hệ giá”; không nhận đơn/thanh toán khi chưa có dữ liệu. Thông tin chưa xác nhận được ẩn hoặc viết lại theo chứng cứ.

Ảnh nguồn chia theo `product-images/<slug>/<màu>/`, gồm 26 ảnh. Lucia Đen đã bổ sung ảnh gốc và góc chụp từ Drive. `npm run images:sync` tự tạo WebP responsive, cập nhật gallery và manifest; bước này chạy trước `npm run build` và `npm run build:worker`. Website không cần đọc workbook lúc chạy.

Build Next.js production thành công và tất cả tham chiếu ảnh tồn tại. First Load JS local: home 112 kB, PDP 115 kB. Các mục đo Cloudflare preview, Core Web Vitals và ngân sách truyền tải vẫn là việc chưa xác nhận; không coi build hoặc screenshot là bằng chứng đạt các mục tiêu đó. Chi tiết sử dụng và trạng thái hiện tại ở `README.md`, `product-images/README.md` và `STATUS.md`.
