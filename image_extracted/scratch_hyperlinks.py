import sys
import openpyxl
import re

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook(r'c:\Users\hoang\Documents\Code\lis\image_extracted\[LIS] Sản phẩm.xlsx', data_only=False)
sheet = wb['Hình ảnh']

print(f"Sheet relationships / hyperlinks:")
# Check all hyperlinks in sheet
for hl in sheet._hyperlinks:
    print(f"Cell ref: {hl.ref}, target: {hl.target}, tooltip: {hl.tooltip}, location: {hl.location}")

# Also check row 7, 13, 29, 34 in detail
for r in [7, 13, 19, 29, 34]:
    print(f"\n--- Checking Row {r} ---")
    for c in range(1, 15):
        cell = sheet.cell(r, c)
        if cell.value is not None:
            print(f"  Col {c} ({cell.coordinate}): value={repr(cell.value)}, hl={cell.hyperlink.target if cell.hyperlink else None}")
