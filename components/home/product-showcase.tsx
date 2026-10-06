"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowRight} from "@phosphor-icons/react/dist/ssr";
import {type Product,getDefaultVariant,productUrl} from "@/data/products";
import {VariantImage} from "@/components/product/variant-image";
import {VariantSelector} from "@/components/product/variant-selector";
import {FacebookLink} from "@/components/layout/facebook-link";

export function ProductShowcase({product}:{product:Product}){
 const [variant,setVariant]=useState(()=>getDefaultVariant(product));
 return <section className="shop-hero" id="mia-bag-feature">
  <div className="hero-copy">
   <span className="category-label">Túi xách LIS</span>
   <h1>Mia Bag</h1>
   <p className="hero-description">{product.subtitle}</p>
   <VariantSelector variants={product.variants} selected={variant} onChange={setVariant}/>
   <FacebookLink context={product.title+" màu "+variant.name}/>
   <div className="hero-actions"><Link className="button" href={productUrl(product,variant)}>Xem Mia Bag <ArrowRight size={20}/></Link><Link className="text-link" href="/collections/all">Xem tất cả sản phẩm <ArrowRight size={20}/></Link></div>
  </div>
  <Link className="hero-image-link" href={productUrl(product,variant)} aria-label={"Xem Mia Bag màu "+variant.name}>
   <VariantImage asset={variant.gallery[0]} priority sizes="(max-width: 767px) 100vw, 55vw"/>
   <span className="hero-image-caption">{variant.name}<ArrowRight size={20}/></span>
  </Link>
 </section>;
}