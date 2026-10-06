Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  LIS Atelier - Trích xuất dữ liệu từ Excel & Drive" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan

node parse_excel.js

Write-Host "`nHoàn tất! Bấm phím bất kỳ để đóng cửa sổ..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
