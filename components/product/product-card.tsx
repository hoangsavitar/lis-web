"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Check } from "@phosphor-icons/react";
import { Product, ColorSwatch } from "@/data/products";
import { formatVND } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const currentImage = selectedColor?.image || product.mainImage;
  const hoverImage = product.hoverImage || product.gallery[1] || product.mainImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      slug: product.slug,
      title: `${product.title} - ${selectedColor.name}`,
      price: product.price,
      comparePrice: product.comparePrice,
      image: currentImage,
      color: selectedColor.name,
      size: product.sizes[0] || "Tiêu chuẩn",
      quantity: 1,
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  return (
    <div
      className="proloop-card group relative flex flex-col p-2.5 sm:p-3 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges: New Drop / Discount - Modern Pill Style */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="rounded-full bg-[#18181B] text-white text-[10px] font-sans tracking-wider uppercase px-2.5 py-0.5 font-semibold shadow-xs">
            NEW DROP
          </span>
        )}
        {product.discountPercentage > 0 && (
          <span className="rounded-full bg-[#9A2C46] text-white text-[10px] font-sans tracking-wider px-2.5 py-0.5 font-bold shadow-xs">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Image Container with 2-layer flip and rounded chic corners */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-[3/4] bg-[#F2EFEB] rounded-xl overflow-hidden"
      >
        {/* Layer 1: Main front image */}
        <Image
          src={currentImage}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="card-img-primary object-cover object-center"
        />

        {/* Layer 2: Hover angle/back image */}
        <Image
          src={hoverImage}
          alt={`${product.title} - góc chụp khác`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="card-img-hover object-cover object-center"
        />
      </Link>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex-1 flex flex-col justify-between">
        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {product.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  onMouseEnter={() => setSelectedColor(color)}
                  className={`w-[18px] h-[18px] rounded-full p-[1.5px] border transition-all duration-200 ${
                    isSelected
                      ? "border-[#18181B] scale-110"
                      : "border-transparent hover:border-[#18181B]/40"
                  }`}
                >
                  <span
                    className="block w-full h-full rounded-full shadow-inner border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
            <span className="text-[11px] text-[#71717A] ml-1 font-mono">
              ({product.colors.length})
            </span>
          </div>
        )}

        {/* Title in Plus Jakarta Sans */}
        <h3 className="font-sans text-[13px] sm:text-sm font-semibold text-[#18181B] hover:text-[#9A2C46] transition-colors line-clamp-1 mb-1">
          <Link href={`/products/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Subtitle / Style */}
        <p className="text-[11px] text-[#71717A] line-clamp-1 mb-2 font-normal">
          {product.subtitle}
        </p>

        {/* Price & Compare Price in Space Grotesk */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="font-mono text-sm sm:text-[15px] font-bold text-[#18181B]">
            {formatVND(product.price)}
          </span>
          {product.comparePrice > product.price && (
            <span className="font-mono text-xs text-[#A1A1AA] line-through">
              {formatVND(product.comparePrice)}
            </span>
          )}
        </div>
      </div>

      {/* Pop-out Quick Add to Cart Action Panel (Reveals on Hover) */}
      <div className="proloop-action-panel mt-2">
        <button
          type="button"
          onClick={handleQuickAdd}
          className={`w-full py-2.5 px-3 rounded-full text-xs tracking-wider font-semibold uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm ${
            addedNotice
              ? "bg-[#2E7D32] text-white"
              : "bg-[#18181B] text-white hover:bg-[#9A2C46]"
          }`}
        >
          {addedNotice ? (
            <>
              <Check size={14} weight="bold" />
              <span>ĐÃ BỎ TÚI</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} weight="fill" />
              <span>BỎ TÚI NGAY</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
