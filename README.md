# LIS — Bộ sưu tập túi & charm

Website giới thiệu 8 mẫu LIS và 25 lựa chọn màu từ bảng `[LIS] Sản phẩm`. Khách có thể xem ảnh đúng màu, tìm kiếm, lọc bộ sưu tập và lưu mẫu để tư vấn. Giá hiện là **Liên hệ giá**; danh sách lưu chưa phải đơn hàng hay thanh toán.

## Thêm hoặc thay ảnh sản phẩm

Ảnh nguồn nằm trong **[`product-images/`](./product-images/README.md)**, chia theo mẫu và màu:

```text
product-images/
  mia-bag/
    avocado/
      01-front.jpg
      02-angle.jpg
      03-detail.jpg
```

1. Mở đúng thư mục mẫu/màu trong [bảng thư mục ảnh](./product-images/README.md).
2. Thay `01-front.jpg` hoặc thêm `02-angle.jpg`, `03-detail.jpg` của cùng màu. Hỗ trợ JPG, JPEG, PNG, WebP. Nếu đổi định dạng, xóa file ảnh cũ tương ứng.
3. Commit và push lên GitHub. Khi dịch vụ deploy chạy `npm run build` hoặc `npm run build:worker`, ảnh sẽ tự tối ưu sang WebP và gallery được cập nhật.

Không cần sửa code khi thêm/thay góc ảnh của màu đã có. Thêm sản phẩm hoặc màu mới cần cập nhật `data/catalog.json`. Push lên GitHub chỉ xuất bản website nếu dịch vụ hosting đã được cấu hình build/deploy từ Git.

## Chạy local

```bash
npm ci
npm run images:sync
npm run dev
```

Mở `http://localhost:3000`. Kiểm tra bản production bằng `npm run build`, rồi `npm start`. Kiểm tra kiểu dữ liệu bằng `npm run typecheck`.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `product-images/` | Ảnh gốc để thêm/thay và push |
| `public/images/catalog/` | Ảnh WebP responsive do script tạo |
| `data/catalog.json` | Sản phẩm, màu, ảnh, SKU và dữ liệu nguồn |
| `scripts/sync-product-images.mjs` | Tạo ảnh web và cập nhật gallery từ thư mục ảnh |
| `app/`, `components/` | Trang chủ, bộ sưu tập, chi tiết, tìm kiếm và danh sách lưu |
| `lib/store/` | Lưu mẫu/màu trong localStorage và chuyển dữ liệu giỏ cũ |
| `planning/source-audit/` | Đối chiếu dữ liệu và manifest ảnh |
| `planning/11-product-showcase-plan.md` | Kế hoạch và ghi nhận triển khai |

Stack: Next.js 15, React 19, Tailwind CSS 4, Zustand, Sharp. Giao diện dùng Manrope cho tiêu đề và Be Vietnam Pro cho nội dung, chuyển ảnh sau khi decode, gallery scroll-snap, drawer có quản lý focus và hỗ trợ giảm chuyển động.

Dữ liệu không có giá/tồn kho xác nhận. Chất liệu ghi theo nguồn là PU; không hiển thị giá giả, đánh giá giả hay cam kết da thật. SKU Nina Nâu Socola cần xác nhận nên được ẩn. Bản build local đã kiểm tra; chưa có báo cáo hiệu năng trên Cloudflare production.

## Giao diện cửa hàng (06/10/2026)

Trang chủ có hero Mia gọn, bộ lọc và lưới đủ 8 mẫu. Menu gồm Sản phẩm, Túi xách, Tote, Charm, Về LIS; dưới 1024px mở drawer. Mọi nút Liên hệ giá mở Facebook LIS trong tab mới. Sao chép nội dung tư vấn là thao tác riêng.

Logo gốc: brand-assets/lis/originals/. PNG web: public/brand/lis/. Tạo lại bằng node scripts/build-brand-assets.mjs. Cấu hình Facebook, menu và logo: data/site.ts. Hệ thống thiết kế hiện hành: design-system/lis/MASTER.md. Ghi nhận triển khai: planning/12-shop-redesign.md.