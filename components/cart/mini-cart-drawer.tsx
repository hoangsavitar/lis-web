"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash,
  ShoppingBag,
  Sparkle,
  ArrowRight,
  ShieldCheck,
  Gift,
} from "@phosphor-icons/react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatVND } from "@/lib/utils";
import { PRODUCTS } from "@/data/products";

export function MiniCartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getFreeshipRemaining,
    getFreeshipProgress,
    addItem,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const freeshipRemaining = getFreeshipRemaining();
  const freeshipProgress = getFreeshipProgress();
  const totalItemsCount = items.reduce((acc, it) => acc + it.quantity, 0);

  // Cross-sell items (pick charms & accessories from PRODUCTS)
  const crossSellAccessories = PRODUCTS.filter(
    (p) =>
      p.category === "phu-kien-charm" &&
      !items.some((cartItem) => cartItem.productId === p.id)
  ).slice(0, 3);

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[480px] bg-[#FFFFFF] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 bg-[#F8F6F0]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} weight="fill" className="text-[#18181B]" />
            <h2 className="font-sans text-base tracking-tight font-bold text-[#18181B]">
              Giỏ Hàng Của Bạn
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#9A2C46] text-white">
              {totalItemsCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-stone-500 hover:text-[#18181B] hover:bg-black/5 transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Freeship Progress Meter */}
        <div className="bg-[#F8F6F0]/60 px-6 py-3.5 border-b border-black/5">
          <div className="flex items-center justify-between text-xs mb-2">
            {freeshipRemaining > 0 ? (
              <p className="text-stone-700 font-medium">
                Mua thêm{" "}
                <span className="font-bold text-[#9A2C46]">
                  {formatVND(freeshipRemaining)}
                </span>{" "}
                để được <span className="font-bold text-[#18181B]">FREESHIP ✦</span>
              </p>
            ) : (
              <p className="flex items-center gap-1.5 text-[#C5A880] font-bold">
                <Sparkle size={15} weight="fill" />
                Bạn đã được MIỄN PHÍ VẬN CHUYỂN toàn quốc!
              </p>
            )}
            <span className="font-mono text-[11px] font-bold text-stone-500">
              {freeshipProgress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E8E4DC] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                freeshipRemaining === 0 ? "shimmer-progress" : "bg-[#18181B]"
              }`}
              style={{ width: `${freeshipProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Content: Item List or Empty State */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-black/5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-[#F8F6F0] flex items-center justify-center mb-4 border border-black/5 shadow-2xs">
                <ShoppingBag size={34} weight="light" className="text-stone-400" />
              </div>
              <h3 className="font-sans text-lg text-[#18181B] mb-2 font-bold tracking-tight">
                Giỏ hàng của bạn đang trống
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mb-6 leading-relaxed font-normal">
                Hãy khám phá các tác phẩm đồ da thủ công độc bản được chế tác tinh xảo từ LIS Studio.
              </p>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-[#18181B] text-white px-7 py-3 rounded-full text-xs tracking-wider uppercase font-semibold hover:bg-[#9A2C46] transition-all shadow-md"
              >
                Khám Phá Bộ Sưu Tập
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-3 group relative transition-all duration-300"
                >
                  {/* Thumbnail rounded-xl */}
                  <div className="relative w-20 h-24 flex-shrink-0 bg-[#F2EFEB] rounded-xl overflow-hidden border border-black/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between pr-1">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-sans text-sm font-semibold text-[#18181B] hover:text-[#9A2C46] transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-[#D9383A] transition-colors p-1"
                          aria-label="Xóa món đồ"
                        >
                          <Trash size={16} weight="bold" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-stone-500 font-normal">
                        <span>Màu: <strong className="text-[#18181B]">{item.color}</strong></span>
                        {item.size && (
                          <>
                            <span>•</span>
                            <span>{item.size}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Stepper and Price */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="inline-flex items-center border border-black/10 bg-[#F8F6F0] rounded-full p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#18181B] hover:bg-white transition-colors"
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={11} weight="bold" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-bold text-[#18181B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#18181B] hover:bg-white transition-colors"
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={11} weight="bold" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-sm font-bold text-[#18181B]">
                          {formatVND(item.price * item.quantity)}
                        </div>
                        {item.comparePrice && item.comparePrice > item.price && (
                          <div className="font-mono text-[11px] text-stone-400 line-through">
                            {formatVND(item.comparePrice * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* In-Cart Cross-Sell Accessories */}
              {crossSellAccessories.length > 0 && (
                <div className="mt-6 pt-5 border-t border-black/5 bg-[#F8F6F0] p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 mb-3 text-xs font-bold tracking-wide uppercase text-[#18181B]">
                    <Sparkle size={14} className="text-[#9A2C46]" weight="fill" />
                    Gợi Ý Phụ Kiện Mua Kèm Xinh Xắn
                  </div>
                  <div className="space-y-2.5">
                    {crossSellAccessories.map((accessory) => (
                      <div
                        key={accessory.id}
                        className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-black/5 shadow-2xs"
                      >
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-md bg-[#F2EFEB] overflow-hidden">
                          <Image
                            src={accessory.mainImage}
                            alt={accessory.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#18181B] truncate">
                            {accessory.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#9A2C46]">
                              {formatVND(accessory.price)}
                            </span>
                            <span className="font-mono text-[10px] text-stone-400 line-through">
                              {formatVND(accessory.comparePrice)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            addItem({
                              productId: accessory.id,
                              slug: accessory.slug,
                              title: accessory.title,
                              price: accessory.price,
                              comparePrice: accessory.comparePrice,
                              image: accessory.mainImage,
                              color: accessory.colors[0]?.name || "Mặc định",
                              size: accessory.sizes[0] || "Tiêu chuẩn",
                              quantity: 1,
                            });
                          }}
                          className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#18181B] text-white text-[11px] font-semibold tracking-wide uppercase hover:bg-[#9A2C46] transition-colors shadow-2xs"
                        >
                          + Thêm
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout summary (Only if items exist) */}
        {items.length > 0 && (
          <div className="border-t border-black/5 p-6 bg-[#F8F6F0] space-y-4">
            {/* Order Note accordion toggle */}
            <div>
              <button
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="text-xs text-stone-600 hover:text-[#18181B] flex items-center gap-1.5 transition-colors font-medium"
              >
                <Gift size={14} className="text-[#9A2C46]" />
                {showNoteInput ? "Ẩn ghi chú đơn hàng" : "Thêm ghi chú / Lời chúc tặng quà"}
              </button>
              {showNoteInput && (
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Ghi chú đóng gói cẩn thận, yêu cầu riêng hoặc lời chúc gửi người nhận..."
                  rows={2}
                  className="w-full mt-2 p-3 text-xs bg-white border border-black/10 rounded-xl focus:outline-none focus:border-[#18181B] text-[#18181B]"
                />
              )}
            </div>

            {/* Subtotal */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-stone-500 font-normal">
                <span>Tạm tính ({totalItemsCount} món)</span>
                <span className="font-mono text-sm font-bold text-[#18181B]">
                  {formatVND(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-500 font-normal">
                <span>Phí vận chuyển</span>
                <span className="font-mono text-xs">
                  {freeshipRemaining === 0 ? (
                    <strong className="text-[#C5A880] font-bold">MIỄN PHÍ</strong>
                  ) : (
                    "Tính khi thanh toán"
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-[#18181B]">
                  Tổng Cộng
                </span>
                <span className="font-mono text-lg font-extrabold text-[#9A2C46]">
                  {formatVND(subtotal)}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                alert("✨ Tính năng đặt hàng trực tiếp và thanh toán VietQR sẽ được kích hoạt tại Phase 2. Toàn bộ thông tin giỏ hàng của bạn đã được lưu trữ an toàn!");
              }}
              className="w-full py-3.5 rounded-full bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#9A2C46] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Tiến Hành Đặt Hàng
              <ArrowRight size={16} />
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1 font-normal">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#C5A880]" weight="fill" />
                Bảo hành 12 tháng
              </span>
              <span>•</span>
              <span>Đổi trả 30 ngày</span>
              <span>•</span>
              <span>Kiểm tra khi nhận</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
