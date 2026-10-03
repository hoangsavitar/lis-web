import Link from "next/link";
import {PRODUCTS} from "@/data/products";
import {ProductShowcase} from "@/components/home/product-showcase";
import {ProductCard} from "@/components/product/product-card";
export default function HomePage(){
 const order=[5,0,1,2,3,6];return <>
 <ProductShowcase product={PRODUCTS[5]} hero index={1}/>
 <section className="collection-intro" id="thiet-ke"><div><span className="eyebrow">SMALL COLLECTION. MANY POSSIBILITIES.</span><h2>Tám thiết kế.<br/><em>Chọn một nét riêng.</em></h2></div><div className="product-index">{[...order,4,7].map((i,n)=><a key={i} href={"#"+PRODUCTS[i].slug}><span>{String(n+1).padStart(2,"0")}</span>{PRODUCTS[i].title}<span>↗</span></a>)}</div></section>
 {order.slice(1).map((i,n)=><ProductShowcase key={i} product={PRODUCTS[i]} index={n+2}/>)}
 <section className="charms-section"><div className="section-heading"><div><span className="eyebrow">THE LITTLE THINGS</span><h2>Điểm xuyết nhỏ.<br/><em>Niềm vui lớn.</em></h2></div><p>Một sắc màu, một bông hoa.<br/>Để chiếc túi mang dấu ấn của bạn.</p></div><div className="charm-grid">{[4,7].map(i=><div id={PRODUCTS[i].slug} key={i}><ProductCard product={PRODUCTS[i]}/></div>)}</div></section>
 <section className="choose-section"><span className="eyebrow">FIND YOUR EVERYDAY</span><h2>Hôm nay, bạn mang theo gì?</h2><div className="choose-grid"><Link href="/products/mila-bag">Một ngày nhẹ tênh <span>Mila · nhỏ gọn, linh hoạt ↗</span></Link><Link href="/collections/tui-tote">Cả ngày dài phía trước <span>Lucia & Elena · xem kích thước ↗</span></Link><Link href="/collections/phu-kien-charm">Một chút khác biệt <span>Lucky & Lily · điểm nhấn nhỏ ↗</span></Link></div></section>
 </>;
}
