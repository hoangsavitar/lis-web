# Cloudflare Workers + Next.js — Cẩm nang deploy (đúc kết từ web LIS)

File này để LOCAL, không commit. Checklist dùng lại cho mọi project Next.js mới.

## 1. Chuẩn bị code (làm 1 lần / project)

### 1.1. Cài package
```powershell
npm install @opennextjs/cloudflare
npm install -D wrangler
```

### 1.2. `package.json` — scripts CHUẨN (quan trọng nhất)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:worker": "opennextjs-cloudflare build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "deploy": "opennextjs-cloudflare deploy",
    "preview": "opennextjs-cloudflare preview"
  }
}
```
**Bẫy từng gặp:** để `"build": "opennextjs-cloudflare build"` sẽ **lặp vô hạn**
(`opennext` bên trong tự gọi `npm run build` → gọi lại chính nó, log lặp
30+ lần `OpenNext — Cloudflare build`). Luôn tách: `build` = `next build` thuần,
opennext gọi qua script riêng `build:worker`.

### 1.3. `wrangler.jsonc` mẫu
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "ten-worker",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-09-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "directory": ".open-next/assets", "binding": "ASSETS" },
  "observability": { "enabled": true }
  // KV (nếu cần lưu trữ): tạo namespace trước (mục 3),
  // rồi thêm: "kv_namespaces": [{ "binding": "TEN_BINDING", "id": "ID" }],
}
```

### 1.4. `open-next.config.ts` tối thiểu
```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
export default defineCloudflareConfig();
```

### 1.5. `.gitignore` — không commit output build
```
.open-next/
.wrangler/
```

## 2. Luật code khi chạy trên Workers (khác local)

| Local (Node) | Workers | Cách xử lý |
|---|---|---|
| `fs.readFile/writeFile` ổ cứng | **Không có ổ cứng**, import `node:fs` tĩnh có thể nổ cả route | Chỉ `await import("node:fs")` trong `try/catch`, khi `process.versions?.node` |
| RAM/process dùng chung | Mỗi request có thể rơi vào **máy (isolate) khác nhau** | Dữ liệu chung phải qua **KV/D1**, RAM chỉ là fallback tạm |
| `randomInt/randomUUID` từ `node:crypto` | Dùng được với `nodejs_compat`, nhưng | Nên dùng `crypto.getRandomValues` / `crypto.randomUUID` global (chạy mọi nơi) |
| Biến môi trường `.env.local` | Không tồn tại trên Workers | Đọc binding qua `getCloudflareContext().env` (bọc `try/catch` để dev local không crash) |
| `NEXT_PUBLIC_*` | **Chốt lúc BUILD**, không đổi được sau deploy | Đặt trong **Build variables** trước khi build production |

Mẫu tham khảo trong repo này: `lib/gift-store.ts`
(KV khi có binding `GIFTS` → memory + file best-effort khi dev local).

## 3. KV — két chung (làm 1 lần, 2 phút)

Dashboard → Storage & databases → **KV** → Create namespace (ví dụ `GIFTS`)
→ bấm vào tên → copy **Namespace ID** → dán vào `wrangler.jsonc` → commit + push.
Chưa gắn KV web vẫn chạy nhưng dữ liệu mất mỗi lần redeploy/đổi isolate.

## 4. Cấu hình dashboard (Workers → worker → Settings → Build)

| Ô | Điền |
|---|---|
| Git repository | repo GitHub của project |
| Build command | `npm run build:worker` |
| Deploy command | `npm run deploy` |
| Version command | **để trống** (opennext deploy đã tự publish, để cả 2 dễ deploy đè) |
| Root directory | `/` |
| Production branch | `main` |
| Build watch paths | Include `*`, Exclude `node_modules/**, .git/` |

## 5. Biến + domain (Settings)

- **Variables and Secrets** → Add **Variable** (thường, không cần Secret nếu là URL công khai):
  `NEXT_PUBLIC_COMMON_QR_URL=https://<subdomain>.lisbylii.com/open`
  → Save xong **Redeploy** (biến public chốt lúc build).
- **Domains & Routes** → Add Custom Domain → `<subdomain>.lisbylii.com` → Activate.
  (Muốn test nhanh: bật workers.dev để có URL `https://<worker>.<acc>.workers.dev`.)
- Quy ước nhà này: web chính `lisbylii.com`, mỗi event 1 subdomain riêng
  (`2010.`, `83.`…) vì QR **in giấy không sửa được** — subdomain riêng theo event
  thì thiệp cũ mở đúng event cũ mãi mãi.

## 6. Quy trình deploy chuẩn

```powershell
git add -A
git status --short        # chắc chắn không có .open-next/, .env.local, data/
git commit -m "mo ta ngan gon"
git push origin main      # Cloudflare tự build + deploy
```
Vào Deployments xem log: phải **chỉ 1 lần** `OpenNext — Cloudflare build`,
cuối có `Worker saved in .open-next/worker.js` + Deploy success.

Verify production (thay domain):
1. Mở `https://<domain>/open` → 200.
2. Tạo 1 thư → được mã 6 số → nhập mã đó → mở được thư.
   (Tạo và nhập trên CÙNG domain production — mã local và production là 2 kho khác nhau.)
3. Mã demo `582913` luôn mở được (dùng để check nhanh web sống hay không).

## 7. Xem log production

Không còn tab Logs riêng: worker → tab **Observability** → log trực tiếp ở đó.
Nhanh hơn bằng CLI (đã `wrangler login` 1 lần):
```powershell
npx wrangler tail lis          # xem log realtime
npx wrangler versions list     # xem các bản deploy
```
Ô Errors = 0 mà chức năng sai → thường là lỗi logic/lưu trữ (như vụ KV),
không phải crash.

## 8. Sự cố từng gặp + cách fix

| Hiện tượng | Nguyên nhân | Fix |
|---|---|---|
| Log lặp `opennextjs-cloudflare build` 30+ lần | `build` script tự gọi chính nó (mục 1.2) | Tách `build` / `build:worker` |
| `Could not find compiled Open Next config` | Deploy (`wrangler deploy` thuần) chạy mà chưa có `.open-next/` | Build command phải là `npm run build:worker` |
| Tạo thư 500 trên Workers | `fs`/`path` Node trong code | Import động + `try/catch`, dùng KV (mục 2) |
| Nhập mã đúng vẫn báo sai (production) | Chưa gắn KV, request rơi vào isolate khác | Gắn KV (mục 3), tạo thư MỚI mà test |
| Dev local bung layout / chunk 404 sau khi `npm run build` | `next dev` và `next build` giẫm chung `.next/` | Tắt dev server → xóa `.next` → chạy lại `next dev` |
| CSS mới sửa không ăn (dev) | HMR serve CSS cũ trong giây lát | Hard refresh Ctrl+Shift+R |
| Trình duyệt tối tự nhuộm web thành đen | Force-dark của browser | `themeColor` + `colorScheme: "light"` trong `viewport` export của `layout.tsx` |
| Viền đen trên/dưới khi mở link trong Messenger | Khung app Messenger, web không chạm tới | Mở bằng Chrome/Safari trực tiếp; đây không phải lỗi web |
| Máy không phân giải được domain mới gắn | DNS cache local kẹt | `ipconfig /flushdns`, hoặc tắt/bật wifi trên điện thoại |
| `npm clean-install` fail trên Cloudflare | `package-lock.json` lệch sau khi sửa `package.json` | Chạy `npm install` ở local rồi commit cả lockfile |

## 9. Checklist project mới (copy-paste)

- [ ] `npm i @opennextjs/cloudflare` + `npm i -D wrangler`
- [ ] Scripts theo mục 1.2 (nhớ: `build` thuần `next build`)
- [ ] `wrangler.jsonc` + `open-next.config.ts` theo mẫu
- [ ] `.gitignore` có `.open-next/`, `.wrangler/`
- [ ] Code tuân thủ mục 2 (không `fs` cứng, KV cho dữ liệu chung)
- [ ] Tạo KV namespace trước nếu cần lưu trữ
- [ ] Dashboard: lệnh build/deploy, biến `NEXT_PUBLIC_*`, custom domain
- [ ] Push → xem log (1 lần build) → verify 3 bước mục 6
