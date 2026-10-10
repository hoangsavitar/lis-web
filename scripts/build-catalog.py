"""Rebuild assets from approved XLSX: python scripts/build-catalog.py export.xlsx."""
import io,json,sys,subprocess
from pathlib import Path
import openpyxl
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parents[1]
media_roles=json.loads((ROOT/'data/product-media.json').read_text(encoding='utf-8'))
source=json.loads((ROOT/'planning/source-audit/catalog-source.json').read_text(encoding='utf-8'))
book=openpyxl.load_workbook(sys.argv[1]); images={}
for sheet in book:
 for image in sheet._images:
  a=image.anchor._from
  images[f'{openpyxl.utils.get_column_letter(a.col+1)}{a.row+1}']=ImageOps.exif_transpose(Image.open(io.BytesIO(image._data()))).convert('RGB')
slugs=['mila-bag','nina-bag','lucia-tote','elena-tote','lucky-charm','mia-bag','calla-bag','lily-charm']
colors=[['burgundy','earth','milk'],['burgundy','chocolate','milk'],['chocolate','milk','earth','black'],['brown','black'],['brown','red','beige'],['beige','brown','avocado','red'],['moss','brown','black'],['brown','red','beige']]
hexes=[['#702e38','#996345','#d4c5a7'],['#602630','#392d28','#d8cebc'],['#49312b','#d0b78e','#a86745','#242322'],['#985b36','#22221f'],['#a16f43','#a4464c','#d8c7a3'],['#dfd8bd','#483032','#9eac75','#7b303c'],['#464c35','#423930','#202321'],['#b67b50','#ae3c42','#d6c19b']]
dims=['19 × 12 × 12 cm','20.5 × 11.5 × 21.5 cm','38 × 11 × 28 cm','32 × 12 × 26 cm','6 cm','21 × 10 × 16 cm','26 × 6 × 26 cm','6 cm']
subtitles=["Phom đan nhỏ xinh, vừa thanh lịch cho ngày đi làm, vừa nhẹ nhàng cho một buổi cà phê cuối tuần.","Dáng hobo mềm mại, đường đan nổi bật. Một chiếc túi dễ phối cho những ngày muốn giữ mọi thứ gọn gàng.","Một chiếc tote đứng dáng cho ngày đi làm, đi học, với bề mặt đan và lớp lót mềm mại.","Đan bản lớn trên phom tote rũ mềm, rộng rãi cho một ngày nhiều đồ mà vẫn giữ vẻ thanh lịch.","Lấy cảm hứng từ cỏ bốn lá, Lucky mang một lời chúc may mắn nhỏ đến chiếc túi nàng yêu.","Nhỏ gọn cho ngày thường, thanh lịch cho những buổi hẹn. Mia linh hoạt từ xách tay đến đeo vai hoặc đeo chéo.","Đường đan bản lớn, phom túi dẹt ôm gọn khi đeo vai. Charm hoa đồng màu làm chiếc túi thêm mềm mại.","Bông hoa năm cánh với khoen ánh vàng, một điểm xuyết xinh xắn cho chiếc túi quen hoặc chùm chìa khóa."]
summaries=["Túi đan nhỏ với hai dây tháo rời và chân đế kim loại. Có thể đổi dây để cầm tay, đeo vai hoặc đeo chéo.","Túi dáng hobo với khóa nam châm và dây tháo rời. Có thể cầm tay, đeo vai hoặc đeo chéo.","Túi tote đan có lớp lót và nhiều ngăn để sắp xếp đồ dùng. Kích thước 38 × 11 × 28 cm.","Túi tote đan bản lớn, dáng mềm. Có túi nhỏ tháo rời đi kèm để đựng các món đồ riêng.","Charm lấy cảm hứng từ cỏ bốn lá, với dây treo đồng màu. Có ba màu nâu, đỏ và be để phối cùng túi xách hoặc phụ kiện cá nhân.","Túi khóa zip, hai ngăn phụ và bốn màu để chọn. Dây đeo linh hoạt để thay đổi cách mang.","Túi đan bản lớn bằng da PU, có túi dây rút và hai ngăn phụ bên trong. Kèm charm hoa đồng màu.","Charm hoa năm cánh với khoen kim loại ánh vàng. Có thể gắn vào túi xách hoặc chùm chìa khóa."]
catalog=[]; manifest=[]
for idx,item in enumerate(source['products']):
 slug=slugs[idx]; variants=[]
 for j,v in enumerate(item['variants']):
  cell=f"D{v['sourceRow']}"; im=images[cell]
  original_file=f"product-images/{slug}/{colors[idx][j]}/01-front.jpg"
  original_path=ROOT/original_file
  original_path.parent.mkdir(parents=True,exist_ok=True)
  if not original_path.exists(): im.save(original_path,quality=95)
  media_kind=media_roles.get(original_file,{}).get("kind")
  if media_kind not in ["packshot","lifestyle","detail"]: raise ValueError(f"Cần phân loại ảnh: {original_file}")
  folder=ROOT/'public/images/catalog'/slug/colors[idx][j];folder.mkdir(parents=True,exist_ok=True);sizes=[]
  for width in [320,480,640,960,1280]:
   width=min(width,im.width)
   if width in sizes:continue
   sizes.append(width)
   im.resize((width,round(im.height*width/im.width)),Image.Resampling.LANCZOS).save(folder/f'front-{width}.webp','WEBP',quality=83,method=6)
  base=f'/images/catalog/{slug}/{colors[idx][j]}/front'
  asset={'src':f'{base}-{max(sizes)}.webp','width':im.width,'height':im.height,'widths':sizes,'base':base,'kind':media_kind,'sourceFile':original_file,'sourceCell':cell,'alt':f"{item['name']} — {v['color']}"}
  variants.append({'id':f'{slug}-{colors[idx][j]}','name':v['color'],'hex':hexes[idx][j],'image':asset['src'],'gallery':[asset],'sku':v['rawSku'].strip(),'skuVerified':cell!='D6','availability':'unknown','price':None,'sourceRow':v['sourceRow']})
  manifest.append({'product':slug,'variant':variants[-1]['id'],**asset})
 catalog.append({'id':slug,'slug':slug,'title':item['name'],'subtitle':subtitles[idx],'description':summaries[idx],'collection':'The New Classic' if idx<5 else 'Urban Heartbeat','dimensions':dims[idx],'material':'Da PU','category':'phu-kien-charm' if idx in [4,7] else ('tui-tote' if idx in [2,3] else 'tui-xach-tay'),'variants':variants,'heroVariantId':variants[2]['id'] if idx==5 else variants[0]['id'],'sourceCell':item['sourceCell'],'details':(['Kèm charm hoa đồng màu','Túi dây rút và hai ngăn phụ bên trong'] if idx==6 else ['Kèm túi nhỏ tháo rời'] if idx==3 else []),'price':0,'comparePrice':0,'discountPercentage':0,'inStock':False,'rating':0,'reviewCount':0,'weight':'','sizes':['Tiêu chuẩn'],'categoryName':'Charm & phụ kiện' if idx in [4,7] else 'Túi xách','mainImage':variants[2]['image'] if idx==5 else variants[0]['image'],'hoverImage':'','gallery':[v['image'] for v in variants],'colors':[{'name':v['name'],'hex':v['hex'],'image':v['image']} for v in variants],'sku':variants[0]['sku']})
# Manually supplied products are retained ahead of the original XLSX catalog.
additional_file=ROOT/'data/additional-products.json'
if additional_file.exists():
 extra=json.loads(additional_file.read_text(encoding='utf-8'))
 extra_ids={p['id'] for p in extra}
 if len(extra_ids)!=len(extra): raise ValueError('Duplicate additional product IDs')
 catalog=extra+[p for p in catalog if p['id'] not in extra_ids]
(ROOT/'data/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'planning/source-audit/asset-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Built {len(catalog)} products, {sum(len(p["variants"]) for p in catalog)} variants')

# Folder photos and their explicit roles remain authoritative; retain additional shots.
subprocess.run(["node",str(ROOT/"scripts/sync-product-images.mjs")],cwd=ROOT,check=True)
