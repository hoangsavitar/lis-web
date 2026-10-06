"use client";
import { useEffect, useState } from "react";
import type { Asset } from "@/data/products";
export function VariantImage({ asset, sizes="(max-width: 700px) 100vw, 50vw", priority=false, className="", enabled=true }: { asset: Asset; sizes?: string; priority?: boolean; className?: string; enabled?: boolean }) {
 const [shown,setShown]=useState(asset); const [failed,setFailed]=useState(false); const [retry,setRetry]=useState(0);
 useEffect(()=>{ if(!enabled || shown.src===asset.src) return; let alive=true; setFailed(false);
 const suffix=retry?`?retry=${retry}`:"";
 const img=new window.Image(); img.sizes=sizes; img.srcset=asset.widths.map(w=>`${asset.base}-${w}.webp${suffix} ${w}w`).join(", "); img.src=asset.src+suffix;
 img.decode().then(()=>{if(alive)setShown(asset)}).catch(()=>{if(alive)setFailed(true)});
 return ()=>{alive=false};
 },[asset,shown.src,sizes,retry,enabled]);
 const loading=shown.src!==asset.src;
 return <div className={`variant-image ${className} ${shown.kind}`} aria-busy={loading&&!failed}>
 {/* Pre-sized, pre-encoded responsive images bypass runtime image transformation. */}
 {/* eslint-disable-next-line @next/next/no-img-element */}
 {enabled&&<img key={shown.src+retry} src={shown.src+(retry?`?retry=${retry}`:"")} srcSet={shown.widths.map(w=>`${shown.base}-${w}.webp${retry?`?retry=${retry}`:""} ${w}w`).join(", ")} sizes={sizes} width={shown.width} height={shown.height} alt={shown.alt} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":"auto"} decoding="async" onLoad={()=>setFailed(false)} onError={()=>setFailed(true)} />}
 {loading&&!failed&&<span className="image-status" role="status">Đang tải ảnh…</span>}
 {failed&&<span className="image-status" role="alert">Không tải được ảnh. <button onClick={()=>{setFailed(false);setRetry(n=>n+1)}}>Thử lại</button></span>}
 </div>;
}
