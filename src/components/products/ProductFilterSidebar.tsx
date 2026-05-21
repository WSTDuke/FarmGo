"use client";

import { IconBox } from "@/components/ui/IconBox";
import { CATEGORIES } from "@/data/products.mock";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  type PriceRangeId,
  type SortOption,
} from "@/lib/products-filter";
import type { ProductCategory } from "@/types/product";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

const selectClassName =
  "w-full rounded-xl border border-emerald-200 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500";

type ProductFilterSidebarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: ProductCategory[];
  onCategoryToggle: (id: ProductCategory) => void;
  priceRange: PriceRangeId;
  onPriceRangeChange: (id: PriceRangeId) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
  resultCount: number;
};

export function ProductFilterSidebar({
  search,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  priceRange,
  onPriceRangeChange,
  sort,
  onSortChange,
  onReset,
  resultCount,
}: ProductFilterSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="flex flex-col rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm lg:max-h-[min(calc(100dvh-7.5rem),640px)]">
        <div className="shrink-0">
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-base font-semibold text-emerald-950">
              <SlidersHorizontal
                className="h-4 w-4 text-emerald-600"
                strokeWidth={2}
              />
              Bộ lọc
            </h2>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              Đặt lại
            </button>
          </div>
          <p className="mt-1 text-xs text-emerald-700/70">
            {resultCount} sản phẩm phù hợp
          </p>
        </div>

        <div className="mt-3 shrink-0 space-y-3">
          <div>
            <label
              htmlFor="product-search"
              className="mb-1 block text-xs font-medium text-emerald-900"
            >
              Tìm kiếm
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-emerald-500"
                strokeWidth={2}
                aria-hidden
              />
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tên sản phẩm..."
                className="w-full rounded-xl border border-emerald-200 py-2 pl-8 pr-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="product-price"
                className="mb-1 block text-xs font-medium text-emerald-900"
              >
                Khoảng giá
              </label>
              <select
                id="product-price"
                value={priceRange}
                onChange={(e) =>
                  onPriceRangeChange(e.target.value as PriceRangeId)
                }
                className={selectClassName}
              >
                {PRICE_RANGES.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="product-sort"
                className="mb-1 block text-xs font-medium text-emerald-900"
              >
                Sắp xếp
              </label>
              <select
                id="product-sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className={selectClassName}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <fieldset className="mt-3 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
          <legend className="mb-2 text-xs font-medium text-emerald-900">
            Loại mặt hàng
          </legend>
          <ul className="space-y-1 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-0.5 lg:[scrollbar-width:thin] lg:[&::-webkit-scrollbar]:w-1 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-emerald-200">
            {CATEGORIES.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <li key={cat.id}>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-1.5 py-1.5 transition hover:bg-emerald-50/80 has-[:checked]:border-emerald-200 has-[:checked]:bg-emerald-50">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onCategoryToggle(cat.id)}
                      className="h-3.5 w-3.5 shrink-0 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <IconBox
                      icon={Icon}
                      size="sm"
                      className="!h-8 !w-8 shrink-0 [&_svg]:!h-4 [&_svg]:!w-4"
                    />
                    <span className="truncate text-sm font-medium text-emerald-900">
                      {cat.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </div>
    </aside>
  );
}
