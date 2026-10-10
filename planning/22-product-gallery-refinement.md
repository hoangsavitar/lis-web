# LIS — Gallery sản phẩm

## Hiện trạng và quyết định

Ảnh người dùng gửi là Irisa Bag màu Hồng, 7 ảnh, khung vuông. Cụm mũi tên và bộ đếm dưới ảnh tạo thêm một hàng trước thumbnail, khiến điều hướng rời khỏi nội dung.

Đã xem trực tiếp các trang sản phẩm công khai:
- Polène: https://www.polene-paris.com/products/numero-neuf-mini-merino-stone — ảnh lớn chiếm vùng chính, phần thông tin mua tách bên phải.
- CHARLES & KEITH: https://www.charleskeith.com/us/CK2-20782904-1_STO.GR.html — thumbnail dọc bên trái ảnh chính.

LIS giữ ảnh thật 1:1, font, màu, nội dung và URL đang có. Điều chỉnh dùng chung cho gallery PDP:
- Thumbnail dọc từ 1024px; ngang dưới ảnh trên tablet/mobile.
- Mũi tên chevron 44px nằm trong ảnh, bộ đếm nhỏ ở góc dưới phải. Bỏ hàng điều hướng riêng.
- Thumbnail chọn dùng một nét tối bên dưới, hover tăng độ rõ, focus bàn phím độc lập.
- Cuộn riêng dải thumbnail để ảnh đang chọn luôn nằm trong vùng nhìn thấy.
- Giữ vuốt, phím mũi tên/Home/End, giảm chuyển động và reset ảnh khi đổi màu.
- Tách `ProductGallery` khỏi thông tin mua để cùng giao diện áp dụng cho mọi sản phẩm.

## Kiểm chứng

Typecheck và 6 kiểm tra hồi quy lưu mẫu/lọc màu đã đạt. Các kiểm tra này không chứng minh tương tác gallery hoặc bố cục đã được thử trong browser. Truy cập localhost qua công cụ browser vẫn bị chặn từ lần kiểm tra trước; không đổi công cụ hoặc đường truy cập để vượt chặn. Đối chiếu bố cục với ảnh người dùng và kiểm tra mã nguồn, sau đó build bản production riêng để người dùng xem.

Production build cuối cùng đã đạt với `LIS_BUILD_DIR=.next-lis-preview`, bao gồm bản sửa chặn timer cuộn cũ khi chọn liên tiếp. Đồng bộ ảnh vẫn là 11 sản phẩm, 32 màu, 84 ảnh. Bản xem chạy tại `http://localhost:3001/products/irisa-bag?variant=irisa-bag-pink`.
