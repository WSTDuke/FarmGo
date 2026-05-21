"use client";

import { LoginRequiredModal } from "@/components/layout/LoginRequiredModal";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { getCategoryLabel, getProductDescription, productDetailPath } from "@/lib/products";
import { formatPrice } from "@/lib/format-price";
import { ROUTES } from "@/lib/constants";
import type { Product } from "@/types/product";
import { ArrowLeft, Leaf, Package, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductDetailViewProps = {
  product: Product;
  related: Product[];
  isAuthenticated: boolean;
};

export function ProductDetailView({
  product,
  related,
  isAuthenticated,
}: ProductDetailViewProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const categoryLabel = getCategoryLabel(product.category);
  const description = getProductDescription(product);

  function handleAddToCart() {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    // TODO: thêm vào giỏ
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-emerald-700/80">
          <Link href={ROUTES.products} className="hover:text-emerald-900">
            Sản phẩm
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`${ROUTES.products}?category=${product.category}`}
            className="hover:text-emerald-900"
          >
            {categoryLabel}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-emerald-950">{product.name}</span>
        </nav>

        <Link
          href={ROUTES.products}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-900"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
          Quay lại danh sách
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-amber-950">
                {product.badge}
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              {categoryLabel}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-950 md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4">
              <StarRating rating={product.rating} />
            </div>
            <p className="mt-6 text-3xl font-bold text-emerald-700">
              {formatPrice(product.price)}
              <span className="text-lg font-normal text-emerald-600/60">
                /{product.unit}
              </span>
            </p>
            <p className="mt-6 leading-relaxed text-emerald-800/85">{description}</p>

            <ul className="mt-8 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 text-sm text-emerald-800">
              <li className="flex items-center gap-3">
                <Leaf className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
                Nguồn gốc rõ ràng, chọn lọc mỗi ngày
              </li>
              <li className="flex items-center gap-3">
                <Truck className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
                Giao nhanh trong ngày (khu vực hỗ trợ)
              </li>
              <li className="flex items-center gap-3">
                <Package className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
                Đóng gói cẩn thận, giữ độ tươi
              </li>
            </ul>

            <Button
              type="button"
              onClick={handleAddToCart}
              className="mt-8 w-full rounded-xl py-4 text-base font-semibold shadow-md shadow-emerald-600/20 sm:w-auto sm:min-w-[280px]"
            >
              Thêm vào giỏ
            </Button>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-emerald-100 pt-12">
            <h2 className="text-xl font-bold text-emerald-950 md:text-2xl">
              Sản phẩm cùng loại
            </h2>
            <p className="mt-1 text-emerald-700/70">
              Các mặt hàng khác trong danh mục {categoryLabel}
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard
                    product={item}
                    isAuthenticated={isAuthenticated}
                    onRequireLogin={() => setLoginModalOpen(true)}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <LoginRequiredModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        redirectTo={productDetailPath(product.id)}
        title="Đăng nhập để thêm vào giỏ"
        description="Vui lòng đăng nhập để mua sản phẩm này."
      />
    </>
  );
}
