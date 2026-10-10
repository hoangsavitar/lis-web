import media from './storefront-media.json';

export const SITE = {
  name: "LIS",
  facebookUrl: "https://www.facebook.com/lisbyliiofficial",
  description: "Túi đan, tote và charm LIS. Những phom túi dễ mang cho ngày đi làm và những buổi hẹn.",
} as const;

export const NAVIGATION = [
  { label: "Sản phẩm", href: "/collections/all" },
  { label: "Túi xách", href: "/collections/tui-xach-tay" },
  { label: "Tote", href: "/collections/tui-tote" },
  { label: "Charm", href: "/collections/phu-kien-charm" },
  { label: "Về LIS", href: "/ve-lis" },
] as const;

export const BRAND_LOGOS = media.logos;

export type LogoVariant = keyof typeof BRAND_LOGOS;
