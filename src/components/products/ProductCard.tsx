import { StarRating } from "@/components/ui/StarRating";
import { formatPrice, formatSoldCount } from "@/lib/format-price";
import { productDetailPath } from "@/lib/products";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const href = productDetailPath(product.id);

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/80">
      <Link href={href} className="block">
        <div className="relative aspect-square overflow-hidden bg-emerald-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-amber-950">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={href}>
          <h3 className="font-semibold text-emerald-950 line-clamp-2 transition hover:text-emerald-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-bold text-emerald-700">
          {formatPrice(product.price)}
          <span className="text-sm font-normal text-emerald-600/60">
            /{product.unit}
          </span>
        </p>
        <div className="mt-2">
          <StarRating rating={product.rating} />
        </div>
        <p className="mt-2 text-sm text-emerald-600/75">
          Đã bán {formatSoldCount(product.soldCount)}
        </p>
      </div>
    </article>
  );
}
