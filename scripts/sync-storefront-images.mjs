import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sources = JSON.parse(await fs.readFile(path.join(root, 'data/storefront-image-sources.json'), 'utf8'));
async function encode(source, name, sizes, format) {
  const input = await fs.readFile(path.join(root, 'public', source));
  const image = sharp(input).rotate();
  const metadata = await image.metadata();
  const widths = [...new Set(sizes.map(w => Math.min(w, metadata.width)))];
  const profile = { widths, format, quality: 85, encoder: sharp.versions };
  const hash = createHash('sha256').update(input).update(JSON.stringify(profile)).digest('hex').slice(0, 16);
  const base = `/media/storefront/${name}-${hash}`;
  await fs.mkdir(path.join(root, 'public/media/storefront'), { recursive: true });
  for (const width of widths) {
    const output = path.join(root, 'public', `${base}-${width}.${format}`);
    let pipeline = sharp(input).rotate().resize({ width, withoutEnlargement: true });
    pipeline = format === 'webp' ? pipeline.webp({ quality: 85, effort: 5 }) : pipeline.png({ compressionLevel: 9 });
    await pipeline.toFile(output);
    await fs.writeFile(output + '.json', JSON.stringify({ prompt: `Origin: public/${source}. Supplied LIS asset resized and encoded with Sharp; no creative alterations.` }, null, 2) + '\n');
  }
  return { source: '/' + source, base, widths, format, width: metadata.width, height: metadata.height, src: `${base}-${widths.at(-1)}.${format}` };
}
const campaign = await encode(sources.campaign, 'campaign-20-10', [640, 1080, 1280, 1702], 'webp');
const logos = {};
for (const [color, source] of Object.entries(sources.logos)) {
  logos[color] = await encode(source, `logo-${color}`, [160, 256, 512, 1024], 'png');
}
await fs.writeFile(path.join(root, 'data/storefront-media.json'), JSON.stringify({ campaign, logos }, null, 2) + '\n');
console.log('Banner WebP và logo responsive có phiên bản đã sẵn sàng.');
