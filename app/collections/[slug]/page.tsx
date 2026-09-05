"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkle } from "@phosphor-icons/react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const isAll = slug === "all";
  const category = isAll
    ? {
        name: "Tất Cả Sản Phẩm",
        description: "Toàn bộ các thiết kế túi xách và phụ kiện da cao cấp từ LIS Atelier.",
      }
    : CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    let result = isAll
      ? [...PRODUCTS]
      : PRODUCTS.filter((p) => p.category === slug);

    // Price filter
    if (priceFilter === "under-700") {
      result = result.filter((p) => p.price < 700000);
    } else if (priceFilter === "700-1000") {
      result = result.filter((p) => p.price >= 700000 && p.price <= 1000000);
    } else if (priceFilter === "above-1000") {
      result = result.filter((p) => p.price > 1000000);
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [slug, isAll, sortBy, priceFilter]);

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[#78716C] mb-8">
          <Link href="/" className="hover:text-[#1C1917] transition-colors">
            Trang Chủ
          </Link>
          <span>/</span>
          <span className="text-[#1C1917] font-medium">{category.name}</span>
        </nav>

        {/* Collection Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#B99054] font-semibold block mb-2 flex items-center justify-center gap-1.5">
            <Sparkle size={13} weight="fill" />
            BỘ SƯU TẬP THỜI TRANG LIS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-wide text-[#1C1917]">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-3 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-white p-4 border border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            <Link
              href="/collections/all"
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                isAll
                  ? "bg-[#1C1917] text-white"
                  : "bg-[#FAFAF9] text-[#78716C] hover:text-[#1C1917]"
              }`}
            >
              Tất Cả ({PRODUCTS.length})
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/collections/${cat.slug}`}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                  slug === cat.slug
                    ? "bg-[#1C1917] text-white"
                    : "bg-[#FAFAF9] text-[#78716C] hover:text-[#1C1917]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="text-xs font-mono bg-[#FAFAF9] border border-[#1C1917]/15 px-3 py-1.5 focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
            >
              <option value="all">Mọi mức giá</option>
              <option value="under-700">Dưới 700.000₫</option>
              <option value="700-1000">700.000₫ — 1.000.000₫</option>
              <option value="above-1000">Trên 1.000.000₫</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-mono bg-[#FAFAF9] border border-[#1C1917]/15 px-3 py-1.5 focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
            >
              <option value="featured">Nổi bật</option>
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#1C1917]/10">
            <h3 className="font-serif text-lg text-[#1C1917] mb-2">
              Không tìm thấy sản phẩm trong tầm giá này
            </h3>
            <p className="text-xs text-[#78716C] mb-4">
              Vui lòng chọn lại bộ lọc giá hoặc danh mục khác.
            </p>
            <button
              onClick={() => {
                setPriceFilter("all");
                setSortBy("featured");
              }}
              className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#6B1530] transition-colors"
            >
              Xóa Bộ Lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
