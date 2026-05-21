import { CartView } from "@/components/cart/CartView";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Giỏ hàng — ${APP_NAME}`,
  description: "Xem và chỉnh sửa giỏ hàng FarmGo.",
};

export default async function CartPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`${ROUTES.login}?next=${encodeURIComponent(ROUTES.cart)}`);
  }

  return (
    <main className="bg-gradient-to-b from-emerald-50/40 to-white">
      <CartView />
    </main>
  );
}
