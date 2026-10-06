import type {Metadata} from "next";
import {Manrope, Be_Vietnam_Pro} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import {MiniCartDrawer} from "@/components/cart/mini-cart-drawer";
import {SearchDrawer} from "@/components/search/search-drawer";
import {SITE} from "@/data/site";

const heading = Manrope({variable:"--font-heading",subsets:["latin","vietnamese"],display:"swap",weight:["600"]});
const body = Be_Vietnam_Pro({variable:"--font-body",subsets:["latin","vietnamese"],display:"swap",weight:["400","500","600"]});
export const metadata:Metadata = {
 title:{default:"LIS | Túi xách & charm",template:"%s | LIS"},
 description:SITE.description,
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="vi" className={heading.variable+" "+body.variable}><body id="top"><a className="skip-link" href="#main">Đến nội dung</a><Header/><main id="main">{children}</main><Footer/><MiniCartDrawer/><SearchDrawer/></body></html>;
}