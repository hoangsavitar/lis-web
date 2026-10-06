@echo off
chcp 65001 > nul
setlocal

echo ======================================================================
echo    LIS PRODUCTS IMAGES DOWNLOADER (TAI ANH THEO DUNG SHEET 2 EXCEL)
echo ======================================================================
echo.

set "PY_EXE=C:\Users\hoang\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if exist "%PY_EXE%" (
    echo [OK] Su dung Python tai: "%PY_EXE%"
    "%PY_EXE%" download_products_images.py %*
) else (
    echo [INFO] Su dung Python mac dinh he thong...
    python download_products_images.py %*
)

echo.
echo ======================================================================
echo    DA XONG! Vui long kiem tra thu muc 'downloaded_images'
echo ======================================================================
pause
