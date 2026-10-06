"""
LIS Web Assets Curated Downloader
=================================
Chuyên dụng tạo bộ ảnh làm Web Sản Phẩm LIS:
1. Tải 100% Ảnh đại diện (Ảnh hiển thị đầu tiên) cho tất cả sản phẩm.
2. Với các buổi chụp nhiều ảnh (Flatlay, Lookbook, Daily), chỉ lấy chọn lọc 3-4 ảnh tiêu biểu.
3. Bỏ qua video nặng và file hệ thống (Thumbs.db).
4. Tận dụng ảnh Flatlay chung của BST để sao chép nhanh giữa các túi.
"""

import os
import re
import sys
import time
import shutil
import json
from pathlib import Path
from urllib.parse import unquote

# Đảm bảo in tiếng Việt chuẩn trên console Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

import gdown
import requests

# GIỚI HẠN SỐ ẢNH MỖI THƯ MỤC CHO WEB (3-4 ảnh đẹp nhất là đủ làm Gallery PDP)
MAX_IMAGES_PER_FOLDER = 4

# Danh sách đầy đủ 34 hạng mục theo Sheet 2
SHEET2_MAPPING = [
  # THE NEW CLASSIC
  {"bst": "THE NEW CLASSIC", "product": "Mila Bag", "category": "Ảnh hiển thị đầu tiên", "link": "https://drive.google.com/file/d/1WJaBWAqaQbDJ0m_FAZLdzHxPsSrq8i_7/view", "type": "file", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Mila Bag", "category": "Ảnh nền trơn", "link": "https://drive.google.com/drive/u/1/folders/1RISx4HHFPBZs5mjDy5hdh26Kp3gcG0fY", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Mila Bag", "category": "Flatlay", "link": "https://drive.google.com/drive/folders/1D5nqNrGeJLqo7JsrFJZ2aWQKQtItqypL", "type": "folder", "priority": "medium"},
  {"bst": "THE NEW CLASSIC", "product": "Mila Bag", "category": "Ảnh Lookbook", "link": "https://drive.google.com/drive/folders/1JLlxeWx-I6qwKU61_lchXo8X0xaWz1qP", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Mila Bag", "category": "feedback", "link": "https://drive.google.com/drive/folders/15q-OWQVtdT4uSlYkE8oz3RBMsP7yjCyZ", "type": "folder", "priority": "low"},
  {"bst": "THE NEW CLASSIC", "product": "Mila Bag", "category": "Ảnh Daily", "link": "https://drive.google.com/drive/folders/1AxXywCGuU-ZtexIJyUCwZspMQj1AHcrj", "type": "folder", "priority": "medium"},

  # Nina Bag
  {"bst": "THE NEW CLASSIC", "product": "Nina Bag", "category": "Ảnh hiển thị đầu tiên", "link": "https://drive.google.com/file/d/1l7KA8xnrGoaQ-msunrN8kcvYXRrKFV6T/view", "type": "file", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Nina Bag", "category": "Ảnh nền trơn", "link": "https://drive.google.com/drive/folders/1QZK-L9InPwcVXozD2-fgTRZZPyDhJ4ek", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Nina Bag", "category": "Flatlay", "link": "https://drive.google.com/drive/u/1/folders/1D5nqNrGeJLqo7JsrFJZ2aWQKQtItqypL", "type": "copy_flatlay", "priority": "medium"},
  {"bst": "THE NEW CLASSIC", "product": "Nina Bag", "category": "Ảnh Lookbook", "link": "https://drive.google.com/drive/u/1/folders/1pY5OmlG5N8dwTKJjq7CnTIkDxvN4SMNd", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Nina Bag", "category": "feedback", "link": "https://drive.google.com/drive/folders/1M4pIURiuku0Bag2qQHFtA3SL52QuFpld", "type": "folder", "priority": "low"},
  {"bst": "THE NEW CLASSIC", "product": "Nina Bag", "category": "Ảnh Daily", "link": "https://drive.google.com/drive/u/1/folders/1CpA2DAISVxzp2jNz2kIMuWXeW6ZicR-P", "type": "folder", "priority": "medium"},

  # Elena Tote
  {"bst": "THE NEW CLASSIC", "product": "Elena Tote", "category": "Ảnh hiển thị đầu tiên", "link": "https://drive.google.com/file/d/1_1ocO-WRE34I4WEN6wanrNoFqq8xjwbI/view", "type": "file", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Elena Tote", "category": "Ảnh nền trơn", "link": "https://drive.google.com/drive/folders/1aru6ZwiX0CNAi64Y85yqHN29X7oWP9GF", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Elena Tote", "category": "Flatlay", "link": "https://drive.google.com/drive/u/1/folders/1D5nqNrGeJLqo7JsrFJZ2aWQKQtItqypL", "type": "copy_flatlay", "priority": "medium"},
  {"bst": "THE NEW CLASSIC", "product": "Elena Tote", "category": "Feedback", "link": "https://drive.google.com/drive/folders/11v8mipp3ptb-Mc5GtoxVKF7J0d0ciklt", "type": "folder", "priority": "low"},
  {"bst": "THE NEW CLASSIC", "product": "Elena Tote", "category": "Ảnh Lookbook", "link": "https://drive.google.com/drive/folders/1pY5OmlG5N8dwTKJjq7CnTIkDxvN4SMNd", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Elena Tote", "category": "Ảnh Daily", "link": "https://drive.google.com/drive/folders/1O3MXgmYqdLPF2NMbad0A1dtDwLxi8767", "type": "folder", "priority": "medium"},

  # Lucia Tote
  {"bst": "THE NEW CLASSIC", "product": "Lucia Tote", "category": "Ảnh hiển thị đầu tiên", "link": "https://drive.google.com/file/d/14itlksDNgEcJ5yB799bJlIUnKk-XkzAO/view", "type": "file", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Lucia Tote", "category": "Ảnh nền trơn", "link": "https://drive.google.com/drive/folders/1h1R50efVbKHdh2noNcQNo6GMmadMcg1W", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Lucia Tote", "category": "Ảnh Lookbook", "link": "https://drive.google.com/drive/u/1/folders/1pY5OmlG5N8dwTKJjq7CnTIkDxvN4SMNd", "type": "folder", "priority": "high"},
  {"bst": "THE NEW CLASSIC", "product": "Lucia Tote", "category": "Feedback", "link": "https://drive.google.com/drive/folders/1CFxxQp0RBqpahaTng3Xk4Wql04KVhFN8", "type": "folder", "priority": "low"},
  {"bst": "THE NEW CLASSIC", "product": "Lucia Tote", "category": "Ảnh Daily", "link": "https://drive.google.com/drive/u/1/folders/1CEg_VUdfHBk7RABRsPsv-gJQt_uabztN", "type": "folder", "priority": "medium"},

  # URBAN HEARTBEAT - Mia Bag
  {"bst": "URBAN HEARTBEAT", "product": "Mia Bag", "category": "Ảnh hiển thị đầu tiên", "link": "https://drive.google.com/file/d/1b1xdPHiaPuwsyCuQ8Yw-xNNdlDvz8W05/view", "type": "file", "priority": "high"},
  {"bst": "URBAN HEARTBEAT", "product": "Mia Bag", "category": "Ảnh nền trơn", "link": "https://drive.google.com/drive/folders/18zOOtfNlnQiKl5mkWx_3W6TD_Z6YbQzU", "type": "folder", "priority": "high"},
  {"bst": "URBAN HEARTBEAT", "product": "Mia Bag", "category": "Ảnh lookbook", "link": "https://drive.google.com/drive/u/1/folders/1U0XG9JQIVEfcEt3RtOx1vG0mOZoy5Wm0", "type": "folder", "priority": "high"},
  {"bst": "URBAN HEARTBEAT", "product": "Mia Bag", "category": "Feedback", "link": None, "type": "none", "priority": "low"},
  {"bst": "URBAN HEARTBEAT", "product": "Mia Bag", "category": "Ảnh daily", "link": "https://drive.google.com/drive/u/1/folders/1UKFV3rr6YOtJTRCy7J1_bEw8Azjj8kjP", "type": "folder", "priority": "medium"},

  # URBAN HEARTBEAT - Calla Bag
  {"bst": "URBAN HEARTBEAT", "product": "Calla Bag", "category": "Ảnh hiển thị đầu tiên", "link": "https://drive.google.com/file/d/1k9ptyYuoZwykMG4VleWQJ7kJKiuuAW5S/view", "type": "file", "priority": "high"},
  {"bst": "URBAN HEARTBEAT", "product": "Calla Bag", "category": "Ảnh nền trơn", "link": "https://drive.google.com/drive/folders/1pMp9qnuCQTHGYeD5DSwV3vSL3vK72NVV", "type": "folder", "priority": "high"},
  {"bst": "URBAN HEARTBEAT", "product": "Calla Bag", "category": "Ảnh Lookbook", "link": "https://drive.google.com/drive/u/1/folders/1U0XG9JQIVEfcEt3RtOx1vG0mOZoy5Wm0", "type": "folder", "priority": "high"},
  {"bst": "URBAN HEARTBEAT", "product": "Calla Bag", "category": "Feedback", "link": "https://drive.google.com/drive/folders/18FPkuQWyCUnBJxmFLhhFrgKyuOVgoIa8", "type": "folder", "priority": "low"},
  {"bst": "URBAN HEARTBEAT", "product": "Calla Bag", "category": "Ảnh Daily", "link": "https://drive.google.com/drive/u/1/folders/1zQROMW5336fKkupxKvKIUSO2G2T4CmfC", "type": "folder", "priority": "medium"},

  # Charm Lily + Lucky
  {"bst": "Charm Lily + Lucky", "product": "", "category": "Nền trơn + Ảnh hiển thị", "link": "https://drive.google.com/drive/folders/1cLoGDZz-DaGnjznmsa074XmPqrsST6rx", "type": "folder", "priority": "high"}
]

def sanitize_folder_name(name: str) -> str:
    if not name:
        return ""
    sanitized = re.sub(r'[\\/*?:"<>|]', '_', str(name).strip())
    return re.sub(r'\s+', ' ', sanitized).strip()

def extract_gdrive_id(url: str):
    if not url:
        return None, False
    m_folder = re.search(r'/folders/([a-zA-Z0-9_-]+)', url)
    if m_folder:
        return m_folder.group(1), True
    m_file = re.search(r'/file/d/([a-zA-Z0-9_-]+)', url)
    if m_file:
        return m_file.group(1), False
    m_id = re.search(r'[?&]id=([a-zA-Z0-9_-]+)', url)
    if m_id:
        return m_id.group(1), ("folder" in url.lower())
    return None, False

def count_existing_images(folder_path: Path) -> int:
    if not folder_path.exists():
        return 0
    valid_exts = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
    files = [
        f for f in folder_path.glob("*")
        if f.is_file() and f.suffix.lower() in valid_exts and f.stat().st_size > 500
    ]
    return len(files)

def download_file_direct_http(file_id: str, dest_path: Path):
    dest_path = Path(dest_path)
    if dest_path.is_dir() or str(dest_path).endswith(os.sep):
        dest_path = dest_path / f"photo_{file_id[:8]}.jpg"

    dest_path.parent.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    try:
        res = session.get(url, headers=headers, stream=True, timeout=20)
        confirm_token = None
        for k, v in res.cookies.items():
            if k.startswith("download_warning"):
                confirm_token = v
                break
        if not confirm_token:
            token_match = re.search(r'confirm=([0-9A-Za-z_]+)', res.text[:2000])
            if token_match:
                confirm_token = token_match.group(1)

        if confirm_token:
            confirm_url = f"https://drive.google.com/uc?export=download&confirm={confirm_token}&id={file_id}"
            res = session.get(confirm_url, headers=headers, stream=True, timeout=20)

        cd = res.headers.get("Content-Disposition", "")
        if "filename=" in cd:
            fn_match = re.search(r'filename\*?=(?:UTF-8\'\')?["\']?([^";\r\n]+)', cd)
            if fn_match:
                real_name = unquote(fn_match.group(1).strip('"\' '))
                dest_path = dest_path.parent / real_name

        with open(dest_path, "wb") as f:
            for chunk in res.iter_content(chunk_size=65536):
                if chunk:
                    f.write(chunk)

        if dest_path.exists() and dest_path.stat().st_size > 500:
            print(f"      [✓ Tải xong file]: {dest_path.name} ({dest_path.stat().st_size // 1024} KB)")
            return True
        return False
    except Exception:
        return False

# Biến toàn cục kiểm soát số ảnh tối đa tải trong mỗi folder photoshoot
CURRENT_FOLDER_IMAGE_COUNT = 0
CURRENT_TARGET_DIR = None

ORIGINAL_GDOWN_DOWNLOAD = gdown.download

def limited_gdown_download(*args, **kwargs):
    """Giới hạn tải tối đa 3-4 ảnh mỗi folder và bỏ qua file video/hệ thống"""
    global CURRENT_FOLDER_IMAGE_COUNT, CURRENT_TARGET_DIR

    output = kwargs.get("output") or (args[1] if len(args) > 1 else "")
    out_str = str(output).lower()

    # Bỏ qua file rác hoặc video nặng
    if any(out_str.endswith(ext) for ext in [".mp4", ".mov", ".avi", ".mkv", ".db", ".ini", ".zip", ".rar"]):
        return None

    # Nếu đã đủ số lượng ảnh chọn lọc cho thư mục này, bỏ qua các file còn lại của buổi chụp
    if CURRENT_FOLDER_IMAGE_COUNT >= MAX_IMAGES_PER_FOLDER:
        return None

    try:
        res = ORIGINAL_GDOWN_DOWNLOAD(*args, **kwargs)
        if res and Path(res).exists() and Path(res).stat().st_size > 500:
            CURRENT_FOLDER_IMAGE_COUNT += 1
            print(f"      [+ Đã chọn ảnh {CURRENT_FOLDER_IMAGE_COUNT}/{MAX_IMAGES_PER_FOLDER}]: {Path(res).name}")
            return res
    except Exception:
        pass

    # Fallback HTTP streaming nếu gdown bị Google chặn
    url = kwargs.get("url") or (args[0] if args else None)
    file_id = kwargs.get("id")
    if not file_id and url:
        m = re.search(r'[?&]id=([a-zA-Z0-9_-]+)', str(url))
        if m:
            file_id = m.group(1)

    if file_id and output:
        if download_file_direct_http(file_id, Path(output)):
            CURRENT_FOLDER_IMAGE_COUNT += 1
            return output

    return None

gdown.download = limited_gdown_download

def copy_curated_flatlays(source_dir: Path, target_dir: Path, count: int = 4):
    """Sao chép nhanh 4 ảnh flatlay từ Mila Bag sang Nina/Elena để tiết kiệm mạng"""
    target_dir.mkdir(parents=True, exist_ok=True)
    if count_existing_images(target_dir) >= count:
        return True

    if not source_dir.exists():
        return False

    valid_exts = {".jpg", ".jpeg", ".png", ".webp"}
    source_photos = [f for f in source_dir.glob("*") if f.is_file() and f.suffix.lower() in valid_exts]

    if not source_photos:
        return False

    # Chọn 4 ảnh cách đều nhau trong buổi chụp flatlay
    step = max(1, len(source_photos) // count)
    selected = source_photos[::step][:count]

    for p in selected:
        dest_file = target_dir / p.name
        if not dest_file.exists():
            shutil.copy2(p, dest_file)

    copied_cnt = count_existing_images(target_dir)
    print(f"      [✓ Tận dụng Flatlay BST]: Đã sao chép {copied_cnt} ảnh flatlay tiêu biểu.")
    return True

def process_item(item, base_output_dir: Path, idx: int, total: int):
    global CURRENT_FOLDER_IMAGE_COUNT, CURRENT_TARGET_DIR
    CURRENT_FOLDER_IMAGE_COUNT = 0

    bst_dir = sanitize_folder_name(item["bst"])
    prod_dir = sanitize_folder_name(item["product"])
    cat_dir = sanitize_folder_name(item["category"])

    if prod_dir:
        target_dir = base_output_dir / bst_dir / prod_dir / cat_dir
    else:
        target_dir = base_output_dir / bst_dir / cat_dir

    CURRENT_TARGET_DIR = target_dir
    target_dir.mkdir(parents=True, exist_ok=True)
    link = item["link"]
    item_type = item["type"]
    priority = item.get("priority", "medium")

    title = f"[{idx:2d}/{total}] {item['bst']}"
    if item['product']:
        title += f" -> {item['product']}"
    title += f" -> {item['category']}"

    print(f"\n{title}")

    if not link:
        print("      [-] Không có liên kết Drive (bỏ qua).")
        return "no_link", 0

    # 1. Bỏ qua mục feedback không cần thiết cho web sản phẩm (chủ yếu là video khách)
    if priority == "low" or "feedback" in item["category"].lower():
        print("      [i] Mục Feedback (bỏ qua để tối ưu web - không tải video).")
        return "skipped_low_priority", count_existing_images(target_dir)

    # 2. Kiểm tra nếu đã có đủ 3-4 ảnh thì bỏ qua ngay
    existing_cnt = count_existing_images(target_dir)
    if item_type == "file" and existing_cnt >= 1:
        print(f"      [✓ ĐÃ CÓ] Đã có ảnh hiển thị (bỏ qua).")
        return "already_done", existing_cnt
    elif item_type != "file" and existing_cnt >= MAX_IMAGES_PER_FOLDER:
        print(f"      [✓ ĐÃ CÓ] Đã có đủ {existing_cnt} ảnh chọn lọc cho web (bỏ qua).")
        return "already_done", existing_cnt

    # 3. Tận dụng Flatlay dùng chung của BST THE NEW CLASSIC
    if item_type == "copy_flatlay":
        mila_flatlay_dir = base_output_dir / "THE NEW CLASSIC" / "Mila Bag" / "Flatlay"
        if copy_curated_flatlays(mila_flatlay_dir, target_dir, MAX_IMAGES_PER_FOLDER):
            return "copied", count_existing_images(target_dir)

    drive_id, detected_is_folder = extract_gdrive_id(link)
    is_folder = (item_type == "folder") or detected_is_folder

    # 4. Tệp đơn lẻ (Ảnh hiển thị đầu tiên): Tải qua HTTP trực tiếp
    if not is_folder and drive_id:
        print(f"      -> Đang tải ảnh hiển thị chính (ID: {drive_id})...")
        if download_file_direct_http(drive_id, target_dir):
            return "downloaded", count_existing_images(target_dir)

    # 5. Thư mục photoshoot: Tải chọn lọc tối đa 3-4 ảnh
    if is_folder and drive_id:
        clean_url = f"https://drive.google.com/drive/folders/{drive_id}"
        print(f"      -> Kết nối folder Drive (lấy tối đa {MAX_IMAGES_PER_FOLDER} ảnh tiêu biểu)...")
        try:
            gdown.download_folder(url=clean_url, output=str(target_dir), quiet=True, use_cookies=False)
        except Exception:
            pass

        final_cnt = count_existing_images(target_dir)
        if final_cnt > existing_cnt:
            print(f"      [✓] Hoàn thành! Lấy được {final_cnt} ảnh cho web.")
            return "downloaded", final_cnt
        elif final_cnt > 0:
            print(f"      [✓] Hiện đã có {final_cnt} ảnh sẵn sàng.")
            return "partial", final_cnt
        else:
            print(f"      [!] Folder này Google đang hạn chế truy cập bot.")
            return "failed", 0

    return "failed", 0

def main():
    script_dir = Path(__file__).resolve().parent
    base_output_dir = (script_dir / "downloaded_images").resolve()
    base_output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 75)
    print("      LIS WEB ASSETS DOWNLOADER - BẢN CHỌN LỌC ẢNH LÀM WEB SẢN PHẨM")
    print("=" * 75)
    print(f"Thư mục lưu ảnh: {base_output_dir}")
    print(f"Tiêu chí: Chỉ lấy ảnh đại diện + 3-4 ảnh tiêu biểu mỗi danh mục, bỏ qua video")
    print("=" * 75)

    results = []
    total = len(SHEET2_MAPPING)

    for idx, item in enumerate(SHEET2_MAPPING, 1):
        try:
            status, cnt = process_item(item, base_output_dir, idx, total)
            results.append({
                "item": f"{item['bst']} - {item['product']} - {item['category']}",
                "status": status,
                "count": cnt,
                "link": item["link"]
            })
        except Exception as e:
            results.append({
                "item": f"{item['bst']} - {item['product']} - {item['category']}",
                "status": "error",
                "count": 0,
                "link": item["link"]
            })
        time.sleep(0.2)

    # Tổng kết
    print("\n" + "=" * 75)
    print("                BẢNG TỔNG KẾT ẢNH SẴN SÀNG LÀM WEB SẢN PHẨM")
    print("=" * 75)
    print(f"{'HẠNG MỤC SẢN PHẨM':<45} | {'TRẠNG THÁI':<15} | {'SỐ ẢNH'}")
    print("-" * 75)

    total_images = 0
    for r in results:
        status_label = "Sẵn sàng" if r["count"] > 0 else "Chưa có ảnh"
        if r["status"] == "skipped_low_priority":
            status_label = "Bỏ qua (Video)"
        elif r["status"] == "no_link":
            status_label = "Không có link"
        print(f"{r['item'][:45]:<45} | {status_label:<15} | {r['count']} ảnh")
        total_images += r["count"]

    print("=" * 75)
    print(f"TỔNG SỐ ẢNH ĐÃ CHUẨN BỊ XONG ĐỂ LÀM WEB: {total_images} ảnh")
    print(f"Thư mục lưu: {base_output_dir}")
    print("=" * 75)

if __name__ == "__main__":
    main()
