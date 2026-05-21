"use client";

import { loadCart, saveCart } from "@/lib/cart-storage";
import { createClient } from "@/lib/supabase/client";
import type { CartLine } from "@/types/cart";
import type { Product } from "@/types/product";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  lines: CartLine[];
  totalItems: number;
  subtotal: number;
  isReady: boolean;
  userId: string | null;
  addItem: (product: Product, quantity: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const syncUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const id = user?.id ?? null;
      setUserId(id);
      if (id) {
        setLines(loadCart(id));
      } else {
        setLines([]);
      }
      setIsReady(true);
    };

    syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const id = session?.user?.id ?? null;
      setUserId(id);
      if (id) {
        setLines(loadCart(id));
      } else {
        setLines([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId || !isReady) return;
    saveCart(userId, lines);
  }, [lines, userId, isReady]);

  const addItem = useCallback((product: Product, quantity: number) => {
    const qty = Math.max(1, Math.min(99, quantity));
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: Math.min(99, next[idx].quantity + qty),
        };
        return next;
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.product.id !== productId));
      return;
    }
    const qty = Math.min(99, quantity);
    setLines((prev) =>
      prev.map((l) =>
        l.product.id === productId ? { ...l, quantity: qty } : l,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalItems = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      totalItems,
      subtotal,
      isReady,
      userId,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [
      lines,
      totalItems,
      subtotal,
      isReady,
      userId,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
