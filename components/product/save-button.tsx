"use client";
import {useEffect,useState} from "react";
import {Heart} from "@phosphor-icons/react/dist/ssr";
import type {Product,Variant} from "@/data/products";
import {useCartStore} from "@/lib/store/cart-store";

export function SaveButton({product,variant,compact=false,className="button button-secondary full"}:{product:Product;variant:Variant;compact?:boolean;className?:string}){
 const [mounted,setMounted]=useState(false);
 useEffect(()=>setMounted(true),[]);
 const stored=useCartStore(s=>s.items.some(item=>item.variantId===variant.id));
 const toggle=useCartStore(s=>s.toggleVariant);
 const saved=mounted&&stored;
 const disabled=!saved&&variant.availability==="sold-out";
 return <button type="button" className={className} aria-pressed={saved} aria-label={(saved?"Bỏ lưu ":"Lưu ")+product.title+" màu "+variant.name} title={saved?"Bỏ lưu mẫu":"Lưu mẫu"} disabled={disabled} onClick={()=>toggle(product,variant)}>
  <Heart size={compact?23:22} weight={saved?"fill":"regular"}/>
  {!compact&&(disabled?"Màu này đã hết hàng":saved?"Đã lưu mẫu":"Lưu mẫu")}
 </button>;
}
