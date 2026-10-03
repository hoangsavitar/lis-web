"use client";
import {useState} from "react";
import {PRODUCTS,CATEGORIES} from "@/data/products";
import {ProductCard} from "./product-card";
export function Collection({slug}:{slug:string}){
 const [filter,setFilter]=useState(slug==="all"?"all":slug);const [color,setColor]=useState("all");
 const base=PRODUCTS.filter(p=>filter==="all"||p.category===filter);
 const colors=[...new Set(base.flatMap(p=>p.variants.map(v=>v.name)))];
 const items=base.filter(p=>color==="all"||p.variants.some(v=>v.name===color));
 return <div className="collection-page"><span className="eyebrow">THE LIS COLLECTION</span><h1>Tìm một thiết kế.<br/><em>Thấy chính mình.</em></h1><p>Sáu chiếc túi, hai phụ kiện. Những sắc màu để làm mới mỗi ngày.</p><div className="collection-filters"><div role="group" aria-label="Lọc loại sản phẩm">{[{slug:"all",name:"Tất cả"},...CATEGORIES].map(c=><button key={c.slug} aria-pressed={filter===c.slug} onClick={()=>{setFilter(c.slug);setColor("all")}}>{c.name}</button>)}</div><label>Màu <select value={color} onChange={e=>setColor(e.target.value)}><option value="all">Tất cả màu</option>{colors.map(c=><option key={c}>{c}</option>)}</select></label></div><p className="result-count" role="status">{items.length} thiết kế</p><div className="collection-grid">{items.map((p,i)=><ProductCard key={p.id+color} product={p} priority={i===0} initialVariantId={p.variants.find(v=>v.name===color)?.id}/>)}</div>{!items.length&&<p>Chưa có thiết kế phù hợp. Hãy thử một màu khác.</p>}</div>
}
