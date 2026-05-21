import type { Product } from "@/types/product";

export type CartLine = {
  product: Product;
  quantity: number;
};
