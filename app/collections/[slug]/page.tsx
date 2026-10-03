import {notFound} from "next/navigation";
import {Collection} from "@/components/product/collection";
import {CATEGORIES} from "@/data/products";
export const metadata={title:"Bộ sưu tập"};
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(slug!=="all"&&!CATEGORIES.some(c=>c.slug===slug))notFound();return <Collection slug={slug}/>;}
