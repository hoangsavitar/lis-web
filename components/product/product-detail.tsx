"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {CaretDown} from "@phosphor-icons/react/dist/ssr";
import {type Product,type Variant,getDefaultVariant,PRODUCTS,productUrl} from "@/data/products";
import {ProductGallery} from "./product-gallery";
import {VariantSelector} from "./variant-selector";
import {ProductCard} from "./product-card";
import {CopyConsultation} from "./copy-consultation";
import {FacebookLink} from "@/components/layout/facebook-link";
import {useCartStore} from "@/lib/store/cart-store";
import {SaveButton} from "./save-button";

export function ProductDetail({product,initialVariantId}:{product:Product;initialVariantId?:string}){
 const resolve=(id?:string|null)=>product.variants.find(v=>v.id===id)||getDefaultVariant(product);
 const [variant,setVariant]=useState(()=>resolve(initialVariantId));
 const [invalid,setInvalid]=useState(!!initialVariantId&&!product.variants.some(v=>v.id===initialVariantId));
 const [sticky,setSticky]=useState(false);
 const [footerVisible,setFooterVisible]=useState(false);
 const cta=useRef<HTMLDivElement>(null);
 const cartOpen=useCartStore(s=>s.isOpen);
 useEffect(()=>{setVariant(product.variants.find(v=>v.id===initialVariantId)||getDefaultVariant(product));setInvalid(!!initialVariantId&&!product.variants.some(v=>v.id===initialVariantId));},[product,initialVariantId]);
 const change=(v:Variant)=>{setVariant(v);setInvalid(false);window.history.pushState(null,"",productUrl(product,v));};
 useEffect(()=>{
  const restore=()=>{const id=new URLSearchParams(location.search).get("variant");setVariant(product.variants.find(v=>v.id===id)||getDefaultVariant(product));setInvalid(!!id&&!product.variants.some(v=>v.id===id));};
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
 const related=PRODUCTS.filter(p=>p.id!==product.id&&(product.category==="phu-kien-charm"?p.id==="mia-bag"||p.id==="mila-bag":product.id==="calla-bag"?p.category!=="phu-kien-charm":p.category==="phu-kien-charm")).slice(0,2);
 return <div className="pdp">
  <nav className="breadcrumbs" aria-label="Đường dẫn"><Link href="/collections/all">Sản phẩm</Link><span aria-hidden="true">/</span><span>{product.title}</span></nav>
  <div className="pdp-top">
   <ProductGallery key={variant.id} variant={variant} title={product.title}/>
   <div className="purchase-panel"><h1>{product.title}</h1><p className="pdp-subtitle">{product.subtitle}</p>
    <FacebookLink className="contact-link pdp-price" context={product.title+" màu "+variant.name}/>
    {invalid&&<p role="status" className="notice">Không tìm thấy màu trong liên kết. Bạn đang xem màu {variant.name}.</p>}
    <VariantSelector variants={product.variants} selected={variant} onChange={change}/>
    <div className="purchase-actions" ref={cta}><FacebookLink label="Nhắn LIS trên Facebook" className="button full"/><SaveButton product={product} variant={variant}/></div>
    <CopyConsultation items={[{title:product.title,color:variant.name,quantity:1,slug:product.slug,variantId:variant.id}]}/>
    <div className="product-information"><p className="pdp-description">{product.description}</p><dl className="specs"><div><dt>Kích thước</dt><dd>{product.dimensions}</dd></div><div><dt>Chất liệu</dt><dd>{product.material}</dd></div>{variant.skuVerified&&<div><dt>Mã sản phẩm</dt><dd>{variant.sku}</dd></div>}</dl>{product.details.map(detail=><p key={detail} className="included">{detail}</p>)}</div>
    <details className="product-faq"><summary>Chăm sóc túi<CaretDown size={20}/></summary><p>Lau nhẹ bằng khăn mềm. Tránh vật sắc nhọn, nguồn nhiệt và ngâm nước.</p></details>
    <details className="product-faq"><summary>Thông tin đặt hàng<CaretDown size={20}/></summary><p>Giá, tình trạng hàng, giao nhận và đổi trả được LIS tư vấn trực tiếp qua Facebook.</p></details>
   </div>
  </div>
  <section className="related"><div className="section-heading"><h2>{product.category==="phu-kien-charm"?"Túi để phối cùng":"Xem thêm sản phẩm"}</h2></div><div className="related-grid">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  {sticky&&!cartOpen&&!footerVisible&&<div className="sticky-selection"><div className="sticky-product"><strong>{product.title}</strong><span>Màu {variant.name}</span></div><FacebookLink className="contact-link" context={product.title+" màu "+variant.name}/><SaveButton product={product} variant={variant} className="button button-secondary"/></div>}
 </div>;
}
