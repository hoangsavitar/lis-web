"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkle, Check } from "@phosphor-icons/react";

export function StorySection() {
  return (
    <section className="py-24 bg-[#F8F6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Artisan Photography Collage (5 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full bg-[#E7E5E4] rounded-2xl overflow-hidden border border-black/5 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85"
                alt="Artisan Crafting LIS Bag"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating Mini Badge Card */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl border border-black/5 shadow-xl flex-col max-w-[250px]">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#18181B] text-white text-[10px] font-sans tracking-widest uppercase font-bold w-fit mb-2">
                TIÊU CHUẨN XA XỈ
              </span>
              <p className="font-sans text-sm font-bold text-[#18181B] leading-snug">
                Kỹ thuật may yên ngựa 2 kim (Saddle Stitch)
              </p>
              <p className="text-[11px] text-[#71717A] mt-1.5 leading-relaxed font-normal">
                Từng đường kim mũi chỉ được khóa chặt tinh xảo, bền bỉ cùng thời gian.
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B]/5 text-[#18181B] text-[11px] font-sans font-semibold tracking-wider uppercase">
              <Sparkle size={13} weight="fill" className="text-[#9A2C46]" />
              TRIẾT LÝ CHẾ TÁC THỦ CÔNG
            </span>

            <h2 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#18181B] leading-tight">
              Sự Xa Xỉ Đến Từ <br />
              <span className="font-serif italic font-normal text-[#9A2C46]">Sự Giản Đơn Tinh Tế</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
              Tại LIS, chúng tôi theo đuổi vẻ đẹp tự thân không ồn ào. Đó là cảm giác êm ái khi ngón tay lướt trên bề mặt da Epsom Ý thượng hạng, là cấu trúc điêu khắc sắc nét tôn dáng outfit, và là sự tự tin toát ra từ món phụ kiện được chế tác với sự chỉn chu tuyệt đối.
            </p>

            {/* Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-black/5 shadow-2xs">
                <h4 className="font-sans text-xs font-bold uppercase text-[#18181B]">
                  ✦ Da Mastrotto & Epsom Ý
                </h4>
                <p className="text-[11px] text-[#71717A] mt-1 font-normal leading-relaxed">
                  Thuộc bằng thảo mộc tự nhiên, thơm dịu, êm ái và giữ phom hoàn hảo.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-black/5 shadow-2xs">
                <h4 className="font-sans text-xs font-bold uppercase text-[#18181B]">
                  ✦ Khóa Kim Loại Đúc Mạ Satin
                </h4>
                <p className="text-[11px] text-[#71717A] mt-1 font-normal leading-relaxed">
                  Mạ mờ chống xước, trơn tru khi kéo và giữ sắc màu sang trọng.
                </p>
              </div>
            </div>

            {/* Atelier Signature */}
            <div className="pt-6 border-t border-black/5 flex items-center justify-between">
              <div>
                <span className="font-serif italic text-xl text-[#18181B] font-medium block">
                  LIS Studio & Artisans
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#71717A] uppercase font-semibold">
                  Saigon & Paris Edition
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
