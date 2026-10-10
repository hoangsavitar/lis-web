"use client";
import {useState} from "react";
import Link from "next/link";
import {type Product,getDefaultVariant,productUrl} from "@/data/products";
import {FacebookLink} from "@/components/layout/facebook-link";
import {VariantSelector} from "./variant-selector";
import {CardMedia} from "./card-media";
import {SaveButton} from "./save-button";

export function ProductCard({product,priority=false,initialVariantId,anchor=false,sizes}:{product:Product;priority?:boolean;initialVariantId?:string;anchor?:boolean;sizes?:string}){
 const [variant,setVariant]=useState(()=>product.variants.find(v=>v.id===initialVariantId)||getDefaultVariant(product));
 return <article className="product-card" id={anchor?product.id:undefined}>
  <div className="card-image-wrap">
   <CardMedia key={variant.id} variant={variant} title={product.title} href={productUrl(product,variant)} priority={priority} sizes={sizes}/>
   <SaveButton product={product} variant={variant} compact className="card-save icon-button"/>
  </div>
  <div className="card-info"><Link className="card-title" href={productUrl(product,variant)}><h3>{product.title}</h3></Link><VariantSelector variants={product.variants} selected={variant} onChange={setVariant} compact/><FacebookLink label="Hỏi giá" context={product.title+" màu "+variant.name}/></div>
 </article>;
}
