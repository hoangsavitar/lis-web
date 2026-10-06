@echo off
chcp 65001 > nul
echo ========================================================
echo   Đang chuẩn bị đẩy mã nguồn lên GitHub:
echo   https://github.com/hoangsavitar/lis-web.git
echo ========================================================

echo [1/4] Kiểm tra trạng thái Git...
git status --short

echo.
echo [2/4] Đang thêm toàn bộ tệp tin thay đổi (git add .)...
git add .

echo.
echo [3/4] Đang tạo commit...
git commit -m "feat: cập nhật giao diện shop LIS, brand assets, catalog sản phẩm và bộ công cụ ảnh Drive"

echo.
echo [4/4] Đang đẩy lên GitHub (git push origin main)...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [LƯU Ý] Nếu gặp lỗi xung đột hoặc branch chưa đồng bộ, hãy thử:
    echo git pull origin main --rebase
    echo git push origin main
) else (
    echo.
    echo ========================================================
    echo   ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!
    echo   Xem tại: https://github.com/hoangsavitar/lis-web
    echo ========================================================
)

pause
