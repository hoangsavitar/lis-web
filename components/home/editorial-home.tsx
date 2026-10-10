import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PRODUCTS, productUrl } from "@/data/products";
import { HOME_EDITORIAL } from "@/data/home-editorial";
import { ProductCard } from "@/components/product/product-card";
import { VariantImage } from "@/components/product/variant-image";

function findItem(item: {id: string; variantId: string}) {
 const product=PRODUCTS.find(p=>p.id===item.id)!;
 const variant=product.variants.find(v=>v.id===item.variantId)!;
 return {product,variant};
}
function ProductEdit({secondary=false}:{secondary?:boolean}){
 const items=secondary?HOME_EDITORIAL.secondary:HOME_EDITORIAL.primary;
 return <section className="home-product-edit" id={secondary?"more-designs":"thiet-ke"} aria-labelledby={secondary?"more-designs-title":"designs-title"}>
  <div className="editorial-heading"><h2 id={secondary?"more-designs-title":"designs-title"}>{secondary?"Túi xách & charm":"Chọn chiếc túi của bạn"}</h2><Link className="text-link" href="/collections/all">Xem tất cả<ArrowRight size={20} aria-hidden="true"/></Link></div>
  <div className="home-product-grid">{items.map(item=>{const {product}=findItem(item);return <ProductCard key={product.id} product={product} initialVariantId={item.variantId} anchor sizes="(max-width: 359px) 100vw, (max-width: 1199px) 50vw, 25vw"/>;})}</div>
 </section>;
}
export function EditorialHome(){
 const {product:detailProduct,variant:detailVariant}=findItem(HOME_EDITORIAL.detail);
 const detailAsset=detailVariant.gallery[HOME_EDITORIAL.detail.sourceIndex];
 return <>
  <ProductEdit/>
  <section className="lis-lookbook" id="lookbook" aria-labelledby="lookbook-title">
   <div className="lookbook-inner">
    <div className="editorial-heading"><h2 id="lookbook-title">Cảm hứng phối đồ cùng LIS</h2></div>
    <div className="lookbook-pair">{HOME_EDITORIAL.lookbook.map((item,index)=>{const {product,variant}=findItem(item);const asset=variant.gallery.find(a=>a.kind==="lifestyle")!;const sizes=index===0?"(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(41.667vw - 30px), (max-width: 1359px) calc(41.667vw - 50px), 517px":"(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(58.333vw - 42px), (max-width: 1359px) calc(58.333vw - 70px), 723px";return <figure key={item.id}><Link className="lookbook-image" href={productUrl(product,variant)} aria-label={"Xem "+product.title+" màu "+variant.name}><VariantImage asset={asset} sizes={sizes}/></Link><figcaption><Link href={productUrl(product,variant)}>{item.caption}<ArrowUpRight size={20} aria-hidden="true"/></Link></figcaption></figure>;})}</div>
   </div>
  </section>
  <ProductEdit secondary/>
  <section className="lis-detail-story" id="chi-tiet-lis" aria-labelledby="detail-story-title">
   <div className="detail-story-image"><VariantImage asset={detailAsset} sizes="(max-width: 767px) 200vw, 100vw" className="craft-detail"/></div>
   <div className="detail-story-copy"><h2 id="detail-story-title">Bề mặt đan</h2><p>Đường đan và đường may trên Lucia Tote. Một góc nhìn gần hơn vào chiếc túi.</p><Link className="text-link" href={productUrl(detailProduct,detailVariant)}>Xem Lucia Tote<ArrowRight size={20} aria-hidden="true"/></Link></div>
  </section>
 </>;
}
