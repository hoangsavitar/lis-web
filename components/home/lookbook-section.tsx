"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "@phosphor-icons/react";
import { LOOKBOOK_STORIES } from "@/data/products";

export function LookbookSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#18181B]/5 text-[#18181B] text-[11px] font-sans font-semibold tracking-wider uppercase mb-3">
              ✦ TẠP CHÍ & PHONG CÁCH SỐNG
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#18181B] leading-tight">
              Cảm Hứng <span className="font-serif italic font-normal text-[#9A2C46]">Thời Trang</span>
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="text-xs font-bold uppercase tracking-wider text-[#18181B] hover:text-[#9A2C46] flex items-center gap-1.5 group"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOOKBOOK_STORIES.map((story) => (
            <Link
              key={story.id}
              href={story.link}
              className="group block bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full bg-[#E7E5E4] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500 mb-2 font-normal">
                  <Clock size={13} />
                  <span>{story.readTime}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="font-sans text-base sm:text-lg font-bold text-[#18181B] group-hover:text-[#9A2C46] transition-colors leading-snug">
                  {story.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A2C46] group-hover:underline mt-4 uppercase tracking-wider">
                  Đọc câu chuyện <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
