import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { FEATURED_PRODUCTS } from "@/data/products.mock";
import Image from "next/image";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}

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
          <Button
            variant="secondary"
            className="w-fit rounded-full border-emerald-200 text-emerald-800"
          >
            Xem tất cả
          </Button>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <li key={product.id}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/80">
                <div className="relative aspect-square overflow-hidden bg-emerald-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-amber-950">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <StarRating rating={product.rating} />
                  <h3 className="mt-1 font-semibold text-emerald-950 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-lg font-bold text-emerald-700">
                    {formatPrice(product.price)}
                    <span className="text-sm font-normal text-emerald-600/60">
                      /{product.unit}
                    </span>
                  </p>
                  <Button className="mt-3 w-full rounded-xl py-2.5 text-sm">
                    Thêm vào giỏ
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
