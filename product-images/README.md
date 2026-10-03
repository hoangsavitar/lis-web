# Thư mục ảnh sản phẩm LIS

Bạn thêm hoặc thay ảnh tại `product-images/<san-pham>/<mau>/`, rồi commit và push lên GitHub.

- `01-front.jpg`: ảnh hiển thị đầu tiên.
- `02-angle.jpg`, `03-detail.jpg`, `04-lifestyle.jpg`: các ảnh tiếp theo của **cùng màu**.
- Hỗ trợ JPG, JPEG, PNG và WebP; sắp xếp theo tên file. Không để ảnh màu khác vào cùng thư mục.
- Nếu đổi định dạng, xóa file đầu cũ để tránh hai ảnh `01-front` cùng xuất hiện.
- Giữ tên thư mục như bảng bên dưới; tên màu hiển thị vẫn là tiếng Việt.

Khi build qua `npm run build` hoặc `npm run build:worker`, ảnh sẽ được tự tối ưu sang WebP và gallery được cập nhật. Build cần chạy trên dịch vụ deploy sau khi push; push GitHub riêng không tự xuất bản website nếu chưa có CI/deploy.

Kiểm tra local: `npm run images:sync`, rồi `npm run dev`. Không phải chỉnh code khi chỉ thêm/thay góc ảnh. Khi thêm sản phẩm hoặc màu mới cần cập nhật catalog trước.

| Mẫu | Màu hiển thị | Thư mục thêm ảnh |
|---|---|---|
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
