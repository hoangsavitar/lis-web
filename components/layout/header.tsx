"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MagnifyingGlass,
  ShoppingBag,
  List,
  X,
  CaretDown,
  ArrowRight,
  Heart,
} from "@phosphor-icons/react";
import { useCartStore } from "@/lib/store/cart-store";
import { useSearchStore } from "@/lib/store/search-store";
import { CATEGORIES } from "@/data/products";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuHover, setMegaMenuHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openCart = useCartStore((state) => state.openCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const openSearch = useSearchStore((state) => state.openSearch);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = mounted ? getTotalItems() : 0;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-[#1C1917]/8 py-3.5"
            : "bg-[#FAFAF9] border-b border-[#1C1917]/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Toggle & Desktop Quick Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 text-[#1C1917] hover:text-[#6B1530] transition-colors"
              aria-label="Mở menu"
            >
              <List size={24} weight="light" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-sans font-medium tracking-wide text-[#18181B]">
              <div
                className="relative py-2 group"
                onMouseEnter={() => setMegaMenuHover(true)}
                onMouseLeave={() => setMegaMenuHover(false)}
              >
                <Link
                  href="/collections/all"
                  className="flex items-center gap-1.5 hover:text-[#9A2C46] transition-colors"
                >
                  <span>Túi Xách</span>
                  <CaretDown size={12} className="transition-transform group-hover:rotate-180 text-stone-400" />
                </Link>

                {/* Mega Menu Dropdown */}
                {megaMenuHover && (
                  <div
                    className="absolute top-full -left-6 w-[740px] bg-white rounded-2xl border border-black/5 shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => setMegaMenuHover(true)}
                    onMouseLeave={() => setMegaMenuHover(false)}
                  >
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      {CATEGORIES.slice(0, 4).map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/collections/${cat.slug}`}
                          onClick={() => setMegaMenuHover(false)}
                          className="group/item p-3.5 rounded-xl hover:bg-[#F8F6F0] border border-transparent hover:border-black/5 transition-all"
                        >
                          <h4 className="font-sans text-sm font-semibold text-[#18181B] group-hover/item:text-[#9A2C46] flex items-center justify-between">
                            {cat.name}
                            <ArrowRight size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#9A2C46]" />
                          </h4>
                          <p className="text-[11px] text-[#71717A] mt-1 line-clamp-2 leading-relaxed font-normal">
                            {cat.description}
                          </p>
                        </Link>
                      ))}
                    </div>

                    {/* Lookbook Card in Mega Menu */}
                    <div className="bg-[#F8F6F0] p-4 rounded-xl border border-black/5 flex flex-col justify-between">
                      <div className="relative aspect-[4/3] w-full mb-3 rounded-lg overflow-hidden bg-[#E7E5E4]">
                        <Image
                          src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
                          alt="BST Thu Đông"
                          fill
                          sizes="240px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-full bg-white text-[9px] font-sans tracking-widest text-[#9A2C46] uppercase font-bold mb-1 shadow-2xs">
                          NEW LOOKBOOK
                        </span>
                        <h5 className="font-sans text-xs font-bold text-[#18181B] mt-0.5">
                          Contemporary Muse 2026
                        </h5>
                        <Link
                          href="/collections/tui-xach-tay"
                          onClick={() => setMegaMenuHover(false)}
                          className="text-[11px] font-semibold text-[#9A2C46] hover:underline flex items-center gap-1 mt-2 uppercase tracking-wider"
                        >
                          Khám phá BST <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/collections/tui-xach-tay" className="hover:text-[#9A2C46] transition-colors">
                Túi Xách Tay
              </Link>
              <Link href="/collections/tui-deo-vai" className="hover:text-[#9A2C46] transition-colors">
                Túi Kẹp Nách
              </Link>
              <Link href="/collections/tui-tote" className="hover:text-[#9A2C46] transition-colors">
                Túi Tote
              </Link>
              <Link href="/collections/phu-kien-charm" className="hover:text-[#9A2C46] transition-colors">
                Phụ Kiện Charm
              </Link>
            </nav>
          </div>

          {/* Center: Brand Minimalist Modern Logo (Jacquemus Inspired) */}
          <div className="flex-shrink-0 text-center">
            <Link href="/" className="inline-block group py-1">
              <span className="block font-sans text-2xl sm:text-3xl tracking-[0.26em] font-extrabold text-[#18181B] group-hover:text-[#9A2C46] transition-colors">
                LIS
              </span>
              <span className="block text-[8px] font-sans tracking-[0.42em] font-medium text-[#71717A] -mt-1 uppercase">
                STUDIO PARIS
              </span>
            </Link>
          </div>

          {/* Right: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 rounded-full hover:bg-black/5 text-[#18181B] hover:text-[#9A2C46] transition-colors"
              aria-label="Mở tìm kiếm"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/collections/all"
              className="hidden sm:block p-2 rounded-full hover:bg-black/5 text-[#18181B] hover:text-[#9A2C46] transition-colors"
              aria-label="Danh sách yêu thích"
            >
              <Heart size={20} weight="bold" />
            </Link>

            {/* Cart Trigger with Dynamic Pill Badge */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-black/5 text-[#18181B] hover:text-[#9A2C46] transition-colors flex items-center"
              aria-label="Mở giỏ hàng"
            >
              <ShoppingBag size={20} weight="bold" />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-full bg-[#9A2C46] text-white text-[10px] font-mono font-bold flex items-center justify-center animate-in zoom-in-75 duration-200 shadow-xs">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#1C1917]/10">
              <span className="font-serif text-xl tracking-widest font-bold text-[#1C1917]">
                LIS ATELIER
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#78716C] hover:text-[#1C1917]"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="py-6 space-y-4 font-serif text-base text-[#1C1917]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-[#6B1530] py-1"
              >
                Trang Chủ
              </Link>
              <Link
                href="/collections/all"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-[#6B1530] py-1"
              >
                Tất Cả Sản Phẩm
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-[#57534E] hover:text-[#6B1530] pl-3 py-1 border-l border-[#1C1917]/10"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#1C1917]/10 text-xs text-[#78716C] space-y-2 font-mono">
            <p>Hotline: 0988 123 456</p>
            <p>Email: atelier@lisbylii.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
