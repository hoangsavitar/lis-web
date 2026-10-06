"use client";

import {useEffect,useId,useRef,useState,type KeyboardEvent} from "react";
import {CaretDown,Check} from "@phosphor-icons/react/dist/ssr";

export interface FilterColor {name:string;hex:string}

export function ColorFilter({colors,value,onChange}:{colors:FilterColor[];value:string;onChange:(value:string)=>void}){
 const [open,setOpen]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const list=useRef<HTMLDivElement>(null);
 const id=useId();
 const options=[{name:"Tất cả màu",value:"all",hex:""},...colors.map(c=>({...c,value:c.name}))];
 useEffect(()=>{
  if(!open)return;
  list.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus();
  const dismiss=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};
  document.addEventListener("pointerdown",dismiss);
  return()=>document.removeEventListener("pointerdown",dismiss);
 },[open]);
 const choose=(next:string)=>{onChange(next);setOpen(false);trigger.current?.focus();};
 const keyboard=(event:KeyboardEvent<HTMLDivElement>)=>{
  if(event.key==="Escape"){event.preventDefault();setOpen(false);trigger.current?.focus();return;}
  if(!["ArrowDown","ArrowUp","Home","End"].includes(event.key))return;
  event.preventDefault();
  const buttons=Array.from(list.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')||[]);
  const current=buttons.indexOf(document.activeElement as HTMLButtonElement);
  const next=event.key==="Home"?0:event.key==="End"?buttons.length-1:(current+(event.key==="ArrowDown"?1:-1)+buttons.length)%buttons.length;
  buttons[next]?.focus();
 };
 return <div className="color-filter" ref={root} onKeyDown={event=>{if(event.key==="Escape"){event.preventDefault();setOpen(false);trigger.current?.focus();}}} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpen(false);}}>
  <button type="button" className="color-filter-trigger" ref={trigger} aria-label={"Lọc màu: "+(value==="all"?"Tất cả màu":value)} aria-haspopup="listbox" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(o=>!o)} onKeyDown={event=>{if(event.key==="ArrowDown"||event.key==="ArrowUp"){event.preventDefault();setOpen(true);}}}>
   {value!=="all"&&<span className="filter-color-dot" style={{backgroundColor:colors.find(c=>c.name===value)?.hex}} aria-hidden="true"/>}
   <span>{value==="all"?"Tất cả màu":value}</span><CaretDown size={18} aria-hidden="true"/>
  </button>
  {open&&<div className="color-filter-popover"><div ref={list} id={id} role="listbox" aria-label="Màu sản phẩm" onKeyDown={keyboard}>
   {options.map(option=><button type="button" role="option" aria-selected={value===option.value} tabIndex={value===option.value?0:-1} key={option.value} onClick={()=>choose(option.value)}>
    <span className={option.hex?"filter-color-dot":"filter-color-all"} style={option.hex?{backgroundColor:option.hex}:undefined} aria-hidden="true"/>
    <span>{option.name}</span>{value===option.value&&<Check size={18} aria-hidden="true"/>}
   </button>)}
  </div></div>}
 </div>;
}