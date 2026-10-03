import type {Metadata} from "next";
import {Plus_Jakarta_Sans,Cormorant_Garamond} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import {MiniCartDrawer} from "@/components/cart/mini-cart-drawer";
import {SearchDrawer} from "@/components/search/search-drawer";
const sans=Plus_Jakarta_Sans({variable:"--font-sans",subsets:["latin","vietnamese"],display:"swap",weight:["400","500","600"]});
const serif=Cormorant_Garamond({variable:"--font-serif",subsets:["latin","vietnamese"],display:"swap",weight:["400"],style:["normal","italic"]});
export const metadata:Metadata={title:{default:"LIS — Một lựa chọn rất riêng",template:"%s | LIS"},description:"Khám phá 8 thiết kế túi đan và charm LIS, 25 sắc màu cho mỗi ngày. Chọn mẫu, chọn màu và lưu lại để được tư vấn."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi" className={sans.variable+" "+serif.variable}><body id="top"><a className="skip-link" href="#main">Đến nội dung</a><Header/><main id="main">{children}</main><Footer/><MiniCartDrawer/><SearchDrawer/></body></html>}
