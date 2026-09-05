"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#18181B] text-white">
      {/* Background Image with warm luxury gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=2000&q=85"
          alt="LIS Atelier Leather Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-in fade-in zoom-in-105 duration-1000"
        />
        {/* Soft Vignette & Modern Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18181B]/70 via-[#18181B]/40 to-[#18181B]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#18181B]/60" />
      </div>

      {/* Content Container with balanced vertical rhythm */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        {/* French subtitle pill with generous bottom spacing */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-sans font-medium tracking-[0.22em] uppercase text-[#E6CA85] mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-700">
          <Sparkle size={13} weight="fill" className="text-[#E6CA85]" />
          <span>DE LA SIMPLICITÉ NAÎT L&apos;ÉLÉGANCE</span>
          <Sparkle size={13} weight="fill" className="text-[#E6CA85]" />
        </div>

        {/* Main Title with distinct lines and proper line-height (NO overlapping) */}
        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mb-7 leading-[1.25] sm:leading-[1.22]">
          <span className="block pb-1 sm:pb-2">Nghệ Thuật Chế Tác</span>
          <span className="font-serif italic font-normal text-[#E6CA85] block pt-1 sm:pt-2">
            Đồ Da Độc Bản
          </span>
        </h1>

        {/* Subtitle with breathable spacing */}
        <p className="font-sans text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Lấy cảm hứng từ chuẩn mực Quiet Luxury đương đại. Mỗi mẫu túi là sự hòa quyện giữa kết cấu điêu khắc trẻ trung và dòng da bò Epsom nhập khẩu Ý thượng hạng.
        </p>

        {/* Dual CTAs - Modern Pill Style */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/collections/all"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#18181B] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#C5A880] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          >
            Khám Phá Bộ Sưu Tập
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/collections/tui-xach-tay"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white border border-white/25 text-xs sm:text-sm font-medium tracking-wider uppercase hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-sm"
          >
            Dòng Túi Aura IT-Bag
          </Link>
        </div>

        {/* Trust Points with clean vertical and horizontal spacing */}
        <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 sm:gap-14 text-center max-w-2xl mx-auto w-full">
          <div>
            <strong className="block text-white font-mono text-xl sm:text-2xl font-bold mb-1">100%</strong>
            <span className="font-sans text-[11px] sm:text-xs text-stone-300 font-normal">Da Bò Ý Nhập Khẩu</span>
          </div>
          <div>
            <strong className="block text-white font-mono text-xl sm:text-2xl font-bold mb-1">48h</strong>
            <span className="font-sans text-[11px] sm:text-xs text-stone-300 font-normal">May Yên Ngựa Thủ Công</span>
          </div>
          <div>
            <strong className="block text-white font-mono text-xl sm:text-2xl font-bold mb-1">12 Th</strong>
            <span className="font-sans text-[11px] sm:text-xs text-stone-300 font-normal">Bảo Hành Viền & Khóa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
