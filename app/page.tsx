import {PRODUCTS} from "@/data/products";
import {ProductShowcase} from "@/components/home/product-showcase";
import {Collection} from "@/components/product/collection";

export default function Home(){
 return <div className="home-page">
  <ProductShowcase product={PRODUCTS.find(p=>p.id==="mia-bag")!}/>
  <Collection slug="all" embedded/>
 </div>;
}