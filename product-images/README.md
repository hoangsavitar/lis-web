# Thư mục ảnh sản phẩm LIS

Bạn thêm hoặc thay ảnh tại `product-images/<san-pham>/<mau>/`, rồi commit và push lên GitHub.

- Ảnh cũ như `01-front.jpg` đã được phân loại trong `data/product-media.json`; có thể thay ảnh cùng loại ngay tại file đó.
- Ảnh mới đặt tên `02-packshot.jpg` (túi chụp riêng), `03-lifestyle.jpg` (mẫu đeo/cầm đúng màu), `04-detail.jpg` (cận cảnh). Số thứ tự có thể thay đổi; tên phải chứa loại ảnh.
- Nếu dùng tên khác, khai báo `sourceFile` và `kind` trong `data/product-media.json`; file chưa phân loại sẽ báo lỗi khi sync.
- Card ưu tiên packshot. Hover ưu tiên ảnh lifestyle khác góc cùng màu; nếu chưa có thì dùng packshot góc khác, như Lucia Tote Đen. Desktop hover và mobile vuốt tự bật khi có ảnh thứ hai hợp lệ; ảnh detail dành cho gallery trang sản phẩm.
- Hỗ trợ JPG, JPEG, PNG và WebP; sắp xếp theo tên file. Không để ảnh màu khác vào cùng thư mục.
- Nếu đổi định dạng, xóa file đầu cũ để tránh hai ảnh `01-front` cùng xuất hiện.
- Giữ tên thư mục như bảng bên dưới; tên màu hiển thị vẫn là tiếng Việt.

Khi build qua `npm run build` hoặc `npm run build:worker`, ảnh sẽ được tự tối ưu sang WebP và gallery được cập nhật. Build cần chạy trên dịch vụ deploy sau khi push; push GitHub riêng không tự xuất bản website nếu chưa có CI/deploy.

Kiểm tra local: `npm run images:sync`, rồi `npm run dev`. Không phải chỉnh code khi chỉ thêm/thay góc ảnh. Khi thêm sản phẩm hoặc màu mới cần cập nhật catalog và nguồn import tương ứng trước. Irisa/Dalia/Lilia được giữ tại `data/additional-products.json`, luôn ghép phía trước catalog XLSX khi import rồi sync ảnh.

Thư viện hiện có 11 mẫu/32 màu/84 ảnh. Toàn bộ 36 ảnh của ba ZIP mới được giữ nguyên byte tại bảy thư mục đầu bảng; `planning/source-audit/new-product-images.json` lưu archive/entry/sourceFile/sha256. Bảy màu mới có packshot/lifestyle thật đúng màu; ảnh chi tiết và thông số chỉ dùng trong gallery.

| Mẫu | Màu hiển thị | Thư mục thêm ảnh |
|---|---|---|
| Irisa Bag | Hồng | [irisa-bag/pink](./irisa-bag/pink/) |
| Irisa Bag | Be | [irisa-bag/beige](./irisa-bag/beige/) |
| Dalia Bag | Hồng | [dalia-bag/pink](./dalia-bag/pink/) |
| Dalia Bag | Be | [dalia-bag/beige](./dalia-bag/beige/) |
| Dalia Bag | Xanh | [dalia-bag/mint](./dalia-bag/mint/) |
| Lilia Bag | Trắng | [lilia-bag/white](./lilia-bag/white/) |
| Lilia Bag | Đen | [lilia-bag/black](./lilia-bag/black/) |
| Mila | Đỏ đô | [mila-bag/burgundy](./mila-bag/burgundy/) |
| Mila | Nâu đất | [mila-bag/earth](./mila-bag/earth/) |
| Mila | Be sữa | [mila-bag/milk](./mila-bag/milk/) |
| Nina | Đỏ burgundy | [nina-bag/burgundy](./nina-bag/burgundy/) |
| Nina | Nâu Socola | [nina-bag/chocolate](./nina-bag/chocolate/) |
| Nina | Be sữa | [nina-bag/milk](./nina-bag/milk/) |
| Lucia Tote | Nâu Socola | [lucia-tote/chocolate](./lucia-tote/chocolate/) |
| Lucia Tote | Be sữa | [lucia-tote/milk](./lucia-tote/milk/) |
| Lucia Tote | Nâu đất | [lucia-tote/earth](./lucia-tote/earth/) |
| Lucia Tote | Đen | [lucia-tote/black](./lucia-tote/black/) |
| Elena Tote | Nâu | [elena-tote/brown](./elena-tote/brown/) |
| Elena Tote | Đen | [elena-tote/black](./elena-tote/black/) |
| Lucky charm | Nâu | [lucky-charm/brown](./lucky-charm/brown/) |
| Lucky charm | Đỏ | [lucky-charm/red](./lucky-charm/red/) |
| Lucky charm | Be | [lucky-charm/beige](./lucky-charm/beige/) |
| Mia Bag | Be | [mia-bag/beige](./mia-bag/beige/) |
| Mia Bag | Nâu | [mia-bag/brown](./mia-bag/brown/) |
| Mia Bag | Xanh bơ | [mia-bag/avocado](./mia-bag/avocado/) |
| Mia Bag | Đỏ | [mia-bag/red](./mia-bag/red/) |
| Calla Bag | Xanh rêu | [calla-bag/moss](./calla-bag/moss/) |
| Calla Bag | Nâu | [calla-bag/brown](./calla-bag/brown/) |
| Calla Bag | Đen | [calla-bag/black](./calla-bag/black/) |
| Lily Charm | Nâu | [lily-charm/brown](./lily-charm/brown/) |
| Lily Charm | Đỏ | [lily-charm/red](./lily-charm/red/) |
| Lily Charm | Be | [lily-charm/beige](./lily-charm/beige/) |

Ảnh tối ưu để website tải nằm trong `public/images/catalog/`. Đây là đầu ra tự tạo; thay ảnh nguồn ở thư mục này (`product-images`) thay vì sửa từng kích thước trong `public`.

`product-images/` và các WebP phục vụ web đều được đưa lên Git. Bộ ảnh photoshoot/lookbook chưa chọn và ZIP gốc được giữ local theo `.gitignore`; không cần chúng để build từ bản clone. Ba logo nguyên bản và ảnh banner vẫn được đưa lên Git. Các file `.webp.json` bên cạnh WebP là metadata tự tạo khi sync, không cần commit.

## Lookbook Mia / Calla

Hai ZIP lookbook có 25 ảnh riêng sau khi bỏ bản sao. Bản gốc nằm ở `brand-assets/lis/lookbook/mia-calla/originals/`. Đã chọn 12 ảnh đúng dáng và màu cho 4 màu Mia và 3 màu Calla; `02-lifestyle.jpg` là ảnh hover, các góc khác và ảnh chi tiết dùng trên trang sản phẩm. Ảnh nguồn phục vụ web được xoay theo EXIF, thu nhỏ tối đa 2400px, giữ nguyên nội dung ảnh.

Danh sách đối chiếu, nguồn ZIP và SHA256 nằm trong `planning/source-audit/mia-calla-lookbook.json`. Những ảnh Nina và ảnh không chọn vẫn được giữ trong thư viện gốc, không gán vào Mia/Calla.

## Hover Mila / Lucia / Elena

Đã thêm 7 ảnh người mẫu khác góc, đúng màu từ `PTS Lis Bag/`: Mila Đỏ đô/Nâu đất/Be sữa; Elena Nâu/Đen; Lucia Nâu Socola/Be sữa. Khi chưa có packshot, card giữ ảnh lifestyle đầu và preview ảnh lifestyle tiếp theo. Không ép ảnh người mẫu thành packshot. Lucia Đen/Nâu đất vẫn chưa có ảnh lifestyle khác góc phù hợp. Nguồn gốc ảnh ghi tại `planning/source-audit/photoshoot-hover-import.json`.

Nina cũng có hover ở cả 3 màu: Đỏ burgundy (`Lis 00855 copy.jpg`), Nâu Socola (`Lis 00971 copy.jpg`), Be sữa (`Lis 00880 copy.jpg`). Các ảnh được đối chiếu theo phom, quai và màu với packshot hiện có.
