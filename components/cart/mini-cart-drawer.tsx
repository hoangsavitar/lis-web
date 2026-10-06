"use client";
import Link from "next/link";
import {Heart,Minus,Plus} from "@phosphor-icons/react/dist/ssr";
import {useCartStore} from "@/lib/store/cart-store";
import {Drawer} from "@/components/layout/dialog";
import {FacebookLink} from "@/components/layout/facebook-link";
import {CopyConsultation} from "@/components/product/copy-consultation";

export function MiniCartDrawer(){
 const {items,isOpen,closeCart,removeItem,updateQuantity,legacyNotice,dismissNotice}=useCartStore();
 return <Drawer open={isOpen} onClose={closeCart} title="Mẫu đã lưu">
  {legacyNotice&&<div className="notice">Một vài mẫu cũ không còn trong danh mục. Bạn có thể chọn lại màu mình thích. <button className="text-button" onClick={dismissNotice}>Đã hiểu</button></div>}
  {!items.length?<div className="empty-state"><Heart size={40} weight="light"/><h3>Bạn chưa lưu mẫu nào</h3><Link className="button" href="/collections/all" onClick={closeCart}>Xem sản phẩm</Link></div>:<>
   <div className="saved-list">{items.map(item=><article key={item.id} className="saved-item">
    <Link className="saved-image-link" href={`/products/${item.slug}?variant=${item.variantId}`} onClick={closeCart}><img src={item.image} alt={item.title+" màu "+item.color} width={88} height={110}/></Link>
    <div className="saved-item-info"><Link className="saved-item-title" href={`/products/${item.slug}?variant=${item.variantId}`} onClick={closeCart}>{item.title}</Link><p>Màu {item.color}</p><FacebookLink context={item.title+" màu "+item.color}/>
     <div className="quantity"><button className="icon-button" aria-label={"Giảm số lượng "+item.title} onClick={()=>updateQuantity(item.id,item.quantity-1)}><Minus size={18}/></button><span aria-label="Số lượng">{item.quantity}</span><button className="icon-button" aria-label={"Tăng số lượng "+item.title} disabled={item.quantity===99} onClick={()=>updateQuantity(item.id,item.quantity+1)}><Plus size={18}/></button><button className="remove text-button" aria-label={"Bỏ lưu "+item.title+" màu "+item.color} onClick={()=>removeItem(item.id)}>Bỏ lưu</button></div>
    </div>
   </article>)}</div>
   <div className="saved-actions"><FacebookLink label="Nhắn LIS trên Facebook" className="button full"/><CopyConsultation items={items} label="Sao chép danh sách"/></div>
  </>}
 </Drawer>;
}
