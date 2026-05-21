import { ProductDetailView } from "@/components/products/ProductDetailView";
import { ALL_PRODUCTS } from "@/data/products.mock";
import { APP_NAME } from "@/lib/constants";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: `Không tìm thấy — ${APP_NAME}` };
  return {
    title: `${product.name} — ${APP_NAME}`,
    description: `Chi tiết sản phẩm ${product.name} tại FarmGo.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const related = getRelatedProducts(product);

  return (
    <main className="bg-gradient-to-b from-emerald-50/40 to-white">
      <ProductDetailView
        product={product}
        related={related}
        isAuthenticated={!!user}
      />
    </main>
  );
}
