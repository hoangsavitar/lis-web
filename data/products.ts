import catalog from './catalog.json';
export interface ColorSwatch { name: string; hex: string; image: string }
export interface Asset { src: string; width: number; height: number; widths: number[]; base: string; kind: string; sourceCell: string; alt: string }
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
 {id:'bags',slug:'tui-xach-tay',name:'Túi xách',description:'Những thiết kế cho mỗi ngày.',image:PRODUCTS[5].mainImage,itemCount:4},
 {id:'totes',slug:'tui-tote',name:'Tote',description:'Mang theo cả một ngày.',image:PRODUCTS[2].mainImage,itemCount:2},
 {id:'charms',slug:'phu-kien-charm',name:'Charm',description:'Một chi tiết rất riêng.',image:PRODUCTS[7].mainImage,itemCount:2},
];
export const LOOKBOOK_STORIES = [{id:'collection',title:'The New Classic',date:'',image:PRODUCTS[0].mainImage,readTime:'Khám phá bộ sưu tập',link:'/collections/all'}];
