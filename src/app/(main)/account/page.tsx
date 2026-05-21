import { APP_NAME, ROUTES } from "@/lib/constants";
import { getDisplayName } from "@/lib/user-display";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Thông tin tài khoản — ${APP_NAME}`,
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`${ROUTES.login}?next=${encodeURIComponent(ROUTES.account)}`);
  }

  const name = getDisplayName(user);
  const phone =
    (user.user_metadata as { phone?: string })?.phone ?? "—";

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 lg:px-8">
      <h1 className="text-2xl font-bold text-emerald-950">
        Thông tin tài khoản
      </h1>
      <p className="mt-2 text-emerald-700/80">Trang mẫu — sẽ bổ sung chỉnh sửa hồ sơ.</p>
      <dl className="mt-8 space-y-4 rounded-2xl border border-emerald-100 bg-white p-6">
        <div>
          <dt className="text-sm text-emerald-600/80">Họ và tên</dt>
          <dd className="font-medium text-emerald-950">{name}</dd>
        </div>
        <div>
          <dt className="text-sm text-emerald-600/80">Email</dt>
          <dd className="font-medium text-emerald-950">{user.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-emerald-600/80">Số điện thoại</dt>
          <dd className="font-medium text-emerald-950">{phone}</dd>
        </div>
      </dl>
      <Link
        href={ROUTES.products}
        className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900"
      >
        ← Quay lại sản phẩm
      </Link>
    </main>
  );
}
