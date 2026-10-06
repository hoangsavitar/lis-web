"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {List,MagnifyingGlass,Heart,ArrowUpRight} from "@phosphor-icons/react/dist/ssr";
import {NAVIGATION,SITE} from "@/data/site";
import {useCartStore} from "@/lib/store/cart-store";
import {useSearchStore} from "@/lib/store/search-store";
import {BrandLogo} from "./brand-logo";
import {Drawer} from "./dialog";

export function Header(){
 const pathname=usePathname();
 const [menuOpen,setMenuOpen]=useState(false);
 const [mounted,setMounted]=useState(false);
 const items=useCartStore(s=>s.items);
 const openCart=useCartStore(s=>s.openCart);
 const openSearch=useSearchStore(s=>s.openSearch);
 useEffect(()=>setMounted(true),[]);
 const count=mounted?items.length:0;
 return <>
 <header className="site-header">
  <div className="header-inner">
   <button className="icon-button mobile-menu-button" aria-label="Mở menu" onClick={()=>setMenuOpen(true)}><List size={26}/></button>
   <Link href="/" className="header-logo" aria-label="LIS — Trang chủ"><BrandLogo width={88}/></Link>
   <nav className="desktop-nav" aria-label="Menu chính">{NAVIGATION.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?"page":undefined}>{item.label}</Link>)}</nav>
   <div className="header-actions">
    <button className="header-action" onClick={openSearch} aria-label="Tìm sản phẩm"><MagnifyingGlass size={23}/><span>Tìm kiếm</span></button>
    <button className="header-action" onClick={openCart} aria-label={"Mẫu đã lưu"+(count?", "+count+" mẫu":"")}><Heart size={23}/><span>Đã lưu</span>{count>0&&<b className="saved-count">{count}</b>}</button>
    <a className="header-consult" href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Tư vấn trên Facebook (mở tab mới)">Tư vấn <ArrowUpRight size={18}/></a>
   </div>
  </div>
 </header>
 <Drawer open={menuOpen} onClose={()=>setMenuOpen(false)} title="Khám phá LIS">
  <nav className="mobile-nav" aria-label="Menu di động">{NAVIGATION.map(item=><Link key={item.href} href={item.href} onClick={()=>setMenuOpen(false)}>{item.label}<ArrowUpRight size={22}/></Link>)}</nav>
  <a className="button full" href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer">Nhắn LIS trên Facebook <ArrowUpRight size={20}/></a>
  <p className="drawer-note">Bạn muốn xem thêm ảnh hoặc hỏi giá? LIS sẽ tư vấn qua Facebook.</p>
 </Drawer>
 </>;
}