import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { APP_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Đăng ký Kênh Người Bán — ${APP_NAME}`,
  description: "Trở thành đối tác bán hàng của FarmGo ngay hôm nay để bán nông sản sạch và tối ưu doanh thu.",
};

export default function SellerRegisterPage() {
  return (
    <Suspense fallback={null}>
      <AuthShell>
        <RegisterForm role="seller" />
      </AuthShell>
    </Suspense>
  );
}
