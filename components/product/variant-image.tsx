"use client";
import { useEffect, useRef, useState } from "react";
import type { Asset } from "@/data/products";
type ImageProps={asset:Asset;sizes?:string;priority?:boolean;className?:string;enabled?:boolean};
export function VariantImage(props:ImageProps){
 // An asset owns its loading state; changing color cannot retain the previous image.
 return <AssetImage key={props.asset.src} {...props}/>;
}
function AssetImage({asset,sizes="(max-width: 700px) 100vw, 50vw",priority=false,className="",enabled=true}:ImageProps){
 const [loaded,setLoaded]=useState(false); const [failed,setFailed]=useState(false); const [retry,setRetry]=useState(0);
 const image=useRef<HTMLImageElement>(null);
 useEffect(()=>{
  if(enabled&&image.current?.complete){
   setLoaded(image.current.naturalWidth>0);
   setFailed(image.current.naturalWidth===0);
  }
 },[enabled,retry]);
 const suffix=retry?`?retry=${retry}`:"";
 return <div className={`variant-image ${className} ${asset.kind}`} aria-busy={enabled&&!loaded&&!failed}>
 {/* Pre-sized, pre-encoded responsive images bypass runtime image transformation. */}
 {/* eslint-disable-next-line @next/next/no-img-element */}
 {enabled&&<img ref={image} key={retry} src={asset.src+suffix} srcSet={asset.widths.map(w=>`${asset.base}-${w}.webp${suffix} ${w}w`).join(", ")} sizes={sizes} width={asset.width} height={asset.height} alt={asset.alt} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":"auto"} decoding="async" style={{opacity:failed?0:1}} onLoad={()=>{setLoaded(true);setFailed(false);}} onError={()=>{setLoaded(false);setFailed(true);}} />}
 {enabled&&!loaded&&!failed&&<span className="image-status" role="status">Đang tải ảnh…</span>}
 {failed&&<span className="image-status" role="alert">Không tải được ảnh. <button type="button" onClick={()=>{setLoaded(false);setFailed(false);setRetry(n=>n+1)}}>Thử lại</button></span>}
 </div>;
}
