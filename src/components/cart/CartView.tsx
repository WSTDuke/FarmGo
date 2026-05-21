"use client";

import { QuantitySelector } from "@/components/products/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format-price";
import { productDetailPath } from "@/lib/products";
import { useCart } from "@/providers/CartProvider";
import { ROUTES } from "@/lib/constants";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartView() {
  const { lines, subtotal, totalItems, setQuantity, removeItem, clearCart } =
    useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <ShoppingCart className="h-10 w-10" strokeWidth={1.75} aria-hidden />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-emerald-950">
          Giỏ hàng trống
        </h1>
        <p className="mt-2 text-emerald-700/80">
          Hãy chọn sản phẩm và thêm vào giỏ để tiếp tục mua sắm.
        </p>
        <Link href={ROUTES.products} className="mt-8 inline-block">
          <Button
            type="button"
            className="rounded-xl px-8 py-3.5 text-base font-semibold"
          >
            Xem sản phẩm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-950">Giỏ hàng</h1>
          <p className="mt-1 text-emerald-700/80">
            {totalItems} sản phẩm trong giỏ
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-medium text-red-600 transition hover:text-red-700"
        >
          Xóa toàn bộ giỏ
        </button>
      </div>

      <ul className="mt-8 space-y-4">
        {lines.map((line) => (
          <li
            key={line.product.id}
            className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <Link
              href={productDetailPath(line.product.id)}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-emerald-50 sm:h-28 sm:w-28"
            >
              <Image
                src={line.product.image}
                alt={line.product.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={productDetailPath(line.product.id)}
                className="font-semibold text-emerald-950 hover:text-emerald-700"
              >
                {line.product.name}
              </Link>
              <p className="mt-1 text-sm text-emerald-700">
                {formatPrice(line.product.price)}
                <span className="text-emerald-600/60">/{line.product.unit}</span>
              </p>
              <p className="mt-2 font-bold text-emerald-700">
                {formatPrice(line.product.price * line.quantity)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
              <QuantitySelector
                value={line.quantity}
                onChange={(q) => setQuantity(line.product.id, q)}
                size="sm"
              />
              <button
                type="button"
                onClick={() => removeItem(line.product.id)}
                className="inline-flex items-center gap-1.5 text-sm text-red-600 transition hover:text-red-700"
                aria-label={`Xóa ${line.product.name} khỏi giỏ`}
              >
                <Trash2 className="h-4 w-4" strokeWidth={2} />
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 lg:ml-auto lg:max-w-md">
        <div className="flex justify-between text-base text-emerald-800">
          <span>Tạm tính</span>
          <span className="font-bold text-emerald-950">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="mt-2 text-xs text-emerald-600/70">
          Phí giao hàng sẽ được tính ở bước thanh toán (màn hình mẫu).
        </p>
        <Link href={ROUTES.checkout} className="mt-6 block">
          <Button
            type="button"
            className="w-full rounded-xl py-4 text-base font-semibold"
          >
            Tiến hành thanh toán
          </Button>
        </Link>
        <Link
          href={ROUTES.products}
          className="mt-4 block text-center text-sm font-medium text-emerald-700 hover:text-emerald-900"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}
