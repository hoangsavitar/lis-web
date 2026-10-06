import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {Collection} from "@/components/product/collection";
import {CATEGORIES} from "@/data/products";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const category=CATEGORIES.find(c=>c.slug===slug);
 return {title:slug==="all"?"Túi xách & charm":category?.name||"Sản phẩm",description:category?.description||"Túi đan, tote và charm của LIS, với những phom túi nhỏ gọn và các màu dễ phối."};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 if(slug!=="all"&&!CATEGORIES.some(c=>c.slug===slug))notFound();
 return <Collection key={slug} slug={slug}/>;
}