"use client";
import Link from "next/link";
import {useState} from "react";
import {PRODUCTS,productUrl} from "@/data/products";
import {useSearchStore} from "@/lib/store/search-store";
import {Drawer} from "@/components/layout/dialog";
export function SearchDrawer(){
 const {isOpen,closeSearch}=useSearchStore();const [query,setQuery]=useState("");
 const norm=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").toLowerCase();
 const results=PRODUCTS.filter(p=>norm(p.title+" "+p.variants.map(v=>v.name).join(" ")).includes(norm(query)));
 return <Drawer open={isOpen} onClose={closeSearch} title="Tìm một thiết kế"><input className="search-input" type="search" aria-label="Tên sản phẩm hoặc màu" placeholder="Tên sản phẩm hoặc màu…" value={query} onChange={e=>setQuery(e.target.value)}/><p className="muted" role="status">{results.length} thiết kế</p><div className="search-results">{results.map(p=><Link href={productUrl(p)} key={p.id} onClick={closeSearch}><span>{p.title}<small>{p.subtitle}</small></span><span>↗</span></Link>)}</div>{!results.length&&<p>Chưa có mẫu phù hợp. Thử “Mia”, “tote” hoặc “be”.</p>}</Drawer>
}
