import type { ProductCategory } from "@/types/product";
import {
  Citrus,
  Flower2,
  Leaf,
  Salad,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  fruits: Citrus,
  vegetables: Salad,
  food: Wheat,
  flowers: Flower2,
  organic: Leaf,
};
