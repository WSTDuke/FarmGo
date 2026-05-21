"use client";

import { Button } from "@/components/ui/Button";
import { calcCheckoutTotals } from "@/lib/checkout";
import { formatPrice } from "@/lib/format-price";
import { getProductById } from "@/lib/products";
import { ROUTES } from "@/lib/constants";
import { useCart } from "@/providers/CartProvider";
import type { CartLine } from "@/types/cart";
import { CheckCircle2, CreditCard, MapPin, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function CheckoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lines: cartLines, clearCart } = useCart();

  const productId = searchParams.get("productId");
  const quantityParam = parseInt(searchParams.get("quantity") ?? "1", 10);
  const quantity = Number.isNaN(quantityParam)
    ? 1
    : Math.max(1, Math.min(99, quantityParam));
  const isBuyNow = Boolean(productId);

  const checkoutLines: CartLine[] = useMemo(() => {
    if (productId) {
      const product = getProductById(productId);
      if (!product) return [];
      return [{ product, quantity }];
    }
    return cartLines;
  }, [productId, quantity, cartLines]);

  const { subtotal, shipping, total } = calcCheckoutTotals(checkoutLines);

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "transfer">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (orderPlaced) return;
    if (checkoutLines.length === 0) {
      router.replace(isBuyNow ? ROUTES.products : ROUTES.cart);
    }
  }, [checkoutLines.length, orderPlaced, isBuyNow, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 800));

    const id = `FG-${Date.now().toString().slice(-8)}`;
    setOrderId(id);
    if (!isBuyNow) {
      clearCart();
    }
    setOrderPlaced(true);
    setSubmitting(false);
  }

  if (checkoutLines.length === 0 && !orderPlaced) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-12 w-12" strokeWidth={1.75} aria-hidden />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-emerald-950">
          Đặt hàng thành công
        </h1>
        <p className="mt-2 text-emerald-700/80">
          Mã đơn hàng:{" "}
          <span className="font-semibold text-emerald-900">{orderId}</span>
        </p>
        <p className="mt-4 text-sm text-emerald-600/70">
          Đây là màn thanh toán mẫu — chưa kết nối cổng thanh toán thật.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={ROUTES.products}>
            <Button type="button" className="w-full rounded-xl px-8 py-3.5 sm:w-auto">
              Tiếp tục mua sắm
            </Button>
          </Link>
          <Link href={ROUTES.home}>
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-xl px-8 py-3.5 sm:w-auto"
            >
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <h1 className="text-3xl font-bold text-emerald-950">Thanh toán</h1>
      <p className="mt-1 text-emerald-700/80">
        {isBuyNow
          ? "Mua ngay — thanh toán trực tiếp sản phẩm này"
          : "Thanh toán từ giỏ hàng"}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <form
          id="checkout-form"
          className="lg:col-span-3"
          onSubmit={handleSubmit}
        >
          <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-950">
              <MapPin className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              Thông tin giao hàng
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-medium text-emerald-900"
                >
                  Họ và tên
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full rounded-xl border border-emerald-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-emerald-900"
                >
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-emerald-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="0901234567"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-1 block text-sm font-medium text-emerald-900"
                >
                  Địa chỉ giao hàng
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  className="w-full resize-none rounded-xl border border-emerald-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="note"
                  className="mb-1 block text-sm font-medium text-emerald-900"
                >
                  Ghi chú (tuỳ chọn)
                </label>
                <input
                  id="note"
                  name="note"
                  className="w-full rounded-xl border border-emerald-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Giao giờ hành chính, gọi trước khi giao..."
                />
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-950">
              <CreditCard className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              Phương thức thanh toán
            </h2>
            <div className="mt-4 space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-emerald-100 px-4 py-3 has-[:checked]:border-emerald-400 has-[:checked]:bg-emerald-50">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="h-4 w-4 border-emerald-300 text-emerald-600"
                />
                <Wallet className="h-5 w-5 text-emerald-600" strokeWidth={2} />
                <span className="text-sm font-medium text-emerald-900">
                  Thanh toán khi nhận hàng (COD)
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-emerald-100 px-4 py-3 has-[:checked]:border-emerald-400 has-[:checked]:bg-emerald-50">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "transfer"}
                  onChange={() => setPaymentMethod("transfer")}
                  className="h-4 w-4 border-emerald-300 text-emerald-600"
                />
                <CreditCard className="h-5 w-5 text-emerald-600" strokeWidth={2} />
                <span className="text-sm font-medium text-emerald-900">
                  Chuyển khoản ngân hàng
                </span>
              </label>
            </div>
          </section>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-8 w-full rounded-xl py-4 text-base font-semibold lg:hidden"
          >
            {submitting ? "Đang xử lý..." : `Đặt hàng — ${formatPrice(total)}`}
          </Button>
        </form>

        <aside className="lg:col-span-2">
          <div className="sticky top-28 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-emerald-950">Đơn hàng</h2>
            <ul className="mt-4 max-h-80 space-y-4 overflow-y-auto">
              {checkoutLines.map((line) => (
                <li key={line.product.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-emerald-50">
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-emerald-950">
                      {line.product.name}
                    </p>
                    <p className="text-xs text-emerald-600/80">
                      {formatPrice(line.product.price)} × {line.quantity}
                    </p>
                    <p className="text-sm font-semibold text-emerald-700">
                      {formatPrice(line.product.price * line.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-emerald-100 pt-4 text-sm">
              <div className="flex justify-between text-emerald-800">
                <dt>Tạm tính</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-emerald-800">
                <dt>Phí giao hàng</dt>
                <dd>{formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between text-base font-bold text-emerald-950">
                <dt>Tổng cộng</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            <Button
              type="submit"
              form="checkout-form"
              disabled={submitting}
              className="mt-6 hidden w-full rounded-xl py-4 text-base font-semibold lg:block"
            >
              {submitting ? "Đang xử lý..." : "Đặt hàng"}
            </Button>
          </div>
          {!isBuyNow && (
            <Link
              href={ROUTES.cart}
              className="mt-4 block text-center text-sm font-medium text-emerald-700 hover:text-emerald-900"
            >
              ← Quay lại giỏ hàng
            </Link>
          )}
        </aside>
      </div>

    </div>
  );
}
