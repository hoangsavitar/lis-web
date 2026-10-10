import type { Asset, Variant } from "@/data/products";
const order = { packshot: 0, lifestyle: 1, detail: 2 };
export function getProductGallery(variant: Variant): Asset[] {
  return [...variant.gallery].sort((a, b) => order[a.kind] - order[b.kind]);
}
export function getCardMedia(variant: Variant) {
  const primary = variant.gallery.find(a => a.kind === "packshot") ?? variant.gallery.find(a => a.kind === "lifestyle") ?? variant.gallery[0];
  // Prefer styling; another studio angle can preview the same color too.
  // Detail photos remain in the product gallery rather than the catalogue hover.
  const secondary = variant.gallery.find(a => a.kind === "lifestyle" && a.src !== primary?.src)
    ?? variant.gallery.find(a => a.kind === "packshot" && a.src !== primary?.src);
  return { primary, secondary };
}
