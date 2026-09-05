"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

type TabFilter = "all" | "tui-xach-tay" | "tui-deo-vai" | "tui-deo-cheo" | "tui-tote" | "phu-kien-charm";

const TABS: { label: string; value: TabFilter }[] = [
  { label: "Tất Cả", value: "all" },
  { label: "Túi Xách Tay", value: "tui-xach-tay" },
  { label: "Túi Kẹp Nách", value: "tui-deo-vai" },
  { label: "Túi Đeo Chéo", value: "tui-deo-cheo" },
  { label: "Túi Tote", value: "tui-tote" },
  { label: "Phụ Kiện Charm", value: "phu-kien-charm" },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");

  const filteredProducts =
    activeTab === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 bg-white border-y border-[#1C1917]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B]/5 text-[#18181B] text-[11px] font-sans font-semibold tracking-wider uppercase mb-3">
              <Sparkle size={13} weight="fill" className="text-[#9A2C46]" />
              SẢN PHẨM NỔI BẬT · IT-BAGS 2026
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#18181B] leading-tight">
              Tuyển Chọn <span className="font-serif italic font-normal text-[#9A2C46]">Sành Điệu</span>
            </h2>
          </div>

          {/* Interactive Filter Tabs - Modern Pill Style */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-[#18181B] text-white shadow-md scale-105"
                    : "bg-[#F2EFEB] text-[#52525B] hover:text-[#18181B] hover:bg-[#E8E4DC]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 4 columns desktop, 2 columns mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-14">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300"
          >
            Xem Toàn Bộ {PRODUCTS.length} Mẫu Thiết Kế
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
