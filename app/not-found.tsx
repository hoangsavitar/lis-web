import Link from "next/link";
export default function NotFound(){
 return <div className="not-found empty-state"><h1>Không tìm thấy trang này</h1><p>Liên kết có thể đã thay đổi. Bạn xem lại các sản phẩm LIS nhé.</p><Link className="button" href="/collections/all">Xem sản phẩm</Link></div>;
}