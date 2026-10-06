"use client";
import {useState} from "react";
import Link from "next/link";
import {Heart} from "@phosphor-icons/react/dist/ssr";
import {type Product,getDefaultVariant,productUrl} from "@/data/products";
import {useCartStore} from "@/lib/store/cart-store";
import {FacebookLink} from "@/components/layout/facebook-link";
import {VariantImage} from "./variant-image";
import {VariantSelector} from "./variant-selector";

export function ProductCard({product,priority=false,initialVariantId,anchor=false}:{product:Product;priority?:boolean;initialVariantId?:string;anchor?:boolean}){
 const [variant,setVariant]=useState(()=>product.variants.find(v=>v.id===initialVariantId)||getDefaultVariant(product));
 const add=useCartStore(s=>s.addVariant);
 return <article className="product-card" id={anchor?product.id:undefined}>
  <div className="card-image-wrap">
   <Link className="card-image-link" href={productUrl(product,variant)} aria-label={"Xem "+product.title+" màu "+variant.name}><VariantImage asset={variant.gallery[0]} priority={priority} sizes="(max-width: 359px) 100vw, (max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"/></Link>
   <button className="card-save icon-button" aria-label={"Lưu "+product.title+" màu "+variant.name} title="Lưu mẫu" disabled={variant.availability==="sold-out"} onClick={()=>add(product,variant)}><Heart size={23}/></button>
  </div>
  <div className="card-info"><Link className="card-title" href={productUrl(product,variant)}><h3>{product.title}</h3></Link><p className="card-description">{product.subtitle}</p><VariantSelector variants={product.variants} selected={variant} onChange={setVariant}/><FacebookLink context={product.title+" màu "+variant.name}/></div>
 </article>;
}