"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {useCartStore} from "@/lib/store/cart-store";
import {useSearchStore} from "@/lib/store/search-store";
export function Header(){
 const [mounted,setMounted]=useState(false);useEffect(()=>setMounted(true),[]);
 const items=useCartStore(s=>s.items);const openCart=useCartStore(s=>s.openCart);const openSearch=useSearchStore(s=>s.openSearch);
 return <header className="site-header"><Link className="wordmark" href="/" aria-label="LIS — Trang chủ">LIS<span>EVERYDAY, DISTINCTLY YOU.</span></Link><nav aria-label="Điều hướng chính"><Link href="/collections/all">Bộ sưu tập</Link><Link className="desktop-link" href="/#ve-lis">Về LIS</Link></nav><div className="header-actions"><button className="icon-button" aria-label="Tìm sản phẩm" onClick={openSearch}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button><button className="save-trigger" onClick={openCart} aria-label={`Mẫu đã lưu, ${mounted?items.length:0} màu`}>Đã lưu <span>{mounted?items.length:0}</span></button></div></header>
}
