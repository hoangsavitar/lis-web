"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {useCartStore} from "@/lib/store/cart-store";
import {Drawer} from "@/components/layout/dialog";
export function MiniCartDrawer(){
 const {items,isOpen,closeCart,removeItem,updateQuantity,legacyNotice,dismissNotice}=useCartStore();const [copied,setCopied]=useState(false);const [copyError,setCopyError]=useState(false);
 useEffect(()=>{setCopied(false);setCopyError(false)},[items]);
 const text=items.map(i=>`${i.title} — ${i.color} × ${i.quantity}\n${typeof window!=="undefined"?window.location.origin:""}/products/${i.slug}?variant=${i.variantId}`).join("\n\n");
 return <Drawer open={isOpen} onClose={closeCart} title="Mẫu bạn đã lưu">
 {legacyNotice&&<div className="notice">Danh mục đã được cập nhật. Các lựa chọn cũ không còn khớp đã được bỏ; hãy chọn lại màu bạn thích. <button onClick={dismissNotice}>Đã hiểu</button></div>}
 {items.length===0?<div className="empty-state"><span className="eyebrow">YOUR LITTLE COLLECTION</span><h3>Một lựa chọn<br/><em>rất riêng.</em></h3><p>Lưu mẫu và màu yêu thích để xem lại hoặc gửi cho LIS khi cần tư vấn.</p><Link className="button" href="/collections/all" onClick={closeCart}>Khám phá bộ sưu tập ↗</Link></div>:<>
 <p className="muted">Giá và tình trạng hàng cần được xác nhận. Danh sách này chưa phải đơn đặt hàng.</p>
 <div className="saved-list">{items.map(i=><article key={i.id} className="saved-item">
 {/* eslint-disable-next-line @next/next/no-img-element */}<img src={i.image} alt={i.title+" — "+i.color} width="88" height="110"/>
 <div><Link href={`/products/${i.slug}?variant=${i.variantId}`} onClick={closeCart}>{i.title}</Link><p>{i.color}</p><span>Liên hệ giá</span><div className="quantity"><button aria-label={"Giảm số lượng "+i.title} onClick={()=>updateQuantity(i.id,i.quantity-1)}>−</button><span>{i.quantity}</span><button aria-label={"Tăng số lượng "+i.title} onClick={()=>updateQuantity(i.id,i.quantity+1)}>+</button><button className="remove" onClick={()=>removeItem(i.id)}>Bỏ lưu</button></div></div></article>)}</div>
 <button className="button full" onClick={async()=>{try{await navigator.clipboard.writeText(text);setCopied(true);setCopyError(false)}catch{setCopyError(true)}}}>{copied?"Đã sao chép danh sách ✓":"Sao chép để gửi tư vấn ↗"}</button>
 <p role="status" className="muted">{copied?"Bạn có thể dán danh sách vào cuộc trò chuyện với LIS.":"Danh sách được lưu trên trình duyệt này."}</p>
 {copyError&&<><p role="alert">Trình duyệt chưa cho phép sao chép. Bạn có thể chọn nội dung bên dưới.</p><textarea readOnly aria-label="Danh sách tư vấn" value={text}/></>}
 </>}
 </Drawer>;
}
