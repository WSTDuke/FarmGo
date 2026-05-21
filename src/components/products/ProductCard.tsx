"use client";

import { LoginRequiredModal } from "@/components/layout/LoginRequiredModal";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/format-price";
import { productDetailPath } from "@/lib/products";
import { ROUTES } from "@/lib/constants";
import { useCart } from "@/providers/CartProvider";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductCardProps = {
  product: Product;
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
};

export function ProductCard({
  product,
  isAuthenticated = false,
  onRequireLogin,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const href = productDetailPath(product.id);

  function openLogin() {
    if (onRequireLogin) onRequireLogin();
    else setLoginModalOpen(true);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/80">
        <Link href={href} className="block">
          <div className="relative aspect-square overflow-hidden bg-emerald-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {product.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-amber-950">
                {product.badge}
              </span>
            )}
          </div>
        </Link>
        <div className="p-4">
          <StarRating rating={product.rating} />
          <Link href={href}>
            <h3 className="mt-1 font-semibold text-emerald-950 line-clamp-2 transition hover:text-emerald-700">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-lg font-bold text-emerald-700">
            {formatPrice(product.price)}
            <span className="text-sm font-normal text-emerald-600/60">
              /{product.unit}
            </span>
          </p>
          <Button
            type="button"
            onClick={handleAddToCart}
            className="mt-3 w-full rounded-xl py-2.5 text-sm"
          >
            {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
          </Button>
        </div>
      </article>

      {!onRequireLogin && (
        <LoginRequiredModal
          open={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          redirectTo={ROUTES.products}
        />
      )}
    </>
  );
}
