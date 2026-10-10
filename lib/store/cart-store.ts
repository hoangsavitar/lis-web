"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PRODUCTS, type Product, type Variant } from "@/data/products";
export interface SavedItem { id:string; productId:string; variantId:string; title:string; color:string; image:string; slug:string; quantity:number }
interface CartStore {items:SavedItem[];isOpen:boolean;legacyNotice:boolean;addVariant:(p:Product,v:Variant)=>void;toggleVariant:(p:Product,v:Variant)=>void;removeItem:(id:string)=>void;updateQuantity:(id:string,q:number)=>void;clearCart:()=>void;openCart:()=>void;closeCart:()=>void;dismissNotice:()=>void}
export function sanitizeSavedItems(items:unknown):SavedItem[] {
 if(!Array.isArray(items))return [];
 return items.flatMap(item=>{const p=PRODUCTS.find(p=>p.id===item?.productId);const v=p?.variants.find(v=>v.id===item?.variantId);if(!p||!v)return [];
 return [{id:v.id,productId:p.id,variantId:v.id,title:p.title,color:v.name,image:v.image,slug:p.slug,quantity:Math.max(1,Math.min(99,Math.floor(Number(item.quantity)||1)))}]});
}
export const useCartStore=create<CartStore>()(persist((set,get)=>({
 items:[],isOpen:false,legacyNotice:false,
 addVariant:(p,v)=>{if(!p.variants.some(x=>x.id===v.id)||v.availability==="sold-out")return;
 const existing=get().items.find(x=>x.id===v.id);
 if(!existing)set({items:[...get().items,{id:v.id,productId:p.id,variantId:v.id,title:p.title,color:v.name,image:v.image,slug:p.slug,quantity:1}]});},
 toggleVariant:(p,v)=>{if(get().items.some(x=>x.id===v.id))get().removeItem(v.id);else get().addVariant(p,v);},
 removeItem:id=>set({items:get().items.filter(x=>x.id!==id)}),
 updateQuantity:(id,q)=>{if(q<=0)get().removeItem(id);else set({items:get().items.map(x=>x.id===id?{...x,quantity:Math.min(99,Math.floor(q))}:x)})},
 clearCart:()=>set({items:[]}),openCart:()=>set({isOpen:true}),closeCart:()=>set({isOpen:false}),dismissNotice:()=>set({legacyNotice:false})
}),{name:"lis_luxury_cart",version:2,storage:createJSONStorage(()=>localStorage),
 partialize:s=>({items:s.items,legacyNotice:s.legacyNotice}),
 migrate:(old:unknown)=>{const s=old as {items?:unknown[]};return {items:sanitizeSavedItems(s?.items),legacyNotice:!!s?.items?.length}},
 merge:(persisted,current)=>{const s=persisted as {items?:unknown;legacyNotice?:boolean}|undefined;const items=sanitizeSavedItems(s?.items);return {...current,items,legacyNotice:!!s?.legacyNotice||(Array.isArray(s?.items)&&items.length!==s.items.length)}}
}));
