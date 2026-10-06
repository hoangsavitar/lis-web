# Script đẩy mã nguồn lên GitHub
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Đang đẩy mã nguồn lên: https://github.com/hoangsavitar/lis-web.git" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

Write-Host "`n[1/4] Kiểm tra trạng thái Git..." -ForegroundColor Yellow
git status --short

Write-Host "`n[2/4] Thêm tệp tin thay đổi (git add .)..." -ForegroundColor Yellow
git add .

Write-Host "`n[3/4] Tạo commit..." -ForegroundColor Yellow
git commit -m "feat: cập nhật giao diện shop LIS, brand assets, catalog sản phẩm và bộ công cụ ảnh Drive"

Write-Host "`n[4/4] Đẩy mã nguồn lên GitHub (git push origin main)..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[LƯU Ý] Nếu GitHub repo cần đồng bộ trước, hãy chạy:" -ForegroundColor Magenta
    Write-Host "git pull origin main --rebase" -ForegroundColor White
    Write-Host "git push origin main" -ForegroundColor White
} else {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host "  ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "  Repo: https://github.com/hoangsavitar/lis-web" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
}
