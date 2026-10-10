"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import type {Variant} from "@/data/products";
import {getCardMedia} from "@/lib/product-media";
import {VariantImage} from "./variant-image";

export function CardMedia({variant,title,href,priority=false,sizes="(max-width: 359px) 100vw, (max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"}:{variant:Variant;title:string;href:string;priority?:boolean;sizes?:string}){
 const {primary,secondary}=getCardMedia(variant);
 const previewLabel=secondary?.kind==="lifestyle"?"Ảnh mẫu đeo":"Ảnh góc khác";
 const track=useRef<HTMLDivElement>(null);
 const down=useRef<{x:number;y:number}|null>(null);
 const moved=useRef(false);
 const [ready,setReady]=useState(false);
 const [coarse,setCoarse]=useState(false);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const query=matchMedia("(hover: none), (pointer: coarse)");
  const update=()=>setCoarse(query.matches);update();query.addEventListener("change",update);
  return()=>query.removeEventListener("change",update);
 },[]);
 useEffect(()=>{
  if(!secondary||!track.current)return;
  let alive=true;let requested=false;
  const load=()=>{
   if(requested)return;requested=true;
   const image=new window.Image();image.sizes=sizes;image.srcset=secondary.widths.map(w=>secondary.base+"-"+w+".webp "+w+"w").join(", ");image.src=secondary.src;
   image.decode().then(()=>{if(alive)setReady(true)}).catch(()=>{});
  };
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){load();observer.disconnect();}},{rootMargin:"200px"});
  observer.observe(track.current);return()=>{alive=false;observer.disconnect();};
 },[secondary,sizes]);
 const choose=(index:number)=>{
  setActive(index);track.current?.scrollTo({left:(track.current?.clientWidth??0)*index,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 };
 const images=ready&&secondary?[primary,secondary]:[primary];
 return <div className={"card-media"+(ready?" has-preview":"")} data-variant={variant.id}>
  <div className="card-media-track" ref={track} onScroll={e=>{if(coarse)setActive(Math.round(e.currentTarget.scrollLeft/e.currentTarget.clientWidth));}} onPointerDown={e=>{down.current={x:e.clientX,y:e.clientY};moved.current=false;}} onPointerMove={e=>{if(down.current&&(Math.abs(e.clientX-down.current.x)>8||Math.abs(e.clientY-down.current.y)>8))moved.current=true;}} onPointerUp={()=>{down.current=null;}} onPointerCancel={()=>{down.current=null;}}>
   {images.map((asset,index)=><Link key={asset.src} className={"card-image-link card-media-slide"+(index?" card-media-secondary":"")} href={href} aria-label={"Xem "+title+" màu "+variant.name+(index?" — "+previewLabel.toLowerCase():"")} aria-hidden={!coarse&&index===1?true:undefined} tabIndex={coarse?(active===index?0:-1):(index===0?0:-1)} onClick={e=>{if(moved.current&&e.detail!==0)e.preventDefault();moved.current=false;}}>
    {index===0?<VariantImage asset={asset} priority={priority} sizes={sizes}/>:<div className={"variant-image "+asset.kind}><img src={asset.src} srcSet={asset.widths.map(w=>asset.base+"-"+w+".webp "+w+"w").join(", ")} sizes={sizes} width={asset.width} height={asset.height} alt={coarse?asset.alt:""} decoding="async" onError={()=>{setReady(false);setActive(0);track.current?.scrollTo({left:0,behavior:"instant"});}}/></div>}
   </Link>)}
  </div>
  {coarse&&ready&&<div className="card-image-dots" role="group" aria-label={"Ảnh "+title} onKeyDown={e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();choose(active===0?1:0);}}}>
   {["Ảnh sản phẩm",previewLabel].map((label,index)=><button key={label} type="button" aria-label={label+" "+title} aria-pressed={active===index} onClick={()=>choose(index)}><span/></button>)}
  </div>}
 </div>;
}
