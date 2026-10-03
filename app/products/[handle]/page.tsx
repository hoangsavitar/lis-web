import {notFound} from "next/navigation";
import {PRODUCTS} from "@/data/products";
import {ProductDetail} from "@/components/product/product-detail";
export async function generateMetadata({params}:{params:Promise<{handle:string}>}){const {handle}=await params;const p=PRODUCTS.find(p=>p.slug===handle);return {title:p?.title||"Không tìm thấy sản phẩm",description:p?.description}}
export default async function Page({params,searchParams}:{params:Promise<{handle:string}>;searchParams:Promise<{variant?:string}>}){
 const {handle}=await params;const p=PRODUCTS.find(p=>p.slug===handle);if(!p)notFound();const {variant}=await searchParams;
 return <ProductDetail key={p.id} product={p} initialVariantId={variant}/>;
}
