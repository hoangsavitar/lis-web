const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const root=path.resolve(__dirname,'..');
const resolve=Module._resolveFilename;
Module._resolveFilename=function(id,...args){return resolve.call(this,id.startsWith('@/')?path.join(root,id.slice(2)):id,...args);};
// Icon geometry is outside this resource-loading test. The package's ESM/CJS
// distribution cannot be required directly by this standalone Node harness.
const load=Module._load;
Module._load=function(id,...args){
 if(id==='@phosphor-icons/react/dist/ssr')return {
  CaretLeft:()=>React.createElement('svg'),CaretRight:()=>React.createElement('svg'),
  ArrowRight:()=>React.createElement('svg'),ArrowUpRight:()=>React.createElement('svg'),
 };
 return load.call(this,id,...args);
};
const compile=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);
require.extensions['.ts']=compile;
require.extensions['.tsx']=compile;
const {PRODUCTS}=require('../data/products.ts');
const {ProductGallery}=require('../components/product/product-gallery.tsx');
const {CampaignHero}=require('../components/home/campaign-hero.tsx');
const {BrandLogo}=require('../components/layout/brand-logo.tsx');
const media=require('../data/storefront-media.json');

test('the initial Irisa gallery requests only its first two large slides while keeping every thumbnail',()=>{
 const product=PRODUCTS.find(p=>p.id==='irisa-bag');
 const variant=product.variants.find(v=>v.id==='irisa-bag-pink');
 const html=renderToStaticMarkup(React.createElement(ProductGallery,{variant,title:product.title}));
 const images=html.match(/<img\b[^>]*>/g);
 const thumbnails=images.filter(tag=>tag.includes('width="72"'));
 assert.equal(thumbnails.length,variant.gallery.length);
 assert.equal(images.length-thumbnails.length,2);
 assert.equal(images.filter(tag=>tag.includes('fetchPriority="high"')).length,1);
 assert.ok(thumbnails.every(tag=>tag.includes('-160.webp 160w')));
 assert.match(html,/Ảnh tiếp theo/);
});
test('the banner serves a small preencoded WebP at high priority without the runtime image endpoint',()=>{
 const html=renderToStaticMarkup(React.createElement(CampaignHero));
 assert.ok(!html.includes('/_next/image'));
 assert.match(html,/fetchPriority="high"/);
 assert.match(html,/loading="eager"/);
 assert.match(html,/1081px, 100vw/);
 for(const width of media.campaign.widths){
  const file=path.join(root,'public',`${media.campaign.base}-${width}.webp`);
  assert.ok(fs.statSync(file).size<60000);
 }
});
test('noncritical logos do not create image preloads and every catalog URL has a cache revision',()=>{
 const html=renderToStaticMarkup(React.createElement(BrandLogo,{variant:'white'}));
 assert.match(html,/loading="lazy"/);
 assert.ok(!html.includes('rel="preload"'));
 for(const product of PRODUCTS)for(const variant of product.variants)for(const asset of variant.gallery){
  assert.match(asset.base,/^\/media\/catalog\/.+-[0-9a-f]{16}$/);
  assert.ok(asset.widths.includes(Math.min(160,asset.width)));
  for(const width of asset.widths)assert.ok(fs.existsSync(path.join(root,'public',`${asset.base}-${width}.webp`)));
 }
 const headers=fs.readFileSync(path.join(root,'public/_headers'),'utf8');
 assert.match(headers,/\/media\/\*\n  Cache-Control: public, max-age=31536000, immutable/);
 assert.ok(!headers.includes('/images/catalog/*'));
});
