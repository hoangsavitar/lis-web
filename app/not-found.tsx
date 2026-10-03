import Link from "next/link";
export default function NotFound(){return <div className="empty-state"><span className="eyebrow">LIS / 404</span><h1>Thiết kế chưa được tìm thấy.</h1><p>Khám phá những mẫu đang có trong bộ sưu tập.</p><Link className="button" href="/collections/all">Xem bộ sưu tập ↗</Link></div>}
