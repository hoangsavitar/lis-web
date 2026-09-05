# 6. Đặc tả Giao diện Lập trình Ứng dụng (API Specifications)

Tài liệu này quy định danh sách các Endpoints (Next.js Route Handlers) và Server Actions, bao gồm cấu trúc Request, Response, mã lỗi và các ràng buộc bảo mật.

---

## 1. Danh mục API Cốt lõi (Core Endpoints Matrix)

| Phương thức | Đường dẫn (Path) | Mục đích | Quyền truy cập | Phân kỳ triển khai |
|---|---|---|---|:---:|
| `GET` | `/api/products` | Lấy danh sách SP có lọc (màu, giá, dáng túi, sắp xếp, phân trang) | Public | **Phase 1** |
| `GET` | `/api/products/[slug]` | Lấy chi tiết 1 sản phẩm (kèm biến thể, tồn kho, ảnh) | Public | **Phase 1** |
| `GET` | `/api/collections/[slug]`| Lấy thông tin BST và danh sách sản phẩm bên trong | Public | **Phase 1** |
| `GET` | `/api/search/suggest` | Tìm kiếm gợi ý nhanh (autocomplete theo từ khóa) | Public | **Phase 1** |
| `POST`| `/api/cart/validate` | Kiểm tra tính khả dụng của tồn kho trong giỏ hàng | Public | **Phase 1** |
| `POST`| `/api/discounts/apply` | Kiểm tra và tính số tiền giảm của mã voucher | Public | *Phase 2* |
| `POST`| `/api/shipping/fee` | Tính phí vận chuyển theo Tỉnh/Thành từ GHN | Public | *Phase 2* |
| `POST`| `/api/checkout` | Tạo đơn hàng mới & sinh link/mã thanh toán VietQR | Public | *Phase 2* |
| `POST`| `/api/payments/payos-webhook` | Webhook nhận thông báo tiền đã vào từ PayOS | Webhook Secret | *Phase 2* |
| `GET` | `/api/orders/track` | Tra cứu hành trình đơn hàng bằng Mã đơn + SĐT | Public | *Phase 3* |
| `GET` | `/api/stores` | Danh sách showroom & tồn kho sản phẩm theo quận/huyện | Public | *Phase 3* |
| `POST`| `/api/gifts/create` | Tạo thiệp điện tử và sinh mã 6 số bí mật | Public | *Phase 3* |
| `GET` | `/api/gifts/open/[code]` | Mở phong bì thư điện tử bằng mã 6 số | Public | *Phase 3* |

---

## 2. Chi tiết Đặc tả Các Endpoints Trọng yếu

### 2.1. Lấy danh sách sản phẩm có bộ lọc (`GET /api/products`)
* **Query Parameters**:
  * `category`: Slug danh mục (vd: `tui-xach-tay`, `tui-tote`)
  * `collection`: Slug BST (vd: `bst-slaymotion`, `qua-tang`)
  * `colors`: Chuỗi các màu cách nhau dấu phẩy (vd: `den,kem,nau`)
  * `minPrice`: Giá thấp nhất (vd: `300000`)
  * `maxPrice`: Giá cao nhất (vd: `1000000`)
  * `sort`: `newest` | `price-asc` | `price-desc` | `best-selling`
  * `page`: Số trang (mặc định: `1`)
  * `limit`: Số sản phẩm mỗi trang (mặc định: `16`)
* **Response Thành công (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "prod_clx123",
        "name": "Túi Xách Tay Aura Size 18",
        "slug": "tui-xach-tay-aura-size-18",
        "skuCode": "TXT2512138",
        "price": 695000,
        "comparePrice": 993000,
        "discountPercentage": 30,
        "mainImage": "https://cdn.lisbylii.com/products/aura-mint-1.webp",
        "hoverImage": "https://cdn.lisbylii.com/products/aura-mint-2.webp",
        "isNew": true,
        "colorSwatches": [
          { "name": "Xanh Mint", "hex": "#94BAA2", "imageUrl": null },
          { "name": "Kem", "hex": "#FAF9F6", "imageUrl": null },
          { "name": "Đen", "hex": "#1E1E1E", "imageUrl": null }
        ]
      }
    ],
    "pagination": {
      "totalItems": 48,
      "totalPages": 3,
      "currentPage": 1,
      "limit": 16
    },
    "availableFacets": {
      "colors": [
        { "name": "Đen", "count": 22 },
        { "name": "Kem", "count": 18 },
        { "name": "Xanh Mint", "count": 7 }
      ],
      "priceRange": { "min": 290000, "max": 1850000 }
    }
  }
}
```

---

### 2.2. Tạo Đơn hàng & Sinh VietQR (`POST /api/checkout`)
* **Request Body**:
```json
{
  "customer": {
    "fullName": "Nguyễn Mai Anh",
    "phone": "0987654321",
    "email": "maianh@gmail.com"
  },
  "shippingAddress": {
    "province": "Hà Nội",
    "district": "Quận Cầu Giấy",
    "ward": "Phường Dịch Vọng Hậu",
    "street": "Số 18 Duy Tân, Tòa nhà FPT"
  },
  "items": [
    {
      "variantId": "var_aura_mint_18",
      "quantity": 1
    }
  ],
  "discountCode": "LISNEW10",
  "paymentMethod": "VIETQR", // "COD" | "VIETQR" | "VNPAY"
  "customerNotes": "Giao giờ hành chính giúp mình",
  "giftMessage": {
    "senderName": "Hoàng",
    "receiverName": "Mai Anh",
    "message": "Chúc em tuổi mới luôn rực rỡ và xinh đẹp!"
  }
}
```

* **Response Thành công (`201 Created`)**:
```json
{
  "success": true,
  "data": {
    "orderCode": "LIS-260905-9988",
    "totalAmount": 655500,
    "paymentMethod": "VIETQR",
    "paymentStatus": "UNPAID",
    "vietQr": {
      "qrCodeUrl": "https://img.vietqr.io/image/MB-0988888888-compact2.png?amount=655500&addInfo=LIS2609059988&accountName=LIS%20BY%20LII",
      "accountNumber": "0988888888",
      "accountName": "LIS BY LII",
      "bankName": "MBBank",
      "amount": 655500,
      "transferContent": "LIS2609059988"
    },
    "giftSecretCode": "582913",
    "estimatedDelivery": "1-2 ngày làm việc"
  }
}
```

---

### 2.3. Webhook Nhận tiền PayOS (`POST /api/payments/payos-webhook`)
* **Cơ chế**: Cổng PayOS gửi tín hiệu HTTPS POST khi tài khoản ngân hàng nhận đúng số tiền và nội dung chuyển khoản.
* **Xác thực**: Kiểm tra chữ ký HMAC SHA256 dựa trên `PAYOS_CHECKSUM_KEY`.
* **Xử lý nghiệp vụ**:
  1. Trích xuất mã đơn hàng từ `description` / `transferContent`.
  2. Cập nhật trạng thái đơn: `paymentStatus = PAID`, `status = CONFIRMED`.
  3. Ghi log vào bảng `OrderStatusHistory`: "Khách thanh toán thành công qua chuyển khoản VietQR".
  4. Bắn thông báo Zalo ZNS hoặc SMS tự động cho khách: "Đơn hàng #LIS-260905-9988 của bạn đã được thanh toán thành công!".
* **Response**:
```json
{
  "success": true,
  "message": "Webhook processed successfully"
}
```

---

### 2.4. Tra cứu đơn hàng thời gian thực (`GET /api/orders/track`)
* **Query Parameters**: `orderCode=LIS-260905-9988` & `phone=0987654321` (bắt buộc cả 2 để bảo mật thông tin đơn hàng).
* **Response**:
```json
{
  "success": true,
  "data": {
    "orderCode": "LIS-260905-9988",
    "createdAt": "2026-09-05T14:30:00Z",
    "status": "SHIPPING",
    "statusLabel": "Đang giao hàng",
    "recipient": "Nguyễn Mai Anh - 098****321",
    "address": "Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội",
    "shippingProvider": "Giao Hàng Nhanh (GHN)",
    "trackingCode": "GHN88492041",
    "timeline": [
      { "time": "2026-09-05 14:30", "title": "Đặt hàng thành công", "desc": "Đã ghi nhận đơn hàng" },
      { "time": "2026-09-05 14:35", "title": "Đã thanh toán VietQR", "desc": "Đã nhận 655.500₫ qua MBBank" },
      { "time": "2026-09-05 16:00", "title": "Đã đóng gói hộp quà", "desc": "Kiểm tra chất lượng & in thiệp đính kèm" },
      { "time": "2026-09-05 18:20", "title": "Bưu tá đã lấy hàng", "desc": "Đơn hàng đang trung chuyển tại bưu cục Cầu Giấy" }
    ]
  }
}
```
