import { ROUTES } from "@/lib/constants";
import type { CartLine } from "@/types/cart";

export const SHIPPING_FEE = 15_000;

export function buildBuyNowCheckoutUrl(productId: string, quantity: number) {
  const q = Math.max(1, Math.min(99, quantity));
  return `${ROUTES.checkout}?productId=${encodeURIComponent(productId)}&quantity=${q}`;
}

export function calcCheckoutTotals(lines: CartLine[]) {
  const subtotal = lines.reduce(
    (sum, l) => sum + l.product.price * l.quantity,
    0,
  );
  const shipping = lines.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}
