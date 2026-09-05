import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MiniCartDrawer } from "@/components/cart/mini-cart-drawer";
import { SearchDrawer } from "@/components/search/search-drawer";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const monoFont = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LIS Atelier — Đồ Da Thủ Công & Thời Trang Cao Cấp",
  description:
    "Thương hiệu túi xách và phụ kiện da cao cấp thiết kế độc bản. Tinh hoa chế tác da thủ công chuẩn Quiet Luxury mang cảm hứng Parisian chic.",
  keywords: [
    "túi xách cao cấp",
    "đồ da thủ công",
    "túi da nữ",
    "LIS Atelier",
    "túi kẹp nách",
    "túi đeo chéo",
    "túi công sở",
  ],
  openGraph: {
    title: "LIS Atelier — Đồ Da Thủ Công & Thời Trang Cao Cấp",
    description: "Bộ sưu tập túi xách da cao cấp lấy cảm hứng từ phong cách Quiet Luxury Paris.",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF9",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#B99054] selection:text-white">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MiniCartDrawer />
        <SearchDrawer />
      </body>
    </html>
  );
}
