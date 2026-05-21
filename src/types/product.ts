export type ProductCategory =
  | "fruits"
  | "vegetables"
  | "food"
  | "flowers"
  | "organic";

export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: ProductCategory;
  image: string;
  badge?: string;
  rating: number;
  /** Số lượng đã bán (mock / từ DB sau) */
  soldCount: number;
};
