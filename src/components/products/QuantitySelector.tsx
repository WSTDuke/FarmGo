"use client";

import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: QuantitySelectorProps) {
  const btnClass =
    size === "sm"
      ? "h-8 w-8"
      : "h-10 w-10";
  const inputClass = size === "sm" ? "h-8 w-12 text-sm" : "h-10 w-14 text-base";

  function clamp(n: number) {
    return Math.max(min, Math.min(max, n));
  }

  return (
    <div
      className="inline-flex items-center rounded-xl border border-emerald-200 bg-white"
      role="group"
      aria-label="Số lượng"
    >
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        className={`${btnClass} flex items-center justify-center rounded-l-xl text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40`}
        aria-label="Giảm số lượng"
      >
        <Minus className="h-4 w-4" strokeWidth={2} />
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          onChange(Number.isNaN(n) ? min : clamp(n));
        }}
        className={`${inputClass} border-x border-emerald-200 text-center font-semibold text-emerald-950 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        aria-label="Số lượng sản phẩm"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        className={`${btnClass} flex items-center justify-center rounded-r-xl text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40`}
        aria-label="Tăng số lượng"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
