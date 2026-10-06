"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRight,Heart,CaretDown} from "@phosphor-icons/react/dist/ssr";
import {type Product,type Variant,getDefaultVariant,PRODUCTS,productUrl} from "@/data/products";
import {VariantImage} from "./variant-image";
import {VariantSelector} from "./variant-selector";
import {ProductCard} from "./product-card";
import {CopyConsultation} from "./copy-consultation";
import {FacebookLink} from "@/components/layout/facebook-link";
import {useCartStore} from "@/lib/store/cart-store";

export function ProductDetail({product,initialVariantId}:{product:Product;initialVariantId?:string}){
 const resolve=(id?:string|null)=>product.variants.find(v=>v.id===id)||getDefaultVariant(product);
 const [variant,setVariant]=useState(()=>resolve(initialVariantId));
 const [invalid,setInvalid]=useState(!!initialVariantId&&!product.variants.some(v=>v.id===initialVariantId));
 const [active,setActive]=useState(0);
 const [sticky,setSticky]=useState(false);
 const [footerVisible,setFooterVisible]=useState(false);
 const cta=useRef<HTMLDivElement>(null);
 const track=useRef<HTMLDivElement>(null);
 const add=useCartStore(s=>s.addVariant);
 const cartOpen=useCartStore(s=>s.isOpen);
 useEffect(()=>{setVariant(product.variants.find(v=>v.id===initialVariantId)||getDefaultVariant(product));setInvalid(!!initialVariantId&&!product.variants.some(v=>v.id===initialVariantId));setActive(0);track.current?.scrollTo({left:0,behavior:"instant"});},[product,initialVariantId]);
 const change=(v:Variant)=>{setVariant(v);setActive(0);setInvalid(false);window.history.pushState(null,"",productUrl(product,v));track.current?.scrollTo({left:0,behavior:"instant"});};
 useEffect(()=>{
  const restore=()=>{const id=new URLSearchParams(location.search).get("variant");setVariant(product.variants.find(v=>v.id===id)||getDefaultVariant(product));setInvalid(!!id&&!product.variants.some(v=>v.id===id));setActive(0);track.current?.scrollTo({left:0,behavior:"instant"});};
  window.addEventListener("popstate",restore);
  return()=>window.removeEventListener("popstate",restore);
 },[product]);
 useEffect(()=>{
  const el=cta.current;
  if(!el)return;
  const observer=new IntersectionObserver(([e])=>setSticky(!e.isIntersecting&&e.boundingClientRect.top<0),{threshold:0});
  const footerObserver=new IntersectionObserver(([e])=>setFooterVisible(e.isIntersecting));
  observer.observe(el);
  const footer=document.getElementById("ve-lis");
  if(footer)footerObserver.observe(footer);
  return()=>{observer.disconnect();footerObserver.disconnect();};
 },[]);
 const selectImage=(i:number)=>{setActive(i);const el=track.current;el?.scrollTo({left:el.clientWidth*i,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});};
 const related=PRODUCTS.filter(p=>p.id!==product.id&&(product.category==="phu-kien-charm"?p.id==="mia-bag"||p.id==="mila-bag":product.id==="calla-bag"?p.category!=="phu-kien-charm":p.category==="phu-kien-charm")).slice(0,2);
 return <div className="pdp">
  <nav className="breadcrumbs" aria-label="Đường dẫn"><Link href="/collections/all">Sản phẩm</Link><span aria-hidden="true">/</span><span>{product.title}</span></nav>
  <div className="pdp-top">
   <div className="pdp-gallery"><div ref={track} className="gallery-track" onScroll={e=>{const el=e.currentTarget;setActive(Math.round(el.scrollLeft/el.clientWidth));}}>{variant.gallery.map((asset,i)=><VariantImage key={i} asset={asset} enabled={i===active||i===active+1} priority={i===0} sizes="(max-width: 767px) 100vw, 55vw"/>)}</div>
    {variant.gallery.length>1&&<div className="gallery-controls"><button className="icon-button" disabled={active===0} onClick={()=>selectImage(active-1)} aria-label="Ảnh trước"><ArrowLeft size={22}/></button><span>{active+1} / {variant.gallery.length}</span><button className="icon-button" disabled={active===variant.gallery.length-1} onClick={()=>selectImage(active+1)} aria-label="Ảnh tiếp"><ArrowRight size={22}/></button></div>}
    <p className="photo-note"><em>Màu thực tế có thể khác nhẹ theo ánh sáng và màn hình.</em></p>
   </div>
   <div className="purchase-panel"><Link className="category-label" href={"/collections/"+product.category}>{product.category==="phu-kien-charm"?"Charm":product.category==="tui-tote"?"Túi tote":"Túi xách"}</Link><h1>{product.title}</h1><p className="pdp-subtitle">{product.subtitle}</p>
    <FacebookLink className="contact-link pdp-price" context={product.title+" màu "+variant.name}/>
    {invalid&&<p role="status" className="notice">Không tìm thấy màu trong liên kết. Bạn đang xem màu {variant.name}.</p>}
    <VariantSelector variants={product.variants} selected={variant} onChange={change}/>
    <div className="purchase-actions" ref={cta}><FacebookLink label="Nhắn LIS trên Facebook" className="button full"/><button className="button button-secondary full" disabled={variant.availability==="sold-out"} onClick={()=>add(product,variant)}><Heart size={22}/>{variant.availability==="sold-out"?"Màu này đã hết hàng":"Lưu mẫu"}</button></div>
    <CopyConsultation items={[{title:product.title,color:variant.name,quantity:1,slug:product.slug,variantId:variant.id}]}/>
    <div className="product-information"><p className="pdp-description">{product.description}</p><dl className="specs"><div><dt>Kích thước</dt><dd>{product.dimensions}</dd></div><div><dt>Chất liệu</dt><dd>{product.material}</dd></div>{variant.skuVerified&&<div><dt>Mã sản phẩm</dt><dd>{variant.sku}</dd></div>}</dl>{product.details.map(detail=><p key={detail} className="included">{detail}</p>)}</div>
    <details className="product-faq"><summary>Chăm sóc túi<CaretDown size={20}/></summary><p>Lau nhẹ bằng khăn mềm. Tránh vật sắc nhọn, nguồn nhiệt và ngâm nước.</p></details>
    <details className="product-faq"><summary>Thông tin đặt hàng<CaretDown size={20}/></summary><p>Giá, tình trạng hàng, giao nhận và đổi trả được LIS tư vấn trực tiếp qua Facebook.</p></details>
   </div>
  </div>
  <section className="related"><div className="section-heading"><h2>{product.category==="phu-kien-charm"?"Túi để phối cùng":"Xem thêm sản phẩm"}</h2></div><div className="related-grid">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  {sticky&&!cartOpen&&!footerVisible&&<div className="sticky-selection"><div className="sticky-product"><strong>{product.title}</strong><span>Màu {variant.name}</span></div><FacebookLink className="contact-link" context={product.title+" màu "+variant.name}/><button className="button button-secondary" disabled={variant.availability==="sold-out"} onClick={()=>add(product,variant)}><Heart size={20}/>Lưu mẫu</button></div>}
 </div>;
}
