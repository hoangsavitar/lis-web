import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogFile = path.join(root, 'data/catalog.json');
const catalog = JSON.parse(await fs.readFile(catalogFile, 'utf8'));
const mediaRoles = JSON.parse(await fs.readFile(path.join(root, 'data/product-media.json'), 'utf8'));
const kinds = new Set(['packshot', 'lifestyle', 'detail']);
function getKind(sourceFile) {
  const mapped = mediaRoles[sourceFile]?.kind;
  const named = path.basename(sourceFile).toLowerCase().match(/(?:^|[-_])(packshot|lifestyle|detail)(?:[-_.]|$)/)?.[1];
  const kind = mapped || named;
  if (!kinds.has(kind)) throw new Error('Cần phân loại ảnh trong data/product-media.json: ' + sourceFile);
  return kind;
}
const manifest = [];
let count = 0;

for (const product of catalog) {
  for (const variant of product.variants) {
    const color = variant.id.slice(product.slug.length + 1);
    const inputDirectory = path.join(root, 'product-images', product.slug, color);
    const files = (await fs.readdir(inputDirectory))
      .filter(name => /\.(jpe?g|png|webp)$/i.test(name))
      .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
    if (!files.length) throw new Error(`Thiếu ảnh: product-images/${product.slug}/${color}`);
    const previous = variant.gallery[0];
    const outputDirectory = path.join(root, 'public/images/catalog', product.slug, color);
    await fs.mkdir(outputDirectory, { recursive: true });
    const gallery = [];
    for (let index = 0; index < files.length; index++) {
      const input = path.join(inputDirectory, files[index]);
      const sourceFile = `product-images/${product.slug}/${color}/${files[index]}`;
      const kind = getKind(sourceFile);
      // Rotate once according to EXIF, then drop metadata from customer-facing assets.
      const buffer = await sharp(input).rotate().toBuffer();
      const metadata = await sharp(buffer).metadata();
      const { width, height } = metadata;
      if (!width || !height) throw new Error(`Ảnh không hợp lệ: ${input}`);
      const name = index === 0 ? 'front' : `angle-${index + 1}`;
      const widths = [...new Set([320, 480, 640, 960, 1280].map(w => Math.min(w, width)))];
      for (const size of widths) {
        await sharp(buffer).resize({ width: size, withoutEnlargement: true })
          .webp({ quality: 80, effort: 5 }).toFile(path.join(outputDirectory, `${name}-${size}.webp`));
        const provenance = {prompt: `Origin: ${sourceFile}, supplied LIS product image (source cell ${previous?.sourceCell || 'manual addition'}). Responsive WebP via Sharp. No synthetic photography.`};
        await fs.writeFile(path.join(outputDirectory, `${name}-${size}.webp.json`), JSON.stringify(provenance, null, 2) + '\n');
      }
      const base = `/images/catalog/${product.slug}/${color}/${name}`;
      const asset = {
        src: `${base}-${Math.max(...widths)}.webp`, width, height, widths, base,
        kind, sourceCell: previous?.sourceCell || '',
        sourceFile,
        alt: `${product.title} — ${variant.name}${index ? ` — góc ${index + 1}` : ''}`,
      };
      gallery.push(asset);
      manifest.push({ product: product.slug, variant: variant.id, ...asset });
      count++;
    }
    variant.gallery = gallery;
    variant.image = (gallery.find(a => a.kind === 'packshot') || gallery.find(a => a.kind === 'lifestyle') || gallery[0]).src;
  }
  const hero = product.variants.find(v => v.id === product.heroVariantId) || product.variants[0];
  product.mainImage = hero.image;
  product.gallery = hero.gallery.map(a => a.src);
  product.colors = product.variants.map(({ name, hex, image }) => ({ name, hex, image }));
}
await fs.writeFile(catalogFile, JSON.stringify(catalog, null, 2) + '\n');
await fs.writeFile(path.join(root, 'planning/source-audit/asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Ảnh đã sẵn sàng: ${catalog.length} sản phẩm, ${catalog.flatMap(p => p.variants).length} màu, ${count} ảnh.`);
