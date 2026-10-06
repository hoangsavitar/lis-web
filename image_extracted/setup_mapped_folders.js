const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'image_extracted', 'downloaded_images');

const FOLDERS_CONFIG = [
  {
    folder: '00_Banner_Va_Giao_Dien',
    title: 'ẢNH BANNER & GIAO DIỆN CHUNG TOÀN TRANG',
    driveLinks: [
      { name: 'BST Summer 2026 / Layout', url: 'https://drive.google.com/drive/folders/1j4329i40EwYwXk32U3d_X3gq0G9gY9yY (hoặc file zip có sẵn trong LAYOUT)' }
    ],
    slots: [
      { filename: 'banner_hero_chinh.jpg', desc: 'Ảnh Banner đầu trang chủ (Full màn hình, phong cách Quiet Luxury, tông màu ấm/tối tôn chữ vàng)', display: 'Hiển thị ngay đầu trang chủ làm nền cho câu slogan DE LA SIMPLICITÉ NAÎT L\'ÉLÉGANCE' },
      { filename: 'category_tui_xach_tay.jpg', desc: 'Ảnh mẫu xách túi đứng dáng thanh lịch', display: 'Thẻ danh mục Túi Xách Tay ở trang chủ' },
      { filename: 'category_tui_kep_nach.jpg', desc: 'Ảnh mẫu kẹp nách túi Baguette phong cách Parisian', display: 'Thẻ danh mục Túi Đeo Vai & Kẹp Nách' },
      { filename: 'category_tui_deo_cheo.jpg', desc: 'Ảnh mẫu đeo túi chéo năng động phố xá', display: 'Thẻ danh mục Túi Đeo Chéo' },
      { filename: 'category_tui_tote.jpg', desc: 'Ảnh túi tote cỡ lớn chứa iPad/sổ tay', display: 'Thẻ danh mục Túi Tote Cao Cấp' },
      { filename: 'category_phu_kien.jpg', desc: 'Ảnh charm da treo quai túi xách', display: 'Thẻ danh mục Charm & Phụ Kiện' },
      { filename: 'story_nghe_nhan.jpg', desc: 'Ảnh nghệ nhân đang khâu may thủ công hoặc tấm da bò Ý', display: 'Khối câu chuyện Triết lý chế tác thủ công' },
      { filename: 'lookbook_01.jpg', desc: 'Ảnh tạp chí phối outfit mùa thu/hè cùng túi LIS', display: 'Khối Cảm Hứng Thời Trang bên dưới trang chủ' }
    ]
  },
  {
    folder: '01_Mila_Bag',
    title: 'MILA BAG — TÚI XÁCH TAY ĐIÊU KHẮC (SKU: LIS-TNC25-MILA-DO)',
    driveLinks: [
      { name: '1. Ảnh hiển thị đầu tiên (File đơn)', url: 'https://drive.google.com/file/d/1WJaBWAqaQbDJ0m_FAZLdzHxPsSrq8i_7/view?usp=drive_link' },
      { name: '2. Thư mục Ảnh nền trơn (Đầy đủ các màu)', url: 'https://drive.google.com/drive/u/1/folders/1RISx4HHFPBZs5mjDy5hdh26Kp3gcG0fY' },
      { name: '3. Thư mục Flatlay phụ kiện', url: 'https://drive.google.com/drive/folders/1D5nqNrGeJLqo7JsrFJZ2aWQKQtItqypL?usp=sharing' },
      { name: '4. Thư mục Lookbook ngoại cảnh', url: 'https://drive.google.com/drive/folders/1JLlxeWx-I6qwKU61_lchXo8X0xaWz1qP?usp=drive_link' },
      { name: '5. Thư mục Daily & Feedback', url: 'https://drive.google.com/drive/folders/1AxXywCGuU-ZtexIJyUCwZspMQj1AHcrj?usp=drive_link' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Túi Mila màu Đỏ Rượu chụp chính diện, nền trơn studio sạch sẽ, thấy rõ khóa xoay satin', display: 'Ảnh đại diện chính trên Card sản phẩm ngoài Trang chủ & Danh mục' },
      { filename: '02_anh_hover_goc_nghieng.jpg', desc: 'Túi Mila chụp góc nghiêng 45 độ hoặc mẫu xách tay', display: 'Tự động lật ảnh khi khách rê chuột (hover) vào thẻ sản phẩm' },
      { filename: 'mau_do_cherry.jpg', desc: 'Túi Mila phiên bản màu Đỏ Rượu Cherry', display: 'Hiển thị khi khách bấm vào chấm màu Đỏ Cherry' },
      { filename: 'mau_den_tuyen.jpg', desc: 'Túi Mila phiên bản màu Đen Tuyển (Onyx Noir)', display: 'Hiển thị khi khách bấm vào chấm màu Đen' },
      { filename: 'mau_trang_nga.jpg', desc: 'Túi Mila phiên bản màu Trắng Ngà (Oat Milk)', display: 'Hiển thị khi khách bấm vào chấm màu Trắng Ngà' },
      { filename: 'chi_tiet_khoa_da.jpg', desc: 'Cận cảnh đường chỉ may may yên ngựa và khóa xoay kim loại satin', display: 'Hình ảnh trong thư viện Gallery trang chi tiết' },
      { filename: 'chi_tiet_long_tui.jpg', desc: 'Ảnh mở nắp túi nhìn thấy ngăn lót microfiber bên trong', display: 'Hình ảnh trong thư viện Gallery trang chi tiết' },
      { filename: 'lookbook_mau_deo.jpg', desc: 'Ảnh người mẫu phối outfit xách túi Mila ngoài đời thực', display: 'Hình ảnh trong thư viện Gallery trang chi tiết' }
    ]
  },
  {
    folder: '02_Nina_Bag',
    title: 'NINA BAG — TÚI ĐEO VAI & KẸP NÁCH BAGUETTE (SKU: LIS-TNC25-NINA-DO)',
    driveLinks: [
      { name: '1. Ảnh hiển thị đầu tiên (File đơn)', url: 'https://drive.google.com/file/d/1l7KA8xnrGoaQ-msunrN8kcvYXRrKFV6T/view?usp=drive_link' },
      { name: '2. Thư mục Ảnh nền trơn các màu', url: 'https://drive.google.com/drive/folders/1QZK-L9InPwcVXozD2-fgTRZZPyDhJ4ek?usp=sharing' },
      { name: '3. Thư mục Lookbook', url: 'https://drive.google.com/drive/u/1/folders/1pY5OmlG5N8dwTKJjq7CnTIkDxvN4SMNd' },
      { name: '4. Thư mục Daily & Feedback', url: 'https://drive.google.com/drive/u/1/folders/1CpA2DAISVxzp2jNz2kIMuWXeW6ZicR-P' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Túi Nina màu Nâu Cognac chụp dáng ngang cong công thái học chuẩn Baguette', display: 'Ảnh đại diện chính trên Card sản phẩm' },
      { filename: '02_anh_hover_goc_nghieng.jpg', desc: 'Ảnh người mẫu kẹp nách ôm sát bờ vai phong cách Parisian', display: 'Hiệu ứng lật ảnh khi rê chuột vào sản phẩm' },
      { filename: 'mau_nau_cognac.jpg', desc: 'Túi Nina phiên bản màu Nâu Cognac Cổ Điển', display: 'Hiển thị khi khách chọn chấm màu Nâu Cognac' },
      { filename: 'mau_den_espresso.jpg', desc: 'Túi Nina phiên bản màu Đen Espresso', display: 'Hiển thị khi khách chọn chấm màu Đen' },
      { filename: 'mau_do_cherry.jpg', desc: 'Túi Nina phiên bản màu Đỏ Cherry Berry', display: 'Hiển thị khi khách chọn chấm màu Đỏ Cherry' },
      { filename: 'chi_tiet_khoa_keo.jpg', desc: 'Cận cảnh khóa kéo YKK champagne và đường gấp mép viền túi', display: 'Gallery trang chi tiết sản phẩm' },
      { filename: 'lookbook_kep_nach.jpg', desc: 'Ảnh đời thường người mẫu mang túi Nina dạo phố', display: 'Gallery trang chi tiết sản phẩm' }
    ]
  },
  {
    folder: '03_Lucia_Tote',
    title: 'LUCIA TOTE — TÚI TOTE HÌNH THANG SANG TRỌNG (SKU: LIS-TNC25-LUCIA-CHOCO)',
    driveLinks: [
      { name: '1. Ảnh hiển thị đầu tiên (File đơn)', url: 'https://drive.google.com/file/d/14itlksDNgEcJ5yB799bJlIUnKk-XkzAO/view?usp=drive_link' },
      { name: '2. Thư mục Ảnh nền trơn', url: 'https://drive.google.com/drive/folders/1h1R50efVbKHdh2noNcQNo6GMmadMcg1W?usp=sharing' },
      { name: '3. Thư mục Lookbook', url: 'https://drive.google.com/drive/u/1/folders/1pY5OmlG5N8dwTKJjq7CnTIkDxvN4SMNd' },
      { name: '4. Thư mục Daily & Feedback', url: 'https://drive.google.com/drive/u/1/folders/1CEg_VUdfHBk7RABRsPsv-gJQt_uabztN' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Túi Lucia dáng thang màu Nâu Chocolate chụp đứng phom cứng cáp', display: 'Ảnh đại diện chính sản phẩm' },
      { filename: '02_anh_hover_goc_nghieng.jpg', desc: 'Ảnh góc nghiêng hoặc mẫu xách tay sải bước', display: 'Hiệu ứng lật ảnh khi rê chuột' },
      { filename: 'mau_nau_chocolate.jpg', desc: 'Túi Lucia màu Nâu Chocolate', display: 'Hiển thị khi khách chọn màu Nâu Chocolate' },
      { filename: 'mau_vang_champagne.jpg', desc: 'Túi Lucia màu Vàng Champagne Cát', display: 'Hiển thị khi khách chọn màu Vàng Champagne' },
      { filename: 'mau_den_tuyen.jpg', desc: 'Túi Lucia màu Đen Tuyển', display: 'Hiển thị khi khách chọn màu Đen' },
      { filename: 'chi_tiet_day_tui.jpg', desc: 'Cận cảnh 4 chân đinh bảo vệ đáy túi và nắp hít nam châm', display: 'Gallery trang chi tiết sản phẩm' },
      { filename: 'lookbook_cong_so.jpg', desc: 'Ảnh mẫu công sở mang túi Lucia cùng sổ tay/laptop', display: 'Gallery trang chi tiết sản phẩm' }
    ]
  },
  {
    folder: '04_Elena_Tote',
    title: 'ELENA TOTE — TÚI TOTE NẮP CHỮ U THỜI THƯỢNG (SKU: LIS-TNC25-ELENA-NAU)',
    driveLinks: [
      { name: '1. Ảnh hiển thị đầu tiên (File đơn)', url: 'https://drive.google.com/file/d/1_1ocO-WRE34I4WEN6wanrNoFqq8xjwbI/view?usp=drive_link' },
      { name: '2. Thư mục Ảnh nền trơn', url: 'https://drive.google.com/drive/folders/1aru6ZwiX0CNAi64Y85yqHN29X7oWP9GF?usp=sharing' },
      { name: '3. Thư mục Lookbook', url: 'https://drive.google.com/drive/folders/1pY5OmlG5N8dwTKJjq7CnTIkDxvN4SMNd?usp=sharing' },
      { name: '4. Thư mục Daily & Feedback', url: 'https://drive.google.com/drive/folders/11v8mipp3ptb-Mc5GtoxVKF7J0d0ciklt?usp=drive_link' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Túi Elena màu Nâu Da Bò chụp rõ đường lượn sóng chữ U mềm mại', display: 'Ảnh đại diện chính sản phẩm' },
      { filename: '02_anh_hover_goc_nghieng.jpg', desc: 'Ảnh góc 3/4 hoặc người mẫu khoác túi trên vai', display: 'Hiệu ứng lật ảnh khi rê chuột' },
      { filename: 'mau_nau_da_bo.jpg', desc: 'Túi Elena màu Nâu Da Bò Tự Nhiên', display: 'Hiển thị khi khách chọn màu Nâu' },
      { filename: 'mau_trang_nga.jpg', desc: 'Túi Elena màu Trắng Ngà Oat Milk', display: 'Hiển thị khi khách chọn màu Trắng' },
      { filename: 'mau_xanh_reu.jpg', desc: 'Túi Elena màu Xanh Rêu Sage', display: 'Hiển thị khi khách chọn màu Xanh Rêu' },
      { filename: 'chi_tiet_mieng_chu_u.jpg', desc: 'Cận cảnh nắp lượn sóng và khóa kéo miệng bảo mật', display: 'Gallery trang chi tiết sản phẩm' },
      { filename: 'lookbook_deo_vai.jpg', desc: 'Ảnh người mẫu khoác túi Elena đi dạo cuối tuần', display: 'Gallery trang chi tiết sản phẩm' }
    ]
  },
  {
    folder: '05_Lucky_Charm',
    title: 'LUCKY CHARM — PHỤ KIỆN CHARM CỎ 4 LÁ THỦ CÔNG (SKU: LIS-TNC25-LUCKYCHARM-NAU)',
    driveLinks: [
      { name: 'Thư mục Charm Lily + Lucky (Nền trơn & hiển thị)', url: 'https://drive.google.com/drive/folders/1cLoGDZz-DaGnjznmsa074XmPqrsST6rx?usp=drive_link' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Charm cỏ 4 lá may nổi 3D chụp đứng trên nền sạch', display: 'Ảnh đại diện chính sản phẩm' },
      { filename: '02_anh_hover_treo_tui.jpg', desc: 'Ảnh charm được móc vào quai túi xách thực tế', display: 'Hiệu ứng lật ảnh khi rê chuột' },
      { filename: 'mau_nau_da_bo.jpg', desc: 'Charm màu Nâu Da Bò', display: 'Hiển thị khi khách chọn màu Nâu' },
      { filename: 'mau_xanh_mint.jpg', desc: 'Charm màu Xanh Mint', display: 'Hiển thị khi khách chọn màu Xanh Mint' },
      { filename: 'mau_do_cherry.jpg', desc: 'Charm màu Đỏ Rượu Cherry', display: 'Hiển thị khi khách chọn màu Đỏ' },
      { filename: 'chi_tiet_khoen_khoa.jpg', desc: 'Cận cảnh khoen xoay 360 độ mạ champagne và đường khâu mép', display: 'Gallery trang chi tiết' }
    ]
  },
  {
    folder: '06_Mia_Bag',
    title: 'MIA BAG — TÚI ĐEO CHÉO DÁNG HỘP THANH LỊCH (SKU: LIS-UH26-MIA-BE)',
    driveLinks: [
      { name: '1. Ảnh hiển thị đầu tiên (File đơn)', url: 'https://drive.google.com/file/d/1b1xdPHiaPuwsyCuQ8Yw-xNNdlDvz8W05/view?usp=drive_link' },
      { name: '2. Thư mục Ảnh nền trơn', url: 'https://drive.google.com/drive/folders/18zOOtfNlnQiKl5mkWx_3W6TD_Z6YbQzU?usp=sharing' },
      { name: '3. Thư mục Lookbook', url: 'https://drive.google.com/drive/u/1/folders/1U0XG9JQIVEfcEt3RtOx1vG0mOZoy5Wm0' },
      { name: '4. Thư mục Ảnh Daily', url: 'https://drive.google.com/drive/u/1/folders/1UKFV3rr6YOtJTRCy7J1_bEw8Azjj8kjP' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Túi Mia màu Be Sữa phom hộp gọn gàng, khóa nam châm ẩn', display: 'Ảnh đại diện chính sản phẩm' },
      { filename: '02_anh_hover_goc_nghieng.jpg', desc: 'Ảnh góc nghiêng hoặc người mẫu đeo chéo ngang eo', display: 'Hiệu ứng lật ảnh khi rê chuột' },
      { filename: 'mau_be_sua.jpg', desc: 'Túi Mia màu Be Sữa Oat Milk', display: 'Hiển thị khi khách chọn màu Be' },
      { filename: 'mau_den_tuyen.jpg', desc: 'Túi Mia màu Đen Tuyển', display: 'Hiển thị khi khách chọn màu Đen' },
      { filename: 'mau_nau_hat_de.jpg', desc: 'Túi Mia màu Nâu Hạt Dẻ', display: 'Hiển thị khi khách chọn màu Nâu' },
      { filename: 'chi_tiet_day_deo.jpg', desc: 'Cận cảnh dây đeo da bản êm 5 nấc điều chỉnh và chất da Togo', display: 'Gallery trang chi tiết sản phẩm' },
      { filename: 'lookbook_deo_cheo.jpg', desc: 'Ảnh người mẫu đeo túi Mia năng động ngoài quán cafe/phố', display: 'Gallery trang chi tiết sản phẩm' }
    ]
  },
  {
    folder: '07_Calla_Bag',
    title: 'CALLA BAG — TÚI HOBO CÁNH HOA RUM MỀM RŨ (SKU: LIS-UH26-CALLA-XANHREU)',
    driveLinks: [
      { name: '1. Ảnh hiển thị đầu tiên (File đơn)', url: 'https://drive.google.com/file/d/1k9ptyYuoZwykMG4VleWQJ7kJKiuuAW5S/view?usp=drive_link' },
      { name: '2. Thư mục Ảnh nền trơn', url: 'https://drive.google.com/drive/folders/1pMp9qnuCQTHGYeD5DSwV3vSL3vK72NVV?usp=sharing' },
      { name: '3. Thư mục Lookbook', url: 'https://drive.google.com/drive/u/1/folders/1U0XG9JQIVEfcEt3RtOx1vG0mOZoy5Wm0' },
      { name: '4. Thư mục Feedback & Daily', url: 'https://drive.google.com/drive/folders/18FPkuQWyCUnBJxmFLhhFrgKyuOVgoIa8?usp=drive_link' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Túi Calla màu Xanh Rêu Forest Sage phom rũ mềm mại tự nhiên', display: 'Ảnh đại diện chính sản phẩm' },
      { filename: '02_anh_hover_goc_nghieng.jpg', desc: 'Ảnh mẫu đeo vai tôn dáng effortless chic sang chảnh', display: 'Hiệu ứng lật ảnh khi rê chuột' },
      { filename: 'mau_xanh_reu.jpg', desc: 'Túi Calla màu Xanh Rêu Forest Sage', display: 'Hiển thị khi khách chọn màu Xanh Rêu' },
      { filename: 'mau_trang_nga.jpg', desc: 'Túi Calla màu Trắng Ngà Oat Milk', display: 'Hiển thị khi khách chọn màu Trắng Ngà' },
      { filename: 'mau_den_tuyen.jpg', desc: 'Túi Calla màu Đen Tuyển', display: 'Hiển thị khi khách chọn màu Đen' },
      { filename: 'chi_tiet_da_nappa.jpg', desc: 'Cận cảnh chất da Nappa siêu mềm mượt và khóa nam châm ẩn vành túi', display: 'Gallery trang chi tiết sản phẩm' },
      { filename: 'lookbook_ru_mem.jpg', desc: 'Ảnh mẫu bước đi cùng túi Calla chuyển động uyển chuyển', display: 'Gallery trang chi tiết sản phẩm' }
    ]
  },
  {
    folder: '08_Lily_Charm',
    title: 'LILY CHARM — PHỤ KIỆN CHARM HOA CHUÔNG (SKU: LIS-UH26-LILYCHARM-NAU)',
    driveLinks: [
      { name: 'Thư mục Charm Lily + Lucky (Nền trơn & hiển thị)', url: 'https://drive.google.com/drive/folders/1cLoGDZz-DaGnjznmsa074XmPqrsST6rx?usp=drive_link' }
    ],
    slots: [
      { filename: '01_anh_chinh_hien_thi.jpg', desc: 'Bông hoa chuông da thật xếp cánh nụ đứng thẳng nền sạch', display: 'Ảnh đại diện chính sản phẩm' },
      { filename: '02_anh_hover_treo_tui.jpg', desc: 'Ảnh móc charm vào quai túi Calla Bag hoặc Nina Bag', display: 'Hiệu ứng lật ảnh khi rê chuột' },
      { filename: 'mau_nau_caramel.jpg', desc: 'Charm Lily màu Nâu Caramel', display: 'Hiển thị khi khách chọn màu Nâu Caramel' },
      { filename: 'mau_trang_nga.jpg', desc: 'Charm Lily màu Trắng Ngà Oat Milk', display: 'Hiển thị khi khách chọn màu Trắng' },
      { filename: 'mau_den_espresso.jpg', desc: 'Charm Lily màu Đen Espresso', display: 'Hiển thị khi khách chọn màu Đen' },
      { filename: 'chi_tiet_canh_hoa.jpg', desc: 'Cận cảnh viền sơn mép da Fenice Ý 4 lớp chống bong tróc', display: 'Gallery trang chi tiết sản phẩm' }
    ]
  }
];

// Ensure Base Directory
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

console.log("Đang thiết lập cấu trúc thư mục mapping chuẩn...");

FOLDERS_CONFIG.forEach(item => {
  const targetPath = path.join(BASE_DIR, item.folder);
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Create HUONG_DAN.txt inside each folder
  let content = `================================================================================\n`;
  content += `   LIS ATELIER — HƯỚNG DẪN TẢI & CHỌN ẢNH CHO: ${item.folder}\n`;
  content += `   ${item.title}\n`;
  content += `================================================================================\n\n`;

  content += `[1] CÁC ĐƯỜNG LINK GOOGLE DRIVE ĐỂ LẤY ẢNH:\n`;
  item.driveLinks.forEach((link, idx) => {
    content += `   ${idx + 1}. ${link.name}:\n      -> ${link.url}\n\n`;
  });

  content += `\n[2] DANH SÁCH CÁC TÊN FILE CẦN COPY VÀO THƯ MỤC NÀY:\n`;
  content += `--------------------------------------------------------------------------------\n`;
  item.slots.forEach((slot, sIdx) => {
    content += `${sIdx + 1}. TÊN FILE: ${slot.filename}\n`;
    content += `   - Mô tả loại ảnh cần chọn: ${slot.desc}\n`;
    content += `   - Vị trí hiển thị trên Web: ${slot.display}\n\n`;
  });

  content += `--------------------------------------------------------------------------------\n`;
  content += `* Mẹo: Bạn chỉ cần tải ảnh từ Drive về, đổi tên theo cột "TÊN FILE" ở trên rồi\n`;
  content += `  thả thẳng vào thư mục này. Sau đó chạy 'node sync_images.js' là ảnh sẽ lên web ngay lập tức!\n`;

  fs.writeFileSync(path.join(targetPath, 'HUONG_DAN.txt'), content, 'utf8');
  console.log(`[OK] Đã tạo thư mục và file hướng dẫn: ${item.folder}`);
});

console.log("\nHOÀN TẤT THIẾT LẬP CẤU TRÚC 9 THƯ MỤC MAPPING TẠI: " + BASE_DIR);
