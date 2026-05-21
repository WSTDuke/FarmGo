import type { Product, ProductCategory } from "@/types/product";

export type PriceRangeId = "all" | "under50" | "50to100" | "over100";

export type SortOption = "default" | "price-asc" | "price-desc" | "name" | "rating";

export const PRICE_RANGES: { id: PriceRangeId; label: string }[] = [
  { id: "all", label: "Tất cả mức giá" },
  { id: "under50", label: "Dưới 50.000₫" },
  { id: "50to100", label: "50.000₫ – 100.000₫" },
  { id: "over100", label: "Trên 100.000₫" },
];

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "default", label: "Mặc định" },
  { id: "price-asc", label: "Giá thấp → cao" },
  { id: "price-desc", label: "Giá cao → thấp" },
  { id: "name", label: "Tên A → Z" },
  { id: "rating", label: "Đánh giá cao nhất" },
];

function matchesPriceRange(price: number, range: PriceRangeId) {
  if (range === "all") return true;
  if (range === "under50") return price < 50_000;
  if (range === "50to100") return price >= 50_000 && price <= 100_000;
  return price > 100_000;
}

export function filterProducts(
  products: Product[],
  options: {
    search: string;
    categories: ProductCategory[];
    priceRange: PriceRangeId;
    sort: SortOption;
  },
): Product[] {
  const q = options.search.trim().toLowerCase();

  let result = products.filter((p) => {
    if (options.categories.length > 0 && !options.categories.includes(p.category)) {
      return false;
    }
    if (!matchesPriceRange(p.price, options.priceRange)) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });

  switch (options.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "name":
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "vi"));
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}
