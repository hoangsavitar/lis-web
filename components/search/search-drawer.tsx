"use client";
import Link from "next/link";
import {ArrowRight,MagnifyingGlass} from "@phosphor-icons/react/dist/ssr";
import {useSearchStore} from "@/lib/store/search-store";
import {searchProducts} from "@/lib/search-products";
import {productUrl} from "@/data/products";
import {Drawer} from "@/components/layout/dialog";
import {FacebookLink} from "@/components/layout/facebook-link";
import {VariantImage} from "@/components/product/variant-image";

export function SearchDrawer(){
 const {isOpen,query,closeSearch,setQuery}=useSearchStore();
 const results=searchProducts(query);
 return <Drawer open={isOpen} onClose={closeSearch} title="Tìm sản phẩm">
  <label className="sr-only" htmlFor="product-search">Tên mẫu hoặc màu</label>
  <div className="search-field"><MagnifyingGlass size={24}/><input id="product-search" data-autofocus type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tên mẫu hoặc màu, ví dụ: Mia, đỏ" autoComplete="off"/></div>
  {!query&&<div className="search-suggestions" aria-label="Gợi ý tìm kiếm">{["Mia","Tote","Charm","Đỏ"].map(q=><button key={q} onClick={()=>setQuery(q)}>{q}</button>)}</div>}
  <p className="result-count" role="status">{query?results.length+" sản phẩm phù hợp":"Khám phá các mẫu LIS"}</p>
  <div className="search-results">{results.map(({product,variant})=><article className="search-result" key={product.id}>
   <Link href={productUrl(product,variant)} className="search-result-link" onClick={closeSearch}><VariantImage asset={variant.gallery[0]} sizes="88px"/><div><h3>{product.title}</h3><p>Màu {variant.name}</p></div><ArrowRight size={22}/></Link>
   <FacebookLink className="contact-link search-result-contact" context={product.title+" màu "+variant.name}/>
  </article>)}</div>
  {!results.length&&<div className="empty-state"><h3>Không tìm thấy sản phẩm phù hợp</h3><p>Thử tên mẫu như “Mia” hoặc màu như “đỏ”.</p><button className="button" onClick={()=>setQuery("")}>Xem tất cả sản phẩm</button></div>}
 </Drawer>;
}