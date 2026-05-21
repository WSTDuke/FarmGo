import { CATEGORIES } from "@/data/products.mock";

export function CategorySection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">
            Danh mục nông sản
          </h2>
          <p className="mt-2 text-emerald-700/70">
            Chọn loại bạn cần — tất cả đều tươi, sạch, có nguồn gốc
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className="group flex w-full flex-col items-center rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white p-6 text-center transition-all hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100"
              >
                <span className="text-4xl transition-transform group-hover:scale-110">
                  {cat.emoji}
                </span>
                <span className="mt-3 font-semibold text-emerald-900">
                  {cat.label}
                </span>
                <span className="mt-1 text-xs text-emerald-600/80">
                  {cat.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
