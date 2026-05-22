import { LoginForm } from "@/components/auth/LoginForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Đăng nhập Kênh Người Bán — ${APP_NAME}`,
  description: "Đăng nhập kênh người bán của bạn trên FarmGo để bắt đầu đăng sản phẩm và tiếp cận khách hàng.",
};

export default function SellerLoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthShell>
        <LoginForm roleRequirement="seller" />
      </AuthShell>
    </Suspense>
  );
}
