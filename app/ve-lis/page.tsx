import type {Metadata} from "next";
import Link from "next/link";
import {ArrowRight} from "@phosphor-icons/react/dist/ssr";
import {PRODUCTS,getDefaultVariant} from "@/data/products";
import {VariantImage} from "@/components/product/variant-image";
import {FacebookLink} from "@/components/layout/facebook-link";

export const metadata:Metadata={
 title:"Về LIS",
 description:"Túi đan, tote và charm của LIS. Những phom túi dễ mang cùng các chi tiết nhỏ cho ngày thường và những buổi hẹn.",
};

export default function AboutPage(){
 const mila=PRODUCTS.find(p=>p.id==="mila-bag")!;
 return <div className="about-page">
  <section className="about-intro">
   <div className="about-copy">
    <h1>Về LIS</h1>
    <p className="about-lead">Túi xách cho ngày thường.<br/>Một chút xinh xắn cho những buổi hẹn.</p>
    <p>Từ một chiếc túi nhỏ gọn đến tote rộng rãi, LIS chọn những phom túi dễ mang, dễ phối. Bề mặt đan là điểm nhấn, đi cùng các chi tiết nhỏ như dây đeo tháo rời, túi phụ và charm hoa.</p>
    <p>Bạn có thể giữ mọi thứ thật đơn giản, hoặc thêm một chiếc charm khi muốn làm mới chiếc túi quen. Mỗi mẫu có một nét riêng để đi cùng cách bạn ăn mặc và sinh hoạt hằng ngày.</p>
    <div className="about-actions"><Link className="button" href="/collections/all">Xem sản phẩm<ArrowRight size={20}/></Link><FacebookLink label="Nhắn LIS trên Facebook"/></div>
   </div>
   <div className="about-image"><VariantImage asset={getDefaultVariant(mila).gallery[0]} priority sizes="(max-width:767px) 100vw, 50vw"/></div>
  </section>
  <section className="about-details" aria-labelledby="about-details-heading">
   <h2 id="about-details-heading">Những chi tiết của LIS</h2>
   <div className="about-details-grid">
    <div><h3>Bề mặt đan</h3><p>Đan nhỏ trên Mila, đan bản lớn trên Elena và Calla. Mỗi kiểu đan mang đến một cảm giác khác nhau trên phom túi.</p></div>
    <div><h3>Cách mang linh hoạt</h3><p>Nhiều mẫu có dây đeo tháo rời, để đổi giữa xách tay, đeo vai và đeo chéo theo trang phục hoặc lịch hẹn.</p></div>
    <div><h3>Phụ kiện đi cùng</h3><p>Elena có túi nhỏ tháo rời, Calla đi cùng charm hoa đồng màu. Lucky và Lily là những lựa chọn để phối thêm.</p></div>
   </div>
  </section>
 </div>;
}