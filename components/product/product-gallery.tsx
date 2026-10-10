"use client";

import {useEffect,useId,useRef,useState,type KeyboardEvent} from "react";
import {CaretLeft,CaretRight} from "@phosphor-icons/react/dist/ssr";
import type {Variant} from "@/data/products";
import {getProductGallery} from "@/lib/product-media";
import {VariantImage} from "./variant-image";

export function ProductGallery({variant,title}:{variant:Variant;title:string}){
 const gallery=getProductGallery(variant);
 const [active,setActive]=useState(0);
 const track=useRef<HTMLDivElement>(null);
 const thumbnails=useRef<HTMLDivElement>(null);
 const selected=useRef(0);
 const navigating=useRef(false);
 const settleTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const galleryId=useId();

 useEffect(()=>()=>clearTimeout(settleTimer.current),[]);
 useEffect(()=>{
  const rail=thumbnails.current;
  const button=rail?.querySelectorAll<HTMLButtonElement>("button")[active];
  if(!rail||!button)return;
  // Move only the thumbnail rail; selecting a photo must not scroll the page.
  const inset=4;
  if(button.offsetTop<rail.scrollTop+inset)rail.scrollTop=button.offsetTop-inset;
  else if(button.offsetTop+button.offsetHeight>rail.scrollTop+rail.clientHeight-inset)
   rail.scrollTop=button.offsetTop+button.offsetHeight-rail.clientHeight+inset;
  if(button.offsetLeft<rail.scrollLeft+inset)rail.scrollLeft=button.offsetLeft-inset;
  else if(button.offsetLeft+button.offsetWidth>rail.scrollLeft+rail.clientWidth-inset)
   rail.scrollLeft=button.offsetLeft+button.offsetWidth-rail.clientWidth+inset;
 },[active]);

 const selectImage=(index:number)=>{
  const next=Math.max(0,Math.min(gallery.length-1,index));
  clearTimeout(settleTimer.current);
  selected.current=next;
  navigating.current=true;
  setActive(next);
  track.current?.scrollTo({
   left:track.current.clientWidth*next,
   behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"
  });
 };
 const syncScroll=()=>{
  const el=track.current;
  if(!el?.clientWidth)return;
  const index=Math.max(0,Math.min(gallery.length-1,Math.round(el.scrollLeft/el.clientWidth)));
  if(!navigating.current){selected.current=index;setActive(index);}
  clearTimeout(settleTimer.current);
  settleTimer.current=setTimeout(()=>{
   navigating.current=false;
   selected.current=index;
   setActive(index);
  },160);
 };
 const thumbnailKeyboard=(event:KeyboardEvent<HTMLDivElement>)=>{
  if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(event.key))return;
  event.preventDefault();
  const buttons=Array.from(thumbnails.current?.querySelectorAll<HTMLButtonElement>("button")||[]);
  const current=buttons.indexOf(document.activeElement as HTMLButtonElement);
  const direction=event.key==="ArrowRight"||event.key==="ArrowDown"?1:-1;
  const next=event.key==="Home"?0:event.key==="End"?buttons.length-1:
   Math.max(0,Math.min(buttons.length-1,current+direction));
  selectImage(next);
  buttons[next]?.focus({preventScroll:true});
 };

 return <div className="pdp-gallery">
  <div className={`gallery-shell${gallery.length>1?" gallery-shell-multiple":""}`}>
   <div className="gallery-stage">
    <div id={galleryId} ref={track} className="gallery-track" onScroll={syncScroll}
     onPointerDown={()=>{navigating.current=false;}}
     onWheel={()=>{navigating.current=false;}}>
     {gallery.map((asset,i)=><VariantImage key={asset.src} asset={asset} priority={i===0}
      sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 50vw, (max-width: 1439px) 45vw, 560px"/>)}
    </div>
    {gallery.length>1&&<>
     <button type="button" className="gallery-arrow gallery-arrow-prev" disabled={active===0}
      onClick={()=>selectImage(selected.current-1)} aria-label="Ảnh trước" aria-controls={galleryId}>
      <CaretLeft size={24} aria-hidden="true"/>
     </button>
     <button type="button" className="gallery-arrow gallery-arrow-next" disabled={active===gallery.length-1}
      onClick={()=>selectImage(selected.current+1)} aria-label="Ảnh tiếp theo" aria-controls={galleryId}>
      <CaretRight size={24} aria-hidden="true"/>
     </button>
     <span className="gallery-count" role="status" aria-label={`Ảnh ${active+1} trên ${gallery.length}`}>
      {active+1}<span aria-hidden="true"> / </span>{gallery.length}
     </span>
    </>}
   </div>
   {gallery.length>1&&<div ref={thumbnails} className="gallery-thumbnails" role="group"
    aria-label={`Chọn ảnh ${title} màu ${variant.name}`} onKeyDown={thumbnailKeyboard}>
    {gallery.map((asset,i)=><button type="button" key={asset.src} className="gallery-thumbnail"
     aria-label={`Ảnh ${i+1}: ${asset.kind==="packshot"?"Sản phẩm":asset.kind==="lifestyle"?"Mẫu đeo":"Chi tiết"}, ${variant.name}`}
     aria-pressed={i===active} aria-controls={galleryId} tabIndex={i===active?0:-1} onClick={()=>selectImage(i)}>
     <img src={asset.src} srcSet={asset.widths.map(w=>`${asset.base}-${w}.webp ${w}w`).join(", ")}
      sizes="72px" width={72} height={72} alt="" loading="lazy" decoding="async"
      onError={event=>{event.currentTarget.style.visibility="hidden";}}/>
    </button>)}
   </div>}
  </div>
  <p className="photo-note"><em>Màu thực tế có thể khác nhẹ theo ánh sáng và màn hình.</em></p>
 </div>;
}
