import os
from pathlib import Path

base_dir = Path(r"c:\Users\hoang\Documents\Code\lis\image_extracted\downloaded_images")

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tiff", ".svg",
    ".mp4", ".mov", ".avi", ".mkv",
    ".db", ".ini"
}

deleted_count = 0
deleted_bytes = 0

for root, dirs, files in os.walk(base_dir):
    for f in files:
        file_path = Path(root) / f
        if file_path.suffix.lower() in IMAGE_EXTENSIONS or file_path.name.lower() in ["thumbs.db", ".ds_store"]:
            try:
                size = file_path.stat().st_size
                file_path.unlink()
                deleted_count += 1
                deleted_bytes += size
                print(f"[Đã xóa] {file_path.relative_to(base_dir)} ({size // 1024} KB)")
            except Exception as e:
                print(f"[Lỗi khi xóa] {file_path}: {e}")

# Remove empty subfolders like '750', '800', 'SKU', 'images' created inside Nina Bag/Mila Bag
for root, dirs, files in os.walk(base_dir, topdown=False):
    for d in dirs:
        dir_path = Path(root) / d
        # Only remove temporary scrap subdirectories created by gdown
        if d in ["750", "800", "SKU", "images", "video"]:
            try:
                # Check if it has no files or only empty dirs
                if not any(dir_path.rglob("*")):
                    dir_path.rmdir()
                    print(f"[Đã xóa thư mục tạm rỗng] {dir_path.relative_to(base_dir)}")
            except Exception:
                pass

print("=" * 60)
print(f"Tổng kết: Đã dọn dẹp {deleted_count} tệp ảnh ({deleted_bytes // (1024 * 1024)} MB).")
print("Cấu trúc thư mục theo Sheet 2 và file info.txt (chứa link Drive) vẫn được giữ nguyên 100%!")
