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
import type { ProductCategory, Product } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Plus, X, Package, Sparkles } from "lucide-react";
import type { User } from "@supabase/supabase-js";

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
  user: User | null;
};

export function ProductsCatalog({ user }: ProductsCatalogProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>(ALL_PRODUCTS);

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    () => parseInitialCategories(initialCategory),
  );
  const [priceRange, setPriceRange] = useState<PriceRangeId>("all");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(
    () =>
      filterProducts(productsList, {
        search,
        categories: selectedCategories,
        priceRange,
        sort,
      }),
    [productsList, search, selectedCategories, priceRange, sort],
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
    <div className="mx-auto w-full max-w-[90rem] px-4 py-10 lg:px-10 lg:py-2">
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
          {user?.user_metadata?.role === "seller" && (
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600 animate-pulse" />
                  Chế độ Đối tác Người Bán
                </h3>
                <p className="text-sm text-emerald-700/80 mt-1">
                  Bạn có thể quản lý sản phẩm hoặc thêm mặt hàng nông sản mới vào hệ thống.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/10 transition hover:bg-emerald-700 active:scale-[0.98] shrink-0"
              >
                <Plus className="h-4.5 w-4.5" strokeWidth={2.5} />
                Thêm sản phẩm
              </button>
            </div>
          )}

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
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.products.map((product) => (
                        <li key={product.id}>
                          <ProductCard product={product} />
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

    {addModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-sm">
        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-2xl shadow-emerald-950/20 animate-scale-up">
          <button
            type="button"
            onClick={() => setAddModalOpen(false)}
            className="absolute right-4 top-4 rounded-xl border border-emerald-50 p-2 text-emerald-800 transition hover:bg-emerald-50"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Package className="h-6 w-6" strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-xl font-bold text-emerald-950">
                Thêm sản phẩm mới
              </h3>
              <p className="text-xs text-emerald-700/70 mt-0.5">
                Điền thông tin để đăng bán sản phẩm nông sản
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const name = String(form.get("name") ?? "").trim();
              const price = Number(form.get("price") ?? 0);
              const unit = String(form.get("unit") ?? "").trim();
              const category = String(form.get("category") ?? "") as ProductCategory;
              const badge = String(form.get("badge") ?? "").trim();
              const imageInput = String(form.get("image") ?? "").trim();

              const defaultImages: Record<ProductCategory, string> = {
                fruits: "https://images.unsplash.com/photo-1619566636858-adf3ef3cf0af?w=600&q=80",
                vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
                food: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
                flowers: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
                organic: "https://images.unsplash.com/photo-1598170845058-32b9d6a947da?w=600&q=80",
              };

              const newProduct: Product = {
                id: String(productsList.length + 1),
                name,
                price,
                unit,
                category,
                image: imageInput || defaultImages[category] || defaultImages.fruits,
                badge: badge || undefined,
                rating: 5.0,
                soldCount: 0,
              };

              setProductsList((prev) => [newProduct, ...prev]);
              setAddModalOpen(false);
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-emerald-950 mb-1.5">
                Tên sản phẩm *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ví dụ: Vú sữa Lò Rèn"
                className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-950 mb-1.5">
                  Giá bán (VNĐ) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  placeholder="Giá bán"
                  className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-950 mb-1.5">
                  Đơn vị tính *
                </label>
                <input
                  type="text"
                  name="unit"
                  required
                  placeholder="kg, bó, túi, hộp..."
                  className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-950 mb-1.5">
                  Danh mục *
                </label>
                <select
                  name="category"
                  required
                  className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-950 mb-1.5">
                  Nhãn (badge)
                </label>
                <input
                  type="text"
                  name="badge"
                  placeholder="Mới, Bán chạy, Giảm 10%..."
                  className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-950 mb-1.5">
                Đường dẫn ảnh sản phẩm (URL)
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <p className="text-[10px] text-emerald-700/60 mt-1">
                * Để trống hệ thống sẽ tự động chọn hình ảnh chất lượng cao phù hợp với danh mục.
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-emerald-100 mt-6">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="flex-1 rounded-xl border border-emerald-200 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/10"
              >
                Xác nhận thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
}
