"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { CATEGORIES } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="py-20 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#18181B]/6 text-[#18181B] text-xs font-sans font-semibold tracking-wider uppercase mb-3">
            ✦ BỘ SƯU TẬP THEO PHONG CÁCH
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#18181B] leading-tight">
            Dáng Túi <span className="font-serif italic font-normal text-[#9A2C46]">Đương Đại</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mt-3 font-normal">
            Từ dáng kẹp nách Hobo năng động, túi đeo chéo gọn nhẹ đến tote công sở thanh lịch, mỗi thiết kế là một điểm nhấn hoàn hảo cho outfit của bạn.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.slug}`}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-black/5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Aspect Ratio 4:5 image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E7E5E4]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating Content Inside Image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-sans font-semibold tracking-wider uppercase mb-2">
                    {category.itemCount} THIẾT KẾ
                  </span>
                  <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-200 group-hover:text-white group-hover:translate-x-1 transition-all mt-2 font-medium">
                    <span>Khám phá ngay</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
