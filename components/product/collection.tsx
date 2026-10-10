"use client";
import {useState} from "react";
import {PRODUCTS,CATEGORIES} from "@/data/products";
import {ProductCard} from "./product-card";
import {ColorFilter} from "./color-filter";
import {useRouter} from "next/navigation";
import {collectionUrl,resolveCollectionColor} from "@/lib/collection-filters";

export function Collection({slug,embedded=false,initialColor}:{slug:string;embedded?:boolean;initialColor?:string}){
 const router=useRouter();
 const [filter,setFilter]=useState(slug==="all"?"all":slug);
 const [color,setColor]=useState(()=>resolveCollectionColor(slug,initialColor));
 const change=(nextFilter:string,nextColor:string)=>{
  setFilter(nextFilter);setColor(nextColor);
  if(!embedded)router.push(collectionUrl(nextFilter,nextColor),{scroll:false});
 };
 const base=PRODUCTS.filter(p=>filter==="all"||p.category===filter);
 const colors=Array.from(new Map(base.flatMap(p=>p.variants.map(v=>[v.name,{name:v.name,hex:v.hex}] as const))).values());
 const items=base.filter(p=>color==="all"||p.variants.some(v=>v.name===color));
 const title=filter==="all"?"Túi xách & charm":CATEGORIES.find(c=>c.slug===filter)?.name||"Sản phẩm";
 const Heading=embedded?"h2":"h1";
 return <section className={embedded?"home-collection":"collection-page"} id={embedded?"thiet-ke":undefined}>
  <div className="section-heading"><Heading>{title}</Heading></div>
  <div className="collection-filters">
   <div className="category-filters" role="group" aria-label="Lọc loại sản phẩm">{[{slug:"all",name:"Tất cả"},...CATEGORIES].map(c=><button key={c.slug} aria-pressed={filter===c.slug} onClick={()=>change(c.slug,"all")}>{c.name}</button>)}</div>
   <ColorFilter colors={colors} value={color} onChange={next=>change(filter,next)}/>
  </div>
  <p className="result-count" role="status">{items.length} sản phẩm</p>
  <div className="collection-grid">{items.map((p,i)=><ProductCard key={p.id+color} product={p} priority={!embedded&&i===0} initialVariantId={p.variants.find(v=>v.name===color)?.id} anchor={embedded}/>)}</div>
  {!items.length&&<div className="empty-state"><h3>Không tìm thấy sản phẩm phù hợp</h3><p>Thử xem các màu khác nhé.</p><button className="button" onClick={()=>change(filter,"all")}>Xem tất cả màu</button></div>}
 </section>;
}
