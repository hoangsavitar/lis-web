@echo off
chcp 65001 > nul
setlocal

echo ======================================================================
echo    DANG XOA TOAN BO ANH VA VIDEO TRONG THU MUC 'downloaded_images'
echo    (GIU NGUYEN 100%% CAU TRUC THU MUC VA FILE info.txt CHUA LINK DRIVE)
echo ======================================================================
echo.

cd /d "%~dp0"

REM Xoa tat ca cac tep anh va video trong cac thu muc con
del /s /q /f "downloaded_images\*.jpg" 2>nul
del /s /q /f "downloaded_images\*.jpeg" 2>nul
del /s /q /f "downloaded_images\*.png" 2>nul
del /s /q /f "downloaded_images\*.webp" 2>nul
del /s /q /f "downloaded_images\*.gif" 2>nul
del /s /q /f "downloaded_images\*.mp4" 2>nul
del /s /q /f "downloaded_images\*.mov" 2>nul
del /s /q /f "downloaded_images\*.db" 2>nul

REM Neu co Python thi chay them script don dep thu muc rac
set "PY_EXE=C:\Users\hoang\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%PY_EXE%" (
    "%PY_EXE%" clear_images.py
)

echo.
echo ======================================================================
echo    DA XOA SACH TOAN BO ANH!
echo    Cau truc thu muc van duoc giu nguyen 100%% de ban tu tai tay.
echo ======================================================================
pause
