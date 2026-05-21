import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  max?: number;
  className?: string;
};

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  const filled = Math.round(rating);

  return (
    <div className={`flex items-center gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < filled
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-emerald-200"
          }`}
          aria-hidden
        />
      ))}
      <span className="ml-1 text-xs text-emerald-600/60">{rating}</span>
    </div>
  );
}
