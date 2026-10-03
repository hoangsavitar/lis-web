"use client";
import { useEffect,useRef,type ReactNode } from "react";
export function Drawer({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:ReactNode}) {
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const d=ref.current;if(!d)return; if(open){d.showModal();const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous;d.close()}}else d.close()},[open]);
 return <dialog ref={ref} className="drawer" aria-label={title} onCancel={onClose} onClose={()=>{if(open)onClose()}} onClick={e=>{if(e.target===ref.current)onClose()}}><div className="drawer-inner"><div className="drawer-heading"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Đóng">×</button></div>{children}</div></dialog>;
}
