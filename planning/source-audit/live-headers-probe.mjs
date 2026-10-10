// Public HTTP diagnostics only. These timings are not Lighthouse or browser load times.
import { writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const urls = [
  'https://lisbylii.com/',
  'https://lisbylii.com/_next/image?url=%2Fimages%2Fcampaigns%2F20-10%2Fcampaign-20-10.jpg&w=1920&q=85',
  'https://lisbylii.com/images/catalog/irisa-bag/pink/front-320.webp',
];
const entries = [];
for (const url of urls) {
  const start = performance.now();
  const response = await fetch(url, {
    headers: { Accept: 'image/avif,image/webp,image/*,*/*;q=0.8' },
    signal: AbortSignal.timeout(30000),
  });
  const headersReceivedMs = performance.now() - start;
  const body = await response.arrayBuffer();
  const headers = Object.fromEntries(
    ['content-type', 'content-length', 'content-encoding', 'cache-control', 'cf-cache-status', 'cf-ray', 'age', 'vary', 'server', 'server-timing']
      .map(key => [key, response.headers.get(key)])
  );
  entries.push({ url, status: response.status, headersReceivedMs: Math.round(headersReceivedMs), completeMs: Math.round(performance.now() - start), decodedBodyBytes: body.byteLength, headers });
}
const result = { capturedAt: new Date().toISOString(), note: 'One GET per URL from the local Node runtime, without network throttling. Headers-received timings include connection setup; not TTFB from a browser trace. Body bytes may be decoded if content-encoding is set.', entries };
await writeFile(new URL('./live-headers-2026-10-10.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
