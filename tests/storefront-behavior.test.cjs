const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
const ts=require('typescript');
const root=path.resolve(__dirname,'..');
const resolve=Module._resolveFilename;
Module._resolveFilename=function(id,...args){return resolve.call(this,id.startsWith('@/')?path.join(root,id.slice(2)):id,...args);};
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file);
const storage=new Map();
global.localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)};
const {PRODUCTS}=require('../data/products.ts');
const {useCartStore,sanitizeSavedItems}=require('../lib/store/cart-store.ts');
const {collectionUrl,resolveCollectionColor}=require('../lib/collection-filters.ts');
const {getCardMedia}=require('../lib/product-media.ts');
const product=PRODUCTS.find(p=>p.id==='mia-bag');
const [first,second]=product.variants;
const reset=()=>useCartStore.setState({items:[],isOpen:false});

test('saving keeps browsing and adding the same color does not increase quantity',()=>{
 reset();
 useCartStore.getState().addVariant(product,first);
 useCartStore.getState().addVariant(product,first);
 assert.equal(useCartStore.getState().isOpen,false);
 assert.equal(useCartStore.getState().items.length,1);
 assert.equal(useCartStore.getState().items[0].quantity,1);
});
test('heart toggles the selected color without removing another color',()=>{
 reset();
 useCartStore.getState().toggleVariant(product,first);
 useCartStore.getState().toggleVariant(product,second);
 useCartStore.getState().toggleVariant(product,first);
 assert.deepEqual(useCartStore.getState().items.map(i=>i.variantId),[second.id]);
 assert.equal(useCartStore.getState().isOpen,false);
});
test('saved selection survives storage hydration with its color and quantity',()=>{
 reset();
 useCartStore.getState().addVariant(product,second);
 useCartStore.getState().updateQuantity(second.id,3);
 const persisted=storage.get('lis_luxury_cart');
 useCartStore.setState({items:[]});
 storage.set('lis_luxury_cart',persisted);
 useCartStore.persist.rehydrate();
 const item=useCartStore.getState().items[0];
 assert.equal(item.variantId,second.id);
 assert.equal(item.color,second.name);
 assert.equal(item.quantity,3);
 assert.equal(JSON.parse(persisted).version,2);
});
test('unavailable and foreign variants cannot be added',()=>{
 reset();
 useCartStore.getState().addVariant(product,{...first,availability:'sold-out'});
 useCartStore.getState().addVariant(product,{...first,id:'not-a-variant'});
 assert.equal(useCartStore.getState().items.length,0);
});
test('existing saved lists keep quantities and discard missing products',()=>{
 const items=sanitizeSavedItems([{productId:product.id,variantId:first.id,quantity:7},{productId:'missing',variantId:first.id,quantity:1}]);
 assert.equal(items.length,1);
 assert.equal(items[0].quantity,7);
 assert.equal(items[0].variantId,first.id);
});
test('every color can be restored from its category URL and the all-products URL',()=>{
 for(const p of PRODUCTS)for(const variant of p.variants)for(const slug of ['all',p.category]){
  const url=new URL(collectionUrl(slug,variant.name),'http://example.test');
  assert.equal(url.pathname,`/collections/${slug}`);
  assert.equal(resolveCollectionColor(slug,url.searchParams.get('color')),variant.name);
 }
 assert.equal(collectionUrl('all'),'/collections/all');
 assert.equal(resolveCollectionColor('phu-kien-charm','Hồng'),'all');
 assert.equal(resolveCollectionColor('all','unknown'),'all');
});

test('Lucia black previews its existing second studio angle when styling is absent',()=>{
 const variant=PRODUCTS.find(p=>p.id==='lucia-tote').variants.find(v=>v.id==='lucia-tote-black');
 const {primary,secondary}=getCardMedia(variant);
 assert.equal(primary.sourceFile,'product-images/lucia-tote/black/01-front.jpg');
 assert.equal(secondary.sourceFile,'product-images/lucia-tote/black/02-angle.jpg');
 assert.equal(secondary.kind,'packshot');
 for(const width of secondary.widths){
  assert.ok(fs.existsSync(path.join(root,'public',`${secondary.base}-${width}.webp`)));
 }
});
test('hover keeps styling priority and always selects a distinct photo from the same color',()=>{
 for(const p of PRODUCTS)for(const variant of p.variants){
  const {primary,secondary}=getCardMedia(variant);
  const styling=variant.gallery.find(a=>a.kind==='lifestyle'&&a.src!==primary.src);
  if(styling)assert.equal(secondary,styling);
  if(secondary){
   assert.ok(variant.gallery.includes(secondary));
   assert.notEqual(secondary.src,primary.src);
   assert.notEqual(secondary.kind,'detail');
  }
 }
});
test('a single studio photo plus detail photos does not create an unrelated hover',()=>{
 const variant=PRODUCTS.find(p=>p.id==='lucia-tote').variants.find(v=>v.id==='lucia-tote-black');
 const studio=variant.gallery[0];
 assert.equal(getCardMedia({...variant,gallery:[studio]}).secondary,undefined);
 const detail={...variant.gallery[1],kind:'detail'};
 assert.equal(getCardMedia({...variant,gallery:[studio,detail]}).secondary,undefined);
});
