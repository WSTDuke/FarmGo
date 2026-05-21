"use client";

import { useCart } from "@/providers/CartProvider";
import { ROUTES } from "@/lib/constants";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartButton() {
  const { totalItems, isReady } = useCart();

  return (
    <Link
      href={ROUTES.cart}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 text-emerald-800 transition hover:bg-emerald-50 lg:h-12 lg:w-12"
      aria-label={`Giỏ hàng${totalItems > 0 ? `, ${totalItems} sản phẩm` : ""}`}
      title="Giỏ hàng"
    >
      <ShoppingCart
        className="h-5 w-5 lg:h-6 lg:w-6"
        strokeWidth={2}
        aria-hidden
      />
      {isReady && totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-amber-950">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
