import { ALL_PRODUCTS, CATEGORIES } from "@/data/products.mock";
import { ROUTES } from "@/lib/constants";
import type { Product } from "@/types/product";

export function productDetailPath(id: string) {
  return `${ROUTES.products}/${id}`;
}

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getCategoryLabel(category: Product["category"]) {
  return CATEGORIES.find((c) => c.id === category)?.label ?? category;
}

export function getProductDescription(product: Product) {
  const categoryLabel = getCategoryLabel(product.category);
  return `${product.name} thuộc danh mục ${categoryLabel}, được FarmGo tuyển chọn từ nông trại đối tác. Sản phẩm đảm bảo độ tươi, nguồn gốc rõ ràng và giao trong ngày tại khu vực hỗ trợ. Phù hợp cho bữa ăn gia đình hoặc quà tặng sức khỏe.`;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, limit);
}
