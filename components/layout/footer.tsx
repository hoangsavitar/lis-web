import Link from "next/link";
import {CaretDown,ArrowUp} from "@phosphor-icons/react/dist/ssr";
import {NAVIGATION} from "@/data/site";
import {BrandLogo} from "./brand-logo";
import {FacebookLink} from "./facebook-link";

const questions=[
 {title:"Làm sao để lưu mẫu mình thích?",answer:"Chọn màu và bấm “Lưu mẫu”. Các lựa chọn nằm trong mục “Đã lưu”."},
 {title:"Mình hỏi giá ở đâu?",answer:"LIS tư vấn giá và tình trạng hàng trực tiếp qua Facebook."},
 {title:"Làm sao để xem các màu?",answer:"Các màu nằm dưới ảnh và trên trang sản phẩm, đi cùng ảnh tương ứng."}
];
export function Footer(){
 return <footer className="site-footer" id="ve-lis">
  <div className="footer-inner">
   <div className="footer-intro">
    <Link href="/" aria-label="LIS — Trang chủ"><BrandLogo variant="white" width={144}/></Link>
    <p>Túi đan, tote và charm cho những ngày đi làm và những buổi hẹn.</p>
    <FacebookLink label="Nhắn LIS trên Facebook" className="button button-light"/>
   </div>
   <nav className="footer-links" aria-label="Danh mục ở chân trang"><h3>Khám phá</h3>{NAVIGATION.slice(0,4).map(item=><Link key={item.href} href={item.href}>{item.label==="Sản phẩm"?"Tất cả sản phẩm":item.label}</Link>)}<Link href="/ve-lis">Về LIS</Link></nav>
   <div className="footer-faq"><h3>Bạn cần biết thêm?</h3>{questions.map(q=><details key={q.title}><summary>{q.title}<CaretDown size={20}/></summary><p>{q.answer}</p></details>)}</div>
  </div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} LIS</span><a href="#top">Lên đầu trang <ArrowUp size={18}/></a></div>
 </footer>;
}