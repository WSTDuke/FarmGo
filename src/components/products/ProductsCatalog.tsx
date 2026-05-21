"use client";

import { LoginRequiredModal } from "@/components/layout/LoginRequiredModal";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilterSidebar } from "@/components/products/ProductFilterSidebar";
import { ROUTES } from "@/lib/constants";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/products.mock";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import {
  filterProducts,
  type PriceRangeId,
  type SortOption,
} from "@/lib/products-filter";
import type { ProductCategory } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

function parseInitialCategories(
  param: string | null,
): ProductCategory[] {
  if (!param) return [];
  const valid = CATEGORIES.map((c) => c.id);
  if (valid.includes(param as ProductCategory)) {
    return [param as ProductCategory];
  }
  return [];
}

type ProductsCatalogProps = {
  isAuthenticated: boolean;
};

export function ProductsCatalog({ isAuthenticated }: ProductsCatalogProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    () => parseInitialCategories(initialCategory),
  );
  const [priceRange, setPriceRange] = useState<PriceRangeId>("all");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(
    () =>
      filterProducts(ALL_PRODUCTS, {
        search,
        categories: selectedCategories,
        priceRange,
        sort,
      }),
    [search, selectedCategories, priceRange, sort],
  );

  const grouped = useMemo(() => {
    const activeCategories =
      selectedCategories.length > 0
        ? CATEGORIES.filter((c) => selectedCategories.includes(c.id))
        : CATEGORIES;

    return activeCategories
      .map((cat) => ({
        ...cat,
        products: filtered.filter((p) => p.category === cat.id),
      }))
      .filter((g) => g.products.length > 0);
  }, [filtered, selectedCategories]);

  const onCategoryToggle = useCallback((id: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }, []);

  const onReset = useCallback(() => {
    setSearch("");
    setSelectedCategories([]);
    setPriceRange("all");
    setSort("default");
  }, []);

  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-2">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <div className="w-full shrink-0 lg:w-72 xl:w-80">
          <ProductFilterSidebar
            search={search}
            onSearchChange={setSearch}
            selectedCategories={selectedCategories}
            onCategoryToggle={onCategoryToggle}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sort={sort}
            onSortChange={setSort}
            onReset={onReset}
            resultCount={filtered.length}
          />
        </div>

        <div className="min-w-0 flex-1">
          {grouped.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-16 text-center">
              <p className="text-lg font-medium text-emerald-900">
                Không tìm thấy sản phẩm
              </p>
              <p className="mt-2 text-sm text-emerald-700/70">
                Thử bỏ bớt bộ lọc hoặc đổi từ khóa tìm kiếm.
              </p>
              <button
                type="button"
                onClick={onReset}
                className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map((group) => {
                const Icon = CATEGORY_ICONS[group.id];
                return (
                  <section key={group.id} id={group.id}>
                    <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                      </span>
                      <div>
                        <h2 className="text-xl font-bold text-emerald-950 md:text-2xl">
                          {group.label}
                        </h2>
                        <p className="text-sm text-emerald-700/70">
                          {group.description} · {group.products.length} sản phẩm
                        </p>
                      </div>
                    </div>
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {group.products.map((product) => (
                        <li key={product.id}>
                          <ProductCard
                            product={product}
                            isAuthenticated={isAuthenticated}
                            onRequireLogin={() => setLoginModalOpen(true)}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>

    <LoginRequiredModal
      open={loginModalOpen}
      onClose={() => setLoginModalOpen(false)}
      redirectTo={ROUTES.products}
      title="Đăng nhập để thêm vào giỏ"
      description="Vui lòng đăng nhập hoặc đăng ký tài khoản FarmGo để mua sản phẩm và quản lý giỏ hàng."
    />
    </>
  );
}
