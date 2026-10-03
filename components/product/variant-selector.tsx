"use client";
import type { Variant } from "@/data/products";
export function VariantSelector({variants,selected,onChange}:{variants:Variant[];selected:Variant;onChange:(v:Variant)=>void}) {
 return <div className="variant-control"><div className="swatches" role="group" aria-label="Chọn màu">{variants.map(v=><button type="button" key={v.id} aria-label={v.name} title={v.name} aria-pressed={v.id===selected.id} onClick={()=>onChange(v)}><span style={{backgroundColor:v.hex}}/>{v.availability==="sold-out"&&<i/>}</button>)}</div><p className="color-label" aria-live="polite">{selected.name}<span> / {variants.length} màu</span></p></div>;
}
