"use client";

import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";
import Link from "next/link";

type RegisterEmailConfirmProps = {
  email: string;
  role?: "seller" | "buyer";
};

export function RegisterEmailConfirm({ email, role = "buyer" }: RegisterEmailConfirmProps) {
  const loginHref = role === "seller" ? "/seller/login" : "/login";

  return (
    <div className="animate-auth-page-in py-4 text-center">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        <Mail className="h-10 w-10" strokeWidth={1.75} aria-hidden />
      </span>

      <h2 className="mt-8 text-2xl font-bold text-emerald-950">
        Chúng tôi đã gửi email xác nhận đến bạn
      </h2>

      <p className="mt-4 text-base leading-relaxed text-emerald-700/80">
        Vui lòng mở hộp thư và bấm vào liên kết xác nhận để kích hoạt tài khoản
        FarmGo.
      </p>

      <p className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm font-medium text-emerald-900">
        {email}
      </p>

      <p className="mt-4 text-sm text-emerald-600/70">
        Không thấy email? Kiểm tra thư mục spam hoặc quảng cáo.
      </p>

      <Link href={loginHref} className="mt-10 inline-block w-full sm:w-auto">
        <Button
          type="button"
          className="w-full rounded-xl px-10 py-4 text-base font-semibold sm:min-w-[240px]"
        >
          Đến trang đăng nhập
        </Button>
      </Link>
    </div>
  );
}
