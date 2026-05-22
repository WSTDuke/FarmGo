import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { APP_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Sản phẩm — ${APP_NAME}`,
  description:
    "Danh mục trái cây, rau củ, thực phẩm, hoa tươi và hàng hữu cơ — lọc theo loại mặt hàng.",
};

export default async function ProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="bg-gradient-to-b from-emerald-50/60 to-white">
      <Suspense fallback={null}>
        <ProductsCatalog user={user} />
      </Suspense>
    </main>
  );
}
