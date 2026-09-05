"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlass, X, ArrowRight, Clock, Sparkle } from "@phosphor-icons/react";
import { useSearchStore } from "@/lib/store/search-store";
import { PRODUCTS, LOOKBOOK_STORIES } from "@/data/products";
import { formatVND } from "@/lib/utils";

const TRENDING_TAGS = [
  "Túi xách tay Aura",
  "Túi kẹp nách Vendôme",
  "Túi Tote Haussmann",
  "Khăn lụa Twilly",
  "Túi da màu Cognac",
  "Túi đeo chéo",
];

export function SearchDrawer() {
  const { isOpen, query, closeSearch, setQuery } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open & lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch]);

  // Filtered live results
  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(trimmed) ||
        p.categoryName.toLowerCase().includes(trimmed) ||
        p.material.toLowerCase().includes(trimmed) ||
        p.colors.some((c) => c.name.toLowerCase().includes(trimmed))
    ).slice(0, 6);
  }, [query]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Split Search Drawer (Slide from Left) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-full max-w-[1040px] bg-white shadow-2xl flex flex-col md:flex-row transform transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={closeSearch}
          className="md:hidden absolute top-4 right-4 z-20 p-2 text-[#1C1917] hover:bg-black/5 rounded-full"
          aria-label="Đóng tìm kiếm"
        >
          <X size={22} />
        </button>

        {/* LEFT COLUMN: Search input, Live Results & Trending (610px) */}
        <div className="flex-1 md:max-w-[620px] p-6 sm:p-10 flex flex-col h-full border-r border-black/5 overflow-y-auto bg-white">
          {/* Underlined Minimal Search Input */}
          <div className="relative pb-3 border-b-2 border-[#18181B] flex items-center gap-3">
            <MagnifyingGlass size={22} weight="bold" className="text-[#18181B]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm mẫu túi, chất liệu, màu sắc..."
              className="w-full text-base sm:text-lg font-sans font-semibold placeholder:font-normal placeholder:text-sm placeholder:text-stone-400 bg-transparent focus:outline-none text-[#18181B]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 text-stone-400 hover:text-[#18181B]"
              >
                <X size={18} weight="bold" />
              </button>
            )}
          </div>

          {/* Trending Searches (when query is empty) */}
          {!query.trim() && (
            <div className="mt-8">
              <h4 className="text-[11px] font-sans font-bold tracking-widest uppercase text-stone-500 mb-3.5 flex items-center gap-1.5">
                <Sparkle size={13} className="text-[#9A2C46]" weight="fill" />
                Từ khóa xu hướng
              </h4>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-[#F8F6F0] hover:bg-[#18181B] hover:text-white text-[#18181B] transition-all duration-200 shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Quick Category Browsing */}
              <div className="mt-10">
                <h4 className="text-[11px] font-sans font-bold tracking-widest uppercase text-stone-500 mb-3.5">
                  Danh mục nổi bật
                </h4>
                <ul className="space-y-2">
                  {[
                    { title: "Túi Xách Tay Thủ Công", slug: "tui-xach-tay" },
                    { title: "Túi Kẹp Nách & Đeo Vai Parisian", slug: "tui-deo-vai" },
                    { title: "Túi Đeo Chéo Dạo Phố", slug: "tui-deo-cheo" },
                    { title: "Túi Tote Laptop 14 Inch", slug: "tui-tote" },
                    { title: "Khăn Lụa Twilly & Charm Ngựa Da", slug: "phu-kien-charm" },
                  ].map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/collections/${cat.slug}`}
                        onClick={closeSearch}
                        className="font-sans text-sm text-[#18181B] hover:text-[#9A2C46] flex items-center justify-between group py-1.5 font-medium"
                      >
                        <span>{cat.title}</span>
                        <ArrowRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-[#9A2C46]"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {query.trim() && (
            <div className="mt-6 flex-1">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 text-xs text-stone-500">
                <span>
                  Kết quả cho: &ldquo;<strong className="text-[#18181B]">{query}</strong>&rdquo;
                </span>
                <span className="font-semibold">{searchResults.length} sản phẩm</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm font-sans font-bold text-[#18181B] mb-2">
                    Không tìm thấy sản phẩm phù hợp
                  </p>
                  <p className="text-xs text-stone-500">
                    Vui lòng thử tìm với từ khóa khác như &ldquo;Aura&rdquo;, &ldquo;Baguette&rdquo;, &ldquo;Tote&rdquo;...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#F8F6F0] transition-colors group"
                    >
                      <div className="relative w-14 h-16 flex-shrink-0 bg-[#F2EFEB] rounded-lg overflow-hidden border border-black/5">
                        <Image
                          src={product.mainImage}
                          alt={product.title}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-sans font-semibold text-stone-400 uppercase tracking-wider">
                          {product.categoryName}
                        </div>
                        <h5 className="font-sans text-sm text-[#18181B] font-semibold group-hover:text-[#9A2C46] transition-colors truncate">
                          {product.title}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-xs font-bold text-[#9A2C46]">
                            {formatVND(product.price)}
                          </span>
                          {product.comparePrice > product.price && (
                            <span className="font-mono text-[11px] text-stone-400 line-through">
                              {formatVND(product.comparePrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-stone-400 group-hover:text-[#18181B] group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Editorial Lookbook Stories (420px) */}
        <div className="hidden md:flex md:w-[420px] bg-[#F8F6F0] p-8 flex-col justify-between relative overflow-y-auto">
          {/* Fixed Desktop Close Button */}
          <button
            onClick={closeSearch}
            className="absolute top-6 right-6 p-2 text-stone-500 hover:text-[#18181B] hover:bg-black/5 rounded-full transition-colors"
            aria-label="Đóng tìm kiếm"
          >
            <X size={22} weight="bold" />
          </button>

          <div>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[9px] font-sans tracking-widest uppercase text-[#9A2C46] font-bold shadow-2xs">
                TẠP CHÍ & DI SẢN
              </span>
              <h3 className="font-sans text-base text-[#18181B] font-bold mt-2">
                Cảm Hứng Phong Cách Paris
              </h3>
            </div>

            <div className="space-y-6">
              {LOOKBOOK_STORIES.map((story) => (
                <Link
                  key={story.id}
                  href={story.link}
                  onClick={closeSearch}
                  className="block group"
                >
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3 bg-[#E7E5E4] border border-black/5 shadow-2xs">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500 mb-1">
                    <Clock size={12} />
                    <span>{story.readTime}</span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-[#18181B] group-hover:text-[#9A2C46] transition-colors leading-snug">
                    {story.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Craftsmanship quote */}
          <div className="pt-6 mt-6 border-t border-black/5">
            <p className="font-serif italic text-xs text-stone-600 leading-relaxed font-normal">
              &ldquo;Mỗi chiếc túi LIS là một tuyên ngôn của sự thanh lịch tự nhiên, trẻ trung và tay nghề chế tác thủ công tinh tế.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
