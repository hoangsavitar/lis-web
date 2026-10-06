@echo off
chcp 65001 > nul
echo Đang trích xuất tài nguyên từ file [LIS] Sản phẩm.xlsx...
node parse_excel.js
pause
