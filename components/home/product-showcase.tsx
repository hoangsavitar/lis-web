"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {type Product,getDefaultVariant,productUrl} from "@/data/products";
import {VariantImage} from "@/components/product/variant-image";
import {VariantSelector} from "@/components/product/variant-selector";
export function ProductShowcase({product,hero=false,index=1}:{product:Product;hero?:boolean;index?:number}){
 const [variant,setVariant]=useState(getDefaultVariant(product));const root=useRef<HTMLElement>(null);
 useEffect(()=>{const el=root.current;if(!el||hero)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.classList.add("arrived");observer.disconnect()}},{threshold:.12});observer.observe(el);return()=>observer.disconnect()},[hero]);
 return <section ref={root} id={product.slug} className={`product-chapter ${hero?"hero-chapter":""} ${index%2===0?"reverse":""}`}>
 <div className="chapter-copy"><div className="chapter-kicker"><span className="eyebrow">{hero?"THE EVERYDAY EDIT":product.collection}</span><span className="chapter-index">{String(index).padStart(2,"0")} / 08</span></div>
 {hero?<h1>Dáng túi nhỏ.<br/><em>Dấu ấn riêng.</em></h1>:<h2>{product.title}<br/><em>{product.subtitle}</em></h2>}
 <p className="chapter-description">{product.description}</p><div className="chapter-selection"><span className="eyebrow">{hero?product.title:"CHỌN SẮC MÀU CỦA BẠN"}</span><VariantSelector variants={product.variants} selected={variant} onChange={setVariant}/></div>
 <Link href={productUrl(product,variant)} className="button">{hero?"Khám phá Mia":"Khám phá "+product.title} <span>↗</span></Link>
 <div className="chapter-meta"><span>{product.dimensions}</span><span>Liên hệ giá</span></div>
 </div><div className="chapter-visual"><VariantImage asset={variant.gallery[0]} priority={hero} sizes="(max-width: 760px) 100vw, 55vw"/><span className="image-caption">{product.title} / {variant.name}</span>{hero&&<span className="hero-stamp">FOUR COLORS.<br/>YOUR OWN WAY.</span>}</div>
 </section>
}
