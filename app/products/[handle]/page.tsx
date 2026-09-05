"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Package,
  ArrowsClockwise,
  Minus,
  Plus,
  ShoppingBag,
  CaretDown,
  Check,
} from "@phosphor-icons/react";
import { PRODUCTS, ColorSwatch } from "@/data/products";
import { formatVND } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";
import { ProductCard } from "@/components/product/product-card";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const handle = resolvedParams.handle;
  const product = PRODUCTS.find((p) => p.slug === handle);

  if (!product) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "Tiêu chuẩn");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("desc");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  // Switch image when color changes
  const handleColorChange = (color: ColorSwatch) => {
    setSelectedColor(color);
    if (color.image) {
      setActiveImage(color.image);
    }
  };

  // Sticky Add-to-cart Bar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: `${product.title} - ${selectedColor.name}`,
      price: product.price,
      comparePrice: product.comparePrice,
      image: activeImage,
      color: selectedColor.name,
      size: selectedSize,
      quantity: quantity,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#F8F6F0] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-sans text-stone-500 mb-8">
          <Link href="/" className="hover:text-[#18181B] transition-colors">
            Trang Chủ
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-[#18181B] transition-colors"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-[#18181B] truncate font-semibold">{product.title}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT: Product Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] w-full bg-[#F2EFEB] rounded-2xl border border-black/5 overflow-hidden shadow-sm">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-all duration-300"
              />
              {/* Badges - Modern Pill */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {product.isNew && (
                  <span className="rounded-full bg-[#18181B] text-white text-[10px] font-sans tracking-wider uppercase px-3 py-1 font-bold shadow-xs">
                    NEW DROP
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="rounded-full bg-[#9A2C46] text-white text-[10px] font-sans tracking-wider px-3 py-1 font-bold shadow-xs">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[4/5] bg-[#F2EFEB] rounded-xl overflow-hidden border transition-all duration-200 ${
                    activeImage === img
                      ? "border-[#18181B] ring-2 ring-[#18181B]/20 scale-102"
                      : "border-black/5 hover:border-black/20 opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Góc chụp ${idx + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details & Controls (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#18181B]/5 text-[11px] font-sans tracking-wider uppercase text-[#18181B] font-bold">
                  {product.categoryName}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[11px] font-mono text-stone-500">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="font-sans text-2xl sm:text-3xl font-bold text-[#18181B] leading-snug">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} weight="fill" />
                  ))}
                </div>
                <span className="text-xs font-mono text-stone-500 font-medium">
                  {product.rating} ({product.reviewCount} đánh giá)
                </span>
              </div>

              {/* Price in Space Grotesk */}
              <div className="flex items-baseline gap-3 mt-4 pt-3 border-t border-black/5">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#18181B]">
                  {formatVND(product.price)}
                </span>
                {product.comparePrice > product.price && (
                  <span className="font-mono text-sm text-stone-400 line-through">
                    {formatVND(product.comparePrice)}
                  </span>
                )}
                <span className="text-xs font-mono text-[#9A2C46] bg-[#9A2C46]/10 px-2.5 py-0.5 rounded-full font-bold">
                  Tiết kiệm {formatVND(product.comparePrice - product.price)}
                </span>
              </div>
            </div>

            {/* Color Swatch Picker */}
            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#18181B] mb-2.5">
                Màu sắc: <strong className="text-[#9A2C46]">{selectedColor.name}</strong>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs transition-all ${
                        isSelected
                          ? "border-[#18181B] bg-white shadow-xs font-bold text-[#18181B] scale-105"
                          : "border-black/10 bg-white text-stone-600 hover:border-black/30"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#18181B] mb-2.5">
                  Kích thước: <strong className="text-[#18181B]">{selectedSize}</strong>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-xs font-mono border transition-all ${
                        selectedSize === size
                          ? "border-[#18181B] bg-[#18181B] text-white font-bold"
                          : "border-black/10 bg-white text-[#18181B] hover:border-black/30"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {/* Stepper */}
              <div className="inline-flex items-center border border-black/10 bg-white rounded-full h-12 w-full sm:w-36 justify-between px-3 shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B] hover:bg-black/5"
                  aria-label="Giảm"
                >
                  <Minus size={13} weight="bold" />
                </button>
                <span className="font-mono text-sm font-bold text-[#18181B]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B] hover:bg-black/5"
                  aria-label="Tăng"
                >
                  <Plus size={13} weight="bold" />
                </button>
              </div>

              {/* Main Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-12 px-8 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                  addedNotice
                    ? "bg-[#2E7D32] text-white"
                    : "bg-[#18181B] text-white hover:bg-[#9A2C46] active:scale-[0.99]"
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check size={16} weight="bold" />
                    ĐÃ THÊM VÀO GIỎ
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} weight="fill" />
                    BỎ TÚI NGAY
                  </>
                )}
              </button>
            </div>

            {/* Client Perks List */}
            <div className="pt-4 border-t border-[#1C1917]/10 space-y-2.5 text-xs text-[#57534E]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-[#B99054]" />
                <span>Bảo hành chính hãng 12 tháng da thật và phụ kiện kim loại</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Package size={18} className="text-[#B99054]" />
                <span>Miễn phí vận chuyển toàn quốc cho đơn từ 1.000.000₫</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ArrowsClockwise size={18} className="text-[#B99054]" />
                <span>Đổi hàng tận nhà trong 30 ngày nếu chưa qua sử dụng</span>
              </div>
            </div>

            {/* Accordions: Description, Specs, Warranty */}
            <div className="pt-4 border-t border-[#1C1917]/10 divide-y divide-[#1C1917]/10">
              {/* Accordion 1: Description */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "desc" ? "" : "desc")
                  }
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1917]"
                >
                  <span>Mô tả chi tiết & Cảm hứng</span>
                  <CaretDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openAccordion === "desc" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "desc" && (
                  <div className="pt-3 text-xs text-[#57534E] leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Specs */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "specs" ? "" : "specs")
                  }
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1917]"
                >
                  <span>Chất liệu & Kích thước</span>
                  <CaretDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openAccordion === "specs" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "specs" && (
                  <div className="pt-3 text-xs text-[#57534E] space-y-2 font-mono">
                    <div className="flex justify-between py-1 border-b border-[#1C1917]/5">
                      <span className="text-[#78716C]">Chất liệu:</span>
                      <span className="font-sans font-medium text-[#1C1917]">{product.material}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1C1917]/5">
                      <span className="text-[#78716C]">Kích thước:</span>
                      <span className="font-medium text-[#1C1917]">{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1C1917]/5">
                      <span className="text-[#78716C]">Khối lượng:</span>
                      <span className="font-medium text-[#1C1917]">{product.weight}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Guide */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "care" ? "" : "care")
                  }
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1C1917]"
                >
                  <span>Hướng dẫn bảo dưỡng da</span>
                  <CaretDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openAccordion === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "care" && (
                  <div className="pt-3 text-xs text-[#57534E] leading-relaxed space-y-1.5">
                    <p>• Tránh để túi tiếp xúc trực tiếp với cồn, nước hoa hoặc hóa chất tẩy rửa mạnh.</p>
                    <p>• Khi không sử dụng, hãy nhét giấy lụa vào bên trong và cất vào túi vải canvas LIS để giữ phom dáng.</p>
                    <p>• Nếu túi bị ướt mưa, hãy dùng khăn cotton mềm lau nhẹ và để khô tự nhiên ở nơi thoáng gió, không dùng máy sấy nhiệt.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-black/5">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-[#18181B]/5 text-[#18181B] text-[11px] font-sans font-semibold tracking-wider uppercase mb-3">
                ✦ GỢI Ý TỪ LIS STUDIO
              </span>
              <h3 className="font-sans text-2xl font-bold tracking-tight text-[#18181B]">
                Sản Phẩm <span className="font-serif italic font-normal text-[#9A2C46]">Cùng Bộ Sưu Tập</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Add-to-cart Bar on Scroll */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-black/5 p-3 sm:p-4 shadow-xl transform transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-14 flex-shrink-0 bg-[#F2EFEB] rounded-xl border border-black/5 overflow-hidden">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-sans text-sm font-bold text-[#18181B] truncate">
                {product.title}
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-[#9A2C46]">
                  {formatVND(product.price)}
                </span>
                <span className="text-stone-500 font-medium">• {selectedColor.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2.5 rounded-full bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#9A2C46] transition-colors flex items-center gap-2 whitespace-nowrap shadow-md"
            >
              <ShoppingBag size={16} weight="fill" />
              Bỏ Túi Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
