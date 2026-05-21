import { CheckoutView } from "@/components/checkout/CheckoutView";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Thanh toán — ${APP_NAME}`,
  description: "Thanh toán đơn hàng FarmGo.",
};

type PageProps = {
  searchParams: Promise<{ productId?: string; quantity?: string }>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const nextUrl = params.productId
    ? `${ROUTES.checkout}?productId=${params.productId}&quantity=${params.quantity ?? "1"}`
    : ROUTES.checkout;

  if (!user) {
    redirect(`${ROUTES.login}?next=${encodeURIComponent(nextUrl)}`);
  }

  return (
    <main className="bg-gradient-to-b from-emerald-50/40 to-white">
      <Suspense fallback={null}>
        <CheckoutView />
      </Suspense>
    </main>
  );
}
