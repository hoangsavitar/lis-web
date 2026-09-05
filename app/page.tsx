import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { StorySection } from "@/components/home/story-section";
import { LookbookSection } from "@/components/home/lookbook-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <StorySection />
      <LookbookSection />
    </div>
  );
}
