import { PRODUCTS, getDefaultVariant, type Product, type Variant } from "@/data/products";

export function normalizeSearchText(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}

export function searchProducts(query: string): { product: Product; variant: Variant }[] {
  const tokens = normalizeSearchText(query).trim().split(/\s+/).filter(Boolean);
  return PRODUCTS.flatMap((product) => {
    const matches = product.variants.filter((variant) => {
      const text = normalizeSearchText(
        `${product.title} ${product.categoryName} ${product.category.replace(/-/g, " ")} ${variant.name}`,
      );
      return tokens.every((token) => text.includes(token));
    });
    if (!matches.length) return [];
    const hero = getDefaultVariant(product);
    return [{ product, variant: matches.find((variant) => variant.id === hero.id) ?? matches[0] }];
  });
}
