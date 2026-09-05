"use client";

import React, { useState, useEffect } from "react";
import { Sparkle, CaretLeft, CaretRight } from "@phosphor-icons/react";

const ANNOUNCEMENTS = [
  "MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC CHO ĐƠN TỪ 1.000.000₫",
  "TẶNG KHĂN LỤA TWILLY CHO ĐƠN HÀNG TỪ 1.500.000₫ TRONG THÁNG NÀY",
  "CHÍNH SÁCH ĐỔI HÀNG 30 NGÀY • BẢO HÀNH DA THẬT 12 THÁNG",
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="bg-[#18181B] text-white py-2 px-4 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs font-sans font-medium tracking-wider">
        <button
          onClick={handlePrev}
          className="p-1 text-stone-400 hover:text-white transition-colors"
          aria-label="Thông báo trước"
        >
          <CaretLeft size={13} />
        </button>

        <div className="flex-1 text-center truncate px-2 flex items-center justify-center gap-2">
          <Sparkle size={12} className="text-[#C5A880] flex-shrink-0" weight="fill" />
          <span className="transition-opacity duration-300 uppercase tracking-widest text-[11px]">
            {ANNOUNCEMENTS[currentIndex]}
          </span>
          <Sparkle size={12} className="text-[#C5A880] flex-shrink-0" weight="fill" />
        </div>

        <button
          onClick={handleNext}
          className="p-1 text-stone-400 hover:text-white transition-colors"
          aria-label="Thông báo tiếp theo"
        >
          <CaretRight size={13} />
        </button>
      </div>
    </div>
  );
}
