# Script đẩy mã nguồn lên GitHub
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Đang đẩy mã nguồn lên: https://github.com/hoangsavitar/lis-web.git" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Khởi tạo git..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[1/5] Git repository đã tồn tại." -ForegroundColor Green
}

Write-Host "[2/5] Thêm tệp tin (git add)..." -ForegroundColor Yellow
git add .

Write-Host "[3/5] Tạo commit..." -ForegroundColor Yellow
git commit -m "feat: hoàn thiện giao diện Contemporary Chic & Youthful Luxury, Mini-Cart Drawer và tối ưu typography"

Write-Host "[4/5] Cấu hình branch main & remote..." -ForegroundColor Yellow
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/hoangsavitar/lis-web.git

Write-Host "[5/5] Đẩy mã nguồn lên GitHub (git push)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[LƯU Ý] Nếu GitHub repo đã có sẵn commit (như README), hãy chạy:" -ForegroundColor Magenta
    Write-Host "git pull origin main --rebase" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
} else {
    Write-Host "`n========================================================" -ForegroundColor Green
    Write-Host "  ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "  Repo: https://github.com/hoangsavitar/lis-web" -ForegroundColor Green
    Write-Host "========================================================" -ForegroundColor Green
}
