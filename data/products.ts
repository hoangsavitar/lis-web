import catalog from './catalog.json';
export interface ColorSwatch { name: string; hex: string; image: string }
export type ImageKind = "packshot" | "lifestyle" | "detail";
export interface Asset { src: string; width: number; height: number; widths: number[]; base: string; kind: ImageKind; sourceFile?: string; sourceCell: string; alt: string }
export interface Variant extends ColorSwatch { id: string; gallery: Asset[]; sku: string; skuVerified: boolean; availability: 'unknown' | 'available' | 'sold-out'; price: number | null; sourceRow: number }
export interface Product {
 id: string; slug: string; title: string; subtitle: string; description: string; collection: string; dimensions: string; material: string; category: string; categoryName: string; variants: Variant[]; heroVariantId: string; sourceCell: string; details: string[];
 // Legacy import compatibility. Storefront uses variant price and availability.
 price: number; comparePrice: number; discountPercentage: number; inStock: boolean; rating: number; reviewCount: number; weight: string; sizes: string[]; mainImage: string; hoverImage: string; gallery: string[]; colors: ColorSwatch[]; sku: string; isNew?: boolean; isBestSeller?: boolean; crossSellIds?: string[];
}
export const PRODUCTS = catalog as Product[];
export const getDefaultVariant = (p: Product) => p.variants.find(v => v.id === p.heroVariantId) || p.variants[0];
export const productUrl = (p: Product, v = getDefaultVariant(p)) => `/products/${p.slug}?variant=${v.id}`;
export const CATEGORIES = [
 {id:'bags',slug:'tui-xach-tay',name:'Túi xách',description:'Túi nhỏ gọn để cầm tay, đeo vai hoặc đeo chéo.',image:PRODUCTS.find(p=>p.id==='irisa-bag')!.mainImage,itemCount:PRODUCTS.filter(p=>p.category==='tui-xach-tay').length},
 {id:'totes',slug:'tui-tote',name:'Tote',description:'Túi tote đan thanh lịch cho ngày đi làm, đi học và những món đồ cần mang theo.',image:PRODUCTS.find(p=>p.id==='lucia-tote')!.mainImage,itemCount:PRODUCTS.filter(p=>p.category==='tui-tote').length},
 {id:'charms',slug:'phu-kien-charm',name:'Charm',description:'Charm cỏ bốn lá và hoa năm cánh để điểm xuyết cho chiếc túi.',image:PRODUCTS.find(p=>p.id==='lily-charm')!.mainImage,itemCount:PRODUCTS.filter(p=>p.category==='phu-kien-charm').length},
];
export const LOOKBOOK_STORIES = [{id:'collection',title:'Túi xách & charm',date:'',image:PRODUCTS[0].mainImage,readTime:'Xem sản phẩm',link:'/collections/all'}];
