"use client";
import {useEffect,useRef,type ReactNode} from "react";
import {X} from "@phosphor-icons/react/dist/ssr";
import {BrandLogo} from "./brand-logo";

export function Drawer({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:ReactNode}) {
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  const dialog=ref.current;
  if(!dialog||!open)return;
  const previousFocus=document.activeElement as HTMLElement|null;
  const previousOverflow=document.body.style.overflow;
  if(!dialog.open)dialog.showModal();
  document.body.style.overflow="hidden";
  (dialog.querySelector("[data-autofocus]") as HTMLElement|null)?.focus();
  return ()=>{
   document.body.style.overflow=previousOverflow;
   dialog.close();
   if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});
  };
 },[open]);
 return <dialog ref={ref} className="drawer" aria-label={title} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current)onClose();}}>
  <div className="drawer-inner">
   <div className="drawer-brand"><BrandLogo variant="black" width={72}/><button className="icon-button" onClick={onClose} aria-label={"Đóng "+title.toLocaleLowerCase("vi")}><X size={24}/></button></div>
   <h2 className="drawer-title">{title}</h2>
   {children}
  </div>
 </dialog>;
}