export interface ColorSwatch {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "tui-xach-tay" | "tui-deo-vai" | "tui-deo-cheo" | "tui-tote" | "phu-kien-charm";
  categoryName: string;
  price: number;
  comparePrice: number;
  discountPercentage: number;
  sku: string;
  description: string;
  material: string;
  dimensions: string;
  weight: string;
  details: string[];
  mainImage: string;
  hoverImage: string;
  gallery: string[];
  colors: ColorSwatch[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  crossSellIds?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat_1",
    name: "Túi Xách Tay",
    slug: "tui-xach-tay",
    description: "Biểu tượng thanh lịch vượt thời gian với quai xách may thủ công.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    itemCount: 6,
  },
  {
    id: "cat_2",
    name: "Túi Đeo Vai & Kẹp Nách",
    slug: "tui-deo-vai",
    description: "Đường cong công thái học ôm sát vai, phong cách Parisian hiện đại.",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
    itemCount: 6,
  },
  {
    id: "cat_3",
    name: "Túi Đeo Chéo",
    slug: "tui-deo-cheo",
    description: "Linh hoạt và tinh tế cho nhịp sống đô thị năng động.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    itemCount: 5,
  },
  {
    id: "cat_4",
    name: "Túi Tote Cao Cấp",
    slug: "tui-tote",
    description: "Sức chứa tối ưu cho laptop 14 inch và vật dụng thường nhật.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    itemCount: 4,
  },
  {
    id: "cat_5",
    name: "Charm & Phụ Kiện Da",
    slug: "phu-kien-charm",
    description: "Điểm nhấn cá tính với khăn lụa quấn quai và charm da thủ công.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    itemCount: 3,
  },
];

export const PRODUCTS: Product[] = [
  // --- TÚI XÁCH TAY ---
  {
    id: "lis_01",
    slug: "tui-xach-tay-aura-size-18",
    title: "Túi Xách Tay Aura Size 18",
    subtitle: "Dáng bán nguyệt tối giản, da bò Epsom nhập khẩu Ý",
    category: "tui-xach-tay",
    categoryName: "Túi Xách Tay",
    price: 895000,
    comparePrice: 1250000,
    discountPercentage: 28,
    sku: "LIS-AUR-1801",
    description: "Túi xách Aura là bản hòa ca giữa cấu trúc điêu khắc đương đại và kỹ thuật may yên ngựa thủ công. Lớp da Epsom chống trầy xước kết hợp khóa kim loại mạ vàng 18k mờ tinh tế.",
    material: "Da bò Epsom cao cấp hạt mịn, lót da lộn nhân tạo Microfiber",
    dimensions: "18.5 x 15 x 8 cm (vừa iPhone Pro Max & son phấn)",
    weight: "380g",
    details: [
      "Quai xách tay gia cố đệm tròn êm ái",
      "Kèm dây đeo chéo da thật có thể tháo rời và điều chỉnh độ dài",
      "Khóa xoay từ tính mạ vàng champagne 18k",
      "Ngăn phụ có khóa kéo bảo mật bên trong",
    ],
    mainImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Xanh Mint", hex: "#94BAA2", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85" },
      { name: "Kem Ngà", hex: "#F5F2EB", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" },
      { name: "Đen Than", hex: "#1C1917", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85" },
      { name: "Đỏ Burgundy", hex: "#6B1530", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["Size 18 (18.5 x 15 cm)", "Size 22 (22 x 18 cm)"],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 142,
    crossSellIds: ["lis_22", "lis_23", "lis_24"],
  },
  {
    id: "lis_02",
    slug: "tui-xach-tay-palais-mini",
    title: "Túi Xách Tay Palais Mini",
    subtitle: "Thiết kế hình thang thanh lịch với góc uốn mềm mại",
    category: "tui-xach-tay",
    categoryName: "Túi Xách Tay",
    price: 780000,
    comparePrice: 1100000,
    discountPercentage: 29,
    sku: "LIS-PAL-1902",
    description: "Palais Mini tái định nghĩa vẻ đẹp sang trọng kín đáo. Dáng túi hình thang với đường viền bo cong gợi nhắc kiến trúc cung điện Paris cổ kính.",
    material: "Da bê tự nhiên trơn mịn (Smooth Calfskin)",
    dimensions: "20 x 14 x 9 cm",
    weight: "410g",
    details: [
      "Quai xách vòm đơn giản mang đậm phong cách Pháp",
      "Khóa hít nam châm ẩn thẩm mỹ",
      "Đáy túi gia cố 4 đinh kim loại chống bám bẩn",
    ],
    mainImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Cognac Nâu Rượu", hex: "#9E5B32", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85" },
      { name: "Đen Tuyển", hex: "#1C1917", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85" },
      { name: "Trắng Phấn", hex: "#FAFAF9", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["Bản Tiêu Chuẩn"],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 98,
    crossSellIds: ["lis_22", "lis_24"],
  },
  {
    id: "lis_03",
    slug: "tui-xach-constance-flair",
    title: "Túi Xách Constance Flair",
    subtitle: "Dáng hộp vuông đứng cá tính với khóa cài kim loại đúc nguyên khối",
    category: "tui-xach-tay",
    categoryName: "Túi Xách Tay",
    price: 950000,
    comparePrice: 1350000,
    discountPercentage: 30,
    sku: "LIS-CON-2003",
    description: "Constance Flair là hiện thân của phong thái quý phái nơi công sở. Phom túi cứng cáp không bị biến dạng sau thời gian dài sử dụng.",
    material: "Da bò vân sáp dầu cao cấp (Oil Waxed Leather)",
    dimensions: "21 x 16 x 8.5 cm",
    weight: "440g",
    details: [
      "Khóa kim loại đúc mạ vàng satin chống trầy",
      "Có 2 ngăn chính và 1 ngăn phụ khóa kéo",
    ],
    mainImage: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Nâu Hạt Dẻ", hex: "#7B3F00", image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=85" },
      { name: "Đen Carbon", hex: "#1C1917", image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["Size Trung 21cm"],
    inStock: true,
    rating: 4.8,
    reviewCount: 76,
    crossSellIds: ["lis_23", "lis_24"],
  },

  // --- TÚI ĐEO VAI & KẸP NÁCH ---
  {
    id: "lis_04",
    slug: "tui-kep-nach-vendome-baguette",
    title: "Túi Kẹp Nách Vendôme Baguette",
    subtitle: "Dáng thuyền chữ U uốn cong, phong cách 90s Chic",
    category: "tui-deo-vai",
    categoryName: "Túi Đeo Vai & Kẹp Nách",
    price: 690000,
    comparePrice: 990000,
    discountPercentage: 30,
    sku: "LIS-VEN-2104",
    description: "Lấy cảm hứng từ quảng trường Place Vendôme tráng lệ, mẫu túi kẹp nách baguette sở hữu tỷ lệ thon dài hoàn mỹ, tôn lên đường cong tự nhiên khi đeo sát nách.",
    material: "Da cừu nhân tạo siêu êm và nhẹ (Soft Lambskin Touch)",
    dimensions: "24 x 13 x 6.5 cm",
    weight: "290g",
    details: [
      "Quai đeo vai thiết kế dẹp chống tuột vai khi di chuyển",
      "Khóa kéo kim loại trượt mượt mà êm ái",
    ],
    mainImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Đen Than", hex: "#1C1917", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85" },
      { name: "Kem Bơ", hex: "#F3EAD8", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85" },
      { name: "Nâu Rượu Cognac", hex: "#9E5B32", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["One Size"],
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 231,
    crossSellIds: ["lis_22", "lis_23"],
  },
  {
    id: "lis_05",
    slug: "tui-deo-vai-marais-crescent",
    title: "Túi Đeo Vai Marais Crescent",
    subtitle: "Dáng trăng khuyết mềm mại với nếp gấp xếp ly tinh xảo",
    category: "tui-deo-vai",
    categoryName: "Túi Đeo Vai & Kẹp Nách",
    price: 750000,
    comparePrice: 1050000,
    discountPercentage: 28,
    sku: "LIS-MAR-2205",
    description: "Được phái đẹp Paris yêu chuộng nhờ vẻ ngoài phóng khoáng, Marais Crescent mang nét thơ mộng với những nếp xếp ly thủ công nhẹ nhàng.",
    material: "Da bê sần dập vân hạt Nappa",
    dimensions: "26 x 15 x 7 cm",
    weight: "340g",
    details: [
      "Quai đeo nách điều chỉnh 2 nấc độ dài",
      "Khóa kéo chìm kín đáo",
    ],
    mainImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Đỏ Rượu Burgundy", hex: "#6B1530", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85" },
      { name: "Xanh Olive", hex: "#556B2F", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["One Size"],
    isNew: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 54,
    crossSellIds: ["lis_22", "lis_24"],
  },

  // --- TÚI ĐEO CHÉO ---
  {
    id: "lis_06",
    slug: "tui-deo-cheo-rivoli-camera",
    title: "Túi Đeo Chéo Rivoli Camera",
    subtitle: "Dáng hộp camera bo góc hiện đại, kèm quai vải dệt Jacquard",
    category: "tui-deo-cheo",
    categoryName: "Túi Đeo Chéo",
    price: 650000,
    comparePrice: 890000,
    discountPercentage: 27,
    sku: "LIS-RIV-2306",
    description: "Người bạn đồng hành cho những chuyến dạo phố cuối tuần. Trang bị 2 bộ dây: 1 dây da thanh lịch và 1 dây dù Jacquard dệt họa tiết LIS.",
    material: "Da bò Microfiber thế hệ mới chống nước 99%",
    dimensions: "19 x 12 x 7 cm",
    weight: "360g",
    details: [
      "Tặng kèm 2 dây đeo thay đổi phong cách",
      "Ngăn ngoài lấy nhanh thẻ xe hoặc chìa khóa",
    ],
    mainImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Cát Sa Mạc", hex: "#C2B280", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" },
      { name: "Đen", hex: "#1C1917", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["Tiêu Chuẩn"],
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    crossSellIds: ["lis_23", "lis_24"],
  },
  {
    id: "lis_07",
    slug: "tui-deo-cheo-tuileries-saddle",
    title: "Túi Đeo Chéo Tuileries Saddle",
    subtitle: "Dáng yên ngựa kinh điển phối viền chỉ nổi thủ công",
    category: "tui-deo-cheo",
    categoryName: "Túi Đeo Chéo",
    price: 820000,
    comparePrice: 1150000,
    discountPercentage: 28,
    sku: "LIS-TUI-2407",
    description: "Được may thủ công với kỹ thuật may viền cạnh kép, Tuileries Saddle mang phong vị hoài cổ nhưng đầy cuốn hút khi kết hợp với áo trench coat.",
    material: "Da bò Mastrotto Ý tuyển chọn",
    dimensions: "20 x 16 x 6 cm",
    weight: "420g",
    details: [
      "Nắp gập khóa nam châm hít tự động",
      "Dây đeo da 7 nấc điều chỉnh",
    ],
    mainImage: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Nâu Bò Cổ Điển", hex: "#8B4513", image: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=900&q=85" },
      { name: "Xanh Rêu Đậm", hex: "#2F4F4F", image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["One Size"],
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 167,
    crossSellIds: ["lis_22", "lis_23"],
  },

  // --- TÚI TOTE CÔNG SỞ ---
  {
    id: "lis_08",
    slug: "tui-tote-haussmann-work-14",
    title: "Túi Tote Haussmann Work 14\"",
    subtitle: "Chứa vừa laptop 14 inch, có đệm đáy chống sốc chuyên dụng",
    category: "tui-tote",
    categoryName: "Túi Tote Cao Cấp",
    price: 1150000,
    comparePrice: 1650000,
    discountPercentage: 30,
    sku: "LIS-HAU-2508",
    description: "Giải pháp hoàn mỹ cho người phụ nữ thành đạt. Cấu trúc chia ngăn thông minh cho laptop, sổ tay A4, bình nước và mỹ phẩm mà vẫn giữ phom dáng thanh thoát.",
    material: "Da bò dập vân Saffiano chống xước và chống thấm nước",
    dimensions: "36 x 28 x 12 cm",
    weight: "680g",
    details: [
      "Ngăn chống sốc bảo vệ laptop 13-14 inch",
      "Quai xách dài êm ái đeo vai không đau lưng",
      "Kèm ví thẻ mini gắn liền dây da",
    ],
    mainImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Đen Huyền Bí", hex: "#1C1917", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" },
      { name: "Xám Xi Măng", hex: "#8E8D8A", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["Size L (Laptop 14 inch)"],
    isBestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 312,
    crossSellIds: ["lis_22", "lis_24"],
  },

  // --- CHARM & PHỤ KIỆN MUA KÈM (IN-CART CROSS-SELL GỢI Ý) ---
  {
    id: "lis_22",
    slug: "khan-lua-twilly-paris-botanical",
    title: "Khăn Lụa Twilly Paris Botanical",
    subtitle: "Lụa tơ tằm dệt họa tiết Paris quấn quai túi hoặc cột tóc",
    category: "phu-kien-charm",
    categoryName: "Charm & Phụ Kiện Da",
    price: 150000,
    comparePrice: 250000,
    discountPercentage: 40,
    sku: "LIS-TWI-01",
    description: "Khăn lụa thon dài 85cm x 5cm, chuyên dùng quấn quanh quai túi xách để bảo vệ da quai và tạo điểm nhấn màu sắc phong cách.",
    material: "100% Lụa Mulberry cao cấp dệt viền thủ công",
    dimensions: "85 x 5 cm",
    weight: "20g",
    details: [
      "In kỹ thuật số 2 mặt sắc nét",
      "Bảo vệ quai túi khỏi mồ hôi tay",
    ],
    mainImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Họa Tiết Hoa Cúc", hex: "#D8A47F", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["One Size"],
    inStock: true,
    rating: 4.9,
    reviewCount: 88,
  },
  {
    id: "lis_23",
    slug: "charm-ngua-da-that-artisan",
    title: "Charm Ngựa Da Thật Artisan",
    subtitle: "Móc treo túi hình chú ngựa may tay từ da vụn cao cấp",
    category: "phu-kien-charm",
    categoryName: "Charm & Phụ Kiện Da",
    price: 190000,
    comparePrice: 290000,
    discountPercentage: 34,
    sku: "LIS-CHM-02",
    description: "Phụ kiện móc khóa hình ngựa mini may thủ công hoàn toàn từ các mẩu da bò thừa cao cấp, mang thông điệp thời trang bền vững và phong thủy may mắn.",
    material: "Da bò Mastrotto & khóa bấm kim loại vàng",
    dimensions: "9 x 7 cm",
    weight: "45g",
    details: [
      "Được nhồi bông tự nhiên giữ phom mềm mại",
      "Khóa móc xoay 360 độ tiện gắn vào quai túi",
    ],
    mainImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Nâu Cognac Phối Vàng", hex: "#B99054", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["One Size"],
    inStock: true,
    rating: 5.0,
    reviewCount: 104,
  },
  {
    id: "lis_24",
    slug: "vi-dung-the-card-holder-lisse",
    title: "Ví Đựng Thẻ Card Holder Lisse",
    subtitle: "4 khe cắm thẻ ATM/Căn cước + 1 ngăn kẹp tiền gấp gọn",
    category: "phu-kien-charm",
    categoryName: "Charm & Phụ Kiện Da",
    price: 220000,
    comparePrice: 350000,
    discountPercentage: 37,
    sku: "LIS-CRD-03",
    description: "Chiếc ví thẻ siêu mỏng 0.4cm nằm gọn trong mọi chiếc túi xách mini. Da bò vân hạt Epsom cầm chắc tay, không bao giờ lỗi mốt.",
    material: "Da bò Epsom chống xước",
    dimensions: "10.5 x 7.5 x 0.4 cm",
    weight: "35g",
    details: [
      "Đựng được 6-8 thẻ ngân hàng và tiền mặt gấp gọn",
      "Ép kim logo LIS vàng nhũ sắc sảo",
    ],
    mainImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
    ],
    colors: [
      { name: "Đen Than", hex: "#1C1917", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85" },
      { name: "Đỏ Rượu Burgundy", hex: "#6B1530", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" },
    ],
    sizes: ["Tiêu Chuẩn"],
    inStock: true,
    rating: 4.9,
    reviewCount: 62,
  },
];

export const LOOKBOOK_STORIES = [
  {
    id: "lb_01",
    title: "The Autumn Silhouette — Thu Sang Cùng Tông Màu Nâu Rượu",
    date: "05/09/2026",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    readTime: "3 phút đọc",
    link: "/collections/tui-xach-tay",
  },
  {
    id: "lb_02",
    title: "Kỹ Thuật May Yên Ngựa Saddle Stitch Tại LIS Atelier",
    date: "02/09/2026",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    readTime: "4 phút đọc",
    link: "/collections/tui-deo-vai",
  },
];
