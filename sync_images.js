const fs = require('fs');
const path = require('path');

const BASE_DOWNLOADED = path.join(__dirname, 'image_extracted', 'downloaded_images');
const PUBLIC_DIR = path.join(__dirname, 'public', 'images');
const PRODUCTS_TS = path.join(__dirname, 'data', 'products-from-excel.ts');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

console.log("=================================================================");
console.log("       LIS ATELIER — TIỆN ÍCH ĐỒNG BỘ ẢNH TỰ ĐỘNG LÊN WEBSITE    ");
console.log("=================================================================\n");

if (!fs.existsSync(BASE_DOWNLOADED)) {
  console.log(`[!] Không tìm thấy thư mục ${BASE_DOWNLOADED}`);
  process.exit(1);
}

// Ensure public directories
['products', 'hero', 'categories', 'story', 'lookbook'].forEach(sub => {
  const p = path.join(PUBLIC_DIR, sub);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

let syncCount = 0;

// Mapping configuration
const PRODUCT_MAP = [
  { folder: '01_Mila_Bag', id: 'lis_01_mila', prefix: 'mila' },
  { folder: '02_Nina_Bag', id: 'lis_02_nina', prefix: 'nina' },
  { folder: '03_Lucia_Tote', id: 'lis_03_lucia_tote', prefix: 'lucia' },
  { folder: '04_Elena_Tote', id: 'lis_04_elena_tote', prefix: 'elena' },
  { folder: '05_Lucky_Charm', id: 'lis_05_lucky_charm', prefix: 'lucky_charm' },
  { folder: '06_Mia_Bag', id: 'lis_06_mia_bag', prefix: 'mia' },
  { folder: '07_Calla_Bag', id: 'lis_07_calla_bag', prefix: 'calla' },
  { folder: '08_Lily_Charm', id: 'lis_08_lily_charm', prefix: 'lily_charm' }
];

// 1. Sync 00_Banner_Va_Giao_Dien
const bannerDir = path.join(BASE_DOWNLOADED, '00_Banner_Va_Giao_Dien');
if (fs.existsSync(bannerDir)) {
  const bannerFiles = fs.readdirSync(bannerDir);
  bannerFiles.forEach(f => {
    const ext = path.extname(f).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) return;
    const src = path.join(bannerDir, f);
    const lower = f.toLowerCase();

    if (lower.includes('banner_hero')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'hero', 'hero_editorial.jpg'));
      console.log(`[Đồng bộ Hero] ${f} -> public/images/hero/hero_editorial.jpg`);
      syncCount++;
    } else if (lower.includes('category_tui_xach_tay')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'categories', 'cat_tui_xach_tay.jpg'));
      console.log(`[Đồng bộ Category] ${f} -> public/images/categories/cat_tui_xach_tay.jpg`);
      syncCount++;
    } else if (lower.includes('category_tui_kep_nach')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'categories', 'cat_tui_deo_vai.jpg'));
      console.log(`[Đồng bộ Category] ${f} -> public/images/categories/cat_tui_deo_vai.jpg`);
      syncCount++;
    } else if (lower.includes('category_tui_deo_cheo')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'categories', 'cat_tui_deo_cheo.jpg'));
      console.log(`[Đồng bộ Category] ${f} -> public/images/categories/cat_tui_deo_cheo.jpg`);
      syncCount++;
    } else if (lower.includes('category_tui_tote')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'categories', 'cat_tui_tote.jpg'));
      console.log(`[Đồng bộ Category] ${f} -> public/images/categories/cat_tui_tote.jpg`);
      syncCount++;
    } else if (lower.includes('category_phu_kien')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'categories', 'cat_phu_kien.jpg'));
      console.log(`[Đồng bộ Category] ${f} -> public/images/categories/cat_phu_kien.jpg`);
      syncCount++;
    } else if (lower.includes('story_nghe_nhan')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'story', 'artisan_craft.jpg'));
      console.log(`[Đồng bộ Story] ${f} -> public/images/story/artisan_craft.jpg`);
      syncCount++;
    } else if (lower.includes('lookbook')) {
      fs.copyFileSync(src, path.join(PUBLIC_DIR, 'lookbook', 'lookbook_1.jpg'));
      console.log(`[Đồng bộ Lookbook] ${f} -> public/images/lookbook/lookbook_1.jpg`);
      syncCount++;
    }
  });
}

// 2. Sync 8 Products
PRODUCT_MAP.forEach(item => {
  const pDir = path.join(BASE_DOWNLOADED, item.folder);
  if (!fs.existsSync(pDir)) return;

  const files = fs.readdirSync(pDir);
  files.forEach(f => {
    const ext = path.extname(f).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) return;
    const src = path.join(pDir, f);
    const lower = f.toLowerCase();

    const destFileName = `${item.prefix}_${f}`;
    const dest = path.join(PUBLIC_DIR, 'products', destFileName);
    fs.copyFileSync(src, dest);
    console.log(`[Đồng bộ Sản Phẩm] ${item.folder}/${f} -> public/images/products/${destFileName}`);
    syncCount++;
  });
});

console.log("\n" + "=".repeat(65));
console.log(`TỔNG KẾT: Đã đồng bộ thành công ${syncCount} tệp ảnh lên hệ thống web!`);
console.log("=".repeat(65));
