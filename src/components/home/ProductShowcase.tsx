import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { FEATURED_PRODUCTS } from "@/data/products.mock";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

export function ProductShowcase() {
  return (
    <section id="san-pham" className="bg-emerald-50/50 py-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">
              Sản phẩm nổi bật
            </h2>
            <p className="mt-2 text-emerald-700/70">
              Trái cây, rau củ, thực phẩm & hoa — chọn lọc mỗi sáng
            </p>
          </div>
          <Link href={ROUTES.products}>
            <Button
              variant="secondary"
              className="w-fit rounded-full border-emerald-200 text-emerald-800"
            >
              Xem tất cả
            </Button>
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.slice(0, 8).map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
