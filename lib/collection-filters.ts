import {PRODUCTS} from "@/data/products";

export function resolveCollectionColor(slug:string,color?:string){
 return color&&PRODUCTS.some(p=>(slug==="all"||p.category===slug)&&p.variants.some(v=>v.name===color))?color:"all";
}
export function collectionUrl(slug:string,color="all"){
 const query=new URLSearchParams();
 if(color!=="all")query.set("color",color);
 return `/collections/${slug}${query.size?"?"+query.toString():""}`;
}
