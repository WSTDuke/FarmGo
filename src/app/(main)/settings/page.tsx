import { APP_NAME, ROUTES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Cài đặt — ${APP_NAME}`,
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`${ROUTES.login}?next=${encodeURIComponent(ROUTES.settings)}`);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 lg:px-8">
      <h1 className="text-2xl font-bold text-emerald-950">Cài đặt</h1>
      <p className="mt-2 text-emerald-700/80">
        Trang mẫu — thông báo, ngôn ngữ, bảo mật sẽ được thêm sau.
      </p>
      <ul className="mt-8 space-y-3 rounded-2xl border border-emerald-100 bg-white p-6 text-sm text-emerald-800">
        <li className="rounded-xl bg-emerald-50 px-4 py-3">Thông báo đơn hàng</li>
        <li className="rounded-xl bg-emerald-50 px-4 py-3">Đổi mật khẩu</li>
        <li className="rounded-xl bg-emerald-50 px-4 py-3">Ngôn ngữ: Tiếng Việt</li>
      </ul>
      <Link
        href={ROUTES.products}
        className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900"
      >
        ← Quay lại sản phẩm
      </Link>
    </main>
  );
}
