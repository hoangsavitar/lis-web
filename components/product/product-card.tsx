"use client";
import Link from "next/link";
import {useState} from "react";
import {type Product,getDefaultVariant,productUrl} from "@/data/products";
import {VariantSelector} from "./variant-selector";
import {VariantImage} from "./variant-image";
export function ProductCard({product,priority=false,initialVariantId}:{product:Product;priority?:boolean;initialVariantId?:string}){
 const [variant,setVariant]=useState(product.variants.find(v=>v.id===initialVariantId)||getDefaultVariant(product));
 return <article className="product-card"><Link href={productUrl(product,variant)} className="card-image" aria-label={"Xem "+product.title+" màu "+variant.name}><VariantImage asset={variant.gallery[0]} priority={priority} sizes="(max-width: 370px) 100vw, (max-width: 760px) 50vw, 33vw"/><span className="card-arrow" aria-hidden="true">↗</span></Link><div className="card-title"><h3><Link href={productUrl(product,variant)}>{product.title}</Link></h3><span>Liên hệ giá</span></div><p className="card-subtitle">{product.subtitle}</p><VariantSelector variants={product.variants} selected={variant} onChange={setVariant}/></article>
}
