---
name: LIS
description: Giao diện cửa hàng túi xách, tote và charm LIS.
colors:
  brand: "#630d1a"
  brand-hover: "#460915"
  paper: "#f8f6f1"
  surface: "#ffffff"
  ink: "#222220"
  muted: "#62625c"
  line: "#deded6"
  focus: "#46535a"
  soft-hover: "#eeeee8"
  footer: "#242622"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "64px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Be Vietnam Pro, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "Be Vietnam Pro, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Be Vietnam Pro, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
  navigation-label:
    fontFamily: "Be Vietnam Pro, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.65
  caption:
    fontFamily: "Be Vietnam Pro, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  compact: "6px"
  control: "8px"
  image: "12px"
  feature-image: "16px"
  pill: "24px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  content: "20px"
  lg: "24px"
  xl: "32px"
  section-inset: "40px"
  section: "48px"
  wide: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  button-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "56px"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation-label}"
    height: "44px"
  category-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 20px"
    height: "44px"
  category-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  color-swatch:
    backgroundColor: "transparent"
    rounded: "{rounded.control}"
    width: "44px"
    height: "44px"
  campaign-action:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "2px"
    padding: "12px 22px"
    height: "48px"
  campaign-mobile-copy:
    backgroundColor: "#efd2cf"
    textColor: "{colors.brand}"
    typography: "{typography.headline}"
    padding: "22px 24px 28px"
  product-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  card-contact:
    textColor: "{colors.brand}"
    typography: "{typography.label}"
    height: "44px"
  product-image:
    rounded: "{rounded.image}"
---

# Design System: LIS

## Overview

**Creative North Star: "Cửa hàng LIS"**

Hệ thống hiện có dành phần lớn diện tích cho ảnh túi và charm thật. Nền kem, mặt trắng, chữ tối và đỏ lấy từ logo tạo một cửa hàng nhẹ, dễ đọc và dễ xem màu sản phẩm. Đây là bản ghi từ giao diện đã triển khai, dựa vào app/globals.css, app/layout.tsx và các thành phần cửa hàng.

Giữ logo được người dùng cung cấp, Manrope cho tiêu đề và Be Vietnam Pro cho nội dung tiếng Việt. Nội dung và thao tác đi cùng ảnh, với vùng bấm đủ lớn và trạng thái chọn màu rõ ràng. Các cấu trúc chiến dịch riêng được ghi ở hợp đồng bề mặt; chúng không thay thế hệ thống cửa hàng chung.

**Key Characteristics:**
- Ảnh sản phẩm thật và màu đang chọn dẫn trải nghiệm.
- Nền kem, mặt trắng, chữ tối và đỏ thương hiệu dùng tiết chế.
- Tiêu đề Manrope 600, nội dung Be Vietnam Pro dễ đọc tiếng Việt.
- Bố cục thoáng, điều khiển có focus rõ và vùng bấm từ 44px.

## Colors

Bảng màu trung tính ấm làm nền cho ảnh, với đỏ thương hiệu ở các hành động liên hệ và dấu nhận diện. Frontmatter giữ giá trị chuẩn; các tên dưới đây mô tả vai trò của chúng.

### Primary
- **Đỏ LIS** — brand: logo đỏ, nút chính, liên kết tư vấn, số mẫu đã lưu và vùng chọn văn bản.
- **Đỏ LIS đậm** — brand-hover: hover nút chính.

### Neutral
- **Kem giấy** — paper: nền trang và drawer.
- **Trắng** — surface: trường tìm kiếm, nút sáng và mặt điều khiển nổi trên ảnh.
- **Mực tối** — ink: nội dung, tiêu đề và chip danh mục được chọn.
- **Xám chữ phụ** — muted: mô tả, ghi chú ảnh và số kết quả.
- **Xám viền** — line: ranh giới điều khiển, mục lưu, bảng thông số và header trắng.
- **Xám xanh focus** — focus: vòng focus trên bề mặt sáng.
- **Xám hover nhẹ** — soft-hover: hover nút biểu tượng và nút phụ.
- **Nền footer tối** — footer: vùng cuối trang, đi với logo và chữ sáng.

Nền hồng của Dearly nằm ở component campaign-mobile-copy; đây là màu bề mặt riêng cho banner đã được người dùng cung cấp, không phải accent mới của toàn website.

### Named Rules
**The Logo Source Rule.** Dùng bản logo có alpha trong public/brand/lis/, xuất từ logo người dùng; không dựng lại chữ LIS bằng font.

## Typography

**Display Font:** Manrope, fallback sans-serif.
**Body Font:** Be Vietnam Pro, fallback sans-serif.

**Character:** Tiêu đề chắc và gọn, nội dung mềm và có khoảng dòng cho dấu tiếng Việt. next/font tải Manrope 600 và Be Vietnam Pro 400/500/600 với subset tiếng Việt; tiêu đề thường không nghiêng.

### Hierarchy
- **Display:** tiêu đề trang Về LIS (64px desktop, 48px dưới 1024px, 40px dưới 768px).
- **Headline:** tiêu đề mục (36px desktop, 28px với line-height 1.35 dưới 768px).
- **Title:** tên sản phẩm trên card (22px, line-height 1.4; 18px dưới 768px); drawer dùng 28px.
- **Body:** nội dung trang (18px, line-height 1.65; 16px dưới 1024px). Mô tả dài ở PDP dùng line-height 1.75.
- **Body small:** nội dung điều khiển và phần giải thích (16px, line-height 1.7 khi là đoạn văn).
- **Label:** nút và liên kết hành động (16px, weight 500, line-height 1.5).
- **Navigation label:** menu desktop và tư vấn header (16px, weight 500, line-height kế thừa 1.65).
- **Caption:** tên màu trên card (14px, line-height 1.7), ghi chú và số kết quả (14px, line-height 1.65).

### Named Rules
**The Vietnamese Type Rule.** Giữ cặp font có subset tiếng Việt; không thay hệ tiêu đề hoặc dùng nhãn tiếng Anh viết hoa để thêm điểm nhấn.

## Layout

Các trang bộ sưu tập, PDP và Về LIS có container tối đa 1360px. Insets thông thường là 40px desktop, 24px dưới 1024px và 20px dưới 768px; dưới 360px bộ sưu tập/PDP giảm còn 16px. Header dùng container 1440px.

Lưới bộ sưu tập là 4 cột từ 1200px, 3 cột từ 768px đến 1199px, 2 cột từ 360px đến 767px và 1 cột dưới 360px. Khoảng cách desktop là 36px theo hàng, 20px theo cột; mobile là 28px và 14px. Card để nội dung mở trên nền trang, giữ ảnh vuông 1:1. Gallery PDP cũng dùng khung 1:1 và contain để thấy trọn ảnh thật, kể cả ảnh mẫu đeo dọc. Từ 1024px, thumbnail 72px nằm dọc bên trái; dưới 1024px nằm ngang dưới ảnh, cuộn trong dải riêng. Ảnh được chọn có nét tối 2px bên dưới và độ sáng đầy đủ, không có khung bao quanh. Mũi tên trước/tiếp theo có vùng bấm 44px nằm trong ảnh lớn; bộ đếm 14px ở góc dưới phải. Không có hàng điều hướng riêng dưới ảnh. Thumbnail hỗ trợ bốn phím mũi tên/Home/End, focus trung tính; chọn ảnh không cuộn cả trang. Đổi màu tạo lại gallery từ ảnh đầu tiên, vuốt ảnh vẫn dùng scroll-snap và chuyển ảnh tôn trọng reduced motion.

Trang chủ hiện tại dùng hai nhóm card, nhóm đầu 4 mẫu và nhóm sau 7 mẫu: 4 cột từ 1200px, 2 cột từ 360px đến 1199px và 1 cột dưới 360px. Gap desktop là 32px theo hàng và 24px theo cột; mobile là 28px và 14px. Các nhóm có max-width 1360px, padding 64px 40px 72px desktop, 48px 24px dưới 1024px và 40px 20px dưới 768px. Khoảng nghỉ editorial dùng mặt trắng, hai ảnh lệch nhịp 5:7, cách nhau 40px, ảnh thứ hai hạ 48px; dưới 768px chuyển thành một cột. Đây là cấu trúc bề mặt hiện tại trong .impeccable/surfaces/app-page-tsx.md, không phải bố cục bắt buộc cho mọi trang.

Header có nội dung tối thiểu 80px desktop, 72px dưới 1024px. Ở đầu trang chủ, header phủ lên ảnh với nền trong suốt, chữ ink và logo đỏ; sau khi scrollY lớn hơn 24px, header trở về mặt trắng gần đục với viền line. Menu chuyển sang drawer dưới 1024px hoặc khi container nhỏ hơn 55em, để menu vẫn vừa khi chữ lớn. Footer giảm từ 3 cột xuống 2 cột và sau đó 1 cột. PDP từ hai cột về một cột dưới 768px. Khoảng cách dùng chủ yếu các bước 8/12/16/20/24/32/40/48/64px đã ghi ở frontmatter.

## Elevation & Depth

Trang và card phẳng ở trạng thái thường; màu nền, khoảng cách và ảnh tạo cấu trúc. Shadow nhẹ chỉ phục vụ nút lưu trên ảnh, thanh chọn cố định, popover màu và drawer. Không chuyển shadow của lớp phủ thành shadow cho mọi card.

### Shadow Vocabulary
- **Nút lưu trên ảnh** (0 1px 3px #0000000c): tách nút tròn khỏi ảnh sản phẩm.
- **Popover màu** (0 10px 30px #2222201a): báo lớp nổi cạnh bộ lọc.
- **Drawer** (-10px 0 50px #0002): tách panel bên phải khỏi nội dung nền.
- **Thanh chọn cố định** (0 -4px 24px #00000008): phân cách thao tác PDP ở đáy màn hình.

### Named Rules
**The Overlay Depth Rule.** Dùng độ nổi cho điều khiển che lên nội dung; card sản phẩm giữ nền mở và không có hộp shadow.

Chuyển trạng thái thường từ 160–250ms, gồm màu hover và xoay caret. Card có cặp ảnh hợp lệ crossfade opacity 180ms ease-out; ảnh card không phóng khi hover. prefers-reduced-motion bỏ animation/transition và chuyển scroll về auto; chọn ảnh card dùng cuộn tức thì.

## Shapes

Nút chính, trường nhập và ảnh thu nhỏ dùng góc mềm của token control. Ảnh card và gallery dùng token image; ảnh trang Về LIS dùng feature-image. Chip danh mục và bộ lọc màu có dáng viên thuốc; nút biểu tượng và chấm màu tròn. Card sản phẩm không thêm viền hoặc nền hộp bao quanh thông tin. Không áp radius của ảnh cho toàn bộ bề mặt chiến dịch.

## Components

### Buttons
Nút rõ, dễ đọc, kích thước ổn định. Nút chính dùng brand/surface, nút phụ trong suốt với viền line, nút sáng dùng surface/ink. Cả ba có góc control, padding 12px 22px và min-height 48px. Hover nút chính dùng brand-hover; nút phụ dùng soft-hover. Focus là outline 2px, offset 4px; trong footer tối outline chuyển sang màu sáng #e7e8e1. Disabled có opacity 0.5 và cursor not-allowed. Nút biểu tượng là vòng tròn 44px.

### Chips
Chip danh mục có min-height 44px, padding 9px 20px và viền line. Chọn chuyển sang ink/surface qua aria-pressed; hover không chọn là nền xám nhẹ. Mobile giảm padding ngang còn 14px. Nút tìm kiếm gợi ý dùng cùng dáng viên thuốc.

### Cards / Containers
Ảnh vuông 1:1 có góc image, nền nhạt #eeede8; packshot dùng contain, lifestyle dùng cover tại 50% 100% để ưu tiên chiếc túi. Phần chữ cách ảnh 12px, không có mô tả dài hoặc số lượng màu. Tên dùng title; swatch và tên màu 14px đi trước liên kết Hỏi giá 16px. Liên kết thường không gạch dưới, hover mới gạch dưới; vẫn có vùng bấm 44px. Nút lưu 44px luôn hiện ở góc ảnh, có nền trắng gần đục. Tim có trạng thái aria-pressed và fill khi đã lưu; bấm lần nữa bỏ lưu đúng màu, không tự mở drawer hay tăng số lượng. PDP và thanh cố định dùng cùng thành phần lưu mẫu. Dữ liệu lưu và số lượng cũ được giữ nguyên. Tên và ảnh mở sản phẩm cùng variant đang chọn; swatch chỉ đổi variant khi chọn.

Bộ lọc catalogue dùng URL danh mục và tham số `color`, để liên kết, reload và lịch sử điều hướng giữ cùng lựa chọn. Màu không thuộc danh mục quay về Tất cả màu. Tiêu đề phản ánh danh mục hiện tại. Ảnh trong drawer lưu giữ khung 1:1 và tải từ bộ WebP responsive sẵn có. Khi đổi asset, trạng thái tải/lỗi tạo lại theo URL ảnh, không hiển thị ảnh màu cũ dưới tên màu mới.

Media chọn packshot làm primary, rồi lifestyle hoặc ảnh thật đầu tiên nếu chưa có packshot. Secondary ưu tiên lifestyle khác primary; nếu chưa có thì lấy packshot góc khác cùng variant, như Lucia Tote Đen. Không dùng detail làm hover. Ảnh secondary giữ đúng phân loại để packshot được contain, không cắt phom; nhãn trên touch là Ảnh mẫu đeo hoặc Ảnh góc khác theo loại ảnh. Secondary được decode khi card đến gần viewport (rootMargin 200px); lỗi tải giữ primary. Desktop hover/focus link primary crossfade sang secondary trong 180ms; touch dùng hai ảnh scroll-snap, vuốt không mở nhầm PDP, có hai nút chấm 44px và phím mũi tên. Khi đổi variant, media được tạo lại để reset ảnh. Không thêm secondary sai màu để tạo hiệu ứng. Catalog hiện có 27 packshot, 29 lifestyle và 6 detail; bảy màu Irisa/Dalia/Lilia có cặp thật cùng variant và bật hover/swipe hai ảnh. 25 màu cũ vẫn thiếu cặp, trong đó 8 variant thiếu packshot. Danh sách thiếu ảnh nằm trong planning/source-audit/product-media-gaps.json.

### Inputs / Fields
Trường tìm kiếm là mặt trắng, viền #aaa9a1 và góc control, padding ngang 14px. Input không có viền riêng, min-height 56px, chữ 16px. Focus-within đặt outline focus 2px và offset 3px quanh cả trường. Không ghi nhận thêm một hệ màu lỗi cho các form chưa có trong giao diện.

### Navigation
Menu desktop dùng navigation-label và vùng bấm từ 44px; hover/trang hiện tại có gạch dưới, offset 7px. Logo giữ tỷ lệ gốc. Drawer mobile dùng hàng cao tối thiểu 64px, chữ 20px và viền line; dialog quản lý Escape, focus và khóa cuộn nền. Facebook mở tab mới; sao chép nội dung tư vấn là thao tác riêng.

### Banner Dearly 20.10
Bản gốc người dùng cung cấp được giữ nguyên tại brand-assets/lis/campaigns/20-10/dearly-original.png. Bản web public/images/campaigns/20-10/dearly.png giữ nguyên điểm ảnh và được gắn metadata nguồn bằng công cụ Impeccable; metadata làm hash tệp web khác bản gốc. Desktop giữ nguyên khung 1702:630, object-fit contain và không đặt thêm một headline nhìn thấy lên chữ có sẵn trên ảnh. H1 vẫn có mặt cho công nghệ hỗ trợ. Không có scrim hoặc panel sau chữ trên desktop.

CTA góc dưới trái dùng nút brand/surface với góc 2px, min-height 48px và liên kết Nhắn LIS có gạch dưới. Dưới 768px, ảnh cao 400px, object-fit cover tại 52% center; tên Dearly, dòng Quà tặng 20.10 và hành động nằm bên dưới trên nền hồng liền mạch. Tiêu đề mobile là Manrope 36px; dòng sự kiện Be Vietnam Pro 18px, line-height 1.6. Crop mobile cần ảnh nguồn rộng khoảng 1081px cho khung cao 400px; thuộc tính sizes yêu cầu 1081px dưới 768px thay vì chỉ dùng chiều rộng màn hình. Ở 768–1023px, liên kết Nhắn LIS được đẩy về bên phải để nằm trên nền ảnh sáng trống. Cấu hình ảnh, ngày và CTA nằm tại data/home-campaign.ts.

Đây là quy tắc bề mặt đã được duyệt của banner hiện tại; xem hợp đồng tại .impeccable/surfaces/app-page-tsx.md trước khi đổi chiến dịch.

### Color selection
Swatch có vùng bấm 44px và chấm tròn 24px. Màu chọn có vòng ink, focus bàn phím độc lập với trạng thái chọn. Popover rộng 270px, giới hạn theo viewport, góc image và shadow popover; các option từ 44px và focus offset -2px để tránh bị cắt. Mũi tên/Home/End di chuyển focus; Enter/Space chọn, Escape đóng và trả focus.

### Ảnh phối đồ và bề mặt sản phẩm
Ảnh phối đồ là ảnh LIS thật, liên kết tới PDP đúng màu và có chú thích ngắn tên mẫu/màu. Bề mặt trang chủ hiện dùng Mila Đỏ đô và Elena Nâu trong nhà theo lộ trình bổ sung ảnh thật; không gọi là ảnh dạo phố. Mục Bề mặt đan dùng crop từ ảnh Lucia Đen có sẵn, phóng 1.8 tại 50% 83%; chỉ mô tả đường đan và đường may nhìn thấy, không suy ra quy trình thủ công hoặc chất liệu da thật. Trình tự riêng của trang chủ được ghi ở hợp đồng bề mặt và planning/15-catalog-editorial-rhythm.md.

## Do's and Don'ts

### Do:
- **Do** dùng logo có alpha, ảnh và tên màu thật từ catalog LIS.
- **Do** giữ Manrope 600 và Be Vietnam Pro có tiếng Việt.
- **Do** giữ vùng bấm từ 44px và vòng focus nhìn rõ trên nền hiện tại.
- **Do** giữ mọi ảnh/card theo màu đã chọn; chỉ preview lifestyle khi có cặp cùng variant và giữ primary khi ảnh thứ hai lỗi.
- **Do** áp prefers-reduced-motion cho chuyển động và scroll.

### Don't:
- **Don't** vẽ lại logo bằng font hoặc thay hệ font trong một lần sửa bề mặt.
- **Don't** thêm hộp shadow bao quanh card sản phẩm phẳng.
- **Don't** lặp hướng dẫn thao tác dài hoặc thêm nhãn tiếng Anh viết hoa làm điểm nhấn.
- **Don't** đưa bố cục của một chiến dịch thành quy tắc cho mọi trang.
