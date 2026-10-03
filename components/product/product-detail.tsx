"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {type Product,type Variant,getDefaultVariant,PRODUCTS,productUrl} from "@/data/products";
import {VariantImage} from "./variant-image";
import {VariantSelector} from "./variant-selector";
import {ProductCard} from "./product-card";
import {useCartStore} from "@/lib/store/cart-store";
export function ProductDetail({product,initialVariantId}:{product:Product;initialVariantId?:string}){
 const resolve=(id?:string|null)=>product.variants.find(v=>v.id===id)||getDefaultVariant(product);
 const [variant,setVariant]=useState(()=>resolve(initialVariantId));const [invalid,setInvalid]=useState(!!initialVariantId&&!product.variants.some(v=>v.id===initialVariantId));
 const [active,setActive]=useState(0);const [sticky,setSticky]=useState(false);const cta=useRef<HTMLButtonElement>(null);const track=useRef<HTMLDivElement>(null);
 useEffect(()=>{setVariant(product.variants.find(v=>v.id===initialVariantId)||getDefaultVariant(product));setInvalid(!!initialVariantId&&!product.variants.some(v=>v.id===initialVariantId));setActive(0);track.current?.scrollTo({left:0,behavior:"instant"})},[product,initialVariantId]);
 const add=useCartStore(s=>s.addVariant);const cartOpen=useCartStore(s=>s.isOpen);
 const change=(v:Variant)=>{setVariant(v);setActive(0);setInvalid(false);window.history.pushState(null,"",productUrl(product,v));track.current?.scrollTo({left:0,behavior:"instant"})};
 useEffect(()=>{const restore=()=>{const id=new URLSearchParams(location.search).get("variant");setVariant(resolve(id));setInvalid(!!id&&!product.variants.some(v=>v.id===id));setActive(0);track.current?.scrollTo({left:0,behavior:"instant"})};window.addEventListener("popstate",restore);return()=>window.removeEventListener("popstate",restore)},[product]);
 useEffect(()=>{const el=cta.current;if(!el)return;const observer=new IntersectionObserver(([e])=>setSticky(!e.isIntersecting&&e.boundingClientRect.top<0),{threshold:0});observer.observe(el);return()=>observer.disconnect()},[]);
 const selectImage=(i:number)=>{setActive(i);const el=track.current;el?.scrollTo({left:el.clientWidth*i,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})};
 return <div className="pdp"><nav className="breadcrumbs" aria-label="Đường dẫn"><Link href="/collections/all">Bộ sưu tập</Link><span>/</span><span>{product.title}</span></nav>
 <div className="pdp-top"><div className="pdp-gallery"><div ref={track} className="gallery-track" onScroll={e=>{const el=e.currentTarget;setActive(Math.round(el.scrollLeft/el.clientWidth))}}>{variant.gallery.map((a,i)=><VariantImage key={i} asset={a} enabled={i===active||i===active+1} priority={i===0} sizes="(max-width: 760px) 100vw, 60vw"/>)}</div>{variant.gallery.length>1&&<div className="gallery-controls"><button className="icon-button" disabled={active===0} onClick={()=>selectImage(active-1)} aria-label="Ảnh trước">←</button><span>{active+1} / {variant.gallery.length}</span><button className="icon-button" disabled={active===variant.gallery.length-1} onClick={()=>selectImage(active+1)} aria-label="Ảnh tiếp">→</button></div>}<p className="photo-note">{variant.name} · Ảnh sản phẩm thực tế. Màu có thể thay đổi nhẹ theo ánh sáng.</p></div>
 <div className="purchase-panel"><span className="eyebrow">{product.collection}</span><h1>{product.title}</h1><p className="pdp-subtitle">{product.subtitle}</p><p className="price">{variant.price===null?"Liên hệ giá":variant.price.toLocaleString("vi-VN")+" ₫"}</p><p className="muted">Lưu màu bạn thích để LIS tư vấn giá và tình trạng hàng.</p>
 {invalid&&<p role="status" className="notice">Màu trong liên kết không còn phù hợp. Bạn đang xem màu {variant.name}.</p>}
 <VariantSelector variants={product.variants} selected={variant} onChange={change}/>
 <button ref={cta} className="button full" disabled={variant.availability==="sold-out"} onClick={()=>add(product,variant)}>{variant.availability==="sold-out"?"Màu này đã hết hàng":"Lưu mẫu để tư vấn"} <span>＋</span></button>
 <p className="selection-note">Lưu lựa chọn, chưa đặt hàng hay thanh toán.</p>
 <p className="pdp-description">{product.description}</p><dl className="specs"><div><dt>Kích thước</dt><dd>{product.dimensions}</dd></div><div><dt>Chất liệu</dt><dd>{product.material}</dd></div>{variant.skuVerified&&<div><dt>Mã sản phẩm</dt><dd>{variant.sku}</dd></div>}</dl>
 {product.details.map(d=><p key={d} className="included">↳ {d}</p>)}
 <details><summary>Chăm sóc & màu sắc</summary><p>Lau nhẹ bằng khăn mềm. Tránh vật sắc nhọn, nguồn nhiệt và ngâm nước. Ảnh và chấm màu giúp bạn tham khảo; màu thực tế có thể khác nhẹ trên từng màn hình.</p></details>
 <details><summary>Tư vấn trước khi đặt hàng</summary><p>Lưu mẫu và sao chép danh sách để gửi trong cuộc trò chuyện với LIS. Giá, tình trạng hàng, giao nhận và chính sách đổi trả sẽ cần được xác nhận trước khi đặt hàng.</p></details>
 </div></div>
 <section className="related"><div className="section-heading"><div><span className="eyebrow">A LITTLE MORE YOU</span><h2>{product.category==="phu-kien-charm"?"Một chiếc túi để phối cùng.":"Thêm một lựa chọn."}</h2></div></div><div className="related-grid">{PRODUCTS.filter(p=>p.id!==product.id&&(product.category==="phu-kien-charm"?p.id==="mia-bag"||p.id==="mila-bag":product.id==="calla-bag"?p.category!=="phu-kien-charm":p.category==="phu-kien-charm")).slice(0,2).map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
 {sticky&&!cartOpen&&<div className="sticky-selection"><div><strong>{product.title}</strong><span>{variant.name} · Liên hệ giá</span></div><button className="button" disabled={variant.availability==="sold-out"} onClick={()=>add(product,variant)}>Lưu mẫu ＋</button></div>}
 </div>;
}
