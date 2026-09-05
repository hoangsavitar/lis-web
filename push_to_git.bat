@echo off
chcp 65001 > nul
echo ========================================================
echo   Đang khởi tạo và đẩy mã nguồn lên GitHub:
echo   https://github.com/hoangsavitar/lis-web.git
echo ========================================================

if not exist .git (
    echo [1/5] Khởi tạo git repository...
    git init
) else (
    echo [1/5] Git repository đã tồn tại.
)

echo [2/5] Đang thêm toàn bộ tệp tin...
git add .

echo [3/5] Đang tạo commit...
git commit -m "feat: hoàn thiện giao diện Contemporary Chic & Youthful Luxury, Mini-Cart Drawer và tối ưu typography"

echo [4/5] Thiết lập nhánh main và remote...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/hoangsavitar/lis-web.git

echo [5/5] Đang đẩy lên GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [LƯU Ý] Nếu repo trên GitHub đã có sẵn README/LICENSE, hãy chạy lệnh sau:
    echo git pull origin main --rebase
    echo git push -u origin main
) else (
    echo.
    echo ========================================================
    echo   ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!
    echo   Xem tại: https://github.com/hoangsavitar/lis-web
    echo ========================================================
)

pause
