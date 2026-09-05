"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Package,
  ArrowsClockwise,
  PhoneCall,
  CheckCircle,
} from "@phosphor-icons/react";
import { CATEGORIES } from "@/data/products";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#121110] text-white pt-16 pb-12 mt-20 border-t border-black/10">
      {/* 4 Client Perks / Guarantees Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <ShieldCheck size={28} weight="fill" className="text-[#C5A880] flex-shrink-0" />
            <div>
              <h4 className="font-sans text-sm font-bold tracking-wide">
                Bảo Hành Da Thật 12 Tháng
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed font-normal">
                Cam kết da bò và da cừu nhập khẩu 100%, bảo dưỡng viền sơn và khóa kim loại miễn phí.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Package size={28} weight="fill" className="text-[#C5A880] flex-shrink-0" />
            <div>
              <h4 className="font-sans text-sm font-bold tracking-wide">
                Đóng Gói Hộp Quà Cao Cấp
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed font-normal">
                Mỗi sản phẩm đều được bọc túi vải canvas chống bụi và đặt trong hộp cứng thắt ruy băng.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ArrowsClockwise size={28} weight="fill" className="text-[#C5A880] flex-shrink-0" />
            <div>
              <h4 className="font-sans text-sm font-bold tracking-wide">
                Đổi Hàng Linh Hoạt 30 Ngày
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed font-normal">
                Hỗ trợ đổi mẫu hoặc đổi màu sắc tận nhà nếu sản phẩm chưa qua sử dụng.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneCall size={28} weight="fill" className="text-[#C5A880] flex-shrink-0" />
            <div>
              <h4 className="font-sans text-sm font-bold tracking-wide">
                Tư Vấn Concierge 1-on-1
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed font-normal">
                Đội ngũ chuyên viên phong cách hỗ trợ lựa chọn dáng túi và phối đồ mọi lúc.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Heritage & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-sans text-2xl tracking-[0.26em] font-extrabold text-white block">
                LIS
              </span>
              <span className="text-[9px] font-sans tracking-[0.42em] text-[#C5A880] uppercase block mt-0.5 font-medium">
                STUDIO PARIS
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-normal">
              Khởi nguồn từ niềm đam mê chế tác đồ da tinh tuyển, LIS theo đuổi triết lý Contemporary Chic: đề cao chất liệu thượng hạng, cấu trúc phom dáng thanh lịch và từng mũi kim may thủ công tỉ mỉ.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-[11px] font-sans tracking-widest uppercase text-white mb-2.5 font-semibold">
                ✦ Đăng ký nhận bản tin & Ưu đãi thành viên
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#94BAA2] bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle size={16} weight="fill" />
                  Cảm ơn bạn đã đăng ký! Mã ưu đãi 10% sẽ được gửi tới bạn sớm nhất.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm rounded-full p-1 bg-white/10 border border-white/15 focus-within:border-white/40 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    required
                    className="flex-1 bg-transparent px-4 py-2 text-xs text-white placeholder:text-stone-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#9A2C46] text-white px-5 py-2 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-[#b03452] transition-colors flex items-center justify-center gap-1 shadow-xs"
                    aria-label="Đăng ký nhận tin"
                  >
                    <span>Gửi</span>
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Danh mục sản phẩm */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-wider uppercase mb-4 text-white">
              Bộ Sưu Tập
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-normal">
              <li>
                <Link href="/collections/all" className="hover:text-white transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/collections/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Dịch vụ khách hàng */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-wider uppercase mb-4 text-white">
              Dịch Vụ & Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A29E]">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Chính sách bảo hành 12 tháng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Chính sách đổi trả 30 ngày
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Hướng dẫn chăm sóc & bảo quản da
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Quy cách đóng gói quà tặng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Showroom & Hotline */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase mb-4 text-white">
              Hệ Thống Showroom
            </h4>
            <div className="space-y-3 text-xs text-[#A8A29E] leading-relaxed">
              <div>
                <strong className="text-white block font-sans">Showroom Flagship Hà Nội</strong>
                <span>88 Phố Huế, P. Hàng Bài, Q. Hoàn Kiếm</span>
              </div>
              <div>
                <strong className="text-white block font-sans">Showroom TP. Hồ Chí Minh</strong>
                <span>142 Pasteur, P. Bến Nghé, Quận 1</span>
              </div>
              <div className="pt-2">
                <span className="block text-[#B99054] font-mono text-sm font-semibold">
                  Hotline: 0988 123 456
                </span>
                <span className="text-[11px]">Mở cửa hàng ngày: 09:00 — 21:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4 font-mono">
        <div>
          © 2026 LIS Atelier Vietnam. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-[11px]">
          <span>Chế tác thủ công</span>
          <span>•</span>
          <span>Da thật 100%</span>
          <span>•</span>
          <span>Bản quyền thiết kế</span>
        </div>
      </div>
    </footer>
  );
}
