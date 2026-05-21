"use client";

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { LogIn, ShoppingCart, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type LoginRequiredModalProps = {
  open: boolean;
  onClose: () => void;
  /** URL sau khi đăng nhập — mặc định trang sản phẩm */
  redirectTo?: string;
  title?: string;
  description?: string;
};

export function LoginRequiredModal({
  open,
  onClose,
  redirectTo = ROUTES.products,
  title = "Đăng nhập để tiếp tục",
  description = "Bạn cần đăng nhập tài khoản FarmGo để thêm sản phẩm vào giỏ hàng.",
}: LoginRequiredModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const loginHref = `${ROUTES.login}?next=${encodeURIComponent(redirectTo)}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-required-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
        aria-label="Đóng"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md animate-auth-page-in rounded-2xl border border-emerald-100 bg-white p-8 shadow-2xl shadow-emerald-900/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-emerald-600 transition hover:bg-emerald-50 hover:text-emerald-900"
          aria-label="Đóng hộp thoại"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <ShoppingCart className="h-8 w-8" strokeWidth={1.75} aria-hidden />
        </span>

        <h2
          id="login-required-title"
          className="mt-6 text-center text-xl font-bold text-emerald-950"
        >
          {title}
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-emerald-700/80">
          {description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={loginHref} className="flex-1" onClick={onClose}>
            <Button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold"
            >
              <LogIn className="h-4 w-4" strokeWidth={2} aria-hidden />
              Đăng nhập
            </Button>
          </Link>
          <Link href={ROUTES.register} className="flex-1" onClick={onClose}>
            <Button
              type="button"
              variant="secondary"
              className="w-full rounded-xl py-3.5 text-base font-semibold"
            >
              <UserPlus className="mr-2 h-4 w-4" strokeWidth={2} aria-hidden />
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
