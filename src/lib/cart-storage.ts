import type { CartLine } from "@/types/cart";

const PREFIX = "farmgo-cart";

export function cartStorageKey(userId: string) {
  return `${PREFIX}:${userId}`;
}

export function loadCart(userId: string): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(cartStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(userId: string, lines: CartLine[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(cartStorageKey(userId), JSON.stringify(lines));
}
