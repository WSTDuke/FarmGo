import { StarRating } from "@/components/ui/StarRating";
import { getProductReviews, getReviewCount } from "@/data/reviews.mock";
import { formatSoldCount } from "@/lib/format-price";
import type { Product } from "@/types/product";
import { MessageSquare, Star } from "lucide-react";

type ProductReviewsSectionProps = {
  product: Product;
};

function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RatingBar({ star, percent }: { star: number; percent: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-3 text-emerald-800">{star}</span>
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-emerald-100">
        <div
          className="h-full rounded-full bg-amber-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs text-emerald-600/70">{percent}%</span>
    </div>
  );
}

export function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const reviews = getProductReviews(product.id);
  const reviewCount = getReviewCount(product.id);
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    let percent =
      reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
    if (percent === 0 && star === Math.round(product.rating)) {
      percent = 55;
    }
    return { star, percent };
  });

  return (
    <section className="mt-16 border-t border-emerald-100 pt-12">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-emerald-950 md:text-2xl">
          Đánh giá sản phẩm
        </h2>
      </div>

      <div className="mt-8 grid gap-8 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm lg:grid-cols-3 lg:p-8">
        <div className="flex flex-col items-center justify-center rounded-xl bg-emerald-50/80 px-6 py-8 text-center lg:items-start lg:text-left">
          <p className="text-5xl font-bold text-emerald-950">{product.rating}</p>
          <div className="mt-2">
            <StarRating rating={product.rating} className="[&_svg]:h-5 [&_svg]:w-5" />
          </div>
          <p className="mt-3 text-sm text-emerald-700/80">
            {reviewCount} đánh giá · Đã bán {formatSoldCount(product.soldCount)}
          </p>
        </div>

        <div className="space-y-2 lg:col-span-1">
          {distribution.map(({ star, percent }) => (
            <RatingBar key={star} star={star} percent={percent} />
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/30 px-4 py-6 text-center text-sm text-emerald-700/80 lg:flex lg:flex-col lg:justify-center">
          <p className="font-medium text-emerald-900">Bạn đã mua sản phẩm này?</p>
          <p className="mt-1">Đăng nhập để viết đánh giá (tính năng sắp ra mắt).</p>
        </div>
      </div>

      <ul className="mt-8 space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-emerald-950">{review.author}</p>
                <p className="mt-0.5 text-xs text-emerald-600/70">
                  {formatReviewDate(review.date)}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-emerald-800/90">
              {review.content}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
